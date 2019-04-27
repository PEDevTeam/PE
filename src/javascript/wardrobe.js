//macros.wardrobe = {
Macro.add('wardrobe', {
    //handler: function(place, macroName, params, parser) {
    handler: function() {
        var wardrobeDiv = document.createElement('div');
        var wardrobeTable = document.createElement('table');
        var clothingTypeSelectorTr = document.createElement('tr');
        var clothingTypeSelectorTd = document.createElement('td');
        clothingTypeSelectorTd.className = "wardrobe-category-button-heading";
        var firstCategory = "";
        var needFirstCategory = true;

        for(var categoryName in window.wardrobe.categories){
            var category = window.wardrobe.categories[categoryName];
            var categorySpan = document.createElement('span')
            var categoryText = document.createTextNode(category.name);
            categorySpan.appendChild(categoryText);          
            categorySpan.addEventListener("click", callShowCategory, true);
            categorySpan.categoryName = categoryName;
            categorySpan.className = "wardrobe-category-button";
            if(needFirstCategory){ 
                firstCategory = categoryName;
                categorySpan.className = "wardrobe-category-button-selected";
                needFirstCategory = false;
            }

            clothingTypeSelectorTd.appendChild(categorySpan);
        }
        clothingTypeSelectorTr.appendChild(clothingTypeSelectorTd);
        wardrobeTable.appendChild(clothingTypeSelectorTr);
        wardrobeTable.className = "wardrobe-selector-table"

        var clothingListTr = document.createElement('tr');
        var clothingListTable = document.createElement('table');
        var clothingListInnerTr = document.createElement('tr');
        var masterItemListTd = document.createElement('td');
        var masterItemListDiv = document.createElement('div');
        var itemVariantSelectorTd = document.createElement('td');
        var itemVariantSelectorDiv = document.createElement('div');
        var itemVariantTable = document.createElement('table');
        var itemVariantTitleTr = document.createElement('tr');
        var itemVariantTitleTd = document.createElement('td');
        var itemVariantTitleSpan = document.createElement('span');
        var itemVariantPictureTr = document.createElement('tr');
        var itemVariantPictureTd = document.createElement('td');
        var itemVariantTagsTr = document.createElement('tr');
        var itemVariantTagsTd = document.createElement('td');

        masterItemListTd.id = "wardrobeMasterItemList";
        itemVariantSelectorTd.id = "wardrobeVariantSelector";
        masterItemListTd.className = "wardrobe-master-item-list"
        masterItemListTd.appendChild(masterItemListDiv);

        itemVariantTitleSpan.id = "itemVariantTitle";
        itemVariantTitleTd.appendChild(itemVariantTitleSpan)
        itemVariantTitleTr.appendChild(itemVariantTitleTd);
        itemVariantPictureTd.id = "itemVariantPictureCell";
        itemVariantPictureTr.appendChild(itemVariantPictureTd);
        itemVariantTagsTd.id = "itemVariantTagsCell"
        itemVariantTagsTr.appendChild(itemVariantTagsTd);
        itemVariantTable.appendChild(itemVariantTitleTr);
        itemVariantTable.appendChild(itemVariantPictureTr);
        itemVariantTable.appendChild(itemVariantTagsTd);
        itemVariantSelectorDiv.appendChild(itemVariantTable);        
        itemVariantSelectorTd.appendChild(itemVariantSelectorDiv);

        clothingListInnerTr.appendChild(masterItemListTd);
        clothingListInnerTr.appendChild(itemVariantSelectorTd);
        clothingListTable.appendChild(clothingListInnerTr);
        clothingListTr.appendChild(clothingListTable);
        wardrobeTable.appendChild(clothingListTr);

        wardrobeDiv.appendChild(wardrobeTable);

        $(this.output).append(wardrobeDiv);

        $(function(){window.wardrobeFuncs.showCategory(firstCategory)});

        function callShowCategory(evt){
            $(".wardrobe-category-button-selected").addClass("wardrobe-category-button").removeClass("wardrobe-category-button-selected");
            evt.currentTarget.className = "wardrobe-category-button-selected";
            window.wardrobeFuncs.showCategory(evt.currentTarget.categoryName);
        }
    }
});

