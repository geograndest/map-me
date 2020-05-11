import * as olExtent from "ol/extent";

// TODO: à mettre map.js
function getFeaturesExtent(features) {
    var extent = features[0].getGeometry().getExtent();
    for (var f = 0; f < features.length; f++) {
        olExtent.extend(extent, features[f].getGeometry().getExtent());
    }
    return extent;
}

export default {
    getFeaturesExtent: getFeaturesExtent
};