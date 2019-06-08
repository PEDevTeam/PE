//Macros


//JS Functions
window.itemFuncs= {
    hasTag: function(item, tag){
        var locItem = window.items.itemChildren[item];
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
        var locItem = window.items.itemChildren[item];
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
        var itemChildren = [];
        for(var itemName in window.items.itemChildren){
            var item = window.items.itemChildren[itemName];
            if(item.masterItem == masterItem){
                itemChildren.push(item);
            }
        }
        return itemChildren;
    },

    getItemByVariant: function(itemVariant){
        for(var itemName in window.items.itemChildren){
            var item = window.items.itemChildren[itemName];
            if(item.variant == itemVariant){
                return item;
            }
        }
        return false;
    },

    buyItemVariant: function(itemVariant){
        console.log("buying item");
        for(var itemName in window.items.itemChildren){
            var item = window.items.itemChildren[itemName];
            if(item.variant == itemVariant){
                console.log("found item variant");
                if(item.price > 0){
                    //deduct cash
                    window.itemFuncs.addItemToInventory(item);
                }
                break;
            }
        }
    },

    addItemToInventory: function(item){
        console.log("adding item to inventory");
        if(!(window.itemFuncs.checkItemInInventory(item))){
            SugarCube.State.variables.inventory.push(item);
        }
    },

    checkItemInInventory: function(item){
        var itemInInventory = false;
        for(var inventItemIdx in SugarCube.State.variables.inventory){
            var inventItem = SugarCube.State.variables.inventory[inventItemIdx];
            if(!(inventItem.variant === undefined) && inventItem.variant == item.variant){
                itemInInventory = true;
            }
        }
        console.log(itemInInventory);
        return itemInInventory;
    },

    getTagsForItem: function(item){
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
}


//Objects
//Most object definitions are stored in seperate files to make managing them easier.
//As we're modifying the same object over several files, we need to check if the object exists first, if not create it, then merge our changes into the main object
if(typeof window.items == "undefined"){
    window.items = {};
}

$.extend(true, window.items, {
    colourTags: ['pink', 'black', 'white', 'blue', 'yellow', 'grey', 'gray', 'orange', 'green', 'red', 'gold', 'silver'],
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