window.wardrobeFuncs = {
    showCategory: function(categoryName){
        console.log("showing category");
        console.log(categoryName);
        var masterItemListTable = document.createElement('table');
        var category = window.wardrobe.categories[categoryName];
        var firstMasterItem = "";
        var needFirstMasterItem = true;

        for(var masterItemIdx in category.masterItems){
            var masterItem = window.items.itemMasters[category.masterItems[masterItemIdx]];
            var masterItemTr = document.createElement('tr');
            var masterItemTd = document.createElement('td');
            var masterItemSpan = document.createElement('span');
            var masterItemNameText = document.createTextNode(masterItem.name);

            masterItemSpan.appendChild(masterItemNameText);
            masterItemSpan.className = "wardrobe-master-item"
            masterItemSpan.masterItemName = category.masterItems[masterItemIdx];
            masterItemSpan.addEventListener("click", callShowVariant, true);

            if(needFirstMasterItem){ 
                firstMasterItem = category.masterItems[masterItemIdx];
                masterItemSpan.className = "wardrobe-master-item-selected";
                needFirstMasterItem = false;
            }
            masterItemTd.appendChild(masterItemSpan);
            masterItemTd.className = "wardrobe-master-item-row"
            masterItemTr.appendChild(masterItemTd);
            masterItemListTable.appendChild(masterItemTr);
        }
        var wardrobeMasterItemList = document.getElementById("wardrobeMasterItemList");
        console.log(wardrobeMasterItemList);
        wardrobeMasterItemList.replaceChild(masterItemListTable, wardrobeMasterItemList.firstElementChild);

        window.wardrobeFuncs.showVariant(firstMasterItem, 0);

        function callShowVariant(evt){
            $(".wardrobe-master-item-selected").addClass("wardrobe-master-item").removeClass("wardrobe-master-item-selected");
            evt.currentTarget.className = "wardrobe-master-item-selected";
            window.wardrobeFuncs.showVariant(evt.currentTarget.masterItemName, 0);
        }
    },

    showVariant: function(masterItemName, variantIndex){
        console.log("showing item variant");
        console.log(masterItemName + " " + variantIndex);
        var itemVariants = window.itemFuncs.getChildItemsForMaster(masterItemName);
        if(variantIndex > itemVariants.length - 1){
            variantIndex = 0;
        }
        if(variantIndex < 0){
            variantIndex = itemVariants.length - 1;
        }
        var itemVariant = itemVariants[variantIndex];
        var masterItem = window.items.itemMasters[masterItemName];
        console.log(masterItem);

        var itemVariantTitleSpan = document.createElement('span');
        var itemVariantNavigateBackSpan = document.createElement('span');
        var itemVariantNavigateForwardSpan = document.createElement('span');
        var itemVariantWearSpan = document.createElement('span');
        var itemVariantNavigateBackText = document.createTextNode('←');
        var itemVariantNavigateForwardText = document.createTextNode('→');
        var itemVariantWearText = document.createTextNode('Wear');
        itemVariantNavigateBackSpan.appendChild(itemVariantNavigateBackText);
        itemVariantNavigateForwardSpan.appendChild(itemVariantNavigateForwardText);
        itemVariantWearSpan.appendChild(itemVariantWearText);
        itemVariantNavigateBackSpan.className = "wardrobe-variant-navigation-span";
        itemVariantNavigateForwardSpan.className = "wardrobe-variant-navigation-span";
        itemVariantWearSpan.className = "wardrobe-variant-navigation-span";
        itemVariantNavigateBackSpan.masterItemName = masterItemName;
        itemVariantNavigateBackSpan.variantIndex = variantIndex - 1;
        itemVariantNavigateBackSpan.addEventListener('click', callShowVariant, true);
        itemVariantNavigateForwardSpan.masterItemName = masterItemName;
        itemVariantNavigateForwardSpan.variantIndex = variantIndex + 1;
        itemVariantNavigateForwardSpan.addEventListener('click', callShowVariant, true);
        itemVariantTitleSpan.id = "itemVariantTitle";
        itemVariantTitleSpan.appendChild(itemVariantNavigateBackSpan);
        itemVariantTitleSpan.appendChild(itemVariantWearSpan);
        itemVariantTitleSpan.appendChild(itemVariantNavigateForwardSpan);
        $("#itemVariantTitle").replaceWith(itemVariantTitleSpan);

        var itemVariantImage = document.createElement('img');
        itemVariantImage.src = "./Images/items/" + itemVariant.variant + ".jpg";
        itemVariantImage.width = 300;
        itemVariantImage.height = 300;
        var itemVariantPictureTd = document.createElement('td');
        itemVariantPictureTd.appendChild(itemVariantImage);
        itemVariantPictureTd.id = "itemVariantPictureCell";
        $("#itemVariantPictureCell").replaceWith(itemVariantPictureTd);

        function callShowVariant(evt){
            window.wardrobeFuncs.showVariant(evt.currentTarget.masterItemName, evt.currentTarget.variantIndex);
        }
    },
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
            ]
        },
        outerwear: {
            name: "Outerwear",
            masterItems: [
                "tshirtJeans",
                "skirtTop",
                "casualDress",
                "sluttyDress"
            ]
        },
        socks: {
            name: "Socks",
            masterItems: [
                "stockings"
            ]
        },
        footwear: {
            name: "Footwear",
            masterItems: [
                "shoes",
            ]
        },
        accessories: {
            name: "Accessories",
            masterItems: [
                "earrings",
                "collar",
                "hairband",
            ]
        },
        toys: {
            name: "Toys",
            masterItems: [
                "chastity",
                "analplug",
            ]
        }
    }
}