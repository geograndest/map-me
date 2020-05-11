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
                            to="settings"
                            class=""
                        >
                            <b-button
                                size="lg"
                                variant="light"
                            >
                                <font-awesome-icon
                                    icon="times"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">Go Back</small>
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
                                    icon="eraser"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">Clean file</small>
                            </b-button>
                        </b-nav-item>

                        <b-nav-item
                            href="#"
                            class=""
                            @click="onLoadFile()"
                        >
                            <b-button
                                size="lg"
                                variant="light"
                            >
                                <font-awesome-icon
                                    icon="file-upload"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">Load file</small>
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
                                    icon="save"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">Save file</small>
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
    name: "StudioFooter",
    computed: {
        locales() {
            return this.$store.getters.locales;
        }
    },
    data() {
        return {};
    },
    methods: {
        onLoadFile: function() {
            console.log("load config file");
        },
        onSave: function() {
            // console.log(1, "save settings");
            this.$emit("studio-save-file");
        }
    },
    created() {}
};
</script>

<style lang="scss"></style>
