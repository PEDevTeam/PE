//Macros
Macro.add('StartingInventory', {
    handler: function() {
        for(var itemVariantNameIdx in window.inventory.startingInventory){
            var itemVariantName = window.inventory.startingInventory[itemVariantNameIdx];
            window.itemFuncs.addItemToInventory(itemVariantName);
        }
    }
});

macros.getInventoryList = {
    handler: function(place, macroName, params, parser){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        var outputDiv = document.createElement('div');

        for(var sidebarInventoryIdx in window.inventory.sidebarInventory){
            var br = document.createElement('br');
            var sidebarItem = window.inventory.sidebarInventory[sidebarInventoryIdx];
            switch(sidebarItem.itemType){
                case "variable":
                    if(actVar.player[sidebarItem.variableName]){
                        var text = document.createTextNode(sidebarItem.sidebarDisplayName);
                        outputDiv.appendChild(br);
                        outputDiv.appendChild(text);
                    }
                    break;
                case "itemVariant":
                    if(window.inventoryFuncs.checkItemInInventory(sidebarItem.itemVariant)){
                        var text = document.createTextNode(sidebarItem.sidebarDisplayName);
                        outputDiv.appendChild(br);
                        outputDiv.appendChild(text);
                    }
                    break;
                default:
                    break;
            }
        }
        place.appendChild(outputDiv);
    }
}

//JS Functions
window.inventoryFuncs= {
    hasTag: function(item, tag){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var locItem = this.getItemByVariant(item);
        if(!(locItem === undefined)){
            if(!(locItem.tags[tag] === undefined)){
                return locItem.tags[tag];
            }
            else{
                var masterItem = window.items.itemMasters[locItem.masterItem];
                if(!(masterItem.tags[tag] === undefined)){
                    return masterItem.tags[tag];
                }
                else{
                    return false;
                }
            }
        }
        else{
            return false;
        }
    },
    notTag: function (item, tag){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var locItem = this.getItemByVariant(item);
        if(!(locItem === undefined)){
            if(!(locItem.tags[tag] === undefined)){
                return false;
            }
            else{
                var masterItem = window.items.itemMasters[locItem.masterItem];
                if(!(masterItem.tags[tag] === undefined)){
                    return false;
                }
                else{
                    return true;
                }
            }
        }
        else{
            return false;
        }
    },
    hasTagsAnd: function (item, tags){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var hasTags = false;
        if(tags.constructor === Array){
            hasTags = true;
            for(var i = 0; i < tags.length && hasTags === true; i++){
                var hasTag = window.itemFuncs.hasTag(item, tags[i]);
                hasTags = hasTag;
            }
        }
        return hasTags;
    },
    hasTagsOr: function (item, tags){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var hasTags = false;
        if(tags.constructor === Array){
            for(var i = 0; i < tags.length; i++){
                var hasTag = window.itemFuncs.hasTag(item, tags[i]);
                if(hasTag){
                    hasTags = hasTag;
                    break;
                }
            }
        }
        return hasTags;
    },
    notTagsAnd: function (item, tags){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var notTags = false;
        if(tags.constructor === Array){
            notTags = true;
            for(var i = 0; i < tags.length && notTags === true; i++){
                var notTag = window.itemFuncs.notTag(item, tags[i]);
                notTags = notTag;
            }
        }
        return notTags;
    },
    notTagsOr: function (item, tags){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var notTags = false;
        if(tags.constructor === Array){
            for(var i = 0; i < tags.length; i++){
                var notTag = window.itemFuncs.notTag(item, tags[i]);
                if(notTag){
                    notTags = notTag;
                    break;
                }
            }
        }
        return notTags;
    },

    getChildItemsForMaster: function(masterItem){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var itemChildren = [];
        for(var itemName in actVar.inventory){
            var item = actVar.inventory[itemName];
            if(item.masterItem == masterItem){
                itemChildren.push(item);
            }
        }
        return itemChildren;
    },

    getItemByVariant: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }


        if(typeof itemVariant !== 'object'){
            for(var itemIdx in actVar.inventory){
                var item = actVar.inventory[itemIdx];
                if(typeof item == 'object' && item.variant == itemVariant){
                    return item;
                }
            }
        }
        else{            
            for(var itemIdx in actVar.inventory){
                var item = actVar.inventory[itemIdx];
                if(typeof item == 'object' && item.variant == itemVariant.variant){
                    return item;
                }
            }
        }
    },

    getItemsByProperty: function(propertyName, propertyValue){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        var items = [];
        for(var inventItemIdx in actVar.inventory){
            var inventItem = actVar.inventory[inventItemIdx];
            if(!(inventItem.variant === undefined) && inventItem[propertyName] == propertyValue){
                items.push(inventItem)
            }
        }
        if(items.length==0){
            return null;
        }
        else{
            return items;
        }
    },

    getItemsByTag: function(tag){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        var items = [];
        for(var inventItemIdx in actVar.inventory){
            var inventItem = actVar.inventory[inventItemIdx];
            if(!(inventItem.variant === undefined) && window.inventoryFuncs.hasTag(inventItem, tag)){
                items.push(inventItem)
            }
        }
        if(items.length==0){
            return null;
        }
        else{
            return items;
        }
    },

    checkItemInInventory: function(item){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var itemInInventory = false;
        for(var inventItemIdx in actVar.inventory){
            var inventItem = actVar.inventory[inventItemIdx];
            if(!(inventItem.variant === undefined) && inventItem.variant == item.variant){
                itemInInventory = true;
            }
        }
        return itemInInventory;
    },

    isItemVariantOwned: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        if(typeof itemVariant !== 'object'){
            itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        }

        var ownedItems = window.inventoryFuncs.getChildItemsForMaster(itemVariant.masterItem);
        var ownedItemVariantNames = [];
        for(var ownedItemIdx in ownedItems){
            ownedItemVariantNames.push(ownedItems[ownedItemIdx].variant);
        }

        return ownedItemVariantNames.indexOf(itemVariant.variant) > -1
    },

    ownsMasterItem: function(itemMaster){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var owned = window.inventoryFuncs.getChildItemsForMaster(itemMaster);
        if(owned && owned.length > 0){
            return true;
        }
        else{
            return false;
        }
    },

    addTag: function(itemVariant, tag, value){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        for(var inventoryIdx in actVar.inventory){
            var inventoryItem = actVar.inventory[inventoryIdx];
            if(typeof inventoryItem == 'object' && inventoryItem.variant == itemVariant.variant){
                $.extend(true, inventoryItem.tags, {[tag]: value});
            }
        }
    }
}

