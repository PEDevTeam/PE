if(typeof window.items == "undefined"){
    window.items = {};
}

$.extend(true, window.items, {
    itemMasters:{
        //Maid Outfits
        maid:{
            itemType:"maid",
            clothingSlot:"maid",
            name: "Maid Outfit",
            itemMaster: "maid",
            daring:0,
            disabled:false,
            hasWorn:false,
            isMale:true,
            isFemale:false,
            tags:{
                school:true,
                plain:true,
            }
        },
    },
    itemChildren:{
         //Maid
         maid0:{
            masterItem:"maid",
            variant:"maid_outfit_00",
            name:"Frilly French Maid Outfit",
            price:0,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            tags:{
                maid:true,
            }
        },
        maid1:{
            masterItem:"maid",
            variant:"maid_outfit_01",
            name:"Latex Maid Outfit",
            price:0,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            tags:{
                maid:true,
            }
        },
    }
});