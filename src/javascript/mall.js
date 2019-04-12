macros.showMallStores = {
    handler: function(place, macroName, params, parser) {
        var storesHTML = '<img src="./Images/StoreImages/MallMap.png" usemap="#mall-image-map">'
        storesHTML += '<map name="mall-image-map">'
        storesHTML += '<area target="_self" alt="Fashion Central" title="Fashion Central" href="javascript:window.mallFuncs.gotoStore(\'fashionCentral\');" coords="40,227,111,156,153,194,151,213,91,275" shape="poly">'
        storesHTML += '<area target="_self" alt="Home Empire" title="Home Empire" href="javascript:window.mallFuncs.gotoStore(\'homeEmpire\');" coords="70,75,112,114,111,153,61,202,1,143" shape="poly">'
        storesHTML += '<area target="_self" alt="Zoom Electronic" title="Zoom Electronic" href="javascript:window.mallFuncs.gotoStore(\'zoomElectronics\');" coords="257,1,322,66,285,103,238,102,211,78,211,49" shape="poly">'
        storesHTML += '<area target="_self" alt="Klip Klops" title="Klip Klops" href="javascript:window.mallFuncs.gotoStore(\'klipKlops\');" coords="286,123,316,154,283,189,251,157" shape="poly">'
        storesHTML += '<area target="_self" alt="Frisky Business" title="Frisky Business" href="javascript:window.mallFuncs.gotoStore(\'friskyBusiness\');" coords="247,197,274,224,230,267,205,239" shape="poly">'
        storesHTML += '<area target="_self" alt="Intimate Apparel" title="Intimate Apparel" href="javascript:window.mallFuncs.gotoStore(\'IntimateApparel\');" coords="301,251,268,286,251,287,252,316,328,318,329,251" shape="poly">'
        storesHTML += '<area target="_self" alt="Casual Styles" title="Casual Styles" href="javascript:window.mallFuncs.gotoStore(\'urbane\');" coords="468,233,517,281,517,316,473,315,429,270" shape="poly">'
        storesHTML += '<area target="_self" alt="Berg Jewlers" title="Berg Jewlers" href="javascript:window.mallFuncs.gotoStore(\'BergJewlers\');" coords="345,155,344,201,383,202,406,178,382,155" shape="poly">'
        storesHTML += '</map>'
        for(var storename in window.mall.stores){
            var store = window.mall.stores[storename];
            storesHTML += '<div><img src="./Images/StoreImages/' + store.logo + '">Go to <<link "' + store.name + '">><<replace "#mallStore">><<toggleclass "#mallStore" "hidden">><<toggleclass "#mallStores" "hidden">><<showMallStore ' + storename + '>><</replace>><</link>></div>';
        }

        new Wikifier(place, storesHTML);
    }
}

macros.showMallStore = {
    handler: function(place, macroName, params, parser) {
        if(params.length != 1){
            throwerror(place, "showMallStore only accepts 1 paramater");
            return;
        }
        var storeHTML = window.mallFuncs.getStoreItemLinks(params[0]);
        new Wikifier(place, storeHTML);
    }
}

window.mallFuncs={
    gotoStore: function(storeName){
        var storeHTML = window.mallFuncs.getStoreItemLinks(storeName);
        $("#mallStores").toggleClass("hidden");
        $("#mallStore").empty();
        $("#mallStore").toggleClass("hidden");
        $("#mallStore").wiki(storeHTML);
    },
    
    getStoreItemLinks: function(storeName){
        var storeHTML = "";
        var store = window.mall.stores[storeName];
        for(var masterItemIdx in store.masterItems){
            var masterItem = store.masterItems[masterItemIdx];
            console.log(masterItem);
            storeHTML += '<div>' + masterItem;
            ///TODO put item variants here...
            storeHTML += '</div>';
        }
        storeHTML += '<div><<link "Go back to the Mall">><<replace "#mallStores">><<toggleclass "#mallStore" "hidden">><<toggleclass "#mallStores" "hidden">><<showMallStores>><</replace>><</link>></div>'
        return storeHTML;
    }
}

window.mall={
    stores:{
        homeEmpire:{
            name:"Home Empire",
            logo:"StoreLogo_HomeEmpire.jpg",
            masterItems:[

            ],
        },
        fashionCentral:{
            name:"Fashion Central",
            logo:"StoreLogo_FashionCentral.jpg",
            masterItems:[
                "skirtTop",
                "casualDress",
                "sluttyDress"
            ]
        },
        klipKlops:{
            name:"Klip Klops",
            logo:"StoreLogo_KlipKlops.jpg",
            masterItems:[

            ],
        },
        zoomElectronics:{
            name:"Zoom Electronics",
            logo:"StoreLogo_ZoomElectronics.jpg",
            masterItems:[

            ],
        },
        friskyBusiness:{
            name:"Frisky Business",
            logo:"StoreLogo_FriskyBusiness.jpg",
            masterItems:[

            ],
        },
        // bergAccessories:{
        //     logo:"",
        //     masterItems:[

        //     ],
        // },
        rosePetals:{
            name:"Rose Petals",
            logo:"StoreLogo_RosePetals.jpg",
            masterItems:[
                "plainPanties",
                "sexyPanties",
                "latexPanties"
            ]
        },
        // kissAndMakeup:{
        //     logo:"",
        //     masterItems:[

        //     ],
        // },
        // warriorWoman:{
        //     logo:"",
        //     masterItems:[

        //     ],
        // },
        urbane:{
            name:"Urbane",
            logo:"StoreLogo_Urbane.jpg",
            masterItems:[
                "boxers",
                "tshirtJeans"
            ]
        },

    }
}