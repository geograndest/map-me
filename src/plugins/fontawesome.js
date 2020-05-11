import Vue from "vue";

import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    fas
} from "@fortawesome/free-solid-svg-icons";
import {
    far
} from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'


library.add(fas, far);

// Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)