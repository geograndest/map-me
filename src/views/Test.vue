<template>
  <div>
    <vl-map
      id="map"
      ref="map"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      :style="'height:' + mapHeight"
    >
      <vl-view
        ref="mapView"
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      ></vl-view>

      <vl-layer-tile :id="layers['osm'].name" :z-index="layers['osm'].index">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>

      <vl-layer-vector
        v-if="layers['test1'].url"
        :id="layers['test1'].name"
        :z-index="layers['test1'].index"
      >
        <vl-source-vector
          :ident="layers['test1'].source"
          :ref="layers['test1'].ref"
          :url="layers['test1'].url"
          :visible="layers['test1'].visible"
        ></vl-source-vector>
        <vl-style-box>
          <vl-style-circle :radius="layers['test1'].radius">
            <vl-style-fill :color="layers['test1'].fill_color"></vl-style-fill>
            <vl-style-stroke
              :color="layers['test1'].stroke_color"
            ></vl-style-stroke>
          </vl-style-circle>
        </vl-style-box>
      </vl-layer-vector>

      <!-- interactions -->
      <vl-interaction-draw
        :type="layers['test1'].type"
        :source="layers['test1'].source"
        @drawend="onDraw()"
      >
      </vl-interaction-draw>
    </vl-map>

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
            <b-nav-item href="#" class="">
              <b-button
                size="lg"
                variant="light"
                class=""
                @click="centerOnTest()"
              >
                <font-awesome-icon icon="expand" size="lg"></font-awesome-icon>
                <small class="d-none d-md-block">{{
                  layers["test1"].ref
                }}</small>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-container>
      </b-navbar>
    </footer>
  </div>
</template>

<script>
import helpers from "@/libs/helpers";

export default {
  name: "Test",
  data() {
    return {
      config: false,
      api: false,
      layers: false,
      selectedFeatures: [],
      drawnFeatures: [],
      zoom: 7,
      center: [5.7, 48.7],
      rotation: 0,
      btEditActive: false,
      btCreateActive: false,
      btMoveActive: false,
    };
  },
  watch: {},
  asyncComputed: {},
  computed: {
    mapHeight: function() {
      return window.innerHeight - 164 + "px";
    },
  },
  filters: {},
  methods: {
    centerOnTest: function() {
      this.siteDisplayOverlay = false;
      this.$refs.mapView.$view.fit(
        this.$refs[this.layers["test1"].ref].$source.getExtent(),
        {
          size: this.$refs.map.$map.getSize(),
          duration: 1000,
        }
      );
    },
    onDraw: function() {
      //   console.log(this.$refs[this.layers["test1"].ref].featureIds);
      console.log(this.$refs[this.layers["test1"].ref].getFeatures());
    },
  },
  created() {
    this.config = this.$store.getters.config;
    this.layers = JSON.parse(JSON.stringify(this.config.layers));
    var api = JSON.parse(JSON.stringify(this.config.api));
    api.wfs_params.typeName = "test1_point";
    api.wfs_params.srsname = "EPSG:4326";
    this.layers["test1"].url = helpers.getQueryUrl(api.wfs_url, api.wfs_params);
  },
};
</script>

<style scoped lang="scss">
.hand-cursor {
  cursor: pointer;
}
</style>
