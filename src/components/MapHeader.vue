<template>
    <header>
        <b-navbar
            fixed="top"
            toggleable="sm"
            type="light"
            variant="light"
            class="py-0"
        >
            <b-container class="">
                <b-navbar-brand href="./">
                    <h4>
                        {{config.app.title}}
                    </h4>
                </b-navbar-brand>
                <b-navbar-nav class="d-flex flex-row">
                    <b-nav-item href="#">
                        <b-button
                            size="md"
                            variant="outline-dark"
                            class="ml-2 px-3"
                            @click="getLocation"
                        >
                            <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
                        </b-button>
                    </b-nav-item>
                    <b-nav-item href="#">
                        <b-button
                            size="md"
                            variant="outline-dark"
                            class="ml-2 px-3"
                            @click="reloadMap"
                        >
                            <font-awesome-icon icon="sync-alt"></font-awesome-icon>
                        </b-button>
                    </b-nav-item>
                    <b-nav-item href="#">
                        <b-button
                            size="md"
                            variant="outline-dark"
                            class="ml-2 px-3"
                            @click="onDisplaySearch"
                        >
                            <font-awesome-icon icon="search"></font-awesome-icon>
                        </b-button>
                    </b-nav-item>
                    <b-nav-item href="#">
                        <b-button
                            size="md"
                            variant="outline-dark"
                            class="ml-2 px-3"
                            @click="onSettings"
                        >
                            <font-awesome-icon icon="cogs"></font-awesome-icon>
                        </b-button>
                    </b-nav-item>

                    <!-- <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <b-button
                                size="md"
                                variant="outline-dark"
                                class="ml-2 pl-3 pr-4 mr-n4"
                            >
                                <font-awesome-icon icon="cogs"></font-awesome-icon>
                            </b-button>
                        </template>
                        <b-dropdown-item
                            href="#"
                            to="settings"
                        >Settings</b-dropdown-item>
                        <b-dropdown-item
                            href="#"
                            v-b-modal.modal-help
                        >About</b-dropdown-item>
                    </b-nav-item-dropdown> -->
                </b-navbar-nav>
            </b-container>
        </b-navbar>
        <b-navbar
            v-show="displaySearchForm"
            fixed="top"
            type="light"
            variant="light"
            class="bg-light pt-1 pb-1 mt-5 mr-n2"
        >
            <b-container class="">
                <map-search
                    :on-search="onSearch"
                    :current-search="search"
                    :search-types="searchTypes"
                    size="sm"
                ></map-search>
            </b-container>
        </b-navbar>
        <!-- <div
            id="map-search"
            class="bg-light pt-2 pb-2 mt-0"
            v-show="displaySearchForm"
        >
            <b-container>
                <b-form>
                    <map-search
                        :on-search="onSearch"
                        :current-search="currentSearch"
                        size="sm"
                    ></map-search>
                </b-form>
            </b-container>
        </div> -->
    </header>
</template>

<script>
import MapSearch from "@/components/MapSearch.vue";

export default {
    name: "MapHeader",
    components: {
        MapSearch
    },
    props: {
        query: Object,
        search: String,
        searchTypes: Array
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
        return { displaySearchForm: false };
    },
    methods: {
        getLocation: function() {
            //   console.log("on-getlocation");
            this.$emit("on-getlocation");
        },
        reloadMap: function() {
            //   console.log("on-reloadmap");
            this.$emit("on-reloadmap");
        },
        onSettings: function() {
            //   console.log("on-reloadmap");
            this.$emit("on-settings");
        },
        onDisplaySearch: function() {
            this.displaySearchForm = !this.displaySearchForm;
        },
        onSearch: function(searchValue, searchType) {
            // console.log("on-search", searchValue, searchType);
            this.$emit("on-search", searchValue, searchType);
        }
    },
    created() {}
};
</script>

<style lang="scss"></style>
