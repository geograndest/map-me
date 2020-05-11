import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/bootstrap-vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLayers from "vuelayers";
import "vuelayers/lib/style.css"; // needs css-loader
import AsyncComputed from "vue-async-computed";
// import api from "./api";
import apiConfig from './libs/config'
import helpers from './libs/helpers'
// import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueLayers);
Vue.use(AsyncComputed);

var lang = window.navigator.language.slice(0, 2)

var query = window.location.hash.split('?')[1]
var config = helpers.getUrlParameter(query, 'config', 'config/config.json')
apiConfig.initConfig(config).then((data) => {
    new Vue({
        router,
        store,
        created: function() {
            data.config.file = config
            this.$store.dispatch('setConfig', data.config)
            this.$store.dispatch('setLang', data.lang)
            this.$store.dispatch('setLocales', data.locales)
            this.$store.dispatch('setPages', data.pages)
                // console.log('START', config, lang)
        },
        render: h => h(App)
    }).$mount('#app')
}, (error) => {
    console.log('ERROR: Can\'t laod config file.')
    this.errorReceived = error
    console.log(this.errorReceived)
})