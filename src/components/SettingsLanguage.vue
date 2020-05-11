<template>
    <div>
        <div class="d-flex justify-content-between hand-cursor shadow-none">
            <h5 class="pt-2">Language</h5>
            <!-- <b-button
                size="lg"
                variant="transparent"
                class="border-0"
            >
                <font-awesome-icon icon="info"></font-awesome-icon>
            </b-button> -->
            <b-form-select
                class="w-50"
                v-model="lang"
                :options="this.locales.langs"
                @change="onChangeLang"
            ></b-form-select>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsLanguage",
    computed: {
        locales() {
            return this.$store.getters.locales;
        }
    },
    data() {
        return {
            lang: ""
        };
    },
    methods: {
        onChangeLang: function() {
            this.$store.dispatch("setLang", this.lang);
        }
    },
    created() {
        this.lang = this.locales.langs[0].value;
    }
};
</script>

<style lang="scss"></style>
