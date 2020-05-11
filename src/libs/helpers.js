import marked from "marked";
import dompurify from "dompurify";
import proj4 from "proj4";

proj4.defs(
    "EPSG:2154",
    "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);

function markdown(txt) {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        // sanitize: true,  // deprecated
        smartLists: true,
        smartypants: false
    });
    return marked(dompurify.sanitize(txt));
}

function getProxyUrl(url, proxy) {
    proxy = proxy || false;
    if (proxy) {
        return proxy + encodeURIComponent(url);
    }
    return url;
}

function getBaseUrl(url) {
    return url.split("?")[0];
}

function getUrlParameter(query, param, defaultValue) {
    var response = defaultValue || 0;
    if (query) {
        // console.log(query)
        var value = new URLSearchParams(query).get(param);
        if ((typeof value !== "undefined") && (value !== null)) {
            response = 0 ? (["0", "false"].includes(value)) : value;
        }
    }
    return response;
}

function truncate(text, length) {
    var spaceIndex =
        length < text.length ? text.lastIndexOf(" ", length) : -1;
    return spaceIndex !== -1 ?
        text.substring(0, spaceIndex) + "..." :
        text;
}

function join(values, separator) {
    return values.join(separator);
}

function translateValue(value, list, defaultValue) {
    defaultValue = defaultValue || "";
    return !!(value in list) ? list[value] : defaultValue;
}

function translateArray(values, list, defaultValue) {
    values = values ? values : [];
    return values.map(function(value) {
        return translateValue(value, list, defaultValue);
    });
}

function arrayInArray(values, list) {
    return list.filter(value =>
        values.includes(value.toLowerCase())
    ).length;
}

function getFile(url, config) {
    config = config || {};
    return axios
        .get(url, config)
        .then(function(response) {
            // console.log(response)
            return response;
        })
        .catch(function(error) {
            return error;
        })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

function getFeatures(url, params) {
    var wfs_url = getQueryUrl(url, params);
    return getFile(wfs_url);
}

function getLocation(callback, srsName) {
    // If HTML5 Geolocation Is Supported In This Browser
    if (navigator.geolocation) {
        srsName = srsName || "EPSG:3857";
        //Use HTML5 Geolocation API To Get Current Position
        navigator.geolocation.getCurrentPosition(
            function(position) {
                //Get latitude and longitude from geolocation API
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var coordinates = srsName == "EPSG:4326" ? [lon, lat] : proj4("EPSG:4326", srsName, [lon, lat]);
                callback(coordinates);
            },
            function() {
                callback("Geolocation denied");
            }, {
                timeout: 5000
            }
        );
    } else {
        console.log("Geolocation is not supported in this browser");
    }
}


export default {
    markdown: markdown,
    getProxyUrl: getProxyUrl,
    getBaseUrl: getBaseUrl,
    getUrlParameter: getUrlParameter,
    truncate: truncate,
    join: join,
    translateValue: translateValue,
    translateArray: translateArray,
    arrayInArray: arrayInArray,
    getFile: getFile,
    getQueryUrl: getQueryUrl,
    getFeatures: getFeatures,
    getLocation: getLocation,
    sleep: sleep
}