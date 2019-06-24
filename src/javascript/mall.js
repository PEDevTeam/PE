macros.showMallStores = {
    handler: function(place, macroName, params, parser) {
        var storesHTML = '';
        
        for(var storename in window.mall.stores){
            var store = window.mall.stores[storename];
            if(!(store.name == "")){
                //storesHTML += '<div><img src="./Images/StoreImages/' + store.logo + '">Go to <<link "' + store.name + '">><<replace "#mallStore">><<toggleclass "#mallStore" "hidden">><<toggleclass "#mallStores" "hidden">><<showMallStore ' + storename + '>><</replace>><</link>></div>';
                storesHTML += '<div><img src="./Images/StoreImages/' + store.logo + '">Go to [[' + store.name + '|Go to store][$currentStore = "' + storename + '"]]</div>';
            }
        }

        var mapHTML = window.mallFuncs.getStoreMapDOM();
        var mallHTML = mapHTML.innerHTML + storesHTML;

        new Wikifier(place, mallHTML);
    }
}

macros.showStore = {
    handler: function(place, macroName, params, parser) {
        if(params.length != 1){
            throwerror(place, "showStore only accepts 1 paramater");
            return;
        }
        var storeDiv = document.createElement('div');
        var homeMallA = document.createElement('a');
        var homeMallTxt = document.createTextNode('Back to the Mall');
        homeMallA.storeName = params[0];
        homeMallA.addEventListener('click', goBackToMall, true);
        homeMallA.appendChild(homeMallTxt);

        var itemNavigator = window.itemNavigator.getItemNavigator('mall');
        storeDiv.appendChild(itemNavigator);
        storeDiv.appendChild(homeMallA);
        place.appendChild(storeDiv);

        $(function(){
            if(itemNavigator.firstCategory !== ""){
                window.itemNavigator.showCategory(itemNavigator.firstCategory, 'mall');
            }
        });

        function goBackToMall(evt){
            var store = window.mall.stores[evt.currentTarget.storeName]
            if(store.exitCheck()){
                Engine.play("Store Widgets 2");
            }
            else{
                Engine.play(store.exitPassage());
            }
        }
    }
}

window.mallFuncs={
    checkStoreEntry: function(storeName){
        var store = window.mall.stores[storeName];
        return store.entryCheck();
    },

    getStoreEntryPassage: function(storeName){
        var store = window.mall.stores[storeName];
        return store.entryPassage();
    },

    toggleMap: function(){
        $("#storeMap").toggleClass("hidden");
        if($("#storeMap").hasClass("hidden")){
            $("#mapToggle").text("Show Map");
        }
        else{
            $("#mapToggle").text("Hide Map");
        }
    },

    getStoreMapDOM: function(){
        var outerDiv = document.createElement('div');
        var toggleMapA = document.createElement('a');
        var toggleMapSpan = document.createElement('span');
        var toggleMapSpanText = document.createTextNode('Hide Map');

        toggleMapA.href = 'javascript:window.mallFuncs.toggleMap();';
        toggleMapSpan.id = 'mapToggle';

        toggleMapSpan.appendChild(toggleMapSpanText);
        toggleMapA.appendChild(toggleMapSpan);
        outerDiv.appendChild(toggleMapA);

        var storeMapDiv = document.createElement('div');
        var storeMapImg = document.createElement('img');
        storeMapDiv.id = 'storeMap';
        storeMapImg.src = './Images/StoreImages/MallMap.png';
        storeMapImg.useMap = '#mall-image-map';

        var mallImageMap = document.createElement('map');
        mallImageMap.name = 'mall-image-map';

        for(var storename in window.mall.stores){
            var store = window.mall.stores[storename];
            if(!(store.name == "") && !(store.coords == "")){
                var areaStore = document.createElement('area');
                areaStore.target = '_self';
                areaStore.alt = store.name;
                areaStore.title = store.name;
                areaStore.href = 'javascript:window.mallFuncs.gotoStore("' + storename + '");';
                areaStore.coords = store.coords;
                areaStore.shape = 'poly';
                mallImageMap.appendChild(areaStore);
            }
        }

        for(var locationname in window.mall.otherLocations){
            var otherLocation = window.mall.otherLocations[locationname];
            if(!(otherLocation.name == "") && !(otherLocation.coords == "") && !(otherLocation.passageLink == "") && otherLocation.canVisit()){
                var areaStore = document.createElement('area');
                areaStore.target = '_self';
                areaStore.alt = otherLocation.name;
                areaStore.title = otherLocation.name;
                areaStore.href = 'javascript:SugarCube.Engine.play("' + otherLocation.passageLink + '");';
                areaStore.coords = otherLocation.coords;
                areaStore.shape = 'poly';
                mallImageMap.appendChild(areaStore);
            }
        }        

        storeMapDiv.appendChild(storeMapImg);
        storeMapDiv.appendChild(mallImageMap);
        outerDiv.appendChild(storeMapDiv);
        return outerDiv;
    },
}

