<template>
    <div>
        <b-card
            no-body
            class="mt-3 p-0"
        >
            <template v-slot:header>
                <b-row>
                    <b-col class="d-flex justify-content-between align-items-start">
                        <h5 class="">Location layer</h5>
                    </b-col>
                </b-row>
            </template>
            <b-card-body class="p-2">
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col class="d-flex justify-content-between align-items-start">
                                <div class="w-100">
                                    <b-row>
                                        <b-col cols="8">
                                            <b-form-group
                                                id="bl-title-group"
                                                label-for="bl-title"
                                                class="py-2 mb-0"
                                            >
                                                <slot scope="label">
                                                    Title
                                                </slot>
                                                <b-form-input
                                                    id="bl-title"
                                                    v-model="configFile.map.editLayerName"
                                                    type="text"
                                                    placeholder="Title"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="4">
                                            <b-form-group
                                                id="bl-name-group"
                                                label-for="bl-name"
                                                class="py-2 mb-0"
                                            >
                                                <slot scope="label">
                                                    Name
                                                </slot>
                                                <b-form-input
                                                    id="bl-name"
                                                    v-model="configFile.map.editLayerName"
                                                    type="text"
                                                    placeholder="Name"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-collapse
                                        visible
                                        id="locationlayer"
                                    >
                                        <b-row>
                                            <b-col cols="8">
                                                <b-form-group
                                                    id="bl-url-group"
                                                    label-for="bl-url"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        URL
                                                    </slot>
                                                    <b-form-input
                                                        id="bl-url"
                                                        v-model="configFile.map.editLayerName"
                                                        type="text"
                                                        placeholder="https://..."
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col cols="4">
                                                <b-form-group
                                                    id="bl-layer-group"
                                                    label-for="bl-layer"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        Layer name
                                                    </slot>
                                                    <b-form-input
                                                        id="bl-layer"
                                                        v-model="configFile.map.editLayerName"
                                                        type="text"
                                                        placeholder="layer_name"
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-col>

                                            <b-col cols="12">
                                                <b-form-group
                                                    id="bl-mdurl-group"
                                                    label-for="bl-mdurl"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        MD URL
                                                    </slot>
                                                    <b-form-input
                                                        id="bl-mdurl"
                                                        v-model="configFile.map.editLayerName"
                                                        type="text"
                                                        placeholder="https://..."
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-col>

                                            <b-col cols="3">
                                                <b-form-group
                                                    id="bl-index-group"
                                                    label-for="bl-index"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        Index
                                                    </slot>
                                                    <b-form-input
                                                        id="bl-index"
                                                        v-model="configFile.map.editLayerName"
                                                        type="number"
                                                        placeholder="Index"
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col cols="3">
                                                <b-form-group
                                                    id="bl-type-group"
                                                    label-for="bl-type"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        Type
                                                    </slot>
                                                    <b-form-select
                                                        placeholder="Type"
                                                        class=""
                                                        id="bl-type"
                                                        v-model="configFile"
                                                        :options="[]"
                                                    ></b-form-select>
                                                </b-form-group>
                                            </b-col>
                                            <b-col cols="3">
                                                <b-form-group
                                                    id="bl-visible-group"
                                                    label-for="bl-visible"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        Visible
                                                    </slot>
                                                    <b-form-input
                                                        id="bl-visible"
                                                        v-model="configFile.map.editLayerName"
                                                        type="text"
                                                        placeholder="Visible"
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col cols="3">
                                                <b-form-group
                                                    id="bl-opacity-group"
                                                    label-for="bl-opacity"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        Opacity
                                                    </slot>
                                                    <b-form-input
                                                        id="bl-opacity"
                                                        v-model="configFile.map.editLayerName"
                                                        type="text"
                                                        placeholder="Opacity"
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-collapse>
                                </div>
                                <b-button-group
                                    vertical
                                    class="mt-auto ml-3 text-right"
                                >
                                    <b-button
                                        size="sm"
                                        variant="outline-dark"
                                        class="mb-2 ml-auto rounded"
                                        v-b-toggle.locationlayer
                                    >
                                        <font-awesome-icon icon="expand-alt"></font-awesome-icon>
                                    </b-button>
                                </b-button-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "StudioTabLocationLayer",
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
