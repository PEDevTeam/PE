if(typeof window.items == "undefined"){
    window.items = {};
}

$.extend(true, window.items, {
    itemMasters:{
        //Room Items
        lamps:{
            itemType:"roomItems",
            clothingSlot:"lamps",
            name:"Lamps",
            itemMaster: "lamps",
            daring:0,
            disabled:false,
            hasWorn:false,
            isMale:true,
            isFemale:true,
            tags:{
                room:true,
            }
        },
        rooms:{
            itemType:"roomItems",
            clothingSlot:"lamps",
            name:"Room Decorations",
            itemMaster: "rooms",
            daring:0,
            disabled:false,
            hasWorn:false,
            isMale:true,
            isFemale:true,
            tags:{
                room:true,
            }
        }
    },
    itemChildren:{
        lamp00:{
            masterItem:"lamps",
            variant:"lamp_classic",
            name:"Classic Lamp",
            price:20,
            daring:0,
            disabled:false,
            isMale:true,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                room:true
            }
        },
        lamp01:{
            masterItem:"lamps",
            variant:"lamp_purple",
            name:"Purple Lamp",
            price:35,
            daring:0,
            disabled:false,
            isMale:true,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                room:true
            }
        },
        lamp02:{
            masterItem:"lamps",
            variant:"lamp_tube",
            name:"Tube Lamp",
            price:25,
            daring:0,
            disabled:false,
            isMale:true,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                room:true
            }
        },

        room00:{
            masterItem:"rooms",
            variant:"room_gamer",
            name:"Video Game Themed Decorations",
            price:100,
            daring:0,
            disabled:false,
            isMale:true,
            isFemale:false,
            isItemSet:false,
            setName:"room_gamer",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room01:{
            masterItem:"rooms",
            variant:"room_gamer_girl",
            name:"Video Game Themed Decorations",
            price:100,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"room_gamer",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room02:{
            masterItem:"rooms",
            variant:"room_geek",
            name:"Fantasy Themed Decorations",
            price:120,
            daring:0,
            disabled:false,
            isMale:true,
            isFemale:false,
            isItemSet:false,
            setName:"room_geek",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room03:{
            masterItem:"rooms",
            variant:"room_geek_girl",
            name:"Fantasy Themed Decorations",
            price:120,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"room_geek",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room04:{
            masterItem:"rooms",
            variant:"room_punk",
            name:"Various Punky Decorations",
            price:80,
            daring:0,
            disabled:false,
            isMale:true,
            isFemale:false,
            isItemSet:false,
            setName:"room_punk",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room05:{
            masterItem:"rooms",
            variant:"room_punk_girl",
            name:"Various Punky Decorations",
            price:80,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"room_punk",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room06:{
            masterItem:"rooms",
            variant:"room_sport",
            name:"Sport Themed Decorations",
            price:90,
            daring:0,
            disabled:false,
            isMale:true,
            isFemale:false,
            isItemSet:false,
            setName:"room_sport",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room07:{
            masterItem:"rooms",
            variant:"room_sport_girl",
            name:"Sport Themed Decorations",
            price:90,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"room_sport",
            canBuy:true,
            tags:{
                room:true
            }
        },
        room08:{
            masterItem:"rooms",
            variant:"room_girly_girl",
            name:"Girly Girl Room Decorations",
            price:0,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                room:true
            }
        },
    }
});
