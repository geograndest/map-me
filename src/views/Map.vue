<template>
    <div>
        <div v-if="!config" class="d-flex justify-content-center align-items-center pt-5 mt-5">
            <b-spinner variant="dark" type="grow" label="Spinning"></b-spinner>
        </div>

        <div v-else>
            <map-header
                :query="query"
                :search="currentSearch"
                :search-types="searchTypes"
                @on-getlocation="getLocation"
                @on-reloadmap="reloadMap"
                @on-settings="onSettings"
                @on-search="onSearch"
            ></map-header>

            <b-container>
                <b-row>
                    <b-col>
                        <vl-map
                            id="map"
                            ref="map"
                            :load-tiles-while-animating="true"
                            :load-tiles-while-interacting="true"
                            data-projection="EPSG:4326"
                            class="pb-md-4"
                            :style="'height:' + mapHeight"
                            :default-controls="defaultControls"
                            @created="onMapCreated"
                            @mounted="onMapMounted"
                        >
                            <b-badge id="mouse-position" variant="light" class="p-1 border">
                                <span class="font-weight-normal">
                                    X/Y:
                                    <span ref="mousePosition"></span>
                                </span>
                            </b-badge>
                            <b-badge v-if="loading" id="loading" variant="transparent" class>
                                <b-spinner variant="dark" type="grow"></b-spinner>
                            </b-badge>

                            <vl-view
                                id="mapView"
                                ref="mapView"
                                :zoom.sync="config.map.zoom"
                                :center.sync="config.map.center"
                                :rotation.sync="config.map.rotation"
                                @mounted="onViewMounted"
                            ></vl-view>

                            <vl-layer-tile
                                v-for="(baseLayer, index) in baseLayers"
                                :ref="'layer-' + baseLayer.name"
                                :key="index"
                                :id="baseLayer.name"
                                :z-index="baseLayer.index"
                                :visible="baseLayer.visible"
                                :opacity="parseFloat(baseLayer.opacity)"
                            >
                                <vl-source-osm
                                    v-if="baseLayer.type == 'osm'"
                                    :ref="'source-' + baseLayer.name"
                                ></vl-source-osm>
                                <vl-source-wms
                                    v-if="baseLayer.type == 'wms'"
                                    :ref="'source-' + baseLayer.name"
                                    :url="baseLayer.url"
                                    :layers="baseLayer.layers"
                                ></vl-source-wms>
                                <vl-source-wmts
                                    v-if="baseLayer.type == 'wmts'"
                                    :ref="'source-' + baseLayer.name"
                                    :url="baseLayer.url"
                                    :layerName="baseLayer.layerName"
                                    :matrixSet="baseLayer.matrixSet"
                                    :format="baseLayer.format"
                                    :styleName="baseLayer.styleName"
                                ></vl-source-wmts>
                                <!-- <vl-source-vector
                                    v-if="baseLayer.type == 'wfs'"
                                    :url="baseLayer.url"
                                    :layers="baseLayer.layers"
                                ></vl-source-vector>-->
                            </vl-layer-tile>

                            <vl-layer-vector
                                :id="locationLayer.name"
                                :z-index="locationLayer.index"
                                :visible="locationLayer.visible"
                                :opacity="parseFloat(locationLayer.opacity)"
                            >
                                <vl-source-vector
                                    ident="vectorSourceLocation"
                                    ref="vectorSourceLocation"
                                    :features.sync="locationFeatures"
                                ></vl-source-vector>
                                <vl-style-box>
                                    <vl-style-fill :color="locationLayer.fill_color"></vl-style-fill>
                                    <vl-style-stroke
                                        :color="locationLayer.stroke_color"
                                        :width="parseFloat(locationLayer.stroke_width)"
                                    ></vl-style-stroke>
                                </vl-style-box>
                            </vl-layer-vector>

                            <vl-layer-vector
                                :id="editLayer.name"
                                :z-index="editLayer.index"
                                :visible="editLayer.visible"
                                :opacity="parseFloat(editLayer.opacity)"
                            >
                                <vl-source-vector
                                    ident="vectorSourceEdit"
                                    ref="vectorSourceEdit"
                                    :visible="editLayer.visible"
                                    :features.sync="features"
                                    @created="loadFeatures()"
                                ></vl-source-vector>
                                <vl-style-func :factory="styleEditLayer"></vl-style-func>
                            </vl-layer-vector>

                            <!-- interactions -->
                            <vl-interaction-select
                                ref="interactionSelect"
                                v-if="['view', 'update', 'delete'].includes(action)"
                                :features.sync="selectedFeatures"
                                @select="onSelect"
                            ></vl-interaction-select>

                            <vl-interaction-draw
                                ref="interactionDraw"
                                v-if="action == 'create'"
                                :type="editLayer.type"
                                source="vectorSourceEdit"
                                @drawstart="onDrawStart"
                                @drawend="onDrawEnd"
                            ></vl-interaction-draw>
                            <vl-interaction-modify
                                ref="interactionModify"
                                v-if="action == 'move'"
                                source="vectorSourceEdit"
                                @modifystart="onModifyStart"
                                @modifyend="onModifyEnd"
                            ></vl-interaction-modify>
                            <vl-interaction-snap
                                ref="interactionSnap"
                                v-if="action != 'create'"
                                source="vectorSourceEdit"
                                :priority="config.map.snapPriority"
                            ></vl-interaction-snap>
                        </vl-map>
                    </b-col>
                </b-row>
            </b-container>

            <map-footer
                :layer="editLayer"
                :selectedFeatures="selectedFeatures"
                :createdFeatures="createdFeatures"
                :modifiedFeaturesId="modifiedFeaturesId"
                :btActive="btActive"
                @extend-on-edit-layer="extendOnEditLayer"
                @save-features="saveFeatures"
                @on-update-action="updateAction"
                @on-clear-features="clearFeatures"
                @on-clean-map="cleanMap"
            ></map-footer>

            <b-sidebar id="data-form" :title="editLayer.title" _width="50%">
                <map-form
                    :data="selectedFeatures"
                    :form="editLayer.form"
                    :edit="action != 'view'"
                    @data-form-submit="onSaveForm"
                    _data-form-delete="onBtDelete"
                    @data-form-close="onCloseForm"
                ></map-form>
            </b-sidebar>
        </div>

        <b-modal id="modal-info" centered hide-footer>
            <template v-slot:modal-title v-if="modalInfo.title">{{modalInfo.title}}</template>
            <div class="d-block">{{modalInfo.message}}</div>
            <b-button class="mt-3 float-right w-25" @click="$bvModal.hide('modal-info')">Ok</b-button>
        </b-modal>
    </div>
