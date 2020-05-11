# Map Me !

Application responsive permettant l'édition/mise à jour de données géographiques via WFS-T 2.0.0.

## Fonctionnalités

-   Géolocalisation de l'utilisateur via le navigatuer ou le GPS (smartphone)
-   Recentrage/zoom sur la couche en cours d'édition. Le cas échéant:
    -   Sur l'ensemble de la couche
    -   Sur les entités recherchées
    -   Sur les entités sélectionnés
-   Affichage des coordonnées du curseur sur la carte
-   Sélection multiple par rectangle d'emprise (touche `Ctrl`)
-   Recherche "full text" dans les attributs de la couche d'édition ou sur un champ précis
-   Recherche et positionnement par rapport à une couche de localisation (ex.: à la commune)
-   Fenêtre de paramétrage des couches:
    -   Visibilité et opacité des couches de fonds
    -   Visibilité, opacité et symbologie de la couche de loclisation
    -   Visibilité, opacité, étiquette et symbologie des couches d'édition
    -   Choix de la couche à éditer si plusieurs couches sont proposées
    -   Lien vers les métadonnées s'il est renseigné dans le fichier de configuration
-   Paramétrage de l'application via un fichier de configuration:
    -   Visibilité et représentation des couches de fonds, de la couche de localisation et des couches éditables
    -   Adaptation du formulaire d'édition de chaque couche via le fichier de configuration:
        -   Définition des attributs et de leur type (texte simple ou en autocomplétion, image, url, liste de sélection, case à cocher (choix multiple), bouton radio (choix unique), zone de texte)
        -   Visibillité d'un attribut ou non
        -   Activation ou non de la mise à jour d'un attribut
    -   Fichier d'édition désigné via un paramètre d'URL (`&config=`)
-   Edition des entités (points, multipoints, lignes, multiligne, polygones, multipolygones):
    -   Déplacer les points d'une entité par glisser/déposer
    -   Ajouter une entité par saisie directe à l'écran
    -   Mettre à jour les attributs d'une entité
    -   Supprimer une ou plusieurs entités
    -   Prise en charge de l'authentification pour les couches à accès restreint

Limites connues:

-   Map Me utilise des flux WFST 2.0.0 (GML 3.2)
-   Map Me a été testé uniquement avec GeoServer (v2.16.x)
-   L'édition d'entités multiples (multi-points, multi-polygons et multi-lignes) est réalisée de la même façon que pour la manipulation d'entités simples

## Prérequis

Les données géographiques éditables doivent être disponibles via un flux WFS-T 2.0.0.

## Guide utilisateur

### Interface utilisateur

Les copies d'écran suivantes présentes les principales interfaces utilisateur de l'application.
Démonstration: https://www.geograndest.fr/tools/map-me/ui

![](/docs/images/desktop-map-1.png)
![](/docs/images/desktop-map-2.png)
![](/docs/images/desktop-map-3.png)
![](/docs/images/desktop-settings-1.png)
![](/docs/images/desktop-settings-2.png)
![](/docs/images/desktop-settings-3.png)
![](/docs/images/smartphone-map-1.png)
![](/docs/images/smartphone-map-2.png)
![](/docs/images/smartphone-settings-1.png)

### La carte

![](/docs/images/desktop-map-2.png)

Les principales fonctionnalités sont les suiavntes:

-   ![](/docs/images/bt-localisation.png): localisation de l'utilisateur à partir du navigateur ou du GPS (téléphone portable)
-   ![](/docs/images/bt-refresh.png): rafraichir la carte
-   ![](/docs/images/bt-search.png): afficher la barre de recherche (cf. infra)
-   ![](/docs/images/bt-settings.png): afficher la page de configuration (cf. infra)
-   ![](/docs/images/bt-expand-2.png): zoomer sur l'étendue de la couche éditable, les entités filtrées via la recherche ou sur les entités sélectionnées
-   ![](/docs/images/bt-edit-2.png): activer le mode édition
-   ![](/docs/images/bt-move.png): activer la possibilité des déplacer des points sur la carte (mode édition)
-   ![](/docs/images/bt-create.png): activer la possibilité de créer des points sur la carte (mode édition)
-   ![](/docs/images/bt-delete.png): supprimer le ou les points sélectionnés (mode édition)
-   ![](/docs/images/bt-form-2.png): afficher les attributs du ou des points sélectionnés (mode consultation/édition)

