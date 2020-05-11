<template>
    <div>
        <h5 class="mt-1 mb-3">{{locales.settings.editlayers}}</h5>
        <div
            v-for="(layer, index) in layers"
            :key="index"
            class="mb-3"
        >
            <div class="d-flex">
                <b-form-radio
                    :id="'editlayer-radio-' + index"
                    name="editlayer-radio"
                    v-model="editLayerName"
                    :value="index"
                    class="d-inline pt-1"
                    @change="saveEditLayerName(index)"
                ></b-form-radio>
                <div class="pt-1 ml-2">{{ layer.title }}</div>
                <div
                    v-if="layer.md_url"
                    class="ml-2"
                >
                    <a :href="layer.md_url">
                        <b-button
                            size="sm"
                            variant="transparent"
                            class="border-0"
                        >
                            <font-awesome-icon
                                size="sm"
                                icon="info-circle"
                            ></font-awesome-icon>
                        </b-button>
                    </a>
                </div>
                <b-button
                    size="sm"
                    variant="transparent"
                    class="ml-auto border-0 m-0"
                    :aria-expanded="
            editLayersDetailsVisibility['editlayer-details-' + index]
              ? 'true'
              : 'false'
          "
                    aria-controls="editlayer-details"
                    @click="
            editLayersDetailsVisibility[
              'editlayer-details-' + index
            ] = !editLayersDetailsVisibility['editlayer-details-' + index]
          "
                >
                    <font-awesome-icon
                        size="sm"
                        :icon="
              editLayersDetailsVisibility['editlayer-details-' + index]
                ? 'chevron-circle-up'
                : 'chevron-circle-down'
            "
                    ></font-awesome-icon>
                </b-button>
            </div>
            <div class="d-flex">
                <b-form-input
                    :id="'editlayer-range-' + index"
                    v-model="layer.opacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                ></b-form-input>
                <span class="ml-3">{{ layer.opacity }}</span>
            </div>
            <b-collapse
                :id="'editlayer-details-' + index"
                v-model="editLayersDetailsVisibility['editlayer-details-' + index]"
            >
                <b-card
                    no-body
                    class="my-2"
                >
                    <b-card-body class="m-0 px-3 pt-3 pb-0">
                        <div class="mb-3 font-weight-bold">Symbol</div>
                        <b-row>
                            <b-col
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-strokecolor-' + index">{{locales.settings.stroke_color}}:</label>
                                <b-form-input
                                    :id="'editlayer-strokecolor-' + index"
                                    :name="'editlayer-strokecolor-' + index"
                                    class="ml-3 w-25"
                                    type="color"
                                    size="sm"
                                    v-model="layer.stroke_color"
                                ></b-form-input>
                            </b-col>
                            <b-col
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-strokewidth-' + index">{{locales.settings.stroke_width}}:</label>
                                <b-form-input
                                    :id="'editlayer-strokewidth-' + index"
                                    :name="'editlayer-strokewidth-' + index"
                                    class="ml-3 w-25"
                                    type="number"
                                    size="sm"
                                    v-model="layer.stroke_width"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col
                                v-if="!['LineString', 'MultiLineString'].includes(layer.type)"
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-fillcolor-' + index">{{locales.settings.fill_color}}:</label>
                                <b-form-input
                                    :id="'editlayer-fillcolor-' + index"
                                    :name="'editlayer-fillcolor-' + index"
                                    class="ml-3 w-25"
                                    type="color"
                                    size="sm"
                                    v-model="layer.fill_color"
                                ></b-form-input>
                            </b-col>
                            <b-col
                                v-if="['Point', 'MultiPoint'].includes(layer.type)"
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-radius-' + index">{{locales.settings.radius}}:</label>
                                <b-form-input
                                    :id="'editlayer-radius-' + index"
                                    :name="'editlayer-radius-' + index"
                                    class="ml-3 w-25"
                                    type="number"
                                    size="sm"
                                    v-model="layer.radius"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
                <b-card
                    no-body
                    class="my-2"
                >
                    <b-card-body class="m-0 px-3 pt-3 pb-0">
                        <div class="mb-3 font-weight-bold">Text label</div>
                        <b-row>
                            <b-col
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-label-visible-' + index">{{locales.settings.visible}}:</label>
                                <b-form-checkbox
                                    :id="'editlayer-label-visible-' + index"
                                    :name="'editlayer-label-visible-' + index"
                                    v-model="layer.label.visible"
                                    class="d-inline pt-1"
                                    switch
                                >
                                </b-form-checkbox>
                            </b-col>
                            <b-col
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-label-field-' + index">{{locales.settings.field}}:</label>
                                <b-form-select
                                    :id="'editlayer-label-field-' + index"
                                    :name="'editlayer-label-field-' + index"
                                    v-model="layer.label.field"
                                    class="ml-3 w-25"
                                    :options="layer.fields"
                                >
                                </b-form-select>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-label-strokecolor-' + index">{{locales.settings.stroke_color}}:</label>
                                <b-form-input
                                    :id="'editlayer-label-strokecolor-' + index"
                                    :name="'editlayer-label-strokecolor-' + index"
                                    class="ml-3 w-25"
                                    type="color"
                                    size="sm"
                                    v-model="layer.label.stroke_color"
                                ></b-form-input>
                            </b-col>
                            <b-col
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-label-strokewidth-' + index">{{locales.settings.stroke_width}}:</label>
                                <b-form-input
                                    :id="'editlayer-label-strokewidth-' + index"
                                    :name="'editlayer-label-strokewidth-' + index"
                                    class="ml-3 w-25"
                                    type="number"
                                    size="sm"
                                    v-model="layer.label.stroke_width"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col
                                cols="6"
                                class="mb-2 d-flex justify-content-between"
                            >
                                <label :for="'editlayer-label-fillcolor-' + index">{{locales.settings.fill_color}}:</label>
                                <b-form-input
                                    :id="'editlayer-label-fillcolor-' + index"
                                    :name="'editlayer-label-fillcolor-' + index"
                                    class="ml-3 w-25"
                                    type="color"
                                    size="sm"
                                    v-model="layer.label.fill_color"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
                <b-card
                    no-body
                    class="my-2"
                >
                    <b-card-body class="m-0 px-3 pt-3 pb-0">
                        <div class="mb-3 font-weight-bold">Authentication</div>
                        <b-form-group
                            id="login-group"
                            label-cols="4"
                            label-cols-sm="3"
                            label-cols-md="2"
                            label-cols-lg="1"
                            description=""
                            :label="locales.settings.login + ':'"
                            :label-for="'editlayer-auth-login' + index"
                        >
                            <b-form-input
                                :id="'editlayer-auth-login' + index"
                                :name="'editlayer-auth-login' + index"
                                class="w-100 my-1"
                                type="text"
                                size="sm"
                                placeholder="login"
                                v-model="layer.login"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="password-group"
                            label-cols="4"
                            label-cols-sm="3"
                            label-cols-md="2"
                            label-cols-lg="1"
                            description=""
                            :label="locales.settings.password + ':'"
                            :label-for="'editlayer-auth-pwd' + index"
                        >
                            <b-form-input
                                :id="'editlayer-auth-pwd' + index"
                                :name="'editlayer-auth-pwd' + index"
                                class="w-100 my-1"
                                type="password"
                                size="sm"
                                placeholder="password"
                                v-model="layer.password"
                            ></b-form-input>
                        </b-form-group>
                    </b-card-body>
                </b-card>
            </b-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsEditLayers",
    props: {
        layers: Object,
        layerName: String
    },
    computed: {
        config() {
            return this.$store.getters.config;
        },
        locales() {
            return this.$store.getters.locales;
        },
        defaultLayer() {
            return this.$store.getters.editLayer;
        }
    },
    data() {
        return {
            editLayersDetailsVisibility: {},
            editLayerName: ""
        };
    },
    methods: {
        saveEditLayerName: function(layerName) {
            this.$emit("on-change-edit-layer-name", layerName);
        }
    },
    created() {
        this.editLayerName = this.layerName;
        for (var l in this.layers) {
            this.layers[l] = Object.assign(
                {},
                this.defaultLayer,
                this.layers[l]
            );
            this.layers[l].fields = Object.keys(this.layers[l].form);
            this.layers[l].fields.push("fid");
            // this.layers[l].fields.sort();
        }
    }
};
</script>

<style lang="scss"></style>
