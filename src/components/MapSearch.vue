<template>
    <b-form
        inline
        class="w-100"
        @submit.prevent="onSubmitSearch"
    >
        <b-input-group class="w-100">
            <b-form-input
                class="border-dark"
                :size="size"
                v-model="searchValue"
            ></b-form-input>
            <b-input-group-append v-if="searchValue">
                <b-button
                    :size="size"
                    variant="outline-dark"
                    @click="onResetSearch()"
                >
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </b-button>
            </b-input-group-append>
            <b-input-group-append v-if="searchTypes.length > 1">
                <b-dropdown
                    :size="size"
                    right
                    variant="outline-dark"
                    split
                    @click="onSubmitSearch()"
                >
                    <template slot="button-content">
                        <font-awesome-icon :icon="searchType.icon"></font-awesome-icon>
                    </template>
                    <b-dropdown-item
                        v-for="(type, typeId) in searchTypes"
                        :key="typeId"
                        :active="type.name == searchType.name"
                        class=""
                        @click="onChangeSearchType(type)"
                    >
                        <font-awesome-icon
                            :icon="type.icon"
                            class="mr-2"
                        ></font-awesome-icon> {{type.title}}
                    </b-dropdown-item>
                </b-dropdown>
            </b-input-group-append>
            <b-input-group-append v-else>
                <b-button
                    :size="size"
                    right
                    variant="outline-dark"
                    split
                    @click="onSubmitSearch()"
                >
                    <font-awesome-icon icon="search"></font-awesome-icon>
                </b-button>
            </b-input-group-append>

        </b-input-group>
    </b-form>
</template>

<script>
export default {
    name: "MapSearch",
    props: {
        onSearch: Function,
        currentSearch: String,
        searchTypes: Array,
        size: String
    },
    data() {
        return {
            searchValue: "",
            searchType: ""
        };
    },
    computed: {
        locales() {
            return this.$store.getters.locales;
        }
    },
    watch: {
        currentSearch: function(newValue, oldValue) {
            this.searchValue = newValue;
        }
    },
    methods: {
        onSubmitSearch: function() {
            this.onSearch(this.searchValue, this.searchType);
        },
        onChangeSearchType: function(searchType) {
            this.searchType = searchType;
            this.onSubmitSearch();
        },
        onResetSearch() {
            this.searchValue = "";
            this.searchType = this.searchTypes[0];
            this.onSearch(this.searchValue, this.searchType);
        }
    },
    created() {
        this.searchValue = this.searchValue ? this.searchValue : "";
        this.searchType = this.searchType
            ? this.searchType
            : this.searchTypes[0];
    }
};
</script>

<style scoped lang="scss">
</style>
