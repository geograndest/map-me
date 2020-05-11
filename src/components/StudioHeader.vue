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
                        <h4>{{config.app.title}} <small>Studio</small></h4>
                    </b-navbar-brand>
                    <b-navbar-nav class="d-flex flex-row">
                        <b-nav-item
                            href="#"
                            @click="showTab('map')"
                        >
                            <b-button
                                size="md"
                                variant="outline-dark"
                                class="ml-1 px-3"
                            >
                                <font-awesome-icon icon="home"></font-awesome-icon>
                            </b-button>
                        </b-nav-item>
                        <b-nav-item
                            href="#"
                            @click="showTab('base-layers')"
                        >
                            <b-button
                                size="md"
                                variant="outline-dark"
                                class="ml-1 px-3"
                            >
                                <font-awesome-icon icon="layer-group"></font-awesome-icon>
                            </b-button>
                        </b-nav-item>
                        <b-nav-item
                            href="#"
                            @click="showTab('location-layer')"
                        >
                            <b-button
                                size="md"
                                variant="outline-dark"
                                class="ml-1 px-3"
                            >
                                <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
                            </b-button>
                        </b-nav-item>
                        <b-nav-item
                            href="#"
                            @click="showTab('edit-layers')"
                        >
                            <b-button
                                size="md"
                                variant="outline-dark"
                                class="ml-1 px-3"
                            >
                                <font-awesome-icon icon="pen"></font-awesome-icon>
                            </b-button>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-container>
            </b-navbar>
        </header>
    </div>
</template>

<script>
export default {
    name: "StudioHeader",
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
    methods: {
        showTab: function(tab) {
            this.$emit("show-tab", tab);
        }
    },
    created() {}
};
</script>

<style lang="scss"></style>