</template>

<script>
import helpers from "@/libs/helpers";
import wfst from "@/libs/wfst";
import map from "@/libs/map";
import openlayers from "@/libs/openlayers";
import vuelayers from "@/libs/vuelayers";
import MapForm from "@/components/MapForm.vue";
import MapSearch from "@/components/MapSearch.vue";
import MapHeader from "@/components/MapHeader.vue";
import MapFooter from "@/components/MapFooter.vue";

export default {
    name: "Map",
    components: {
        MapForm,
        MapSearch,
        MapHeader,
        MapFooter,
    },
    props: {
        layerName: String,
    },
    data() {
        return {
            loading: false,
            query: false,
            currentSearch: "",
            searchTypes: [],
            modalInfo: {
                title: "",
                message: "",
            },
            defaultControls: {},
            locationLayer: false,
            baseLayers: false,
            editLayers: false,
            editLayerName: false,
            editLayerGeometryName: "geometry",
            editLayerGeometryType: "Point",
            features: [],
            locationFeatures: [],
            selectedFeatures: [],
            drawnFeatures: [],
            createdFeatures: [],
            modifyingFeatures: {},
            modifiedFeaturesId: [],
            action: "view",
            btActive: {
                edit: false,
                create: false,
                move: false,
                delete: false,
            },
        };
    },
    watch: {},
    asyncComputed: {},
    computed: {
        mapHeight: function () {
            return window.innerHeight - 120 + "px";
        },
        config() {
            return this.$store.getters.config;
        },
        defaultLayer() {
            return this.$store.getters.editLayer;
        },
        locales() {
            return this.$store.getters.locales;
        },
        editLayer: function () {
            if (this.editLayers && this.editLayerName) {
                return this.editLayers[this.editLayerName];
            }
            return false;
        },
    },
    filters: {},
    methods: {
        test: function () {
            console.log("test");
        },
        onSelect: function (evt) {},
        onSearch: function (searchValue, searchType) {
            if (searchType.name == "editlayer") {
                this.locationFeatures = [];
                this.loadFeatures(searchValue);
            }
            if (searchType.name == "location") {
                if (searchValue.length > 2) {
                    this.extentOnLocationFeatures(searchValue);
                } else {
                    this.modalInfo = {
                        title: this.locales.map.information,
                        message: this.locales.map.refine_location,
                    };
                    this.$bvModal.show("modal-info");
                }
            }
        },

        extentOnLocationFeatures: function (searchValue) {
            this.loading = true;
            searchValue = searchValue || "";
            var wfs = JSON.parse(JSON.stringify(this.config.wfs));
            wfs.params.typeName = this.locationLayer.typeName;
            wfs.params.cql_filter = wfst.getCqlFilter(
                this.locationLayer.fields,
                searchValue
            );
            wfst.getFeatures(this.locationLayer.url, wfs.params)
                .then((response) => {
                    this.$refs.vectorSourceLocation.$source.clear();
                    this.locationFeatures = response.data.features;
                    setTimeout(() => {
                        var extent = this.$refs.vectorSourceLocation.$source.getExtent();
                        this.zoomOnExtent(extent);
                        this.loading = false;
                    }, 1000);
                })
                .catch(() => {
                    console.log(
                        "Can't get features. Check the configuration file and login/password."
                    );
                    this.loading = false;
                });
        },

        onMapCreated(map) {
            // a DragBox interaction used to select features by drawing boxes
            const dragBox = new openlayers.interaction.DragBox({
                condition: openlayers.condition.platformModifierKeyOnly,
            });
            map.$map.addInteraction(dragBox);
            dragBox.on("boxend", () => {
                // features that intersect the box are added to the collection of selected features
                const extent = dragBox.getGeometry().getExtent();
                const source = this.$refs.vectorSourceEdit.$source;
                source.forEachFeatureIntersectingExtent(extent, (feature) => {
                    feature = vuelayers.olExt.writeGeoJsonFeature(feature);
                    this.selectedFeatures.push(feature);
                });
            });
            // clear selection when drawing a new box and when clicking on the map
            dragBox.on("boxstart", () => {
                this.selectedFeatures = [];
            });
        },
        onMapMounted() {
            this.$refs.map.$map.getControls().extend([
                new openlayers.controls.ScaleLine({}),
                new openlayers.controls.MousePosition({
                    target: this.$refs.mousePosition,
                    coordinateFormat: openlayers.coordinate.createStringXY(4),
                    projection: "EPSG:4326",
                    className: "d-inline",
                    undefinedHTML: "&nbsp;",
                }),
                // new openlayers.controls.overviewmap({
                //     collapsed: true,
                //     collapsible: true
                // })
                // new openlayers.controls.fullscreen(),
                // new openlayers.controls.ZoomSlider()
            ]);
        },
        onViewMounted() {},

        // TODO: à mettre dans map.js?
        styleEditLayer() {
            return (feature) => {
                var fill = new openlayers.style.Fill({
                    color: this.editLayer.fill_color,
                });
                var stroke = new openlayers.style.Stroke({
                    color: this.editLayer.stroke_color,
                    width: this.editLayer.stroke_width,
                });

                var image = new openlayers.style.Circle({
                    radius: this.editLayer.radius,
                    fill: fill,
                    stroke: stroke,
                });

                var style = {};

                if (this.editLayer.label && this.editLayer.label.visible) {
                    var text =
                        this.editLayer.label.field == "fid"
                            ? feature.getId()
                            : feature.get(this.editLayer.label.field);
                    text = text || "Field error: " + this.editLayer.label.field;

                    style.text = new openlayers.style.Text({
                        text: text,
                        font: this.editLayer.label.font,
                        placement:
                            this.editLayer.label.placement ||
                            this.defaultLayer.label.placement,
                        offsetX:
                            this.editLayer.label.offsetX ||
                            this.defaultLayer.label.offsetX,
                        offsetY:
                            this.editLayer.label.offsetY ||
                            this.defaultLayer.label.offsetY,
                        rotation:
                            this.editLayer.label.rotation ||
                            this.defaultLayer.label.rotation,
                        textAlign:
                            this.editLayer.label.textAlign ||
                            this.defaultLayer.label.textAlign,
                        textBaseline:
                            this.editLayer.label.textBaseline ||
                            this.defaultLayer.label.textBaseline,
                        scale:
                            this.editLayer.label.scale ||
                            this.defaultLayer.label.scale,
                        fill: new openlayers.style.Fill({
                            color:
                                this.editLayer.label.fill_color ||
                                this.defaultLayer.label.fill_color,
                        }),
                        stroke: new openlayers.style.Stroke({
                            color:
                                this.editLayer.label.stroke_color ||
                                this.defaultLayer.label.stroke_color,
                            width:
                                this.editLayer.label.stroke_width ||
                                this.defaultLayer.label.stroke_width,
                        }),
                    });
                }
                if (["Point", "MultiPoint"].includes(this.editLayer.type)) {
                    style.image = image;
                } else {
                    style.fill = fill;
                    style.stroke = stroke;
                }

                return [new openlayers.style.Style(style)];
            };
        },

        getLocation() {
            helpers.getLocation((coord) => {
                this.$refs.mapView.animate({
                    center: coord,
                    zoom: 15,
                    duration: 2000,
                });
                this.config.map.center = coord;
                this.config.map.zoom = 15;
            }, "EPSG:4326");
        },

        reloadMap() {
            this.cleanMap();
        },

        onSettings() {
            this.$router.push({
                name: "settings",
                params: { layerName: this.editLayerName },
                query: this.query,
            });
        },

        // TODO: à mettre map.js ?
        getSelectedFeatures(features) {
            var featuresId = features.map((feature) => feature.id);
            return this.$refs.vectorSourceEdit
                .getFeatures()
                .filter((feature) => {
                    return featuresId.includes(feature.getId());
                });
        },

        zoomOnExtent(extent) {
            this.$refs.mapView.$view.fit(extent, {
                size: this.$refs.map.$map.getSize(),
                duration: 2000,
                maxZoom: 18,
            });
        },

        extendOnEditLayer: function () {
            var extent = false;
            this.locationFeatures = [];
            if (this.selectedFeatures.length) {
                var features = this.getSelectedFeatures(this.selectedFeatures);
                extent = map.getFeaturesExtent(features);
            } else if (this.features.length) {
                extent = this.$refs.vectorSourceEdit.$source.getExtent();
            }

            if (extent) {
                this.zoomOnExtent(extent);
            }
        },

        // NOT REALLY USED
        // this.editLayerGeometryName and this.editLayerGeometryType are not used in map.vue file
        loadEditLayerProperties: function () {
            this.loading = true;
            wfst.getLayerProperties(
                this.editLayer.url,
                this.editLayer.typeName,
                (data) => {
                    this.editLayerGeometryName = wfst.getLayerGeometryName(
                        data
                    );
                    this.editLayerGeometryType = wfst.getLayerGeometryType(
                        data
                    );
                    this.loading = false;
                }
            );
        },

        loadFeatures: function (searchValue) {
            this.loading = true;
            searchValue = searchValue || "";
            var wfs = JSON.parse(JSON.stringify(this.config.wfs));
            wfs.params.typeName = this.editLayer.typeName;
            var fields = [];
            for (var field in this.editLayer.form) {
                fields.push(this.editLayer.form[field].property);
            }
            wfs.params.cql_filter = wfst.getCqlFilter(fields, searchValue);
            wfst.getFeatures(
                this.editLayer.url,
                wfs.params,
                this.editLayer.login,
                this.editLayer.password
            )
                .then((response) => {
                    if (response.data.features.length) {
                        this.$refs.vectorSourceEdit.$source.clear();
                        this.features = response.data.features;
                        setTimeout(() => {
                            this.extendOnEditLayer();
                            this.loading = false;
                        }, 1000);
                    } else {
                        this.loading = false;
                        this.modalInfo = {
                            title: this.locales.map.information,
                            message: this.locales.map.no_feature_found,
                        };
                        this.$bvModal.show("modal-info");
                    }
                })
                .catch(() => {
                    console.log(
                        "Can't get features. Check the configuration file and login/password."
                    );
                    this.loading = false;
                });
        },

        // Create features
        onDrawStart: function (evt) {
            // console.log(1, evt, evt.feature, this.selectedFeatures);
        },
        onDrawEnd: function (evt) {
            // console.log(2, evt, evt.feature, this.selectedFeatures);
            this.selectedFeatures.push(
                // TODO: à placer dans map.js?
                // TODO: utiliser "vuelayers.olExt.writeGeoJsonFeature(feature);" ?
                wfst.getGeoJsonFromFeature(evt.feature, this.editLayer.srsName)
            );
            this.createdFeatures.push(evt.feature);
        },

        // Move features
        onModifyStart: function (evt) {
            this.modifyingFeatures = {};
            evt.features.forEach((feature) => {
                this.modifyingFeatures[feature.getId()] = feature.getRevision();
            });
        },
        onModifyEnd: function (evt) {
            for (var f = 0; f < evt.features.getArray().length; f++) {
                var feature = evt.features.getArray()[f];
                if (
                    this.modifyingFeatures[feature.getId()] !==
                    feature.getRevision()
                ) {
                    if (this.modifiedFeaturesId.includes(feature.getId())) {
                        var selectedFeatures = [];
                        for (var s = 0; s < this.selectedFeatures.length; s++) {
                            if (
                                this.selectedFeatures[s].id != feature.getId()
                            ) {
                                selectedFeatures.push(this.selectedFeatures[s]);
                            }
                        }
                        this.selectedFeatures = selectedFeatures;
                    } else {
                        this.modifiedFeaturesId.push(feature.getId());
                    }
                    this.selectedFeatures.push(
                        wfst.getGeoJsonFromFeature(
                            feature,
                            this.editLayer.srsName
                        )
                    );
                }
            }
        },

        saveFeatures: function (action, jsonFeatures) {
            this.loading = true;

            jsonFeatures = jsonFeatures || this.selectedFeatures;
            var features = this.getSelectedFeatures(jsonFeatures);

            // Update features
            for (var f = 0; f < features.length; f++) {
                // Update geometry
                features[f]
                    .getGeometry()
                    .setCoordinates(jsonFeatures[f].geometry.coordinates);
                // Update properties
                features[f].setProperties(jsonFeatures[f].properties);
            }
            var transaction = "Replace";
            var srsName = false;
            // Define WFS-T transaction properties (transaction name and SRS name) according action var
            switch (action) {
                case "create":
                    transaction = "Insert";
                    srsName = this.editLayer.srsName;
                    break;
                case "move":
                    transaction = "Replace";
                    srsName = this.editLayer.srsName;
                    break;
                case "delete":
                    transaction = "Delete";
                    srsName = false;
                    break;
                case "update":
                    transaction = "Replace";
                    srsName = false;
                    break;
            }
            wfst.wfsTransaction(
                transaction,
                this.editLayer.url,
                this.editLayer.typeName,
                features,
                srsName,
                function (response) {
                    this.loading = false;
                    console.log(reponse);
                }
            );
        },

        clearFeatures: function () {
            this.selectedFeatures = [];
            this.createdFeatures = [];
            this.modifyingFeatures = {};
            this.modifiedFeaturesId = [];
        },

        cleanMap: function (ms) {
            ms = ms || 1000;
            this.$bvModal.hide("modal-valid-change");
            helpers.sleep(ms).then(() => {
                this.clearFeatures();
                this.loadFeatures();
                this.action = "update";
            });
        },

        updateAction: function (action) {
            this.action = action || "view";
        },

        onSaveForm: function (data) {
            this.saveFeatures(this.action, data);
            this.cleanMap();
            this.btActive.create = false;
            this.btActive.move = false;
            this.btActive.delte = false;
            this.onCloseForm();
        },
        onCloseForm: function () {
            this.$root.$emit("bv::toggle::collapse", "data-form");
        },
    },
    created() {
        this.query = this.$route.query;
        this.searchTypes = JSON.parse(JSON.stringify(this.locales.searchTypes));
        this.baseLayers = JSON.parse(JSON.stringify(this.config.baseLayers));
        this.locationLayer = JSON.parse(
            JSON.stringify(this.config.locationLayer)
        );
        if (!this.locationLayer.visible) {
            this.searchTypes.splice(-1, 1);
        }
        this.editLayers = JSON.parse(JSON.stringify(this.config.editLayers));
        this.editLayerName =
            this.layerName ||
            this.config.map.editLayerName ||
            Object.keys(this.editLayers)[0];
        this.loadEditLayerProperties();
        // this.loadFeatures();
    },
    mounted() {},
};
</script>

<style scoped lang="scss">
.hand-cursor {
    cursor: pointer;
}
#map {
    position: absolute;
}
#mouse-position {
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 20px;
}
#loading {
    z-index: 1;
    position: absolute;
    bottom: 30px;
    right: 20px;
}
</style>
