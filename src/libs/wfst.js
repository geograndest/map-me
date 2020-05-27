import axios from "axios";
import proj4 from "proj4";
import {
    register as olRegister
} from 'ol/proj/proj4'
import helpers from "./helpers";

proj4.defs(
    "EPSG:2154",
    "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs("EPSG:3949", "+proj=lcc +lat_1=48.25 +lat_2=49.75 +lat_0=49 +lon_0=3 +x_0=1700000 +y_0=8200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
proj4.defs("EPSG:3948", "+proj=lcc +lat_1=47.25 +lat_2=48.75 +lat_0=48 +lon_0=3 +x_0=1700000 +y_0=7200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
olRegister(proj4);

var featureTypes = [
    "Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"
];

function getDescribeFeatureType(url, layer) {
    var params = {
        service: "WFS",
        version: '2.0.0',
        request: 'DescribeFeatureType',
        outputFormat: "application/json",
        typeNames: layer
    };
    var wfs_url = getQueryUrl(url, params);
    return helpers.getFile(wfs_url);
}

function getLayerProperties(url, layer, callback) {
    getDescribeFeatureType(url, layer).then(response => {
        var fields = response.data.featureTypes.filter(feature => {
            return feature.typeName == layer;
        });
        callback(fields[0].properties);
        fields[0].properties || {};
    });
}

function getLayerGeometryName(properties) {
    var geometryProperties = properties.filter(property => {
        return property.type.startsWith("gml:");
    });
    return geometryProperties[0].name || false;
}

function getLayerGeometryType(properties) {
    var geometryProperties = properties.filter(property => {
        return property.type.startsWith("gml:");
    });
    return geometryProperties[0].localType || false;
}

function getQueryUrl(url, params) {
    var query_params = []
    for (var key in params) {
        if (params[key]) {
            query_params.push([key, params[key]].join('='))
        }
    }
    return [url, query_params.join('&')].join('?');
}

function getFeatures(url, params, login, password) {
    login = login || false
    password = password || false
    var config = {}
    if (login && password) {
        config = {
            auth: {
                username: login,
                password: password
            }
        }
    }
    var wfs_url = getQueryUrl(url, params);
    return helpers.getFile(wfs_url, config);
}

function post(url, username, password, data, callback) {
    var config = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'text/xml'
        },
        responseType: 'text',
        data: data
    }
    if (username && password) {
        config.auth = {
            username: username,
            password: password
        }
    }
    return axios.request(config).then(function(response) {
        callback(response)
        return response
    }).catch(function(error) {
        console.log('Authentication error!')
        return error
    })
}

function getGeoJsonFromFeature(feature, srsName) {
    var id = feature.getId();
    var geometryName = feature.getGeometryName();
    var properties = feature.getProperties();
    var type = feature.getGeometry().getType();
    var coordinates = feature.getGeometry().getCoordinates();

    if (srsName && srsName != "EPSG:3857") {
        coordinates = feature.getGeometry().clone().transform("EPSG:3857", srsName).getCoordinates();
    }

    var json = {
        type: "Feature",
        id: id,
        properties: properties,
        geometry: {
            name: geometryName,
            coordinates: coordinates,
            type: type
        }
    }
    return json
}

function escapeXml(text) {
    if (typeof text == 'string') {
        return text.replace(/[<>&'"]/g, function(t) {
            switch (t) {
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
                case '\'':
                    return '&apos;';
                case '"':
                    return '&quot;';
            }
        });
    }
    return text;
}

function get_xml_header() {
    var xml_header = []
    xml_header.push('<?xml version="1.0" ?>')
    xml_header.push('<!-- Version WFS 2.0.0 -->')
    xml_header.push('<wfs:Transaction version="2.0.0" service="WFS"')
    xml_header.push('    xmlns:fes="http://www.opengis.net/fes/2.0"')
    xml_header.push('    xmlns:wfs="http://www.opengis.net/wfs/2.0"')
    xml_header.push('    xmlns:gml="http://www.opengis.net/gml/3.2"')
    xml_header.push('    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/2.0')
    xml_header.push('       http://schemas.opengis.net/wfs/2.0/wfs.xsd')
    xml_header.push('       http://www.opengis.net/gml/3.2')
    xml_header.push('       http://schemas.opengis.net/gml/3.2.1/gml.xsd">')
    return xml_header.join('\n')
}

function get_xml_footer() {
    var xml_footer = []
    xml_footer.push('</wfs:Transaction>')
    return xml_footer.join('\n')
}

function get_xml_geometry(id, geometryType, coordinates, srsName) {
    var xml_geometry = [];
    if (["Point", "MultiPoint"].includes(geometryType)) {
        xml_geometry.push('<gml:Point srsName="' + srsName + '" gml:id="' + id + '.1">');
        xml_geometry.push('<gml:pos decimal = "." cs="," ts=" ">' + coordinates + '</gml:pos>');
        xml_geometry.push('</gml:Point>');
    }
    if (["LineString", "MultiLineString"].includes(geometryType)) {
        xml_geometry.push('<gml:LineString srsName="' + srsName + '" gml:id="' + id + '.1">');
        xml_geometry.push('<gml:posList>' + coordinates + '</gml:posList>');
        xml_geometry.push('</gml:LineString>');
    }
    if (["Polygon", "MultiPolygon"].includes(geometryType)) {
        xml_geometry.push('<gml:Polygon srsName="' + srsName + '" gml:id="' + id + '.1">');
        xml_geometry.push('<gml:exterior>');
        xml_geometry.push('<gml:LinearRing>');
        xml_geometry.push('<gml:posList>' + coordinates + '</gml:posList>');
        xml_geometry.push('</gml:LinearRing>');
        xml_geometry.push('</gml:exterior>');
        xml_geometry.push('</gml:Polygon>');
    }
    return xml_geometry.join('\n');
}

