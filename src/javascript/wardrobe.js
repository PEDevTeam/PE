//macros.wardrobe = {
Macro.add('wardrobe', {
    handler: function() {
        var wardrobeDiv = window.itemNavigator.getItemNavigator('wardrobe');
        $(this.output).append(wardrobeDiv);
        var clothingSetDiv = window.itemNavigator.getClothingSetNavigator();
        $(this.output).append(clothingSetDiv);

        $(function(){
            if(wardrobeDiv.firstCategory !== ""){
                window.itemNavigator.showCategory(wardrobeDiv.firstCategory, 'wardrobe');
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
        var masterItem = window.items.itemMasters[itemVariant.masterItem];
        
        if(masterItem.clothingSlot == 'nightwear' || masterItem.clothingSlot == 'maid'){
            window.wardrobeFuncs.removeClothingAndAccessories();
        }
        else if(window.wardrobe.mainClothing.includes(masterItem.clothingSlot)){
            actVar.player.clothingSlots['nightwear'] = null;
            actVar.player.clothingSlots['maid'] = null;
        }

        var itemVariantClothingSlot = masterItem.clothingSlot;
        actVar.player.clothingSlots[itemVariantClothingSlot] = itemVariant;
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
        actVar.player.clothingSlots[itemVariantClothingSlot] = null;
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
        var masterItem = window.items.itemMasters[itemVariant.masterItem];
        var itemVariantClothingSlot = masterItem.clothingSlot;
        var currentlyWearing = actVar.player.clothingSlots[itemVariantClothingSlot];
        if(currentlyWearing != null && currentlyWearing.variant == itemVariant.variant){
            return true;
        }
        else{
            return false;
        }
    },
    updateSidebar: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var currentClothing = actVar.player.clothingSlots;

        var clothingSlotSidebarDiv = document.createElement('div');
        clothingSlotSidebarDiv.id = 'sidebar_clothes';
        clothingSlotSidebarDiv.className = 'clothing-slot-sidebar-background-image';

        for(var clothingIdx in currentClothing){
            if(currentClothing[clothingIdx]!= null){
                var currentClothingSlotItem = currentClothing[clothingIdx];
                var masterItem = window.items.itemMasters[currentClothingSlotItem.masterItem];
                var currentClothingSlot = masterItem.clothingSlot;
                var clothingSlotDiv = document.createElement('div');
                var clothingSlotImg = document.createElement('img');
                clothingSlotDiv.id = 'sidebar_' + currentClothingSlot + 'Slot';
                clothingSlotDiv.className = 'clothing-slot-sidebar-anchor';
                clothingSlotImg.className = 'clothing-slot-sidebar-' + currentClothingSlot;
                clothingSlotImg.src = "./Images/items/" + currentClothingSlotItem.variant + ".jpg";
                clothingSlotDiv.appendChild(clothingSlotImg);
                clothingSlotSidebarDiv.appendChild(clothingSlotDiv);
            }
        }

        $("#sidebar_clothes").replaceWith(clothingSlotSidebarDiv);
    },
    getWornItem: function(clothingSlot){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }
        if(clothingSlot){
            return actVar.player.clothingSlots[clothingSlot];
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