### la recherche

![](/docs/images/search.png)

La barre de recherche permet:

-   soit de filtrer les entités de la couche éditable
-   soit de se localiser à partir de la couche de localisation.

Le menu à l'extrémité droite de la barre de recherche permet d'activer un mode ou l'autre.
La carte zoom automatiqument sur les entités du résulat.

Il est possible d'utiliser l'opérateur ":" pour "contient" (par défaut) et "=" pour "est égal à". Ainsi:

-   ":strasbourg" ou "strasbourg" recherche les entités dont au moins un attribut de la couche contient "strasbourg"
-   "nom:strasbourg" recherche les entités dont l'attribut "nom" contient "strasbourg"
-   "=strasbourg" recherche les entités dont la concatenation de l'ensemble des attributs égale "strasbourg". Cela fonctionne uniquement si un seul attribut est indiqué comme champs de recherche.
-   "nom=strasbourg" recherche les entités dont l'attribut "nom" est égal à "strasbourg". L'opérateur "=" est utilisable également avec le caractère jocker "%". Ainsi, "nom=reims%" recherchera l'ensemble des éléments dont l'attribut "nom" commence par "reims"

A noter: la recherche est insensible à la casse (différence majuscule/minuscule).

### Le formulaire d'attributs

![](/docs/images/smartphone-map-2.png)

Le formulaire permet d'afficher les attributs de la ou des entités sélectionnées.
L'application propose 2 modes:

-   Mode consultation: attributs non modifiables,
-   Mode édition: attributs modifiables.

L'affichage des attributs (lien, image, zone de texte, liste de sélection, etc.) dépend du paramètre "form" définit pour chaque couche dans le fichier de configuration.

### la configuration

![](/docs/images/desktop-settings-2.png)

La page de configuration permet notamment:

-   De modifier la visibilité et l'opacité des couhes de fonds
-   De modifier la visibilité, l'opacité et la symbologie de la couche de localisation
-   De modifier l'affichage, l'opacité, la symbologie et l'étiquette de la couche éditable
-   De modifier la langue de l'application
-   D'accéder à la page "A propos"

## Guide administrateur

### Installation

L'installation se fait en 2 étapes:

1. Copier le contenu du dossier `dist` sur un serveur via FTP.
2. Configuration via le fichier `config/config.json`

### Configuration

La configuration se fait grâce au fichier `config/config.json`
Le fichier `config.json` est le fichier chargé par défaut. Il est possible de préciser un autre fichier de configuration dans l'URL de l'application en ajoutant le paramètre `&config=chemin/vers/mon-fichier-de-configuration.json`.
Par exemple: `&config=config/test.json` pour utiiser le fichier `config/test.json`.

La structure générale du fichier de configuration est la suivante:

```json
{
    "app": {},
    "locales": {},
    "map": {},
    "editLayers": {},
    "baseLayers": {},
    "locationLayer": {}
}
```

#### L'objet "app"

Il s'agit des paramètres de l'application

```json
"app": {
        "title": "Map Me!",
        "lang": "fr"
    }
```

-   "title": titre de l'application qui appraît dans l'en-tête. Il est indépendant de la langue.
-   "lang": langue par défaut. Elle est utilisée si la langue du navigateur n'est pas détectée.

#### L'objet "locales"

Il s'agit des paramètres relatifs à la gestion du multilinguisme.
Le paramètre locales liste des langues disponibles et les liens vers les fichiers de traduction.

```json
"locales": {
        "fr": {
            "locale": "config/app/locales/fr/locales.json",
            "pages": "config/app/locales/fr/pages.json"
        },
        "en": {
            "locale": "config/app/locales/en/locales.json",
            "pages": "config/app/locales/en/pages.json"
        }
    },
```

