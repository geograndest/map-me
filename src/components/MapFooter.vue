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
                            class=""
                        >
                            <b-button
                                size="lg"
                                variant="light"
                                class=""
                                @click="extendOnEditLayer"
                            >
                                <font-awesome-icon
                                    icon="expand"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">
                                    {{ layer.title }}
                                </small>
                            </b-button>
                        </b-nav-item>

                        <b-nav-item
                            href="#"
                            class=""
                        >
                            <b-button
                                size="lg"
                                :variant="btActive.edit ? 'outline-dark' : 'light'"
                                class=""
                                :pressed="btActive.edit"
                                @click="onBtEdit"
                            >
                                <font-awesome-icon
                                    icon="pen"
                                    size="lg"
                                ></font-awesome-icon>
                                <small class="d-none d-md-block">{{locales.map.edit}}</small>
                            </b-button>
                        </b-nav-item>

                        <b-nav-item
                            href="#"
                            class=""
                        >
                            <b-button
                                size="lg"
                                variant="light"
                                :class="btActive.move ? 'border-dark' : 'border-0'"
                                :disabled="!btActive.edit"
                                @click="onBtMove"
                            >
                                <font-awesome-layers
                                    full-width
                                    class="fa-lg"
                                >
                                    <font-awesome-icon icon="arrows-alt" />
                                    <font-awesome-layers-text
                                        v-if="modifiedFeaturesId.length"
                                        counter
                                        :value="modifiedFeaturesId.length"
                                        class="text-light"
                                        transform="shrink-9 right-20 down-9"
                                    />
                                </font-awesome-layers>
                                <small class="d-none d-md-block">{{locales.map.move}}</small>
                            </b-button>
                        </b-nav-item>

                        <b-nav-item
                            href="#"
                            class=""
                        >
                            <b-button
                                size="lg"
                                variant="light"
                                :class="btActive.create ? 'border-dark' : 'border-0'"
                                :disabled="!btActive.edit"
                                @click="onBtCreate"
                            >
                                <font-awesome-layers
                                    full-width
                                    class="fa-lg"
                                >
                                    <font-awesome-icon icon="plus" />
                                    <font-awesome-layers-text
                                        v-if="createdFeatures.length"
                                        counter
                                        :value="createdFeatures.length"
                                        class="text-light"
                                        transform="shrink-9 right-20 down-9"
                                    />
                                </font-awesome-layers>
                                <small class="d-none d-md-block">{{locales.map.create}}</small>
                            </b-button>
                        </b-nav-item>

                        <b-nav-item
                            href="#"
                            class=""
                        >
                            <b-button
                                size="lg"
                                variant="light"
                                :class="btActive.delete ? 'border-dark' : 'border-0'"
                                :disabled="!btActive.edit"
                                @click="onBtDelete"
                            >
                                <font-awesome-layers
                                    full-width
                                    class="fa-lg"
                                >
                                    <font-awesome-icon icon="minus" />
                                    <font-awesome-layers-text
                                        v-if="selectedFeatures.length && action == 'delete'"
                                        counter
                                        :value="selectedFeatures.length"
                                        class="text-light"
                                        transform="shrink-9 right-20 down-9"
                                    />
                                </font-awesome-layers>
                                <small class="d-none d-md-block">{{locales.map.delete}}</small>
                            </b-button>
                        </b-nav-item>

                        <b-nav-item
                            href="#"
                            class=""
                        >
                            <b-button
                                size="lg"
                                variant="light"
                                class=""
                                :disabled="!isSelected"
                                v-b-toggle.data-form
                            >
                                <font-awesome-layers
                                    full-width
                                    class="fa-lg"
                                >
                                    <font-awesome-icon icon="table" />
                                    <font-awesome-layers-text
                                        v-if="isSelected && ['update', 'view'].includes(action)"
                                        counter
                                        :value="selectedFeatures.length"
                                        class="text-light"
                                        transform="shrink-9 right-16 down-8"
                                    />
                                </font-awesome-layers>
                                <small class="d-none d-md-block">{{locales.map.form}}</small>
                            </b-button>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-container>
            </b-navbar>
        </footer>

        <b-modal
            id="modal-valid-change"
            centered
            hide-footer
        >
            <template v-slot:modal-title>
                {{locales.map.save_change}}
            </template>
            <div
                class="d-block"
                v-if="action == 'move'"
            >{{locales.map.valid_save_change}}</div>
            <div
                class="d-block"
                v-if="action == 'create'"
            >{{locales.map.valid_save_new}}</div>
            <div
                class="d-block"
                v-if="action == 'delete'"
            > {{locales.map.valid_delete}}
            </div>
            <div class="d-block w-100 text-right mt-3">
                <b-button
                    variant="primary"
                    class="w-25"
                    @click="saveFeatures()"
                >{{locales.map.yes}}</b-button>
                <b-button
                    variant="danger"
                    class="ml-3 w-25"
                    @click="cleanMap()"
                >{{locales.map.no}}</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "MapFooter",
    props: {
        layer: Object,
        selectedFeatures: Array,
        createdFeatures: Array,
        modifiedFeaturesId: Array,
        btActive: Object
    },
    data() {
        return {};
    },
    computed: {
        locales() {
            return this.$store.getters.locales;
        },
        isSelected: function() {
            return this.selectedFeatures.length > 0;
        },
        action() {
            if (this.btActive.create) {
                return "create";
            }
            if (this.btActive.move) {
                return "move";
            }
            if (this.btActive.delete) {
                return "delete";
            }
            if (this.btActive.edit) {
                return "update";
            }
            return "view";
        }
    },
    methods: {
        extendOnEditLayer: function() {
            this.$emit("extend-on-edit-layer");
        },
        onBtEdit: function() {
            if (
                this.selectedFeatures.length &&
                ["move", "create", "delete"].includes(this.action)
            ) {
                return false;
            }
            this.btActive.create = false;
            this.btActive.move = false;
            this.btActive.delete = false;
            this.btActive.edit = !this.btActive.edit;
            this.updateAction(this.btActive.edit ? "update" : "view");
        },
        onBtMove: function() {
            if (
                this.selectedFeatures.length &&
                ["create", "delete"].includes(this.action)
            ) {
                return;
            }
            if (this.btActive.move && this.modifiedFeaturesId.length) {
                // console.log("Move features");
                this.$bvModal.show("modal-valid-change");
            } else {
                this.clearFeatures();
                this.btActive.create = false;
                this.btActive.delete = false;
                this.btActive.move = !this.btActive.move;
            }
            this.updateAction(this.action);
            //   console.log(221, this.action);
        },
        onBtCreate: function() {
            if (
                this.selectedFeatures.length &&
                ["move", "delete"].includes(this.action)
            ) {
                return;
            }
            if (this.btActive.create && this.createdFeatures.length) {
                // console.log("Insert features", this.createdFeatures);
                this.$bvModal.show("modal-valid-change");
            } else {
                this.clearFeatures();
                this.btActive.move = false;
                this.btActive.delete = false;
                this.btActive.create = !this.btActive.create;
            }
            this.updateAction(this.action);
            //   console.log(220, this.action);
        },
        onBtDelete: function() {
            if (
                this.selectedFeatures.length &&
                ["move", "create"].includes(this.action)
            ) {
                return;
            }
            if (this.selectedFeatures.length) {
                // console.log("Delete features", this.selectedFeatures);
                this.btActive.delete = true;
                this.$bvModal.show("modal-valid-change");
            } else {
                this.clearFeatures();
                this.btActive.create = false;
                this.btActive.move = false;
                this.btActive.delete = !this.btActive.delete;
            }
            //   console.log(222, this.action);
        },
        saveFeatures: function() {
            this.$emit("save-features", this.action);
            this.cleanMap();
        },
        updateAction: function() {
            this.$emit("on-update-action", this.action);
        },
        clearFeatures: function() {
            this.$emit("on-clear-features");
        },
        cleanMap: function() {
            this.btActive.create = false;
            this.btActive.move = false;
            this.btActive.delete = false;
            this.$emit("on-clean-map");
        }
    },
    created() {}
};
</script>

<style lang="scss"></style>
