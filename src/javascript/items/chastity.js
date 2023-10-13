if(typeof window.items == "undefined"){
    window.items = {};
}

$.extend(true, window.items, {
    itemMasters:{
        //Chastity
        chastity:{
            itemType:"chastity",
            clothingSlot:"chastity",
            name:"Chastity Device",
            itemMaster: "chastity",
            daring:4,
            disabled:false,
            hasWorn:false,
            isMale:true,
            isFemale:true,
            tags:{
                plain:true,
            }
        },
    },
    itemChildren:{
        //chastity
        chastity_cb6000:{
            masterItem:"chastity",
            variant:"chastity_cb6000",
            name:"Clear Chastiy Cage",
            price:50,
            daring:4,
            disabled:false,
            isMale:true,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                plain:true,
            }
        },
        chastity_cb6000s:{
            masterItem:"chastity",
            variant:"chastity_cb6000s",
            name:"Small Chastiy Cage",
            price:50,
            daring:4,
            disabled:false,
            isMale:true,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:false,
            tags:{
                plain:true,
            }
        },
    }
});