function get_xml_feature(featureType, geometryFieldName, feature, srsName) {
    var id = feature.getId()
    var geometryName = geometryFieldName || feature.getGeometryName()
    var geometryType = feature.getGeometry().getType()
    var coordinates = feature.getGeometry().getCoordinates().toString().split(",").join(" ");
    var properties = feature.getProperties()

    var xml_feature = [];
    xml_feature.push('<' + featureType + ' gml:id="' + id + '">');
    xml_feature.push('<wfs:' + geometryName + '>');

    var xml_geometry = get_xml_geometry(id, geometryType, coordinates, srsName);

    if (["Point", "LineString", 'Polygon'].includes(geometryType)) {
        xml_feature.push(xml_geometry);
    }

    if (geometryType == "MultiPoint") {
        xml_feature.push('<gml:MultiPoint>');
        xml_feature.push('<gml:pointMember>');
        xml_feature.push(xml_geometry);
        xml_feature.push('</gml:pointMember>');
        xml_feature.push('</gml:MultiPoint>');
    }

    if (geometryType == "MultiLineString") {
        xml_feature.push('<gml:MultiCurve srsName="' + srsName + '" gml:id="' + id + '.1">');
        xml_feature.push('<gml:curveMembers>');
        xml_feature.push(xml_geometry);
        xml_feature.push('</gml:curveMembers>');
        xml_feature.push('</gml:MultiCurve>');
    }

    if (geometryType == "MultiPolygon") {
        xml_feature.push('<gml:MultiSurface srsName="' + srsName + '" gml:id="' + id + '.1">');
        xml_feature.push('<gml:surfaceMembers>');
        xml_feature.push(xml_geometry);
        xml_feature.push('</gml:surfaceMembers>');
        xml_feature.push('</gml:MultiSurface>');
    }

    xml_feature.push('</wfs:' + geometryName + '>');
    for (var property in properties) {
        if (![geometryName, "geometry"].includes(property) && properties[property]) {
            xml_feature.push('<wfs:' + property + '>' + escapeXml(properties[property]) + '</wfs:' + property + '>');
        }
    }
    xml_feature.push('</' + featureType + '>');
    return xml_feature.join('\n');
}

function get_xml_features(featureType, geometryFieldName, features, srsName) {
    var xml_features = [];
    for (var f = 0; f < features.length; f++) {
        xml_features.push(get_xml_feature(featureType, geometryFieldName, features[f], srsName))
    }
    return xml_features.join("\n")
}

function get_xml_filters(features) {
    var xml_filters = []
    xml_filters.push('<fes:Filter>')
    for (var f = 0; f < features.length; f++) {
        var id = features[f].getId()
        xml_filters.push('<fes:ResourceId rid="' + id + '"/>')
    }
    xml_filters.push('</fes:Filter>')
    return xml_filters.join("\n")
}

function get_xml(action, featureType, geometryFieldName, features, srsName) {
    srsName = srsName || 'EPSG:3857'
    var xml = []
    xml.push(get_xml_header(action))
    xml.push('<wfs:' + action + ' typeName="' + featureType + '">')
    if (['Insert', 'Replace'].includes(action)) {
        xml.push(get_xml_features(featureType, geometryFieldName, features, srsName))
    }
    if (['Delete', 'Replace'].includes(action)) {
        xml.push(get_xml_filters(features))
    }
    xml.push('</wfs:' + action + '>')
    xml.push(get_xml_footer())

    return xml.join("\n")
}

function wfsTransaction(action, url, featureType, features, srsName, callback) {
    getLayerProperties(
        url,
        featureType,
        properties => {
            var geometryFieldName = getLayerGeometryName(
                properties
            );
            var geometryType = getLayerGeometryType(
                properties
            );
            var xml = get_xml(action, featureType, geometryFieldName, features, srsName);
            console.log('Transaction WFST', xml);
            return post(url, 'gryckelynck', 'guillaume%78', xml, callback)
        }
    );
}


function getCqlFilter(fields, search) {
    if (search) {
        const cqlFilters = {
            fields_cs: "concatenate(###FIELDS###) ILIKE '%###SEARCH###%'",
            fields_eq: "concatenate(###FIELDS###) ILIKE '###SEARCH###'",
        }

        var fields_string = fields.map(f => {
            return '"' + f + '"'
        }).join(',');
        var search_parts = ['', search];
        var cql_filter = cqlFilters.fields_cs;

        if (search.includes(':')) {
            search_parts = search.split(':');
        }
        if (search.includes('=')) {
            cql_filter = cqlFilters.fields_eq;
            search_parts = search.split('=');
        }

        var cql_fields = search_parts[0] ? '"' + search_parts[0] + '"' : fields_string;
        var cql_search = search_parts[1];

        cql_filter = cql_filter.replace("###FIELDS###", cql_fields);
        cql_filter = cql_filter.replace("###SEARCH###", cql_search);

        return encodeURI(cql_filter);
    }
    return "";
}



export default {
    wfsTransaction: wfsTransaction,
    get_xml: get_xml,
    getGeoJsonFromFeature: getGeoJsonFromFeature,
    getCqlFilter: getCqlFilter,
    getFeatures: getFeatures,
    getLayerProperties: getLayerProperties,
    getLayerGeometryName: getLayerGeometryName,
    getLayerGeometryType: getLayerGeometryType
};