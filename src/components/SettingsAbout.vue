<template>
    <div>
        <div
            class="d-flex justify-content-between hand-cursor shadow-none"
            @click="openModalAbout"
        >
            <h5 class="pt-2">{{locales.settings.about}}</h5>
            <b-button
                size="lg"
                variant="transparent"
                class="border-0"
            >
                <font-awesome-icon icon="info"></font-awesome-icon>
            </b-button>
        </div>

        <b-modal
            ref="modal-about"
            :title="locales.settings.about"
            centered
            ok-only
        >
            <div
                class="my-1"
                v-html="data"
            ></div>
        </b-modal>
    </div>
</template>

<script>
import helpers from "@/libs/helpers";

export default {
    name: "SettingsAbout",
    props: {
        page: String
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
        return {
            data: ""
        };
    },
    methods: {
        openModalAbout: function() {
            helpers.getFile(this.config.pages[this.page]).then(response => {
                this.data = helpers.markdown(response.data);
                this.$refs["modal-about"].show();
            });
        }
    },
    created() {}
};
</script>

<style lang="scss"></style>
