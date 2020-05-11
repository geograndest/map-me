<template>
    <div>
        <div v-if="!total">
            <b-alert show variant="primary" class="text-center mx-2 my-5">
                <div v-html="locales.map.form_no_feature"></div>
            </b-alert>
        </div>
        <div v-else>
            <b-form class="m-3" @submit.prevent="submit()">
                <p>
                    <small class="d-block">FID : {{ data[index].id }}</small>
                    <!-- <small v-if="data[index].geometry.type == 'Point'" class="d-block"
            >Coordinates (EPSG:4326) :
            {{ data[index].geometry.coordinates[0] | formatDecimal }} -
            {{ data[index].geometry.coordinates[1] | formatDecimal }}</small
                    >-->
                </p>

                <div v-if="data[index].geometry.type == 'Point'">
                    <b-form-group
                        v-for="(coordinate, coord_index) in data[index].geometry
              .coordinates"
                        :key="coord_index"
                        :id="'coordinate' + coord_index + '-label'"
                        :label-for="'coordinate' + coord_index + '-value'"
                        class="border-top py-2 mb-0"
                    >
                        <slot scope="label">
                            <strong>{{ coord_index == 0 ? "X" : "Y" }}</strong>
                            <small
                                class="ml-2"
                            >({{ coord_index == 0 ? "X" : "Y" }} {{locales.map.coordinate}})</small>
                        </slot>
                        <b-form-input
                            :plaintext="!edit"
                            :id="'coordinate' + coord_index + '-value'"
                            :value="coordinate"
                            v-model="data[index].geometry.coordinates[coord_index]"
                            type="text"
                            placeholder="Error"
                        ></b-form-input>
                    </b-form-group>
                </div>

                <div v-for="(field, field_key, field_index) in form" :key="field_index">
                    <b-form-group
                        v-if="field.active"
                        :id="field_key + '-label'"
                        :label-for="field_key + '-value'"
                        class="border-top py-2 mb-0"
                    >
                        <slot scope="label">
                            <strong>{{ field.name }}</strong>
                        </slot>

                        <div v-if="!edit || !field.editable">
                            <b-img
                                v-if="field.type == 'image'"
                                :src="
                  data[index].properties[field.property]
                    ? data[index].properties[field.property]
                    : field.value
                "
                                fluid
                                thumbnail
                            />
                            <div
                                v-if="field.type == 'textarea'"
                                v-html="
                  data[index].properties[field.property]
                    ? data[index].properties[field.property]
                    : field.value
                "
                            ></div>
                            <b-link
                                v-if="field.input == 'url'"
                                :href="
                  data[index].properties[field.property]
                    ? data[index].properties[field.property]
                    : field.value
                "
                            >
                                {{
                                data[index].properties[field.property]
                                ? data[index].properties[field.property]
                                : field.value
                                }}
                            </b-link>
                            <span v-else>
                                {{
                                data[index].properties[field.property]
                                ? data[index].properties[field.property]
                                : field.value | toString
                                }}
                            </span>
                        </div>

                        <div v-else>
                            <b-form-input
                                v-if="(field.type == 'input' || field.type == 'image')"
                                :id="field_key + '-value'"
                                v-model="data[index].properties[field.property]"
                                :value="field.value"
                                :type="field.input"
                                :placeholder="field.placeholder"
                                list="field_key + '-list'"
                            ></b-form-input>
                            <b-form-datalist id="field_key + '-list'" :options="field.options"></b-form-datalist>

                            <b-textarea
                                v-if="field.type == 'textarea'"
                                :placeholder="field.placeholder"
                                class
                                rows="3"
                                max-rows="5"
                                :id="field_key + '-value'"
                                v-model="data[index].properties[field.property]"
                            ></b-textarea>

                            <b-form-select
                                v-if="field.type == 'select'"
                                :placeholder="field.placeholder"
                                class
                                :id="field_key + '-value'"
                                v-model="data[index].properties[field.property]"
                                :options="field.options"
                            ></b-form-select>

                            <b-form-checkbox-group
                                v-if="field.type == 'checkbox'"
                                :placeholder="field.placeholder"
                                class
                                :id="field_key + '-value'"
                                v-model="data[index].properties[field.property]"
                                :options="field.options"
                            ></b-form-checkbox-group>

                            <b-form-radio-group
                                v-if="field.type == 'radio'"
                                :placeholder="field.placeholder"
                                class
                                :id="field_key + '-value'"
                                v-model="data[index].properties[field.property]"
                                :options="field.options"
                            ></b-form-radio-group>
                        </div>
                        <slot scope="description">
                            <small>{{ field.description }}</small>
                        </slot>
                    </b-form-group>
                </div>
                <div class="d-flex justify-content-around border-top py-3">
                    <b-button
                        v-if="edit"
                        @click="submit()"
                        type="button"
                        variant="light"
                        class="btn-outline-dark w-50 mx-3"
                    >Save</b-button>
                    <!-- Disabled -->
                    <b-button
                        v-if="false"
                        @click="remove()"
                        type="button"
                        variant="light"
                        class="btn-outline-dark w-50 mx-3"
                    >Delete</b-button>
                    <b-button
                        @click="close()"
                        type="button"
                        variant="light"
                        class="btn-outline-dark w-50 mx-3"
                    >{{locales.map.close}}</b-button>
                </div>

                <div class="d-flex justify-content-between mt-3">
                    <b-button
                        size="lg"
                        type="button"
                        variant="light"
                        class="p-2 mx-0"
                        :disabled="!btPreviousActive"
                        @click="previous()"
                    >
                        <font-awesome-icon icon="caret-square-left" size="2x"></font-awesome-icon>
                    </b-button>
                    <div class="my-3">{{ index + 1 }} / {{ total }}</div>
                    <b-button
                        size="lg"
                        type="button"
                        variant="light"
                        class="p-2 mx-0"
                        :disabled="!btNextActive"
                        @click="next()"
                    >
                        <font-awesome-icon icon="caret-square-right" size="2x"></font-awesome-icon>
                    </b-button>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "MapForm",
    props: {
        data: {
            type: [Object, Array, Boolean],
            default: function() {
                return {
                    type: "Point",
                    geometry: { coordinates: [0.0, 0.0] },
                    properties: {}
                };
            }
        },
        form: [Object, Boolean],
        edit: Boolean
    },
    data() {
        return {
            index: 0
        };
    },
    computed: {
        locales() {
            return this.$store.getters.locales;
        },
        total: function() {
            this.index = 0;
            return this.data.length;
        },
        btNextActive: function() {
            return this.index < this.total - 1;
        },
        btPreviousActive: function() {
            return this.index > 0;
        }
    },
    filters: {
        formatDecimal: function(value) {
            return Math.round((value + Number.EPSILON) * 100000) / 100000;
        },
        toString: function(value) {
            return Array.isArray(value) ? value.join(", ") : value;
        },
        nl2br: function nl2br(value, is_xhtml) {
            var breakTag =
                is_xhtml || typeof is_xhtml === "undefined"
                    ? "<br " + "/>"
                    : "<br>";
            return (value + "").replace(
                /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
                "$1" + breakTag + "$2"
            );
        }
    },
    methods: {
        submit: function() {
            //   console.log("submit");
            this.index = 0;
            this.$emit("data-form-submit", this.data);
        },
        remove: function() {
            //   console.log("remove");
            this.index = 0;
            this.$emit("data-form-delete", this.data[this.index]);
        },
        close: function() {
            //   console.log("close");
            // this.index = 0;
            this.$emit("data-form-close");
        },
        previous: function() {
            //   console.log("previous");
            this.index = this.index - 1;
        },
        next: function() {
            //   console.log("next");
            this.index = this.index + 1;
        }
    },
    created() {}
};
</script>

<style scoped lang="scss">
.hand-cursor {
    cursor: pointer;
}
</style>
