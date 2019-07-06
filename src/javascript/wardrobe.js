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
    handler: function(place, macroName, params, parser){
        window.wardrobeFuncs.updateSidebar();
    }
});

window.wardrobeFuncs = {
    wearItemVariant: function(itemVariant){
        if(typeof itemVariant !== 'object'){
            itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        }
        var masterItem = window.items.itemMasters[itemVariant.masterItem];
        
        if(masterItem.clothingSlot == 'nightwear' || masterItem.clothingSlot == 'maid'){
            window.wardrobeFuncs.removeClothingAndAccessories();
        }
        else if(window.wardrobe.mainClothing.includes(masterItem.clothingSlot)){
            SugarCube.State.active.variables.player.clothingSlots['nightwear'] = null;
            SugarCube.State.active.variables.player.clothingSlots['maid'] = null;
        }

        var itemVariantClothingSlot = masterItem.clothingSlot;
        SugarCube.State.active.variables.player.clothingSlots[itemVariantClothingSlot] = itemVariant;
    },
    removeItemVariant: function(itemVariant){
        if(typeof itemVariant !== 'object'){
            itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        }
        var masterItem = window.items.itemMasters[itemVariant.masterItem];
        var itemVariantClothingSlot = masterItem.clothingSlot;
        SugarCube.State.active.variables.player.clothingSlots[itemVariantClothingSlot] = null;
    },
    removeClothingAndAccessories: function(){
        window.wardrobeFuncs.removeMainClothing();
        window.wardrobeFuncs.remoteAccessories();
    },
    removeMainClothing: function(){
        for(var clothingSlotIdx in window.wardrobe.mainClothing){
            SugarCube.State.active.variables.player.clothingSlots[window.wardrobe.mainClothing[clothingSlotIdx]] = null;
        }
    },
    remoteAccessories: function(){
        for(var clothingSlotIdx in window.wardrobe.accessories){
            SugarCube.State.active.variables.player.clothingSlots[window.wardrobe.accessories[clothingSlotIdx]] = null;
        }
    },
    removeToys: function(){
        for(var clothingSlotIdx in window.wardrobe.toys){
            SugarCube.State.active.variables.player.clothingSlots[window.wardrobe.toys[clothingSlotIdx]] = null;
        }
    },
    isItemVariantWearing: function(itemVariant){
        if(typeof itemVariant !== 'object'){
            itemVariant = window.inventoryFuncs.getItemByVariant(itemVariant);
        }
        var masterItem = window.items.itemMasters[itemVariant.masterItem];
        var itemVariantClothingSlot = masterItem.clothingSlot;
        var currentlyWearing = SugarCube.State.active.variables.player.clothingSlots[itemVariantClothingSlot];
        if(currentlyWearing != null && currentlyWearing.variant == itemVariant.variant){
            return true;
        }
        else{
            return false;
        }
    },
    updateSidebar: function(){
        var currentClothing = State.active.variables.player.clothingSlots;

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