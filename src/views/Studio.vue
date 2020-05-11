<template>
    <b-container>
        <b-row
            v-if="!config"
            class="d-flex justify-content-center align-items-center pt-5 mt-5"
        >
            <b-col>
                <b-spinner
                    variant="dark"
                    type="grow"
                    label="Spinning"
                ></b-spinner>
            </b-col>
        </b-row>

        <b-row v-else>
            <b-col cols="12">
                <studio-header @show-tab="showTab"></studio-header>
            </b-col>
            <b-col cols="12">

                <b-alert
                    variant="info"
                    show
                    class="mt-3"
                >Module en cours de construction...</b-alert>

                <studio-tab-map v-if="tab == 'map'"></studio-tab-map>

                <studio-tab-base-layers v-if="tab == 'base-layers'"></studio-tab-base-layers>

                <studio-tab-location-layer v-if="tab == 'location-layer'"></studio-tab-location-layer>

                <studio-tab-edit-layers v-if="tab == 'edit-layers'"></studio-tab-edit-layers>

            </b-col>

            <b-col>
                <studio-footer @studio-save="onSaveFile()"></studio-footer>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
import StudioHeader from "@/components/StudioHeader.vue";
import StudioFooter from "@/components/StudioFooter.vue";
import StudioTabMap from "@/components/StudioTabMap.vue";
import StudioTabBaseLayers from "@/components/StudioTabBaseLayers.vue";
import StudioTabEditLayers from "@/components/StudioTabEditLayers.vue";
import StudioTabLocationLayer from "@/components/StudioTabLocationLayer.vue";

const baseLayerTypes = [
    { value: "wms", text: "WMS" },
    { value: "osm", text: "OSM" }
];

export default {
    name: "Studio",
    components: {
        StudioHeader,
        StudioFooter,
        StudioTabMap,
        StudioTabBaseLayers,
        StudioTabEditLayers,
        StudioTabLocationLayer
    },
    data() {
        return {
            query: false,
            tab: "map",
            baseLayerTypes: baseLayerTypes,
            configFile: {
                app: {
                    title: ""
                },
                map: {
                    zoom: "7",
                    center: [5.7, 48.7],
                    rotation: "0",
                    editLayerName: ""
                },
                editLayers: {},
                baseLayers: {}
            },
            editLayer: {
                index: 2,
                name: "edit",
                title: "test1 (private)",
                url: "https://www.geograndest.fr/geoserver/test-public/wfs",
                md_url:
                    "https://www.geograndest.fr/geonetwork/srv/fre/catalog.search#/metadata/FR-200052264-A0135-0000",
                workspace: "test-public",
                typeName: "test1_point",
                srsName: "EPSG:4326",
                type: "Point",
                visible: true,
                opacity: 1,
                fill_color: "#ffffff",
                stroke_color: "#ff0000",
                stroke_width: 1.25,
                radius: 5,
                form: {}
            },
            field: {
                id: "id",
                name: "ID",
                property: "id",
                description: "Identifiant",
                active: true,
                editable: true,
                placeholder: "0",
                value: "0",
                type: "input",
                input: "text",
                options: [{}],
                datalist: []
            },
            baseLayer: {
                index: 1,
                type: "wms",
                name: "limites-ge",
                title: "Limites Grand Est",
                visible: true,
                opacity: 1,
                url: "https://www.geograndest.fr/geoserver/geograndest/wms",
                md_url: "",
                layers: "GGE_LIMITES_GRANDEST_FRONTIERES"
            }
            // editLayers: []
        };
    },
    methods: {
        showTab: function(tab) {
            this.tab = tab;
        },
        onSaveFile: function() {
            // var config = Object.assign({}, this.config);
            // config.baseLayers = this.baseLayers;
            // config.editLayers = this.editLayers;
            // config.map.editLayerName = this.editLayerName;
            // config.map.snapPriority = this.snapPriority;
            // this.$store.dispatch("setConfig", config);
            // this.$router.push({ path: "map", query: this.query });
        }
    },
    computed: {
        config() {
            return this.$store.getters.config;
        },
        locales() {
            return this.$store.getters.locales;
        }
    },
    created() {
        this.query = this.$route.query;
        // this.baseLayers = JSON.parse(JSON.stringify(this.config.baseLayers));
        // this.editLayers = JSON.parse(JSON.stringify(this.config.editLayers));
        // this.editLayerName = JSON.parse(
        //     JSON.stringify(this.config.map.editLayerName)
        // );
        // this.snapPriority = JSON.parse(
        //     JSON.stringify(this.config.map.snapPriority)
        // );
    }
};
</script>

<style lang="scss">
.hand-cursor {
    cursor: pointer;
}
</style>
