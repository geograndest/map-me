<template>
    <div>
        <footer>
            <b-navbar
                fixed="bottom"
                toggleable="md"
                type="light"
                variant="light"
                class="p-0 m-0"
            >
                <b-container>
                    <b-navbar-nav class="d-flex flex-row justify-content-around w-100">
                        <b-nav-item
                            href="#"
                            @click="onClose()"
                        >
                            <b-button
                                size="lg"
                                variant="light"
                            >
                                <font-awesome-icon
                                    icon="times"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">{{locales.settings.goback}}</small>
                            </b-button>
                        </b-nav-item>

                        <b-nav-item
                            href="#"
                            class=""
                            @click="onSave()"
                        >
                            <b-button
                                size="lg"
                                variant="light"
                            >
                                <font-awesome-icon
                                    icon="check"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">{{locales.settings.save}}</small>
                            </b-button>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-container>
            </b-navbar>
        </footer>
    </div>
</template>

<script>
export default {
    name: "SettingsFooter",
    computed: {
        locales() {
            return this.$store.getters.locales;
        }
    },
    data() {
        return {};
    },
    methods: {
        onClose: function() {
            // console.log(1, "save settings");
            this.$emit("settings-close");
        },
        onSave: function() {
            // console.log(1, "save settings");
            this.$emit("settings-valid");
        }
    },
    created() {}
};
</script>

<style lang="scss"></style>
