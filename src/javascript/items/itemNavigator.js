window.itemNavigator = {
    getItemNavigator: function(navigatorType){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(typeof actVar.flags.wardrobeOpen == "undefined"){
            actVar.flags.wardrobeOpen = false;
        }

        var findOne = function (haystack, arr) {
            return arr.some(function (v) {
                return haystack.indexOf(v) >= 0;
            });
        };

        var clothingTypeSelectorTd = document.createElement('td');
        clothingTypeSelectorTd.className = "item-navigator-category-button-heading";
        clothingTypeSelectorTd.colSpan = 3;
        var firstCategory = "";
        var needFirstCategory = true;

        if(navigatorType == "wardrobe"){
            var categories = window.wardrobe.categories;
        }
        else{
            var categories = window.mall.categories;
        }

        for(var categoryName in categories){
            if(navigatorType == "wardrobe"){
                var filterMasterItems = [];
                for(var inventoryItemIdx in actVar.inventory){
                    var inventoryItem = actVar.inventory[inventoryItemIdx];
                    if(typeof inventoryItem === 'object' && inventoryItem.masterItem !== null){
                        if(filterMasterItems.indexOf(inventoryItem.masterItem) == -1){
                            filterMasterItems.push(inventoryItem.masterItem);
                        }
                    }
                }
            }
            else{
                var filterMasterItems = []
                for(var storeMasterItemIdx in window.mall.stores[actVar.currentStore].masterItems){
                    var storeMasterItem = window.mall.stores[actVar.currentStore].masterItems[storeMasterItemIdx];
                    var itemMaster = window.itemFuncs.getItemMaster(window.items.itemMasters[storeMasterItem]);
                    if(typeof itemMaster === 'object' && itemMaster.daring <= actVar.player.daring){
                        filterMasterItems.push(storeMasterItem);
                    }
                }
            }
            

            var category = categories[categoryName];
            if(findOne(filterMasterItems, category.masterItems)){
                var categorySpan = document.createElement('span')
                var categoryText = document.createTextNode(category.name);
                categorySpan.appendChild(categoryText);          
                categorySpan.addEventListener("click", callShowCategory, true);
                categorySpan.categoryName = categoryName;
                categorySpan.navigatorType = navigatorType;
                categorySpan.className = "item-navigator-category-button";
                categorySpan.id = "item-navigator-category-" + categoryName;

                if(needFirstCategory){ 
                    firstCategory = categoryName;
                    categorySpan.className = "item-navigator-category-button-selected";
                    needFirstCategory = false;
                }
                clothingTypeSelectorTd.appendChild(categorySpan);
            }
        }

        if(!needFirstCategory){
            var itemNavigatorDiv = document.createElement('div');
            var col1 = document.createElement('col');
            var col2 = document.createElement('col');
            var col3 = document.createElement('col');
            col1.style = "width:30%";
            col2.style = "width:30%";
            col3.style = "width:40%";

            var navigatorTable = document.createElement('table');
            navigatorTable.appendChild(col1);
            navigatorTable.appendChild(col2);
            navigatorTable.appendChild(col3);

            var clothingTypeSelectorTr = document.createElement('tr');
            clothingTypeSelectorTr.appendChild(clothingTypeSelectorTd);
            navigatorTable.appendChild(clothingTypeSelectorTr);
            navigatorTable.id = "navigatorTable";
            navigatorTable.classList.add("item-navigator-selector-table");
            if(actVar.flags.wardrobeOpen){
                navigatorTable.classList.add("isOpen");
            }

            var clothingListTr = document.createElement('tr');
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
            var itemVariantDescriptionTr = document.createElement('tr');
            var itemVariantDescriptionTd = document.createElement('td');
            var itemVariantDescriptionSpan = document.createElement('span');
            var itemVariantSetTr = document.createElement('tr');
            var itemVariantSetTd = document.createElement('td');
            var itemVariantSetSpan = document.createElement('span');
            var itemVariantSetLogoSpan = document.createElement('span');
            var itemVariantSetTooltipSpan = document.createElement('span');
            var itemVariantTagsTr = document.createElement('tr');
            var itemVariantTagsTd = document.createElement('td');

            masterItemListTd.id = "masterItemListTd";
            itemVariantSelectorTd.id = "itemVariantSelectorTd";
            itemVariantSelectorTd.colSpan = 2
            masterItemListTd.className = "item-navigator-master-item-list";
            masterItemListTd.appendChild(masterItemListDiv);

            itemVariantTitleSpan.id = "itemVariantTitle";
            itemVariantTitleTd.appendChild(itemVariantTitleSpan)
            itemVariantTitleTr.appendChild(itemVariantTitleTd);
            itemVariantPictureTd.id = "itemVariantPictureCell";
            itemVariantPictureTr.appendChild(itemVariantPictureTd);
            itemVariantDescriptionSpan.id = "itemVariantDescriptionSpan";
            itemVariantDescriptionTd.appendChild(itemVariantDescriptionSpan);
            itemVariantDescriptionTr.appendChild(itemVariantDescriptionTd);
            itemVariantSetLogoSpan.id = "itemVariantSetLogoSpan";
            itemVariantSetSpan.id = "itemVariantSetSpan";
            itemVariantSetTooltipSpan.id = "itemVariantSetTooltipSpan";
            itemVariantSetTd.appendChild(itemVariantSetLogoSpan);
            itemVariantSetTd.appendChild(itemVariantSetSpan);
            itemVariantSetTd.appendChild(itemVariantSetTooltipSpan);
            itemVariantSetTd.classList.add("tooltip");
            itemVariantSetTr.appendChild(itemVariantSetTd);
            itemVariantTagsTd.id = "itemVariantTagsCell";
            itemVariantTagsTr.appendChild(itemVariantTagsTd);
            itemVariantTable.appendChild(itemVariantTitleTr);
            itemVariantTable.appendChild(itemVariantPictureTr);
            itemVariantTable.appendChild(itemVariantDescriptionTr);
            itemVariantTable.appendChild(itemVariantSetTr);
            itemVariantTable.appendChild(itemVariantTagsTr);
            itemVariantTable.className = "item-variant-table";
            itemVariantSelectorDiv.className = "item-variant-div";
            itemVariantSelectorDiv.appendChild(itemVariantTable);        
            itemVariantSelectorTd.appendChild(itemVariantSelectorDiv);

            clothingListTr.appendChild(masterItemListTd);
            clothingListTr.appendChild(itemVariantSelectorTd);
            navigatorTable.appendChild(clothingListTr);

            var showWardrobeButton = document.createElement('div');
            var showWardrobeButtonTxt = document.createTextNode("Show Wardrobe");
            showWardrobeButton.appendChild(showWardrobeButtonTxt);
            showWardrobeButton.addEventListener('click', showWardrobe, true);
            showWardrobeButton.classList.add("wardrobe-button-show");
            showWardrobeButton.id = "showWardrobeButton"
            var hideWardrobeButton = document.createElement('div');
            var hideWardrobeButtonTxt = document.createTextNode("Hide Wardrobe");
            hideWardrobeButton.appendChild(hideWardrobeButtonTxt);
            hideWardrobeButton.addEventListener('click', hideWardrobe, true);
            hideWardrobeButton.classList.add("wardrobe-button-hide");
            hideWardrobeButton.id = "hideWardrobeButton"

            if(actVar.flags.wardrobeOpen){
                showWardrobeButton.classList.add("hidden");
            }
            else{
                hideWardrobeButton.classList.add("hidden");
            }

            itemNavigatorDiv.appendChild(showWardrobeButton);
            itemNavigatorDiv.appendChild(hideWardrobeButton);
            itemNavigatorDiv.appendChild(navigatorTable);
            itemNavigatorDiv.id = "itemNavigatorDiv";
            itemNavigatorDiv.firstCategory = firstCategory;
        }
        else{
            var itemNavigatorDiv = document.createElement('div');
            itemNavigatorDiv.firstCategory = "";
        }

        return itemNavigatorDiv;

        function callShowCategory(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            window.itemNavigator.showCategory(evt.currentTarget.categoryName, evt.currentTarget.navigatorType);
        }

        function showWardrobe(evt){
            document.getElementById("navigatorTable").classList.toggle("isOpen");
            document.getElementById("hideWardrobeButton").classList.toggle("hidden");
            document.getElementById("showWardrobeButton").classList.toggle("hidden");
            actVar.flags.wardrobeOpen = true;
        }

        function hideWardrobe(evt){
            document.getElementById("navigatorTable").classList.toggle("isOpen");
            document.getElementById("hideWardrobeButton").classList.toggle("hidden");
            document.getElementById("showWardrobeButton").classList.toggle("hidden");
            actVar.flags.wardrobeOpen = false;
        }
    },

    showCategory: function(categoryName, navigatorType){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        $(".item-navigator-category-button-selected").addClass("item-navigator-category-button").removeClass("item-navigator-category-button-selected");
        $("#item-navigator-category-" + categoryName).addClass("item-navigator-category-button-selected").removeClass("item-navigator-category-button");

        var masterItemListTable = document.createElement('table');

        if(navigatorType == "wardrobe"){
            var category = window.wardrobe.categories[categoryName];
        }
        else{
            var category = window.mall.categories[categoryName];
        }
        var firstMasterItem = "";
        var curMasterItem = actVar.wardrobeCurMasterItem;
        var masterItemCategory = window.itemNavigator.getCategoryForMasterItem(curMasterItem, navigatorType)
        if(masterItemCategory !== categoryName){
            var needFirstMasterItem = true;
        }
        else{
            var needFirstMasterItem = false;
        }

        for(var masterItemIdx in category.masterItems){
            if(navigatorType == "wardrobe"){
                var filterMasterItems = [];
                for(var inventoryItemIdx in actVar.inventory){
                    var inventoryItem = window.itemFuncs.getItemByVariant(actVar.inventory[inventoryItemIdx]);
                    if(typeof inventoryItem === 'object' && inventoryItem.masterItem !== null && !inventoryItem.disabled){
                        if(filterMasterItems.indexOf(inventoryItem.masterItem) == -1){
                            filterMasterItems.push(inventoryItem.masterItem);
                        }
                    }
                }
            }
            else{
                var filterMasterItems = []
                for(var storeMasterItemIdx in window.mall.stores[actVar.currentStore].masterItems){
                    var storeMasterItem = window.mall.stores[actVar.currentStore].masterItems[storeMasterItemIdx]
                    var itemMaster = window.itemFuncs.getItemMaster(window.items.itemMasters[storeMasterItem])
                    if(itemMaster.daring <= actVar.player.daring && !itemMaster.disabled){
                        filterMasterItems.push(storeMasterItem);
                    }
                }
            }
            var masterItem = window.itemFuncs.getItemMaster(category.masterItems[masterItemIdx]);
            if(filterMasterItems.includes(category.masterItems[masterItemIdx]) && !masterItem.disabled){

                var masterItemTr = document.createElement('tr');
                var masterItemTd = document.createElement('td');
                var masterItemSpan = document.createElement('span');
                var masterItemNameText = document.createTextNode(masterItem.name);

                masterItemSpan.appendChild(masterItemNameText);
                masterItemSpan.className = "item-navigator-master-item"
                masterItemSpan.masterItemName = category.masterItems[masterItemIdx];
                masterItemSpan.navigatorType = navigatorType;
                masterItemSpan.addEventListener("click", callShowVariant, true);

                if(needFirstMasterItem){ 
                    firstMasterItem = category.masterItems[masterItemIdx];
                    masterItemSpan.className = "item-navigator-master-item-selected";
                    needFirstMasterItem = false;
                }
                else if(curMasterItem == category.masterItems[masterItemIdx]){
                    firstMasterItem = category.masterItems[masterItemIdx];
                    masterItemSpan.className = "item-navigator-master-item-selected";
                }
                masterItemTd.appendChild(masterItemSpan);
                masterItemTd.className = "item-navigator-master-item-row"
                masterItemTr.appendChild(masterItemTd);
                masterItemListTable.appendChild(masterItemTr);
            }
        }

        var itemNavigatorMasterItemList = document.getElementById("masterItemListTd");
        itemNavigatorMasterItemList.replaceChild(masterItemListTable, itemNavigatorMasterItemList.firstElementChild);

        window.itemNavigator.showVariant(firstMasterItem, 0, navigatorType);

        function callShowVariant(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            $(".item-navigator-master-item-selected").addClass("item-navigator-master-item").removeClass("item-navigator-master-item-selected");
            evt.currentTarget.className = "item-navigator-master-item-selected";
            window.itemNavigator.showVariant(evt.currentTarget.masterItemName, 0, evt.currentTarget.navigatorType);
        }
    },

    showVariant: function(masterItemName, variantIndex, navigatorType){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        if(navigatorType == "wardrobe"){
            var itemVariants = [];
            var itemsOfMaster = window.inventoryFuncs.getChildItemsForMaster(masterItemName);
            for(var itemVariantIdx in itemsOfMaster){
                var itemVariant = window.itemFuncs.getItemByVariant(itemsOfMaster[itemVariantIdx]);
                if(!itemVariant.disabled){
                    itemVariants.push(itemVariant);
                }
            }
        }
        else{
            var itemVariants = []
            var itemsOfMaster = window.itemFuncs.getChildItemsForMaster(masterItemName);
            for(var itemVariantIdx in itemsOfMaster){
                var itemVariant = window.itemFuncs.getItemByVariant(itemsOfMaster[itemVariantIdx]);
                if(!itemVariant.disabled){
                    itemVariants.push(itemVariant);
                }
            }
        }
        
        if(itemVariants.length > 0){
            if(variantIndex > itemVariants.length - 1){
                variantIndex = 0;
            }
            if(variantIndex < 0){
                variantIndex = itemVariants.length - 1;
            }

            var itemVariant = window.itemFuncs.getItemByVariant(itemVariants[variantIndex]);
            var masterItem = window.items.itemMasters[masterItemName];
            
            var itemVariantNavigateBackSpan = document.createElement('span');
            var itemVariantNavigateBackText = document.createTextNode('←');
            itemVariantNavigateBackSpan.appendChild(itemVariantNavigateBackText);
            itemVariantNavigateBackSpan.className = "item-navigator-variant-navigation-span";
            itemVariantNavigateBackSpan.masterItemName = masterItemName;
            itemVariantNavigateBackSpan.variantIndex = variantIndex - 1;
            itemVariantNavigateBackSpan.navigatorType = navigatorType;
            itemVariantNavigateBackSpan.addEventListener('click', callShowVariant, true);

            var itemVariantNavigateForwardSpan = document.createElement('span');
            var itemVariantNavigateForwardText = document.createTextNode('→');
            itemVariantNavigateForwardSpan.appendChild(itemVariantNavigateForwardText);
            itemVariantNavigateForwardSpan.className = "item-navigator-variant-navigation-span";
            itemVariantNavigateForwardSpan.masterItemName = masterItemName;
            itemVariantNavigateForwardSpan.variantIndex = variantIndex + 1;
            itemVariantNavigateForwardSpan.navigatorType = navigatorType;
            itemVariantNavigateForwardSpan.addEventListener('click', callShowVariant, true);

            if(navigatorType == "wardrobe"){
                if(window.wardrobeFuncs.isItemVariantWearing(itemVariant) && !(itemVariant.masterItem == 'chastity' && actVar.flags.chastityLocked)){
                    var itemVariantWearSpan = document.createElement('span');
                    var itemVariantWearText = document.createTextNode("Remove");
                    itemVariantWearSpan.appendChild(itemVariantWearText);
                    itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                    itemVariantWearSpan.className += " item-navigator-variant-already-owned";
                    itemVariantWearSpan.itemVariant = itemVariant.variant;
                    itemVariantWearSpan.masterItemName = masterItemName;
                    itemVariantWearSpan.variantIndex = variantIndex;
                    itemVariantWearSpan.navigatorType = navigatorType;
                    itemVariantWearSpan.addEventListener('click', removeItemVariant, true);
                }
                else if(window.wardrobeFuncs.isItemVariantWearing(itemVariant) && itemVariant.masterItem == 'chastity' && actVar.flags.chastityLocked && !(actVar.flags.chastityKey)){
                    var itemVariantWearSpan = document.createElement('span');
                    var itemVariantWearText = document.createTextNode("Unlock");
                    itemVariantWearSpan.appendChild(itemVariantWearText);
                    itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                    itemVariantWearSpan.className += " item-navigator-variant-unlock";
                    itemVariantWearSpan.itemVariant = itemVariant.variant;
                    itemVariantWearSpan.masterItemName = masterItemName;
                    itemVariantWearSpan.variantIndex = variantIndex;
                    itemVariantWearSpan.navigatorType = navigatorType;
                    itemVariantWearSpan.addEventListener('click', removeItemVariant, true);
                }
                else if(window.wardrobeFuncs.isItemVariantWearing(itemVariant) && itemVariant.masterItem == 'chastity' && actVar.flags.chastityLocked && actVar.flags.chastityKey){
                    var itemVariantWearSpan = document.createElement('span');
                    var itemVariantWearText = document.createTextNode("Locked");
                    itemVariantWearSpan.appendChild(itemVariantWearText);
                    itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                    itemVariantWearSpan.className += " item-navigator-variant-locked";
                    itemVariantWearSpan.itemVariant = itemVariant.variant;
                    itemVariantWearSpan.masterItemName = masterItemName;
                    itemVariantWearSpan.variantIndex = variantIndex;
                    itemVariantWearSpan.navigatorType = navigatorType;
                }
                else if(window.inventoryFuncs.hasTag(itemVariant, 'wet')){
                    var itemVariantWearSpan = document.createElement('span');
                    var itemVariantWearText = document.createTextNode('Wet...');
                    itemVariantWearSpan.appendChild(itemVariantWearText);
                    itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                    itemVariantWearSpan.className += " item-navigator-variant-wet";
                    itemVariantWearSpan.itemVariant = itemVariant.variant;
                    itemVariantWearSpan.masterItemName = masterItemName;
                    itemVariantWearSpan.variantIndex = variantIndex;
                    itemVariantWearSpan.navigatorType = navigatorType;
                    itemVariantWearSpan.addEventListener('click', wearItemVariant, true);
                }
                else{
                    var itemVariantWearSpan = document.createElement('span');
                    var itemVariantWearText = document.createTextNode('Wear');
                    itemVariantWearSpan.appendChild(itemVariantWearText);
                    itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                    itemVariantWearSpan.itemVariant = itemVariant.variant;
                    itemVariantWearSpan.masterItemName = masterItemName;
                    itemVariantWearSpan.variantIndex = variantIndex;
                    itemVariantWearSpan.navigatorType = navigatorType;
                    itemVariantWearSpan.addEventListener('click', wearItemVariant, true);
                }
            }
            else{
                if(window.inventoryFuncs.isItemVariantOwned(itemVariant)){
                    var itemVariantWearSpan = document.createElement('span');
                    var itemVariantWearText = document.createTextNode("Already Owned");
                    itemVariantWearSpan.appendChild(itemVariantWearText);
                    itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                    itemVariantWearSpan.className += " item-navigator-variant-already-owned";
                    itemVariantWearSpan.style.cursor = "not-allowed";
                }
                else{
                    if(itemVariant.daring <= actVar.player.daring){
                        if(itemVariant.price <= actVar.player.money){
                            var itemVariantWearSpan = document.createElement('span');
                            var itemVariantWearText = document.createTextNode('Buy - $' + itemVariant.price);
                            itemVariantWearSpan.appendChild(itemVariantWearText);
                            itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                            itemVariantWearSpan.itemVariant = itemVariant.variant;
                            itemVariantWearSpan.masterItemName = masterItemName;
                            itemVariantWearSpan.variantIndex = variantIndex;
                            itemVariantWearSpan.navigatorType = navigatorType;
                            itemVariantWearSpan.addEventListener('click', buyItemVariant, true);
                        }
                        else{
                            var itemVariantWearSpan = document.createElement('span');
                            var itemVariantWearText = document.createTextNode("Can't Afford - $" + itemVariant.price);
                            itemVariantWearSpan.appendChild(itemVariantWearText);
                            itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                            itemVariantWearSpan.className += " item-navigator-variant-cant-afford";
                            itemVariantWearSpan.style.cursor = "not-allowed";
                        }
                    }
                    else{
                        var itemVariantWearSpan = document.createElement('span');
                        var itemVariantWearText = document.createTextNode("Too Risqué");
                        itemVariantWearSpan.appendChild(itemVariantWearText);
                        itemVariantWearSpan.className = "item-navigator-variant-navigation-span";
                        itemVariantWearSpan.className += " item-navigator-variant-cant-afford";
                        itemVariantWearSpan.style.cursor = "not-allowed";
                    }
                }
            }

            var itemVariantTitleSpan = document.createElement('span');            
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

            //var itemVariantDescriptionText = document.createTextNode(variantIndex + ' - ' + itemVariant.name);
            var itemVariantDescriptionText = document.createTextNode(itemVariant.name);
            var itemVariantDescriptionSpan = document.createElement('span');
            itemVariantDescriptionSpan.id = "itemVariantDescriptionSpan";
            itemVariantDescriptionSpan.appendChild(itemVariantDescriptionText);

            if(itemVariant.isItemSet){
                var itemVariantSetLogoText = document.createTextNode("👙 ");
                var itemVariantSetLogoSpan = document.createElement('span');
                var itemVariantSetText = document.createTextNode(itemVariant.setName);
                var itemVariantSetSpan = document.createElement('span');
                var itemVariantSetTooltipText = document.createTextNode("This item is part of a set, wear with other clothing with the same set name to match!");
                var itemVariantSetTooltipSpan = document.createElement('span');
                itemVariantSetLogoSpan.id = "itemVariantSetLogoSpan";
                itemVariantSetLogoSpan.classList.add('item-set-icon');
                itemVariantSetLogoSpan.appendChild(itemVariantSetLogoText);
                itemVariantSetSpan.id = "itemVariantSetSpan";
                itemVariantSetSpan.appendChild(itemVariantSetText);
                itemVariantSetTooltipSpan.id = "itemVariantSetTooltipSpan";
                itemVariantSetTooltipSpan.classList.add("tooltiptext");
                itemVariantSetTooltipSpan.appendChild(itemVariantSetTooltipText)
                $("#itemVariantSetLogoSpan").replaceWith(itemVariantSetLogoSpan);
                $("#itemVariantSetSpan").replaceWith(itemVariantSetSpan);
                $("#itemVariantSetTooltipSpan").replaceWith(itemVariantSetTooltipSpan);
            }
            else{
                var itemVariantSetLogoSpan = document.createElement('span'); 
                var itemVariantSetSpan = document.createElement('span');
                var itemVariantSetTooltipSpan = document.createElement('span');
                itemVariantSetLogoSpan.id = "itemVariantSetLogoSpan";
                itemVariantSetSpan.id = "itemVariantSetSpan";
                itemVariantSetTooltipSpan.id = "itemVariantSetTooltipSpan";
                $("#itemVariantSetLogoSpan").replaceWith(itemVariantSetLogoSpan);
                $("#itemVariantSetSpan").replaceWith(itemVariantSetSpan);
                $("#itemVariantSetTooltipSpan").replaceWith(itemVariantSetTooltipSpan);
            }

            var itemTags = window.inventoryFuncs.getTagsForInventoryItem(itemVariant);
            var itemVariantTagsDiv = window.itemNavigator.formatTagsDOM(itemTags);
            var itemVariantTagsTd = document.createElement('td');
            itemVariantTagsTd.id = "itemVariantTagsCell";
            itemVariantTagsTd.appendChild(itemVariantTagsDiv);
            $("#itemVariantTagsCell").replaceWith(itemVariantTagsTd);
        }
        else{
            var itemVariantDescriptionText = document.createTextNode('No Items');
            var itemVariantDescriptionSpan = document.createElement('span');
            itemVariantDescriptionSpan.id = "itemVariantDescriptionSpan";
            itemVariantDescriptionSpan.appendChild(itemVariantDescriptionText);
        }
        $("#itemVariantDescriptionSpan").replaceWith(itemVariantDescriptionSpan);

        
        function callShowVariant(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            window.itemNavigator.showVariant(evt.currentTarget.masterItemName, evt.currentTarget.variantIndex, evt.currentTarget.navigatorType);
        }

        function buyItemVariant(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            window.itemFuncs.buyItemVariant(evt.currentTarget.itemVariant);
            window.itemNavigator.showVariant(evt.currentTarget.masterItemName, evt.currentTarget.variantIndex, evt.currentTarget.navigatorType);
            $("#sidebar_money").text(State.active.variables.player.money);
        }

        function wearItemVariant(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            if(evt.currentTarget.itemVariant.masterItem == 'chastity'){
                actVar.flags.chastityLocked == true;
            };
            window.wardrobeFuncs.wearItemVariant(evt.currentTarget.itemVariant);
            window.itemNavigator.showVariant(evt.currentTarget.masterItemName, evt.currentTarget.variantIndex, evt.currentTarget.navigatorType);
            window.wardrobeFuncs.updateSidebar();
            
            if(document.getElementById("travel-passage")){
                if(document.getElementById("clothing_selector")){
                    actVar.wardrobeCurMasterItem = evt.currentTarget.masterItemName;
                    actVar.wardrobeCurVariantIndex = evt.currentTarget.variantIndex;
                    actVar.wardrobeCurNavigatorType = evt.currentTarget.navigatorType;
                    actVar.wardrobeCurCategory = window.itemNavigator.getCategoryForMasterItem(evt.currentTarget.masterItemName, evt.currentTarget.navigatorType);
                    $("#clothing_selector").empty();
                    $("#clothing_selector").wiki('<<display "Clothing Selector">>');
                }
                else{
                    $("#travel-passage").empty();
                    $("#travel-passage").wiki('<<Travel>>');
                }
            }
        }

        function removeItemVariant(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }
            if(evt.currentTarget.itemVariant.masterItem == 'chastity'){
                actVar.flags.chastityLocked == false;
            };
            window.wardrobeFuncs.removeItemVariant(evt.currentTarget.itemVariant);
            window.itemNavigator.showVariant(evt.currentTarget.masterItemName, evt.currentTarget.variantIndex, evt.currentTarget.navigatorType);
            window.wardrobeFuncs.updateSidebar();

            if(document.getElementById("travel-passage")){
                if(document.getElementById("clothing_selector")){
                    actVar.wardrobeCurMasterItem = evt.currentTarget.masterItemName;
                    actVar.wardrobeCurVariantIndex = evt.currentTarget.variantIndex;
                    actVar.wardrobeCurNavigatorType = evt.currentTarget.navigatorType;
                    actVar.wardrobeCurCategory = window.itemNavigator.getCategoryForMasterItem(evt.currentTarget.masterItemName, evt.currentTarget.navigatorType);
                    $("#clothing_selector").empty();
                    $("#clothing_selector").wiki('<<display "Clothing Selector">>');
                }
                else{
                    $("#travel-passage").empty();
                    $("#travel-passage").wiki('<<Travel>>');
                }
            }
        }
    },
    
    getCategoryForMasterItem: function(masterItemName, navigatorType){
        if(navigatorType == "wardrobe"){
            for(var categoryIdx in window.wardrobe.categories){
                var category = window.wardrobe.categories[categoryIdx];
                var masterCategory = false;
                if(category.masterItems){
                    category.masterItems.forEach(function(a){
                        if(a == masterItemName) masterCategory = true;
                    })
                }
                if(masterCategory){
                    return categoryIdx
                }
            }            
        }
        else{
            for(var categoryIdx in window.mall.categories){
                var category = window.mall.categories[categoryIdx];
                var masterCategory = false;
                if(category.masterItems){
                    category.masterItems.forEach(function(a){
                        if(a == masterItemName) masterCategory = true;
                    })
                }
                if(masterCategory){
                    return categoryIdx
                }
            }
        }
    },

    formatTagsDOM: function(itemTagArr){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

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
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

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

    getClothingSetNavigator: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var clothingSetHolderDiv = document.createElement('div');
        var clothingSetTitleDiv = document.createElement('div');
        var clothingSetTitleText = document.createTextNode('Clothing Sets:');
        clothingSetTitleDiv.appendChild(clothingSetTitleText);
        clothingSetTitleDiv.className = "clothing-set-title-div"
        clothingSetHolderDiv.appendChild(clothingSetTitleDiv);

        var clothingSetDiv = document.createElement('div');
        clothingSetDiv.className = "clothing-set-div";

        for(var clothingSetIdx in actVar.clothingSets){
            var clothingSet = actVar.clothingSets[clothingSetIdx];

            var clothingSetItemDiv = document.createElement('div');
            var clothingSetSpan = document.createElement('span');
            var clothingSetTextDiv = document.createElement('div');
            var clothingSetText = document.createTextNode(clothingSet.setName);

            clothingSetTextDiv.appendChild(clothingSetText);
            clothingSetTextDiv.className = "clothing-set-text-div";

            clothingSetSpan.appendChild(clothingSetTextDiv);
            clothingSetSpan.className = "clothing-set-navigator-span-button";
            clothingSetSpan.setName = clothingSet.setName;
            clothingSetSpan.addEventListener('click', wearClothingSet, true);
            clothingSetSpan.title = "Wear " + clothingSet.setName + " Clothing Set";

            clothingSetItemDiv.className = "clothing-set-item-div";
            clothingSetItemDiv.appendChild(clothingSetSpan);


            var clothingOptionsDiv = document.createElement('div');
            clothingOptionsDiv.className = "clothing-options-div";

            var clothingUpdateSpan = document.createElement('span');
            var clothingUpdateText = document.createTextNode('💾');
            clothingUpdateSpan.appendChild(clothingUpdateText);
            clothingUpdateSpan.setName = clothingSet.setName;
            clothingUpdateSpan.addEventListener('click', updateClothingSet, true);
            clothingUpdateSpan.className = "clothing-set-functions"
            clothingUpdateSpan.title = "Set Clothing"

            var clothingRenameSpan = document.createElement('span');
            var clothingRenameText = document.createTextNode('✏️');
            clothingRenameSpan.appendChild(clothingRenameText);
            clothingRenameSpan.setName = clothingSet.setName;
            clothingRenameSpan.addEventListener('click', renameClothingSet, true);
            clothingRenameSpan.className = "clothing-set-functions"
            clothingRenameSpan.title = "Rename"

            var clothingDeleteSpan = document.createElement('span');
            var clothingDeleteText = document.createTextNode('🚫');
            clothingDeleteSpan.appendChild(clothingDeleteText);
            clothingDeleteSpan.setName = clothingSet.setName;
            clothingDeleteSpan.addEventListener('click', removeClothingSet, true);
            clothingDeleteSpan.className = "clothing-set-functions"
            clothingDeleteSpan.title = "Delete"

            clothingOptionsDiv.appendChild(clothingUpdateSpan);
            clothingOptionsDiv.appendChild(clothingRenameSpan);
            clothingOptionsDiv.appendChild(clothingDeleteSpan);

            clothingSetItemDiv.appendChild(clothingOptionsDiv);


            clothingSetDiv.appendChild(clothingSetItemDiv);
        }

        var addNewSetDiv = document.createElement('div');
        var addNewSetSpan = document.createElement('span');
        var addNewSetText = document.createTextNode('+');
        addNewSetSpan.appendChild(addNewSetText);
        addNewSetSpan.className = "clothing-set-navigator-span-button";
        addNewSetSpan.setName = "New Set";
        addNewSetSpan.addEventListener('click', addClothingSet, true);
        addNewSetSpan.title = "Add New Set";
        addNewSetDiv.appendChild(addNewSetSpan);

        clothingSetDiv.appendChild(addNewSetDiv);
        clothingSetHolderDiv.appendChild(clothingSetDiv);
        clothingSetHolderDiv.id = "clothingSetHolderDiv";

        return clothingSetHolderDiv;

        function addClothingSet(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            window.itemNavigator.addClothingSet(evt.currentTarget.setName);
            window.itemNavigator.refreshClothingSetNavigator();
        };

        function wearClothingSet(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            window.itemNavigator.wearClothingSet(evt.currentTarget.setName);
            window.wardrobeFuncs.updateSidebar();
            if(document.getElementById("travel-passage")){
                if(document.getElementById("clothing_selector")){
                    $("#clothing_selector").empty();
                    $("#clothing_selector").wiki('<<display "Clothing Selector">>');
                }
                else{
                    $("#travel-passage").empty();
                    $("#travel-passage").wiki('<<Travel>>');
                }
            }
        };

        function renameClothingSet(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            var newName = prompt("Please enter the new name", "");
            if(newName !== null && newName !== ""){
                window.itemNavigator.renameClothingSet(evt.currentTarget.setName, newName);
                window.itemNavigator.refreshClothingSetNavigator();
            }
        };

        function removeClothingSet(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            window.itemNavigator.removeClothingSet(evt.currentTarget.setName);
            window.itemNavigator.refreshClothingSetNavigator();
        };

        function updateClothingSet(evt){
            if(SugarCube.State){
                var actVar = SugarCube.State.active.variables;
            }
            else{
                var actVar = State.active.variables;
            }

            window.itemNavigator.updateClothingSet(evt.currentTarget.setName);
        }
    },

    refreshClothingSetNavigator: function(){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var clothingSetHolderDiv = window.itemNavigator.getClothingSetNavigator();
        $("#clothingSetHolderDiv").replaceWith(clothingSetHolderDiv);
    },

    addClothingSet: function (setName){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var setIndex = 1;
        while(window.itemNavigator.checkClothingSetExists(setName)){
            setName = setName + " " + setIndex;
            setIndex++;
        }
        var newClothingSet = {
            default: false,
            setName: setName,
            itemVariants: []
        }
        actVar.clothingSets.push(newClothingSet);
    },

    renameClothingSet: function(oldName, newName){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSetIdx in actVar.clothingSets){
            if(actVar.clothingSets[clothingSetIdx].setName == oldName){
                actVar.clothingSets[clothingSetIdx].setName = newName;
            }
        }
    },

    removeClothingSet: function(setName){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSetIdx in actVar.clothingSets){
            if(actVar.clothingSets[clothingSetIdx].setName == setName){
                actVar.clothingSets.splice(clothingSetIdx, 1);
            }
        }
    },

    updateClothingSet: function(setName){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSetIdx in actVar.clothingSets){
            if(actVar.clothingSets[clothingSetIdx].setName == setName){
                var clothingSet = actVar.clothingSets[clothingSetIdx];
                clothingSet.itemVariants = [];
                for(var wearingItemIdx in actVar.player.clothingSlots){
                    var wearingItem = actVar.player.clothingSlots[wearingItemIdx]
                    if(wearingItem !== null){
                        clothingSet.itemVariants.push(wearingItem.variant);
                    }
                }
            }
        }        
    },

    wearClothingSet: function(setName){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var clothingSet = null;
        for(var clothingSetIdx in actVar.clothingSets){
            if(actVar.clothingSets[clothingSetIdx].setName == setName){
                clothingSet = actVar.clothingSets[clothingSetIdx];
            }
        }
        if(clothingSet !== null){
            window.wardrobeFuncs.removeAllClothingWithChastityCheck();
            for(var itemVariantIdx in clothingSet.itemVariants){
                if(window.inventoryFuncs.notTag(clothingSet.itemVariants[itemVariantIdx], 'wet')){
                    window.wardrobeFuncs.wearItemVariant(clothingSet.itemVariants[itemVariantIdx]);
                }
            }
        }
    },

    checkClothingSetExists: function(setName){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        var setExists = false;
        for(var clothingSetIdx in actVar.clothingSets){
            if(actVar.clothingSets[clothingSetIdx].setName == setName){
                setExists = true;
            }
        }
        return setExists;
    },

    newOrUpdatedClothingSetFromWorn: function(setName){
        if(!(this.checkClothingSetExists(setName))){
            this.addClothingSet(setName);
            
        }
        this.updateClothingSet(setName);
    },

    replaceVariantForAllClothingSets: function(fromVariant, toVariant){
        if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
        }

        for(var clothingSetIdx in actVar.clothingSets){
            for(var itemVariantIdx in actVar.clothingSets[clothingSetIdx].itemVariants){
                if(actVar.clothingSets[clothingSetIdx].itemVariants[itemVariantIdx] == fromVariant){
                    actVar.clothingSets[clothingSetIdx].itemVariants[itemVariantIdx] = toVariant;
                }
            }
        }
    }
}

window.itemNavigator.clothingSets = [
    {
        default:true,
        setName: "School",
        itemVariants: [
            "school_male",
            "black_shoes_00",
            "lucky_jocks_00",
        ]
    },
    {
        default:true,
        setName: "Casual",
        itemVariants: [
            "tshirt_jeans_00",
            "sneakers_00",
            "lucky_jocks_00",
        ]
    },
    {
        default:true,
        setName: "Nightwear",
        itemVariants: [
            "male_pyjamas_00",
        ]
    }
]