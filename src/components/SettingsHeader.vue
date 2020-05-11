<template>
    <div>
        <header>
            <b-navbar
                fixed="top"
                toggleable="sm"
                type="light"
                variant="light"
                class="py-1"
            >
                <b-container class="">
                    <b-navbar-brand href="./">
                        <h4>{{config.app.title}} <small class="ml-3">{{locales.settings.settings}}</small></h4>
                    </b-navbar-brand>
                    <!-- <b-navbar-nav class="d-flex flex-row">
                        <b-nav-item href="#">
                            <b-button
                                size="md"
                                variant="outline-dark"
                                class="ml-1 px-3"
                            >
                                <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
                            </b-button>
                        </b-nav-item>
                    </b-navbar-nav> -->
                </b-container>
            </b-navbar>
        </header>
    </div>
</template>

<script>
export default {
    name: "SettingsHeader",
    computed: {
        config() {
            return this.$store.getters.config;
        },
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
