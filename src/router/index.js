import Vue from "vue";
import VueRouter from "vue-router";
import Map from "../views/Map.vue";
import Settings from "../views/Settings.vue";
import Studio from "../views/Studio.vue";
import Test from "../views/Test.vue";

Vue.use(VueRouter);

const routes = [{
        path: "",
        redirect: {
            name: 'map'
        }
    }, {
        path: '/map/:layerName?',
        props: true,
        name: "map",
        component: Map,
    }, {
        path: "/settings/:layerName?",
        props: true,
        name: "settings",
        component: Settings,
    }, {
        path: "/studio",
        name: "studio",
        component: Studio,
    }, {
        path: "/test",
        name: "test",
        component: Test,
    }
    // {
    //     path: '/map/:layerName?',
    //     name: "map",
    //     component: () =>
    //         import (
    //             /* webpackChunkName: "map" */
    //             "../components/Map.vue"
    //         )
    // }
];

const router = new VueRouter({
    routes,
});

export default router;