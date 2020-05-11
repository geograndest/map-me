import apiConfig from '../libs/config'

const config = {
    state: {
        config: {
            "app": {
                "title": "Map Me",
                "version": "1.0.0",
                "status": "developpement",
                "lang": "fr"
            },
            "wfs": {
                "params": {
                    "service": "WFS",
                    "version": "2.0.0",
                    "request": "GetFeature",
                    "typeName": "",
                    "maxFeatures": "",
                    "outputFormat": "application%2Fjson",
                    "srsname": "EPSG:4326",
                    "cql_filter": "concatenate(###FIELDS###) ILIKE '%###SEARCH###%'",
                    "_cql_filter": "concatenate(###FIELDS###) ILIKE '###SEARCH###'"
                }
            },
            "map": {
                "snapPriority": "5"
            },
            "editLayers": {},
            "baseLayers": {},
            "locationLayer": {}
        },
        editLayer: {
            "index": 10,
            "name": "",
            "title": "",
            "url": "",
            "md_url": "",
            "workspace": "",
            "typeName": "",
            "srsName": "EPSG:4326",
            "type": "Point",
            "visible": true,
            "opacity": 1,
            "fill_color": "#ffffff",
            "stroke_color": "#0000ff",
            "stroke_width": 1.25,
            "radius": 5,
            "label": {
                "field": "fid",
                "visible": false,
                "font": "12px monospace",
                "placement": "point",
                "offsetX": 10,
                "offsetY": 0,
                "rotation": 0,
                "textAlign": "left",
                "textBaseline": "middle",
                "scale": 1,
                "fill_color": "#000000",
                "stroke_color": "#ffffff",
                "stroke_width": 3
            },
            "form": {}
        },
        lang: '',
        locales: {
            "app": {},
            "langs": [{
                    "value": "fr",
                    "text": "French"
                },
                {
                    "value": "en",
                    "text": "English"
                }
            ],
            "searchTypes": [{
                    "title": "Edit layer",
                    "description": "",
                    "icon": "search",
                    "name": "editlayer"
                },
                {
                    "title": "Location",
                    "description": "",
                    "icon": "search-location",
                    "name": "location"
                }
            ]
        }
    },
    getters: {
        config: (state, getters) => {
            return state.config
        },
        editLayer: (state, getters) => {
            return state.editLayer
        },
        lang: (state, getters) => {
            if (state.lang) {
                return state.lang.toUpperCase().trim()
            }
            return state.config.app.lang
        },
        locales: (state, getters) => {
            return state.locales
        },
        pages: (state, getters) => {
            return state.config.pages
        }
    },
    mutations: {
        SET_CONFIG: (state, config) => {
            state.config = Object.assign(state.config, config)
        },
        SET_EDITLAYER: (state, editLayer) => {
            state.editLayer = Object.assign(state.editLayer, editLayer)
        },
        SET_LANG: (state, lang) => {
            state.lang = lang
        },
        SET_LOCALES: (state, locales) => {
            state.locales = locales
        },
        SET_PAGES: (state, pages) => {
            state.config.pages = pages
        }
    },
    actions: {
        setConfig: (store, config) => {
            store.commit('SET_CONFIG', config)
        },
        setEditLayer: (store, editLayer) => {
            store.commit('SET_LAYER', editLayer)
        },
        setLang: (store, lang) => {
            store.commit('SET_LANG', lang)
            apiConfig.updateLang(lang).then(function(result) {
                store.dispatch('setLocales', result.locales)
                store.dispatch('setPages', result.pages)
            })
        },
        // Utile? utiliser commit dans setLang?
        setLocales: (store, locales) => {
            store.commit('SET_LOCALES', locales)
        },
        // Utile? utiliser commit dans setLang?
        setPages: (store, pages) => {
            store.commit('SET_PAGES', pages)
        }
    }
}

export default config