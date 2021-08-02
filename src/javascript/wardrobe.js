//macros.wardrobe = {
Macro.add('wardrobe', {
    handler: function(place, macroName, params, parser) {
        var wardrobeDiv = window.itemNavigator.getItemNavigator('wardrobe');
        $(this.output).append(wardrobeDiv);
        var clothingSetDiv = window.itemNavigator.getClothingSetNavigator();
        $(this.output).append(clothingSetDiv);

        $(function(){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }
            if(wardrobeDiv.firstCategory !== ""){          
                if(actVar.wardrobeCurMasterItem){
                    window.itemNavigator.showCategory(actVar.wardrobeCurCategory, 'wardrobe');  
                    window.itemNavigator.showVariant(actVar.wardrobeCurMasterItem, actVar.wardrobeCurVariantIndex, actVar.wardrobeCurNavigatorType);
                }
                else{
                    window.itemNavigator.showCategory(wardrobeDiv.firstCategory, 'wardrobe');  
                }
            }
        });
    }
});
Macro.add('ClothingSlotSidebar',{
    handler: function(){
        window.wardrobeFuncs.updateSidebar();
    }
});
macros.wearItemVariant = {
    handler: function(place, macroName, params, parser){
        if(params[0]){
            window.wardrobeFuncs.wearItemVariant(params[0]);
            window.wardrobeFuncs.updateSidebar();
        }
        else{
            throwError(place, "<<" + macroName + ">>: needs 1 parameter");
			return;
        }
    }
};
macros.wearRandomItemByMaster = {
    handler: function(place, macroName, params, parser){
        if(params[0]){
            var itemVariants = window.inventoryFuncs.getChildItemsForMaster(params[0]);
            if(itemVariants){
                var itemVariant = itemVariants[Math.floor(Math.random()*itemVariants.length)];
                window.wardrobeFuncs.wearItemVariant(itemVariant);
                window.wardrobeFuncs.updateSidebar();
            }
            else{
                throwError(place, "<<" + macroName + ">>: no item variants owned for this master item");
                return;
            }
        }
        else{
            throwError(place, "<<" + macroName + ">>: needs 1 parameter");
			return;
        }
    }
};
Macro.add('stashWornClothing', {
    handler: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSlotIdx in actVar.player.clothingSlots){
            var clothingSlot = actVar.player.clothingSlots[clothingSlotIdx];
            if(clothingSlot){
                actVar.player.stashedClothing[clothingSlotIdx] = clothingSlot;
                window.wardrobeFuncs.removeItemVariant(clothingSlot.variant);
            }
        }
        window.wardrobeFuncs.updateSidebar();
    }
});
Macro.add('wearStashedClothing', {
    handler: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var stashedClothingIdx in actVar.player.stashedClothing){
            var stashedClothing = actVar.player.stashedClothing[stashedClothingIdx];
            if(stashedClothing){
                window.wardrobeFuncs.wearItemVariant(stashedClothing.variant);
                actVar.player.stashedClothing[stashedClothingIdx] = null;
            }
            else{
                actVar.player.clothingSlots[stashedClothingIdx] = null;
            }
        }
        window.wardrobeFuncs.updateSidebar();
    }
});
macros.wearItemFromStash = {
    handler: function(place, macroName, params, parser){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(params[0]){
            var stashedClothing = actVar.player.stashedClothing[params[0]];
            if(stashedClothing){
                window.wardrobeFuncs.wearItemVariant(stashedClothing.variant);
                actVar.player.stashedClothing[params[0]] = null;
            }
        }
        else{
            throwError(place, "<<" + macroName + ">>: needs 1 parameter");
			return;
        }
    }
};
macros.removeClothingItem = {
    handler: function(place, macroName, params, parser){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(params[0]){
            actVar.player.clothingSlots[params[0]] = null;
            window.wardrobeFuncs.updateSidebar();
        }
        else{
            throwError(place, "<<" + macroName + ">>: needs 1 parameter");
			return;
        }
    }
};

