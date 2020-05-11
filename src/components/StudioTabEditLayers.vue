<template>
    <div>
        <b-card
            no-body
            class="mt-3 p-0"
        >
            <template v-slot:header>
                <b-row>
                    <b-col class="d-flex justify-content-between align-items-start">
                        <h5 class="">Edit layers</h5>
                        <b-button
                            size="sm"
                            variant="outline-dark"
                            class="m-0"
                        >
                            <font-awesome-icon icon="plus"></font-awesome-icon>
                        </b-button>
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
                                    <b-collapse id="editlayer-0">
                                        <b-row>
                                            <b-col cols="12">
                                                <b-form-group
                                                    id="bl-name-group"
                                                    label-for="bl-name"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        TEST
                                                    </slot>
                                                    <b-form-input
                                                        id="bl-name"
                                                        v-model="configFile.map.editLayerName"
                                                        type="text"
                                                        placeholder="Name"
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col cols="12">
                                                <b-form-group
                                                    id="bl-name-group"
                                                    label-for="bl-name"
                                                    class="py-2 mb-0"
                                                >
                                                    <slot scope="label">
                                                        TEST
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
                                    </b-collapse>
                                </div>
                                <b-button-group
                                    vertical
                                    class="mt-auto ml-3 text-right"
                                >
                                    <b-button
                                        size="sm"
                                        variant="outline-dark"
                                        class="ml-auto mb-2 rounded"
                                        v-b-toggle.editlayer-0
                                    >
                                        <font-awesome-icon icon="expand-alt"></font-awesome-icon>
                                    </b-button>
                                    <b-button
                                        v-b-modal.modal-fields
                                        size="sm"
                                        variant="outline-dark"
                                        class="ml-auto mb-2 rounded"
                                    >
                                        <font-awesome-icon icon="pen"></font-awesome-icon>
                                    </b-button>
                                    <b-button
                                        size="sm"
                                        variant="outline-dark"
                                        class="ml-auto rounded"
                                    >
                                        <font-awesome-icon icon="minus"></font-awesome-icon>
                                    </b-button>
                                </b-button-group>
                            </b-col>
                        </b-row>
                        <div class="border-bottom pt-2"></div>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
        <b-modal
            id="modal-fields"
            title="Fields"
            size="xl"
        >
            <b-row>
                <b-col
                    cols="12"
                    class="d-flex justify-content-between"
                >
                    <b-card
                        no-body
                        class="w-100"
                    >
                        <b-card-body class="">
                            <b-row>
                                <b-col class="d-flex justify-content-between">
                                    <strong class="">Fields</strong>
                                    <b-button
                                        size="sm"
                                        variant="outline-dark"
                                        class="m-0"
                                    >
                                        <font-awesome-icon icon="plus"></font-awesome-icon>
                                    </b-button>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-name-group"
                                        label-for="field-name"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="Name of the field"
                                        label="Name"
                                    >
                                        <b-form-input
                                            id="field-name"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="Name"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-id-group"
                                        label-for="field-id"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="Id of the field"
                                        label="Identifier"
                                    >
                                        <b-form-input
                                            id="field-id"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="Id"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-property-group"
                                        label-for="field-property"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="Id of the field"
                                        label="Property name"
                                    >
                                        <b-form-input
                                            id="field-property"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="Property name"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-description-group"
                                        label-for="field-description"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="Description"
                                        label="Description"
                                    >
                                        <b-form-input
                                            id="field-description"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="Description"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-group
                                        id="field-active-group"
                                        label-for="field-active"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="active"
                                        label="active"
                                    >
                                        <b-form-input
                                            id="field-active"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="active"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-group
                                        id="field-editable-group"
                                        label-for="field-editable"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="editable"
                                        label="Editable"
                                    >
                                        <b-form-input
                                            id="field-editable"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="editable"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-placeholder-group"
                                        label-for="field-placeholder"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="placeholder"
                                        label="Placeholder"
                                    >
                                        <b-form-input
                                            id="field-placeholder"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="placeholder"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-value-group"
                                        label-for="field-value"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="value"
                                        label="Default value"
                                    >
                                        <b-form-input
                                            id="field-value"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="value"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-type-group"
                                        label-for="field-type"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="type"
                                        label="Type"
                                    >
                                        <b-form-input
                                            id="field-type"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="type"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-input-group"
                                        label-for="field-input"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="input"
                                        label="Input"
                                    >
                                        <b-form-input
                                            id="field-input"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="input"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="field-options-group"
                                        label-for="field-options"
                                        label-cols-sm="4"
                                        label-cols-lg="3"
                                        class="py-2 mb-0"
                                        description="Liste of options (',' separator)"
                                        label="Options"
                                    >
                                        <b-form-input
                                            id="field-options"
                                            v-model="configFile.map.editLayerName"
                                            type="text"
                                            placeholder="Option1, Option2, etc."
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <div class="float-right">
                                <b-button
                                    size="sm"
                                    variant="outline-dark"
                                    class=""
                                >
                                    <font-awesome-icon icon="minus"></font-awesome-icon>
                                </b-button>
                            </div>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "StudioTabEditLayers",
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