//Store map coords can be generated using this tool - https://www.image-map.net/
window.mall={
    stores:{
        fashionCentral:{
            name:"Fashion Central",
            logo:"StoreLogo_FashionCentral.jpg",
            coords: "40,227,111,156,153,194,151,213,91,275",
            masterItems:[
                "skirtTop",
                "casualDress",
                "sluttyDress",
                "schoolDress",

            ],
            entryCheck: function (){
                return true;
            },
            exitCheck: function(){
                return true;
            },
            entryPassage: function(){
                return "";
            },
            exitPassage: function(){
                return "";
            },
        },
        klipKlops:{
            name:"Klip Klops",
            logo:"StoreLogo_KlipKlops.jpg",
            coords: "286,123,316,154,283,189,251,157",
            masterItems:[
                "blackShoes",
                "boots",
                "heeledBoots",
                "highBoots",
                "flats",
                "girlSneakers",
                "heels",
                "balletHeels",
                "stripperHeels",
                "sneakers",
                "cheerSneakers",
            ],
            entryCheck: function (){
                return true;
            },
            exitCheck: function(){
                return true;
            },
            entryPassage: function(){
                return "";
            },
            exitPassage: function(){
                return "";
            },
        },
        friskyBusiness:{
            name:"Frisky Business",
            logo:"StoreLogo_FriskyBusiness.jpg",
            coords: "247,197,274,224,230,267,205,239",
            masterItems:[
                "blindfold",
                "buttplugs",
                "chastity",
                "gag",
                "collar",
                "sluttySchoolDress",
                "maidUniform",
            ],
            entryCheck: function (){
                return true;
            },
            exitCheck: function(){
                return true;
            },
            entryPassage: function(){
                return "";
            },
            exitPassage: function(){
                return "";
            },
        },
        bergAccessories:{
            name: "",
            logo:"",
            coords: "345,155,344,201,383,202,406,178,382,155",
            masterItems:[
                "casualEarrings",
                "classyEarrings",
                "flashyEarrings",
                "plasticEarrings",
                "sunglasses",
                "glasses",
                "hairbands",
                "hairbows",
                "chokers",

            ],
            entryCheck: function (){
                return true;
            },
            exitCheck: function(){
                return true;
            },
            entryPassage: function(){
                return "";
            },
            exitPassage: function(){
                return "";
            },
        },
        rosePetals:{
            name:"Rose Petals",
            logo:"StoreLogo_RosePetals.jpg",
            coords: "301,251,268,286,251,287,252,316,328,318,329,251",
            masterItems:[
                "bras",
                "sexyBras",
                "latexBras",
                "socks",
                "stockings",
                "latexStockings",
                "boxers",
                "plainPanties",
                "sexyPanties",
                "latexPanties",
                "cheerBriefs",
                "pyjamas",
                "nightie",
            ],
            entryCheck: function (){
                return true;
            },
            exitCheck: function(){
                return true;
            },
            entryPassage: function(){
                return "";
            },
            exitPassage: function(){
                return "";
            },
        },
        warriorWoman:{
            name: "",
            logo:"",
            coords: "",
            masterItems:[
                "cheerUniform",
            ],
            entryCheck: function (){
                return true;
            },
            exitCheck: function(){
                return true;
            },
            entryPassage: function(){
                return "";
            },
            exitPassage: function(){
                return "";
            },
        },
        urbane:{
            name:"Urbane",
            logo:"StoreLogo_Urbane.jpg",
            coords: "468,233,517,281,517,316,473,315,429,270",
            masterItems:[
                "boxers",
                "tshirtJeans",
                "schoolUniform",

            ],
            entryCheck: function (){
                return true;
            },
            exitCheck: function(){
                return true;
            },
            entryPassage: function(){
                return "";
            },
            exitPassage: function(){
                return "";
            },
        },

    },
    otherLocations:{
        toilet:{
            name:"Toilet",
            passageLink:"Go to mall toilet",
            logo:"",
            coords:"330,251,330,316,368,318,368,285,350,268,350,252",
            canVisit: function(){
                return true;
            }
        },
        cinema:{
            name:"Cinema",
            passageLink:"",
            logo:"",
            coords:"352,242,352,265,370,286,369,332,353,351,353,406,543,405,542,342,515,316,475,317,429,270,420,271,393,242",
            canVisit: function(){
                return true;
            }
        },
        testLab:{
            name:"Test Lab",
            passageLink:"",
            logo:"",
            coords:"186,222,251,286,252,337,148,335,146,264",
            canVisit: function(){
                return true;
            }
        },
        arcade:{
            name:"Arcade",
            passageLink:"Play in the arcade",
            logo:"",
            coords:"421,82,459,120,460,144,446,158,427,158,404,132,403,100",
            canVisit: function(){
                return true;
            }
        },
        arcade:{
            name:"Arcade",
            passageLink:"Play in the arcade",
            logo:"",
            coords:"421,82,459,120,460,144,446,158,427,158,404,132,403,100",
            canVisit: function(){
                return true;
            }
        },
        homeEmpire:{
            name:"Home Empire",
            passageLink:"",
            logo:"StoreLogo_HomeEmpire.jpg",
            coords: "70,75,112,114,111,153,61,202,1,143",
            canVisit: function(){
                return true;
            }
        },
        zoomElectronics:{
            name:"Zoom Electronics",
            passageLink:"",
            logo:"StoreLogo_ZoomElectronics.jpg",
            coords: "257,1,322,66,285,103,238,102,211,78,211,49",
            canVisit: function(){
                return true;
            }
        },
        kissAndMakeup:{
            name: "",
            passageLink:"",
            logo:"",
            coords: "",
            canVisit: function(){
                return true;
            }
        },
    },
    categories:{
        underwear: {
            name: "Underwear",
            masterItems: [
                "boxers",
                "plainPanties",
                "sexyPanties",
                "latexPanties",
                "bras",
                "sexyBras",
                "latexBras",
            ]
        },
        outerwear: {
            name: "Outerwear",
            masterItems: [
                "tshirtJeans",
                "skirtTop",
                "casualDress",
                "sluttyDress",
                "cheerUniform",
                "schoolUniform",
                "schoolDress",
                "sluttySchoolDress",
                "maidUniform",
            ]
        },
        socks: {
            name: "Hosiery",
            masterItems: [
                "stockings",
                "socks",
                "latexStockings",
            ]
        },
        footwear: {
            name: "Footwear",
            masterItems: [
                "blackShoes",
                "boots",
                "heeledBoots",
                "highBoots",
                "flats",
                "girlSneakers",
                "heels",
                "balletHeels",
                "stripperHeels",
                "sneakers",
                "cheerSneakers",
            ]
        },
        accessories: {
            name: "Accessories",
            masterItems: [
                "casualEarrings",
                "classyEarrings",
                "flashyEarrings",
                "plasticEarrings",
                "chokers",
                "collar",
                "hairbands",
                "hairbows",
            ]
        },
        toys: {
            name: "Toys",
            masterItems: [
                "chastity",
                "buttplugs",
            ]
        },
        nightwear: {
            name: "Nightwear",
            masterItems: [
                "pyjamas",
                "nightie",
            ]
        }
    }
}