window.wardrobeFuncs = {
    wearItemVariant: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(typeof itemVariant !== 'object'){
            itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        }
        if(itemVariant && itemVariant.masterItem){
            var masterItem = window.items.itemMasters[itemVariant.masterItem];
            
            if(masterItem.clothingSlot == 'nightwear' || masterItem.clothingSlot == 'maid'){
                window.wardrobeFuncs.removeClothingAndAccessories();
            }
            
            if(window.wardrobe.mainClothing.includes(masterItem.clothingSlot)){
                actVar.player.clothingSlots['nightwear'] = null;
                //actVar.player.clothingSlots['maid'] = null; //Not sure how maid outfits should be handled...
            }
            
            if(masterItem.clothingSlot == 'outerwear'){
                actVar.player.clothingSlots['maid'] = null;
            }

            var itemVariantClothingSlot = masterItem.clothingSlot;
            actVar.player.clothingSlots[itemVariantClothingSlot] = itemVariant;
        }
    },
    wearRandomItemByMaster: function(itemMaster){
        var itemVariants = window.inventoryFuncs.getChildItemsForMaster(itemMaster);
        if(itemVariants){
            var itemVariant = itemVariants[Math.floor(Math.random()*itemVariants.length)];
            window.wardrobeFuncs.wearItemVariant(itemVariant);
            window.wardrobeFuncs.updateSidebar();
        }
    },
    removeItemVariant: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(typeof itemVariant !== 'object'){
            itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        }
        var masterItem = window.items.itemMasters[itemVariant.masterItem];
        var itemVariantClothingSlot = masterItem.clothingSlot;

        if(actVar.player.clothingSlots[itemVariantClothingSlot].variant == itemVariant.variant){
            actVar.player.clothingSlots[itemVariantClothingSlot] = null;
        }
    },
    removeItemMaster: function(itemMaster){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        
        itemMaster = window.itemFuncs.getItemMaster(itemMaster);
        var wornClothing = actVar.player.clothingSlots[itemMaster.clothingSlot];
        if(wornClothing){
            if(wornClothing.masterItem == itemMaster.itemMaster){
                actVar.player.clothingSlots[itemMaster.clothingSlot] = null;
            }
        }
    },
    removeClothing: function(clothingSlot){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        
        actVar.player.clothingSlots[clothingSlot] = null;
        window.wardrobeFuncs.updateSidebar();
    },
    removeClothingAndAccessories: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        window.wardrobeFuncs.removeMainClothing();
        window.wardrobeFuncs.removeAccessories();
    },
    removeAllClothingWithChastityCheck: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        window.wardrobeFuncs.removeMainClothing();
        window.wardrobeFuncs.removeAccessories();
        window.wardrobeFuncs.removeToysWithChastityCheck();
    },
    removeMainClothing: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSlotIdx in window.wardrobe.mainClothing){
            actVar.player.clothingSlots[window.wardrobe.mainClothing[clothingSlotIdx]] = null;
        }
        window.wardrobeFuncs.updateSidebar();
    },
    removeAccessories: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSlotIdx in window.wardrobe.accessories){
            actVar.player.clothingSlots[window.wardrobe.accessories[clothingSlotIdx]] = null;
        }
        window.wardrobeFuncs.updateSidebar();
    },
    removeToys: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSlotIdx in window.wardrobe.toys){
            actVar.player.clothingSlots[window.wardrobe.toys[clothingSlotIdx]] = null;
        }
        window.wardrobeFuncs.updateSidebar();
    },
    removeToysWithChastityCheck: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSlotIdx in window.wardrobe.toys){
            if(!(window.wardrobe.toys[clothingSlotIdx] == "chastity" && (State.active.variables.flags.chastityKey || State.active.variables.flags.chastityLocked))){
                actVar.player.clothingSlots[window.wardrobe.toys[clothingSlotIdx]] = null;
            }
        }
    },
    isItemVariantWearing: function(itemVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(typeof itemVariant !== 'object'){
            itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        }
        if(itemVariant){
            var masterItem = window.items.itemMasters[itemVariant.masterItem];
            var itemVariantClothingSlot = masterItem.clothingSlot;
            var currentlyWearing = actVar.player.clothingSlots[itemVariantClothingSlot];
            if(currentlyWearing != null && currentlyWearing.variant == itemVariant.variant){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    },
    isItemMasterWearing: function(itemMaster){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var masterItem = window.itemFuncs.getItemMaster(itemMaster);
        if(masterItem){
            var itemVariantClothingSlot = masterItem.clothingSlot;
            var currentlyWearing = actVar.player.clothingSlots[itemVariantClothingSlot];
            console.log(currentlyWearing);
            if(currentlyWearing != null && currentlyWearing.masterItem == itemMaster){
                return true;
            }
            else{
                return false;
            }
        }
        else {
            return false;
        }
    },
    updateSidebar: function(){
        new Wikifier(null, '<<updateClothes>>');

        
    },
    getWornItem: function(clothingSlot){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        if(clothingSlot){
            var wornItem = actVar.player.clothingSlots[clothingSlot];
            if(wornItem){
                //TODO enumerate tags out as properties
                return wornItem;
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }
}

window.wardrobe = {
    categories: {
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
				"corsets",
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
                "glasses",
                "sunglasses",
            ]
        },
        toys: {
            name: "Toys",
            masterItems: [
                "chastity",
                "buttplugs",
                "gag",
                "blindfold",
            ]
        },
        nightwear: {
            name: "Nightwear",
            masterItems: [
                "pyjamas",
                "nightie",
            ]
        }
    },
    mainClothing:['outerwear', 'underwear', 'shoes', 'hosiery', 'bra'],
    accessories:['earring','eyewear','headwear','mouth', 'neckwear'],
    toys:['chastity', 'buttplug']
}