-   "fr": code de la langue, défini sur 2 lettres.
-   "locale": chemin vers le fichier de traduction de la langue indiquée par le code précédent.
-   "pages": chemin vers un fichier référençant la liste des pages utilisées dans l'application. Il s'agit généralement de pages texte comme la page d'aide ou la page "A propos".

#### L'objet "map"

Il s'agit des paramètres relatifs à l'affichage initial de la carte.

```json
"map": {
        "zoom": 7,
        "center": [5.7, 48.7],
        "rotation": 0,
        "snapPriority": 5,
        "editLayerName": "layer1"
    },
```

-   "zoom": niveau de zoom lors du premier affichage de la carte.
-   "center": centre lors du premier affichage de la carte (projection EPSG:4326).
-   "rotation": rotation appliqué à la carte lors se son premier affichage.
-   "snapPriority": niveau d'accroche en pixel lors de la selection ou du déplacement d'une entité sur la carte.
-   "editLayerName": nom de la couche d'édition chargée par défaut. Elle doit être présente dans la liste des "editLayers".

#### L'objet "editLayers"

Il s'agit de la liste des couches éditables.

```json
"editLayers": {
    "layer1": {
        "index": 10,
        "name": "edit",
        "title": "test1 (private)",
        "url": "https://...",
        "md_url": "https://...",
        "workspace": "ws1",
        "typeName": "layer_1",
        "srsName": "EPSG:2154",
        "type": "Point",
        "visible": true,
        "opacity": 1,
        "fill_color": "#ffffff",
        "stroke_color": "#ff0000",
        "stroke_width": 1.25,
        "radius": 5,
        "label": {},
        "form": {}
    },
    "layer2": {}
}
```

Pour chaque couche sont définis les paramètres suivants. Ils sont modifiables par l'utilisateur via la page de configuration ("Settings").

-   "index": z-index de la couche. Il définit le niveau de superposition par rapport aux autres couches. Il doit être supérieur à celui des couches de fonds ("baseLayers") pour que la couche soit visible.
-   "name": nom de la couche.
-   "title": titre de la couche. Il s'agit généralement d'un nom développé.
-   "url": URL du flux WFST de la couche
-   "md_url": URL du lien vers la fiche de métadonnées de la couche
-   "workspace": "workspace" de la couche dans le cas de l'utilisation de GeoServer
-   "typeName": nom de la couche du serveur cartographique (ex.: GeoServer)
-   "srsName": système de projection de la couche
-   "type": type d'entité de la couche (valeurs possibles: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon" et "MultiPolygon")
-   "visible": indique si la couche est visible par défaut
-   "opacity": opacité de la couche par défaut
-   "fill_color": couleur de remplissage (symbologie)
-   "stroke_color": couelur des traits (symbologie)
-   "stroke_width": largeur des traits (symbologie)
-   "radius": diamètre pour les points (symbologie)
-   "label": ensemble de paramètres permettant d'ajouter une étiquette aux éléments de la couche
-   "form": ensemble d'information permettant de préciser les attributs modifiables de la couche et leur type.

Le paramètre "label" permet d'ajouter une étiquette aux entités de la couche éditable. Il se présente ainsi:

```json
"label": {
    "field": "nom",
    "visible": true,
    "font": "14px monospace",
    "placement": "point",
    "offsetX": 10,
    "offsetY": false,
    "rotation": false,
    "textAlign": "left",
    "textBaseline": "middle",
    "scale": 1,
    "fill_color": "#000000",
    "stroke_color": "#ffffff",
    "stroke_width": 3
}
```

Les paramètres possibles sont les suivants:

-   "field": nom du champ à afficher sous forme d'étiquette. Il doit être présent dans le paramètre "form"
-   "visible": visibilité des étiquettes
-   "font": police de caratère et taille de l'écriture de l'étiquette
-   "placement": placement de l'étiquette
-   "offsetX": décalage de l'étiquette en X
-   "offsetY": décalage de l'étiquette en Y
-   "rotation": rotation de l'étiquette
-   "textAlign": alignement horizontal du texte de l'étiquette
-   "textBaseline": alignement vertical du texte de l'étiquette
-   "scale": échelle de l'étiquette
-   "fill_color": couleur du texte de l'étiquette
-   "stroke_color": couleur de l'ombre autour du texte de l'étiquette
-   "stroke_width": épaisseur du trait d'ombrage autour de l'étiquette

