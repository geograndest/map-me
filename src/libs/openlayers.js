import olScaleLine from "ol/control/ScaleLine";
import olFullScreen from "ol/control/FullScreen";
import olOverviewMap from "ol/control/OverviewMap";
import olZoomSlider from "ol/control/ZoomSlider";
import olMousePosition from "ol/control/MousePosition";
import {
    createStringXY
    as olCreateStringXY
}
from "ol/coordinate";

import * as olInteraction from "ol/interaction";
import {
    platformModifierKeyOnly as olPlatformModifierKeyOnly
} from "ol/events/condition";
import {
    Circle as olCircleStyle,
    Fill as olFill,
    Stroke as olStroke,
    Style as olStyle,
    Text as olText
} from "ol/style";

// Controls
var ScaleLine = olScaleLine;
var FullScreen = olFullScreen;
var OverviewMap = olOverviewMap;
var ZoomSlider = olZoomSlider;
var MousePosition = olMousePosition;

// Coordinate
var createStringXY = olCreateStringXY;

// Interaction
var interaction = olInteraction

// Events condition
var platformModifierKeyOnly = olPlatformModifierKeyOnly

// Style
var Style = olStyle
var Circle = olCircleStyle
var Fill = olFill
var Stroke = olStroke
var Text = olText

export default {
    controls: {
        ScaleLine: ScaleLine,
        FullScreen: FullScreen,
        OverviewMap: OverviewMap,
        ZoomSlider: ZoomSlider,
        MousePosition: MousePosition
    },
    coordinate: {
        createStringXY: createStringXY,
    },
    interaction: interaction,
    condition: {
        platformModifierKeyOnly: platformModifierKeyOnly
    },
    style: {
        Style: Style,
        Circle: Circle,
        Fill: Fill,
        Stroke: Stroke,
        Text: Text,
    }
};