window.inventory = {
    startingInventory: [
        "school_male",
        "male_pyjamas_00",
        "tshirt_jeans_00",
        "lucky_jocks_00",
        "black_shoes_00",
        "sneakers_00",
    ],
    sidebarInventory: {
        sidebar0: {
            itemType: "variable",
            variableName: "hasRemoteButtplug",
            itemVariant: "",
            sidebarDisplayName: "Remote controlled butt-plug"
        },
        sidebar1: {
            itemType: "variable",
            variableName: "hasAlarmClock",
            itemVariant: "",
            sidebarDisplayName: "Alarm clock"
        },
        sidebar2: {
            itemType: "variable",
            variableName: "hasBatteries",
            itemVariant: "",
            sidebarDisplayName: "Batteries (Generic Brand)"
        },
        sidebar3: {
            itemType: "variable",
            variableName: "hasQualityBatteries",
            itemVariant: "",
            sidebarDisplayName: "Batteries (Name Brand)"
        },
        sidebar4: {
            itemType: "variable",
            variableName: "hasSpyCamera",
            itemVariant: "",
            sidebarDisplayName: "Wifi spy camera"
        },
        sidebar5: {
            itemType: "variable",
            variableName: "hasCamera",
            itemVariant: "",
            sidebarDisplayName: "Camera"
        },
        sidebar6: {
            itemType: "variable",
            variableName: "hasStunGun",
            itemVariant: "",
            sidebarDisplayName: "Stun gun"
        },
        sidebar7: {
            itemType: "variable",
            variableName: "hasVibrator",
            itemVariant: "",
            sidebarDisplayName: "Vibrator"
        },        
        sidebar8: {
            itemType: "variable",
            variableName: "hasMassageOil",
            itemVariant: "",
            sidebarDisplayName: "Sensuous massage oil"
        },
        sidebar9: {
            itemType: "variable",
            variableName: "hasPlaygirl",
            itemVariant: "",
            sidebarDisplayName: "Playgirl magazine"
        },
        sidebar10: {
            itemType: "variable",
            variableName: "hasNailPolish",
            itemVariant: "",
            sidebarDisplayName: "Nail polish"
        },
    }
}