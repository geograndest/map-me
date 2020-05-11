<template>
    <div>
        <h5 class="mt-1 mb-3">{{locales.settings.locationlayer}}</h5>
        <div class="mb-1">
            <div class="d-flex">
                <b-form-checkbox
                    id="locationlayer-checkbox"
                    v-model="layer.visible"
                    name="locationlayer-checkbox"
                    class="d-inline pt-1"
                    switch
                >
                </b-form-checkbox>
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
            locationLayerDetailsVisibility['locationlayer-details']
              ? 'true'
              : 'false'
          "
                    aria-controls="locationlayer-details"
                    @click="
            locationLayerDetailsVisibility[
              'locationlayer-details'
            ] = !locationLayerDetailsVisibility['locationlayer-details']
          "
                >
                    <font-awesome-icon
                        size="sm"
                        :icon="
              locationLayerDetailsVisibility['locationlayer-details']
                ? 'chevron-circle-up'
                : 'chevron-circle-down'
            "
                    ></font-awesome-icon>
                </b-button>
            </div>
            <div class="d-flex">
                <b-form-input
                    id="locationlayer-range"
                    v-model="layer.opacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                ></b-form-input>
                <span class="ml-3">{{ layer.opacity }}</span>
            </div>
            <b-collapse
                id="locationlayer-details"
                v-model="locationLayerDetailsVisibility['locationlayer-details']"
            >
                <div class="my-2">
                    <b-row>
                        <b-col
                            cols="6"
                            class="mb-2 d-flex justify-content-between"
                        >
                            <label for="input-default">{{locales.settings.stroke_color}}:</label>
                            <b-form-input
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
                            <label for="input-default">{{locales.settings.stroke_width}}:</label>
                            <b-form-input
                                class="ml-3 w-25"
                                type="number"
                                size="sm"
                                v-model="layer.stroke_width"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
            </b-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsLocationLayer",
    props: {
        layer: Object
        // layerName: String
    },
    computed: {
        config() {
            return this.$store.getters.config;
        },
        locales() {
            return this.$store.getters.locales;
        }
    },
    data() {
        return {
            locationLayerDetailsVisibility: {}
            // locationLayerName: ""
        };
    },
    methods: {
        // saveEditLayerName: function(layerName) {
        //     this.$emit("on-change-location-layer-name", layerName);
        // }
    },
    created() {
        // this.locationLayerName = this.layerName;
    }
};
</script>

<style lang="scss"></style>
