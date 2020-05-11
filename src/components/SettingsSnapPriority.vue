<template>
    <div>
        <h5 class="mt-1 mb-3">{{locales.settings.snappriority}}</h5>
        <div class="d-flex">
            <b-form-input
                id="snap-priority-range"
                v-model="snap"
                :value="snap"
                type="range"
                min="0"
                max="10"
                step="1"
                @change="onChangeSnap"
            ></b-form-input>
            <span class="ml-3">{{ snap }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsSnapPriority",
    props: {
        snapPriority: Number
    },
    computed: {
        locales() {
            return this.$store.getters.locales;
        }
    },
    data() {
        return {
            snap: 0
        };
    },
    methods: {
        onChangeSnap: function() {
            this.$emit("on-change-snap-priority", parseInt(this.snap));
        }
    },
    created() {
        this.snap = this.snapPriority;
    }
};
</script>

<style lang="scss"></style>
