<template>
    <div>
        <b-card
            no-body
            class="mt-3 p-0"
        >
            <template v-slot:header>
                <h5 class="mb-0">Map configuration</h5>
            </template>
            <b-card-body class="p-2">
                <b-row>
                    <b-col cols="12">
                        <b-form-group
                            id="title-group"
                            label-for="title"
                            class="py-2 mb-0"
                        >
                            <slot scope="label">
                                Title
                            </slot>
                            <b-form-input
                                id="title"
                                v-model="configFile.app.title"
                                type="text"
                                placeholder="title"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group
                            id="zoom-group"
                            label-for="zoom"
                            class="py-2 mb-0"
                        >
                            <slot scope="label">
                                Zoom
                            </slot>
                            <b-form-input
                                id="zoom"
                                v-model="configFile.map.zoom"
                                type="text"
                                placeholder="zoom"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group
                            id="center-group"
                            label-for="center"
                            class="py-2 mb-0"
                        >
                            <slot scope="label">
                                <span class="d-block">Center</span>
                            </slot>
                            <div class="d-flex justify-content-between">
                                <b-form-input
                                    class="mr-2"
                                    id="center-x"
                                    v-model="configFile.map.center[0]"
                                    type="text"
                                    placeholder="x"
                                ></b-form-input>
                                <b-form-input
                                    class=""
                                    id="center-y"
                                    v-model="configFile.map.center[1]"
                                    type="text"
                                    placeholder="y"
                                ></b-form-input>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group
                            id="rotation-group"
                            label-for="rotation"
                            class="py-2 mb-0"
                        >
                            <slot scope="label">
                                Rotation
                            </slot>
                            <b-form-input
                                id="rotation"
                                v-model="configFile.map.rotation"
                                type="text"
                                placeholder="rotation"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            id="editlayername-group"
                            label-for="editlayername"
                            class="py-2 mb-0"
                        >
                            <slot scope="label">
                                Edit layer name
                            </slot>
                            <b-form-input
                                id="editlayername"
                                v-model="configFile.map.editLayerName"
                                type="text"
                                placeholder="Edit layer name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "StudioTabMap",
    components: {},
    data() {
        return {
            query: false,
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
