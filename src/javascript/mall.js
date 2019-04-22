macros.showMallStores = {
    handler: function(place, macroName, params, parser) {
        var storesHTML = '';
        
        for(var storename in window.mall.stores){
            var store = window.mall.stores[storename];
            if(!(store.name == "")){
                storesHTML += '<div><img src="./Images/StoreImages/' + store.logo + '">Go to <<link "' + store.name + '">><<replace "#mallStore">><<toggleclass "#mallStore" "hidden">><<toggleclass "#mallStores" "hidden">><<showMallStore ' + storename + '>><</replace>><</link>></div>';
            }
        }

        var mapHTML = window.mallFuncs.getStoreMapDOM();
        var mallHTML = mapHTML.innerHTML + storesHTML;

        new Wikifier(place, mallHTML);
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
    
    getStoreItemLinks: function(storeName){
        var storeHTML = "";
        var store = window.mall.stores[storeName];

        for(var masterItemIdx in store.masterItems){
            var storeMasterItem = store.masterItems[masterItemIdx];
            var masterItem = window.items.itemMasters[storeMasterItem];
            var childItemHTML = "";

            console.log(masterItem);
            if(!(window.itemFuncs.getChildItemsForMaster(storeMasterItem)[0] === undefined)){
                var childItem = window.itemFuncs.getChildItemsForMaster(storeMasterItem)[0];
                var childItemDOM = window.mallFuncs.formatItemForStoreDOM(childItem);
                childItemHTML = childItemDOM.outerHTML;
            }

            //These need to be hand coded as when it goes through the wikifier they get a bit mangled
            storeHTML += '<div id="' + storeMasterItem + 'Browser">';
            storeHTML += '<table style="border: 1px solid grey">';
            storeHTML += '<tr style="text-align: center"><html><a href="javascript:window.mallFuncs.getPreviousItem(\'' + storeMasterItem + '\')">←</a>  ' + masterItem.name + '  <a href="javascript:window.mallFuncs.getNextItem(\'' + storeMasterItem + '\')">→</a></html></tr>';
            storeHTML += '<tr style="text-align: center"><div id="' + storeMasterItem + 'StoreItem" data-itemindex=0>';
            storeHTML += childItemHTML;
            storeHTML += '</div></tr>';
            storeHTML += '</table>';
            storeHTML += '</div>';
        }

        storeHTML += '<div><<link "Go back to the Mall">><<replace "#mallStores">><<toggleclass "#mallStore" "hidden">><<toggleclass "#mallStores" "hidden">><<showMallStores>><</replace>><</link>></div>';
        return storeHTML;
    },

    getNextItem: function(storeMasterName){
        var storeItems =  window.itemFuncs.getChildItemsForMaster(storeMasterName);
        if(!(storeItems === undefined) && storeItems.length > 0){
            var storeItemDiv = document.querySelector("#" + storeMasterName + "StoreItem");
            var currentIndex = storeItemDiv.dataset.itemindex;
            var newIndex = parseInt(currentIndex) + 1;
            if(newIndex > storeItems.length - 1){
                newIndex = 0
            }
            console.log(newIndex);
            var storeItemDOM = window.mallFuncs.formatItemForStoreDOM(storeItems[newIndex]);
            storeItemDiv.replaceChild(storeItemDOM, storeItemDiv.firstElementChild);
            storeItemDiv.dataset.itemindex = newIndex;
        }
    },

    getPreviousItem: function(storeMasterName){
        var storeItems =  window.itemFuncs.getChildItemsForMaster(storeMasterName);
        if(!(storeItems === undefined) && storeItems.length > 0){
            var storeItemDiv = document.querySelector("#" + storeMasterName + "StoreItem");
            var currentIndex = storeItemDiv.dataset.itemindex;
            var newIndex = parseInt(currentIndex) - 1;
            if(newIndex < 0){
                newIndex = storeItems.length - 1;
            }
            console.log(newIndex);
            var storeItemDOM = window.mallFuncs.formatItemForStoreDOM(storeItems[newIndex]);
            storeItemDiv.replaceChild(storeItemDOM, storeItemDiv.firstElementChild);
            storeItemDiv.dataset.itemindex = newIndex;
        }
    },

    reloadCurrentItem: function(storeMasterName){
        var storeItems =  window.itemFuncs.getChildItemsForMaster(storeMasterName);
        if(!(storeItems === undefined) && storeItems.length > 0){
            var storeItemDiv = document.querySelector("#" + storeMasterName + "StoreItem");
            var currentIndex = storeItemDiv.dataset.itemindex;
            var storeItemDOM = window.mallFuncs.formatItemForStoreDOM(storeItems[currentIndex]);
            storeItemDiv.replaceChild(storeItemDOM, storeItemDiv.firstElementChild);
        }
    },

    formatItemForStoreDOM: function(item){
        var table = document.createElement('table');
        var trImage = document.createElement('tr');
        var itemImage = document.createElement('img');
        var buyPriceTr = document.createElement('tr');
        var tagsTr = document.createElement('tr');
        var tagDiv = window.mallFuncs.formatTagsDOM(window.itemFuncs.getTagsForItem(item));

        itemImage.src = './Images/items/' + item.variant + '.jpg';
        itemImage.width = 300;
        itemImage.height = 300;
        trImage.appendChild(itemImage);
        table.appendChild(trImage);

        if(window.itemFuncs.checkItemInInventory(item)){
            var messageSpan = document.createElement('span');
            var message = document.createTextNode('Already Owned');
            messageSpan.appendChild(message);
            buyPriceTr.appendChild(messageSpan);
            table.appendChild(buyPriceTr);
        }
        else{
            var priceSpan = document.createElement('span');
            var price = document.createTextNode('$' + item.price);
            var spliter = document.createTextNode(' - ');
            var buySpan = document.createElement('span');
            var buyA = document.createElement('a');
            var buy = document.createTextNode('Buy');

            buyA.href = 'javascript:window.itemFuncs.buyItemVariant("' + item.variant + '");window.mallFuncs.reloadCurrentItem("' + item.masterItem + '");';
            buyA.appendChild(buy);
            buySpan.appendChild(buyA);

            priceSpan.appendChild(price);
            buyPriceTr.appendChild(priceSpan);
            buyPriceTr.appendChild(spliter);
            buyPriceTr.appendChild(buySpan);
            table.appendChild(buyPriceTr);
        }
        tagsTr.appendChild(tagDiv);
        table.appendChild(tagsTr);

        return table;
    },

    formatTagsDOM: function(itemTagArr){
        var tagsDiv = document.createElement('div');

        for(var tagIdx in itemTagArr){
            var itemTag = itemTagArr[tagIdx];
            var tagSpan = document.createElement('span');
            var tagText = document.createTextNode(itemTag);
            var tagSeperator = document.createTextNode(', ');
            if(window.items.colourTags.indexOf(itemTag) > -1){
                tagSpan.style.background = itemTag;
                tagSpan.style.color = invertColorByName(itemTag, true);
            }
            tagSpan.appendChild(tagText);
            tagsDiv.appendChild(tagSpan);
            if(tagIdx < itemTagArr.length-1){
                tagsDiv.appendChild(tagSeperator);
            }
        }

        return tagsDiv;

        function invertColorByName(name, bw) {
            var d = document.createElement("div");
            d.style.color = name;
            document.body.appendChild(d);
            var rgbText = window.getComputedStyle(d).color;
            document.body.removeChild(d);
            var rgbArr = rgbText.replace("rgb(", "").replace(")", "").replace(" ", "").replace(" ", "").split(",");

            var r = parseInt(rgbArr[0]),
                g = parseInt(rgbArr[1]),
                b = parseInt(rgbArr[2]);
            if (bw) {
                // http://stackoverflow.com/a/3943023/112731
                return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                    ? '#000000'
                    : '#FFFFFF';
            }
            // invert color components
            r = (255 - r).toString(16);
            g = (255 - g).toString(16);
            b = (255 - b).toString(16);
            // pad each with zeros and return
            return "#" + padZero(r) + padZero(g) + padZero(b);
        }
    },
}

window.mall={
    stores:{
        homeEmpire:{
            name:"Home Empire",
            logo:"StoreLogo_HomeEmpire.jpg",
            coords: "70,75,112,114,111,153,61,202,1,143",
            masterItems:[

            ],
        },
        fashionCentral:{
            name:"Fashion Central",
            logo:"StoreLogo_FashionCentral.jpg",
            coords: "40,227,111,156,153,194,151,213,91,275",
            masterItems:[
                "skirtTop",
                "casualDress",
                "sluttyDress"
            ]
        },
        klipKlops:{
            name:"Klip Klops",
            logo:"StoreLogo_KlipKlops.jpg",
            coords: "286,123,316,154,283,189,251,157",
            masterItems:[

            ],
        },
        zoomElectronics:{
            name:"Zoom Electronics",
            logo:"StoreLogo_ZoomElectronics.jpg",
            coords: "257,1,322,66,285,103,238,102,211,78,211,49",
            masterItems:[

            ],
        },
        friskyBusiness:{
            name:"Frisky Business",
            logo:"StoreLogo_FriskyBusiness.jpg",
            coords: "247,197,274,224,230,267,205,239",
            masterItems:[

            ],
        },
        bergAccessories:{
            name: "",
            logo:"",
            coords: "345,155,344,201,383,202,406,178,382,155",
            masterItems:[

            ],
        },
        rosePetals:{
            name:"Rose Petals",
            logo:"StoreLogo_RosePetals.jpg",
            coords: "301,251,268,286,251,287,252,316,328,318,329,251",
            masterItems:[
                "plainPanties",
                "sexyPanties",
                "latexPanties"
            ]
        },
        kissAndMakeup:{
            name: "",
            logo:"",
            coords: "",
            masterItems:[

            ],
        },
        warriorWoman:{
            name: "",
            logo:"",
            coords: "",
            masterItems:[

            ],
        },
        urbane:{
            name:"Urbane",
            logo:"StoreLogo_Urbane.jpg",
            coords: "468,233,517,281,517,316,473,315,429,270",
            masterItems:[
                "boxers",
                "tshirtJeans"
            ]
        },

    },
    otherLocations:{
        toilet:{
            name:"Toilet",
            passageLink:"Go to mall toilet",
            coords:"330,251,330,316,368,318,368,285,350,268,350,252",
            canVisit: function(){
                return true;
            }
        },
        cinema:{
            name:"Cinema",
            passageLink:"352,242,352,265,370,286,369,332,353,351,353,406,543,405,542,342,515,316,475,317,429,270,420,271,393,242",
            coords:"",
            canVisit: function(){
                return true;
            }
        },
        testLab:{
            name:"Test Lab",
            passageLink:"",
            coords:"186,222,251,286,252,337,148,335,146,264",
            canVisit: function(){
                return true;
            }
        },
        arcade:{
            name:"Arcade",
            passageLink:"Play in the arcade",
            coords:"421,82,459,120,460,144,446,158,427,158,404,132,403,100",
            canVisit: function(){
                return true;
            }
        },
    }
}