Le paramètre "form" permet de décrire les attributs éditables ou non dans l'application. Il se présente ainsi:

```json
"form": {
    "field0": {
        "id": "input",
        "name": "Field 0",
        "property": "field0",
        "description": "Description de field 1 (type texte)",
        "active": true,
        "editable": true,
        "placeholder": "not defined",
        "type": "input",
        "input": "text",
        "options": []
    },
    "field1": {
        "id": "input",
        "name": "Field 1",
        "property": "field1",
        "description": "Description de field 1 (type texte avec autocomplétion)",
        "active": true,
        "editable": true,
        "placeholder": "not defined",
        "type": "input",
        "input": "text",
        "options": ['valeur1', 'valeur2']
    },
    "textarea": {
        "id": "textarea",
        "name": "Field 2",
        "property": "field2",
        "description": "Description de field 2 (type textarea)",
        "active": false,
        "editable": true,
        "placeholder": "not defined",
        "type": "textarea",
        "input": "",
        "options": [{}]
    },
    "link": {
        "id": "link",
        "name": "Field 3",
        "property": "field3",
        "description": "Description de field 3 (type URL)",
        "active": false,
        "editable": true,
        "placeholder": "not defined",
        "type": "input",
        "input": "url",
        "options": [{}]
    },
    "image": {
        "id": "image",
        "name": "Field 4",
        "property": "field4",
        "description": "Description de field 4 (type image)",
        "active": false,
        "editable": true,
        "placeholder": "not defined",
        "type": "image",
        "input": "text",
        "options": [{}]
    },
    "select": {
        "id": "select",
        "property": "field5",
        "name": "Field 5",
        "description": "Description de field 5 (type select)",
        "active": false,
        "editable": true,
        "placeholder": "not defined",
        "type": "select",
        "input": "text",
        "options": [{
                "text": "Orange",
                "value": "orange"
            },
            {
                "text": "Apple",
                "value": "apple"
            },
            {
                "text": "Pineapple",
                "value": "pineapple"
            },
            {
                "text": "Grape",
                "value": "grape"
            }
        ],
        "datalist": []
    },
    "checkbox": {
        "id": "checkbox",
        "property": "field6",
        "name": "Field 6",
        "description": "Description de field 6 (type checkbox)",
        "active": false,
        "editable": true,
        "placeholder": "not defined",
        "type": "checkbox",
        "input": "text",
        "options": [{
                "text": "Orange",
                "value": "orange"
            },
            {
                "text": "Apple",
                "value": "apple"
            },
            {
                "text": "Pineapple",
                "value": "pineapple"
            },
            {
                "text": "Grape",
                "value": "grape"
            }
        ],
        "datalist": []
    },
    "radio": {
        "id": "radio",
        "name": "Field 7",
        "property": "radio",
        "description": "Description de field 7 (type radio)",
        "active": false,
        "editable": true,
        "placeholder": "not defined",
        "type": "radio",
        "input": "text",
        "options": [{
                "text": "Yes",
                "value": "yes"
            },
            {
                "text": "No",
                "value": "no"
            }
        ],
        "datalist": []
    },
    "date": {
        "id": "field8",
        "name": "Field 8",
        "property": "field8",
        "description": "Description de field 8 (type date - forme YYYY-MM-DD)",
        "active": false,
        "editable": true,
        "placeholder": "01/01/1970",
        "type": "input",
        "input": "text",
        "options": [],
    }
}
```

Chaque attribut de la couche est décrit par les propriétés suivantes:

