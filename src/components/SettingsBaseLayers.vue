<template>
    <div>
        <h5 class="mt-1 mb-3">{{locales.settings.baselayers}}</h5>
        <div
            v-for="(layer, index) in layers"
            :key="index"
        >
            <div class="d-flex">
                <b-form-checkbox
                    :id="'baselayer-checkbox-' + index"
                    v-model="layer.visible"
                    :name="'baselayer-checkbox-' + index"
                    class="d-inline pt-1"
                    switch
                >
                </b-form-checkbox>
                <div class="pt-1">{{ layer.title }}</div>
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
            </div>
            <div class="d-flex">
                <b-form-input
                    :id="'baselayer-range-' + index"
                    v-model="layer.opacity"
                    :value="layer.opacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                ></b-form-input>
                <span class="ml-3">{{ layer.opacity }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsBaseLayers",
    props: {
        layers: Object
    },
    computed: {
        locales() {
            return this.$store.getters.locales;
        }
    },
    data() {
        return {};
    },
    methods: {},
    created() {}
};
</script>

<style lang="scss"></style>
