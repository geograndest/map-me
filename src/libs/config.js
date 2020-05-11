import axios from 'axios'

function getConfig(configFile) {
    return axios.get(configFile)
}

function getLocales(lang) {
    var localesFile = 'config/locales/' + lang + '/locales.json'
    return axios.get(localesFile)
}

function getPages(lang) {
    var localesFile = 'config/locales/' + lang + '/pages.json'
    return axios.get(localesFile)
}

function updateLang(lang) {
    return axios.all([getLocales(lang), getPages(lang)]).then(axios.spread(function(locales, pages) {
        var result = {}
        result.locales = locales.data
        result.pages = pages.data
        return result
    }))
}

function initConfig(configFile) {
    configFile = configFile || 'config/config.json'
    var result = {}
    return getConfig(configFile).then(function(config) {
        result.config = config.data
        result.lang = config.data.app.lang
        return updateLang(result.lang).then(function(data) {
            result.locales = data.locales
            result.pages = data.pages
            return result
        })
    })
}

function getData(filename, config) {
    config = config || {}
    return axios.get(filename, config)
        .then(function(response) {
            return response
        })
        .catch(function(error, id) {
            return error
        })
}

export default {
    initConfig: initConfig,
    getConfig: getConfig,
    getLocales: getLocales,
    getPages: getPages,
    updateLang: updateLang,
}