-   "id": identifiant de l'attribut
-   "name": nom de l'attribut (appraît sur le formulaire)
-   "property": nom de l'attribut dans la couche de données
-   "description": description de l'attribut. Permet de donner par exemple, une indication à l'utilisateur sur la nature de l'information attendue.
-   "active": rend l'attribut visible ou non à l'utilisateur
-   "editable": rend l'attribut modifiable ou non
-   "placeholder": texte qui appraît dans le champ de saisie lorsqu'il est vide
-   "type": type de champ. Cette propriété conditionne l'apparence du champ dans le formulaire. Il peut prendre les valeurs suivantes: "input", "textarea", "select", "radio", "checkbox", "image"
-   "input": dans le cas d'un champ de type texte ("input"), permet de préciser la nature de l'information: "url", "text", "date"
-   "options": dans le cas d'un champ de type "select", "radio", "checkbox", permet de préciser la liste des valeurs possibles. Dans le cas d'un champ de type "input/text", permet de lister les valeurs proposées pour l'autocomplétion.

#### L'objet "baseLayers"

Il s'agit des paramètres relatifs à la gestion des couches de fonds.

```json
 "baseLayers": {
        "osm": {
            "index": 1,
            "type": "osm",
            "name": "osm",
            "title": "OpenStreetMap",
            "visible": true,
            "opacity": 1
        },
        "limites": {
            "index": 2,
            "type": "wms",
            "name": "limites",
            "title": "Limites Grand Est",
            "visible": true,
            "opacity": 1,
            "url": "https://www.geograndest.fr/geoserver/geograndest/wms",
            "md_url": "",
            "layers": "GGE_LIMITES_GRANDEST_FRONTIERES"
        }
    }
```

Les paramètres possibles sont les suivants:

-   "index": z-index de la couche. Il définit le niveau de superposition par rapport aux autres couches. Il doit être inférieur à celui des couches éditables pour qu'elles soient visibles.
-   "type": type de couche de fonds. Actuellement sont supportées: "osm" et "wms"
-   "name": nom de la couche
-   "title": titre de la couche
-   "visible": visibilité de la couche
-   "opacity": opacité de la couche
-   "url": URL du flux WMS
-   "md_url": URL du lien vers les métadonnées
-   "layers": nom de la couche dans GéoServer (propriété "layers" dans la requête WMS)

#### L'objet "locationLayer"

Il s'agit des paramètres relatifs à la gestion de la couche de localisation.
Si cette propriété n'est pas définie ou si `name: false`, la recherche par localisation n'est plus disponible.
Pour la désactiver momentanément la recherche et la rendre activable via la page de configuration il suffit d'indiquer `"visible": false`.

```json
"locationLayer": {
        "index": 3,
        "name": "location",
        "fields": ["nom_com"],
        "title": "Communes du Grand Est",
        "url": "https://www.geograndest.fr/geoserver/region-grand-est/wfs",
        "md_url": "",
        "typeName": "commune_actuelle",
        "visible": true,
        "opacity": 1,
        "fill_color": "#ffffff00",
        "stroke_color": "#ff0000",
        "stroke_width": 1.25
    }
```

Le paramètres possibles sont les suivants:

-   "index": z-index de la couche. Il définit le niveau de superposition par rapport aux autres couches. Il doit être supérieur à celui des couches de fonds ("baseLayers") pour que la couche soit visible.
-   "name": nom de la couche de localisation. si `name= false`, la fonctionnalité est totalement désactivée pour l'utilisateur
-   "fields": tableau de l'attribut utilisé dans la recherche pour la localisation
-   "title": titre de la couche,
-   "url": URL du flux WFS de la couche de localisation
-   "md_url": URL du lien vers la fiche de métadonnées de la couche
-   "typeName": nom de la couche dans GeoServer (propriété "typeNames" de la requête WFS)
-   "visible": visibilité de la couche. Ce paramètre permet par défaut de désactiver la recherche, mais elle reste activable via la page de configuration
-   "opacity": opacité dela couche
-   "fill_color": couleur de remplissage (symbologie)
-   "stroke_color": couleur du trait (symbologie))
-   "stroke_width": largeur du trait (symbologie)

## Guide développeur

### Bibliothèques utilisées

Application principalement basée sur:

-   Vuejs
-   Bootstrap
-   Bootstrap-vue
-   Vuelayers
-   OpenLayers

Cf. packages.json pour plus de détails

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Lints and fixes files

```
npm run lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
