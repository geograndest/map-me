<template>
    <b-container>
        <b-row>
            <b-col>

                <div
                    v-if="!config"
                    class="d-flex justify-content-center align-items-center pt-5 mt-5"
                >
                    <b-spinner
                        variant="dark"
                        type="grow"
                        label="Spinning"
                    ></b-spinner>
                </div>

                <div v-else>
                    <settings-header></settings-header>

                    <div class="border-bottom pt-3 pb-4">
                        <settings-base-layers :layers="baseLayers"></settings-base-layers>
                    </div>

                    <div
                        v-if="locationLayer.name"
                        class="border-bottom pt-3 pb-4"
                    >
                        <settings-location-layer
                            :layer="locationLayer"
                            @on-change-location-layer-name="onChangeEditLayer"
                        ></settings-location-layer>
                    </div>

                    <div class="border-bottom pt-3 pb-4">
                        <settings-edit-layers
                            :layers="editLayers"
                            :layer-name="editLayerName"
                            @on-change-edit-layer-name="onChangeEditLayer"
                        ></settings-edit-layers>
                    </div>

                    <!-- <div class="border-bottom pt-3 pb-4">
                        <settings-snap-priority
                            :snap-priority="snapPriority"
                            @on-change-snap-priority="onChangeSnapPriority"
                        > </settings-snap-priority>
                    </div> -->

                    <div class="border-bottom py-2">
                        <settings-language></settings-language>
                    </div>

                    <div class="border-bottom py-2">
                        <settings-about page="about"></settings-about>
                    </div>

                    <settings-footer
                        @settings-close="onCloseSettings()"
                        @settings-valid="onSaveSettings()"
                    ></settings-footer>
                </div>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import SettingsHeader from "@/components/SettingsHeader.vue";
import SettingsFooter from "@/components/SettingsFooter.vue";
import SettingsAbout from "@/components/SettingsAbout.vue";
import SettingsLanguage from "@/components/SettingsLanguage.vue";
import SettingsBaseLayers from "@/components/SettingsBaseLayers.vue";
import SettingsLocationLayer from "@/components/SettingsLocationLayer.vue";
import SettingsEditLayers from "@/components/SettingsEditLayers.vue";
import SettingsSnapPriority from "@/components/SettingsSnapPriority.vue";

export default {
    name: "Settings",
    components: {
        SettingsHeader,
        SettingsFooter,
        SettingsAbout,
        SettingsLanguage,
        SettingsBaseLayers,
        SettingsLocationLayer,
        SettingsEditLayers,
        SettingsSnapPriority
    },
    props: {
        layerName: String
    },
    data() {
        return {
            query: false,
            baseLayers: [],
            locationLayer: [],
            editLayers: [],
            editLayerName: "",
            snapPriority: []
        };
    },
    methods: {
        onChangeSnapPriority: function(snapPriority) {
            this.snapPriority = snapPriority;
        },
        onChangeEditLayer: function(editLayerName) {
            this.editLayerName = editLayerName;
        },
        onCloseSettings: function() {
            this.$router.push({
                name: "map",
                params: { layerName: this.editLayerName },
                query: this.query
            });
        },
        onSaveSettings: function() {
            var config = Object.assign({}, this.config);
            config.baseLayers = this.baseLayers;
            config.locationLayer = this.locationLayer;
            config.editLayers = this.editLayers;
            config.map.editLayerName = this.editLayerName;
            config.map.snapPriority = this.snapPriority;
            this.$store.dispatch("setConfig", config);
            this.onCloseSettings();
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
        this.baseLayers = JSON.parse(JSON.stringify(this.config.baseLayers));
        this.locationLayer = JSON.parse(
            JSON.stringify(this.config.locationLayer)
        );
        this.editLayers = JSON.parse(JSON.stringify(this.config.editLayers));
        this.editLayerName =
            this.layerName ||
            JSON.parse(JSON.stringify(this.config.map.editLayerName)) ||
            Object.keys(this.editLayers)[0];

        this.snapPriority = JSON.parse(
            JSON.stringify(this.config.map.snapPriority)
        );
    }
};
</script>

<style lang="scss">
.hand-cursor {
    cursor: pointer;
}
</style>
