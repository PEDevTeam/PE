
macros.showMallStores = {
    handler: function(place, macroName, params, parser) {
        var mallDiv = document.createElement('div');
        var mapHTML = window.mallFuncs.getStoreMapDOM();
        var storeLinkHTML = window.mallFuncs.getStoreListDom();
        mallDiv.appendChild(mapHTML);
        mallDiv.appendChild(storeLinkHTML);
        mallDiv.className = "mall-navigation-div";
        mallDiv.addEventListener('load', loadMaphilight, true);

        place.appendChild(mallDiv);

        function loadMaphilight(evt){
            evt.currentTarget.removeEventListener('load', loadMaphilight, true);
            if($.fn.maphilight !== undefined){
                $('.mall-map-image').maphilight({
                    fillColor: "FF0000",
                    stroke: false,
                });
            }
            else{
                importScripts('./Images/items/itemScripts/jquery.maphilight.js').then(function(){
                    $('.mall-map-image').maphilight({
                        fillColor: "FF0000",
                        stroke: false,
                    });
                });
            }
        }
    }
}

macros.showStore = {
    handler: function(place, macroName, params, parser) {
        if(params.length != 1){
            throwerror(place, "showStore only accepts 1 paramater");
            return;
        }
        var storeDiv = document.createElement('div');
        var currentStore = window.mall.stores[State.active.variables.currentStore];
        var storeLogoHeadingDiv = document.createElement('div');
        var storeLogoImg = document.createElement('img');
        storeLogoImg.src = "./Images/StoreImages/" + currentStore.logo;
        storeLogoImg.className = "store-logo-image";      
        storeLogoHeadingDiv.className = "store-logo-heading-div"
        storeLogoHeadingDiv.appendChild(storeLogoImg);

        var homeMallA = document.createElement('a');
        var homeMallTxt = document.createTextNode('Back to the Mall');
        homeMallA.storeName = params[0];
        homeMallA.addEventListener('click', goBackToMall, true);
        homeMallA.appendChild(homeMallTxt);

        var itemNavigator = window.itemNavigator.getItemNavigator('mall');
        storeDiv.appendChild(storeLogoHeadingDiv);
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

    getStoreMapDOM: function(){
        var outerDiv = document.createElement('div');
        outerDiv.className = "mall-map-outer-div";

        var storeMapDiv = document.createElement('div');
        var storeMapImg = document.createElement('img');
        storeMapDiv.id = "storeMap";
        storeMapDiv.className = "store-map-div";
        storeMapImg.src = "./Images/StoreImages/MallMap.png";
        storeMapImg.useMap = "#mall-image-map";
        storeMapImg.className = "mall-map-image"

        var mallImageMap = document.createElement('map');
        mallImageMap.name = "mall-image-map";

        for(var storename in window.mall.stores){
            var store = window.mall.stores[storename];
            if(!(store.name == "") && !(store.coords == "") && store.canVisit()){
                var areaStore = document.createElement('area');
                areaStore.alt = store.name;
                areaStore.title = store.name;
                areaStore.addEventListener('click', goToStore, true);
                areaStore.storeName = storename;
                areaStore.coords = store.coords;
                areaStore.shape = "poly";
                areaStore.className = "store-map-area";
                areaStore.id = storename + "_area";
                mallImageMap.appendChild(areaStore);
            }
        }

        for(var locationname in window.mall.otherLocations){
            var otherLocation = window.mall.otherLocations[locationname];
            if(!(otherLocation.name == "") && !(otherLocation.coords == "") && !(otherLocation.passageLink == "") && otherLocation.canVisit()){
                var areaStore = document.createElement('area');
                areaStore.alt = otherLocation.name;
                areaStore.title = otherLocation.name;
                areaStore.addEventListener('click', goToLocation, true);
                areaStore.locationPassage = otherLocation.passageLink;
                areaStore.coords = otherLocation.coords;
                areaStore.shape = "poly";
                areaStore.className = "store-map-area";
                areaStore.id = locationname + "_area";
                mallImageMap.appendChild(areaStore);
            }
        }        

        storeMapDiv.appendChild(storeMapImg);
        storeMapDiv.appendChild(mallImageMap);
        outerDiv.appendChild(storeMapDiv);
        return outerDiv;

        function goToStore(evt){
            State.active.variables.currentStore = evt.currentTarget.storeName;
            Engine.play('Go to store');
        };

        function goToLocation(evt){
            Engine.play(evt.currentTarget.locationPassage);
        }
    },

    getStoreListDom: function(){
        var outerDiv = document.createElement('div');
        outerDiv.className = "mall-store-list-div";

        for(var storename in window.mall.stores){
            var store = window.mall.stores[storename];
            if(!(store.name == "") && store.canVisit()){
                var storeLinkDiv = document.createElement('div');
                storeLinkDiv.className = "store-link-div";

                var storeLogoDiv = document.createElement('div');               
                var storeLogoImg = document.createElement('img');
                storeLogoImg.src = "./Images/StoreImages/" + store.logo;
                storeLogoImg.currentStore = storename;
                storeLogoImg.addEventListener('click', navigateToStore, true);
                storeLogoImg.addEventListener('mouseover', imgMouseover, true);
                storeLogoImg.addEventListener('mouseout', imgMouseout, true);
                storeLogoImg.className = "store-logo-image";
                storeLogoDiv.appendChild(storeLogoImg);

                var storeNameSpan = document.createElement('span');
                var storeNameText = document.createTextNode('Go to ');
                var storeNameLink = document.createElement('a');
                var storeNameLinkText = document.createTextNode(store.name);
                storeNameLink.currentStore = storename;
                storeNameLink.addEventListener('click', navigateToStore, true);
                storeNameLink.addEventListener('mouseover', imgMouseover, true);
                storeNameLink.addEventListener('mouseout', imgMouseout, true);
                storeNameLink.appendChild(storeNameLinkText);
                storeNameSpan.appendChild(storeNameText);
                storeNameSpan.appendChild(storeNameLink);

                storeLinkDiv.appendChild(storeLogoDiv);
                storeLinkDiv.appendChild(storeNameSpan);

                outerDiv.appendChild(storeLinkDiv);
            }
        }

        for(var locationname in window.mall.otherLocations){
            var otherLocation = window.mall.otherLocations[locationname];
            if(!(otherLocation.name == "") && !(otherLocation.coords == "") && !(otherLocation.passageLink == "") && otherLocation.canVisit()){
                var storeLinkDiv = document.createElement('div');
                storeLinkDiv.className = "store-link-div";

                var storeLogoDiv = document.createElement('div');               
                var storeLogoImg = document.createElement('img');
                storeLogoImg.src = "./Images/StoreImages/" + otherLocation.logo;
                storeLogoImg.locationname = locationname;
                storeLogoImg.locationPassage = otherLocation.passageLink;
                storeLogoImg.addEventListener('click', goToLocation, true);
                storeLogoImg.addEventListener('mouseover', imgMouseover, true);
                storeLogoImg.addEventListener('mouseout', imgMouseout, true);
                storeLogoImg.className = "store-logo-image";
                storeLogoDiv.appendChild(storeLogoImg);

                var storeNameSpan = document.createElement('span');
                var storeNameText = document.createTextNode('Go to ');
                var storeNameLink = document.createElement('a');
                var storeNameLinkText = document.createTextNode(otherLocation.name);
                storeNameLink.locationname = locationname;
                storeNameLink.locationPassage = otherLocation.passageLink;
                storeNameLink.addEventListener('click', goToLocation, true);
                storeNameLink.addEventListener('mouseover', imgMouseover, true);
                storeNameLink.addEventListener('mouseout', imgMouseout, true);
                storeNameLink.appendChild(storeNameLinkText);
                storeNameSpan.appendChild(storeNameText);
                storeNameSpan.appendChild(storeNameLink);

                storeLinkDiv.appendChild(storeLogoDiv);
                storeLinkDiv.appendChild(storeNameSpan);

                outerDiv.appendChild(storeLinkDiv);
            }
        }

        return outerDiv;

        function navigateToStore(evt){
            State.active.variables.currentStore = evt.currentTarget.currentStore;
            Engine.play('Go to store');
        }
        
        function goToLocation(evt){
            Engine.play(evt.currentTarget.locationPassage);
        }

        function imgMouseover(evt){
            if(evt.currentTarget.currentStore){
                var area = "#" + evt.currentTarget.currentStore + "_area";
            }
            else{
                var area = "#" + evt.currentTarget.locationname + "_area";
            }
            $(area).mouseover();
        }

        function imgMouseout(evt){
            if(evt.currentTarget.currentStore){
                var area = "#" + evt.currentTarget.currentStore + "_area";
            }
            else{
                var area = "#" + evt.currentTarget.locationname + "_area";
            }
            $(area).mouseout();
        }
    }
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
            canVisit: function(){
                return true;
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
            canVisit: function(){
                return true;
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
            canVisit: function(){
                return true;
            },
        },
        bergAccessories:{
            name: "Citrus Accessories",
            logo:"StoreLogo_Citrus.jpg",
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
            canVisit: function(){
                return true;
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
            canVisit: function(){
                return true;
            },
        },
        warriorWoman:{
            name: "Warrior Woman",
            logo:"StoreLogo_WarriorWoman.jpg",
            coords: "1,2,3,4",
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
            canVisit: function(){
                return true;
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
            canVisit: function(){
                return true;
            },
        },

    },
    otherLocations:{
        homeEmpire:{
            name:"Home Empire",
            passageLink:"Home Empire",
            logo:"StoreLogo_HomeEmpire.jpg",
            coords: "70,75,112,114,111,153,61,202,1,143",
            canVisit: function(){
                return true;
            }
        },
        zoomElectronics:{
            name:"Zoom Electronics",
            passageLink:"Zoom Electronics",
            logo:"StoreLogo_ZoomElectronics.jpg",
            coords: "257,1,322,66,285,103,238,102,211,78,211,49",
            canVisit: function(){
                return true;
            }
        },
        toilet:{
            name:"Toilets",
            passageLink:"Go to mall toilet",
            logo:"StoreLogo_Toilets.jpg",
            coords:"330,251,330,316,368,318,368,285,350,268,350,252",
            canVisit: function(){
                return true;
            }
        },
        arcade:{
            name:"1UP Arcade",
            passageLink:"Play in the arcade",
            logo:"StoreLogo_1UpArcade.jpg",
            coords:"421,82,459,120,460,144,446,158,427,158,404,132,403,100",
            canVisit: function(){
                return window.timeCode.isArcadeOpen();
            }
        },
        cinema:{
            name:"Cinema",
            passageLink:"",
            logo:"StoreLogo_Cinematropolis.jpg",
            coords:"352,242,352,265,370,286,369,332,353,351,353,406,543,405,542,342,515,316,475,317,429,270,420,271,393,242",
            canVisit: function(){
                return false;
            }
        },
        testLab:{
            name:"Test Lab",
            passageLink:"Test Lab",
            logo:"StoreLogo_TestLab.jpg",
            coords:"186,222,251,286,252,337,148,335,146,264",
            canVisit: function(){
                return State.active.variables.player.canVisitTestLab;
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
                "maid",
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