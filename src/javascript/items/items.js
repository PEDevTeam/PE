//Macros
macros.addItemVariantToInventory = {
    handler: function(place, macroName, params, parser){
        if (params.length == 0) {
            throwError(place, "<<" + macroName + ">>: no parameters given");
            return;
        }
        window.itemFuncs.addItemToInventory(params[0]);
    }
};
macros.buyItemVariant = {
    handler: function(place, macroName, params, parser){
        if (params.length == 0) {
            throwError(place, "<<" + macroName + ">>: no parameters given");
            return;
        }
        window.itemFuncs.buyItemVariant(params[0]);
    }
};
macros.removeItemVariantFromInventory = {
    handler: function(place, macroName, params, parser){
        if (params.length == 0) {
            throwError(place, "<<" + macroName + ">>: no parameters given");
            return;
        }
        window.itemFuncs.removeItemFromInventory(params[0]);
    }
};

//JS Functions
window.itemFuncs= {
    hasTag: function(item, tag){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var itemVariant = window.itemFuncs.getItemByVariant(item);
        if(!(itemVariant === undefined)){
            if(!(itemVariant.tags[tag] === undefined)){
                return itemVariant.tags[tag];
            }
            else{
                var masterItem = window.items.itemMasters[itemVariant.masterItem];
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

        var itemVariant = window.itemFuncs.getItemByVariant(item);
        if(!(itemVariant === undefined)){
            if(!(itemVariant.tags[tag] === undefined)){
                return false;
            }
            else{
                var masterItem = window.items.itemMasters[itemVariant.masterItem];
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

        if(typeof item !== 'object'){
            item = window.itemFuncs.getItemByVariant(item);
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

        if(typeof item !== 'object'){
            item = window.itemFuncs.getItemByVariant(item);
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

        if(typeof item !== 'object'){
            item = window.itemFuncs.getItemByVariant(item);
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

        if(typeof item !== 'object'){
            item = window.itemFuncs.getItemByVariant(item);
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
        for(var itemName in window.items.itemChildren){
            var item = window.items.itemChildren[itemName];
            var itemVariant = window.itemFuncs.getItemByVariant(item);
            if(typeof itemVariant == 'object' && itemVariant.masterItem == masterItem){
                itemChildren.push(itemVariant);
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
            for(var itemIdx in actVar.itemVariantsOverrides){
                var item = actVar.itemVariantsOverrides[itemIdx]
                if(item.variant == itemVariant){
                    return item;
                }
            }
            for(var itemIdx in window.items.itemChildren){
                var item = window.items.itemChildren[itemIdx];
                if(typeof item == 'object' && item.variant == itemVariant){
                    return item;
                }
            }
        }
        else{            
            for(var itemIdx in actVar.itemVariantsOverrides){
                var item = actVar.itemVariantsOverrides[itemIdx]
                if(item.variant == itemVariant.variant){
                    return item;
                }
            }
            for(var itemIdx in window.items.itemChildren){
                var item = window.items.itemChildren[itemIdx];
                if(typeof item == 'object' && item.variant == itemVariant.variant){
                    return item;
                }
            }
        }
    },

    buyItemVariant: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        
        if(typeof itemVariant !== 'object'){
            itemVariant = window.itemFuncs.getItemByVariant(itemVariant);
        }
        for(var itemName in window.items.itemChildren){
            var item = window.items.itemChildren[itemName];
            item = window.itemFuncs.getItemByVariant(item);
            if(typeof itemVariant == 'object' && itemVariant.variant == item.variant){
                if(item.price <= actVar.player.money){
                    actVar.player.money -= item.price;
                    window.itemFuncs.addItemToInventory(item);
                }
                break;
            }
        }
    },

    addItemToInventory: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        itemVariant = window.itemFuncs.getItemByVariant(itemVariant);
        if(!(window.inventoryFuncs.checkItemInInventory(itemVariant))){
            actVar.inventory.push(itemVariant);
        }
    },

    addItemsToInventoryByTag: function(tagName, tagValue){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var itemIdx in window.items.itemChildren){
            var itemVariant = window.itemFuncs.getItemByVariant(window.items.itemChildren[itemIdx]);
            if(typeof itemVariant == 'object' && !(window.inventoryFuncs.checkItemInInventory(itemVariant)) && itemVariant.tags[tagName] == tagValue){
                actVar.inventory.push(itemVariant);
            }
        }
    },

    removeItemFromInventory: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        itemVariant = window.itemFuncs.getItemByVariant(itemVariant);
        if(itemVariant){
            for(var itemIdx in actVar.inventory){
                var item = actVar.inventory[itemIdx];
                if(typeof item == 'object' && item.variant == itemVariant.variant){
                    actVar.inventory.splice(itemIdx, 1);
                }
            }
        }
    },

    removeItemsFromInventoryByProperty: function(propertyName, propertyValue){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var arrIdx = actVar.inventory.length - 1; arrIdx >= 0; arrIdx--){
            var item = actVar.inventory[arrIdx];
            if(typeof item == 'object' && item[propertyName] == propertyValue){
                actVar.inventory.splice(arrIdx, 1);
            }
        }
    },

    removeItemsFromInventoryByTag: function(tagName, tagValue){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var arrIdx = State.active.variables.inventory.length - 1; arrIdx >= 0; arrIdx--){
            var item = State.active.variables.inventory[arrIdx];
            if(typeof item == 'object' && item.tags[tagName] == tagValue){
                actVar.inventory.splice(arrIdx, 1);
            }
        }
    },

    getTagsForItem: function(item){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(typeof item !== 'object'){
            item = window.itemFuncs.getItemByVariant(item);
        }
        var tags = [];
        for(var tagName in item.tags){
            if(item.tags[tagName] && tags.indexOf(tagName) < 0){
                tags.push(tagName);
            }
        }
        var masterItem = window.items.itemMasters[item.masterItem];
        for(var tagName in masterItem.tags){
            if(masterItem.tags[tagName] && tags.indexOf(tagName) < 0 && (item.tags[tagName] === undefined || item.tags[tagName])){
                tags.push(tagName);
            }
        }
        return tags;
    },

    disableItemVariant: function(item){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        window.itemFuncs.overrideItemVariantProperty(item, 'disabled', true);
    },

    enableItemVariant: function(item){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        window.itemFuncs.overrideItemVariantProperty(item, 'disabled', false);
    },

    overrideItemVariantProperty: function(item, propertyName, propertyValue){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(typeof item !== 'object'){
            item = window.itemFuncs.getItemByVariant(item);
        }
        item[propertyName] = propertyValue;
        for(var itemIdx in actVar.itemVariantsOverrides){
            var overrideItem = actVar.itemVariantsOverrides[itemIdx]
            if(overrideItem.variant == item.variant){
                actVar.itemVariantsOverrides.splice(itemIdx, 1);
            }
        }
        actVar.itemVariantsOverrides.push(item);
    },

    addTattooToInventory: function(item){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var itemVariant = window.itemFuncs.getItemByVariant(item);
        if(!window.inventoryFuncs.checkItemInInventory(itemVariant)){
            window.itemFuncs.addItemToInventory(itemVariant);
            actVar.player.tattoos.push(itemVariant);
        }
    },

    
}


//Objects
//Most object definitions are stored in seperate files to make managing them easier.
//As we're modifying the same object over several files, we need to check if the object exists first, if not create it, then merge our changes into the main object
if(typeof window.items == "undefined"){
    window.items = {};
}

$.extend(true, window.items, {
    colourTags: ['pink', 'black', 'white', 'blue', 'yellow', 'grey', 'gray', 'orange', 'green', 'red', 'gold', 'silver', 'purple'],
    itemMasters:{
        length: function(){
            return Object.keys(window.items.itemMasters).length;
        },
    },
    itemChildren:{
        length: function(){
            return Object.keys(window.items.itemChildren).length;
        },
    }
});
