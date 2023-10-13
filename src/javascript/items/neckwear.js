if(typeof window.items == "undefined"){
    window.items = {};
}

$.extend(true, window.items, {
    itemMasters:{
        //Neckwear
        chokers:{
            itemType:"neckwear",
            clothingSlot:"neckwear",
            name:"Chokers",
            itemMaster: "chokers",
            daring:5,
            disabled:false,
            hasWorn:false,
            isMale:false,
            isFemale:true,
            tags:{
                plain:true,
            }
        },
        collar:{
            itemType:"neckwear",
            clothingSlot:"neckwear",
            name:"Collar",
            itemMaster: "collar",
            daring:6,
            disabled:false,
            hasWorn:false,
            isMale:false,
            isFemale:true,
            tags:{
                plain:true,
            }
        },    
    },
    itemChildren:{
        //chokers
        choker_00:{
            masterItem:"chokers",
            variant:"choker_00",
            name:"Black Choker with White Lace and Black Bow",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
				maid:true,
            }
        },
        choker_01:{
            masterItem:"chokers",
            variant:"choker_01",
            name:"Black Choker with Gold Clasp and Chain",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
            }
        },
        choker_02:{
            masterItem:"chokers",
            variant:"choker_02",
            name:"Black Lacy Choker",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
            }
        },
        choker_03:{
            masterItem:"chokers",
            variant:"choker_03",
            name:"Black Choker with Love Heart Clasp and Diamonds",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
            }
        },
        choker_04:{
            masterItem:"chokers",
            variant:"choker_04",
            name:"Black Gothic Choker with Cross and Chains",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
            }
        },
        choker_05:{
            masterItem:"chokers",
            variant:"choker_05",
            name:"Diamond Choker with Black Ribbon and Bow",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
            }
        },
        choker_06:{
            masterItem:"chokers",
            variant:"choker_06",
            name:"Small Black Choker with Metal Pendant",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
            }
        },
        choker_07:{
            masterItem:"chokers",
            variant:"choker_07",
            name:"Black Choker with Metal Cat Shaped Clasp",
            price:30,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
            }
        },

        //collar
        collar_00:{
            masterItem:"collar",
            variant:"collar_00",
            name:"Pink Collar with Gold Love Heart",
            price:50,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                sexy:true,
            }
        },
        collar_01:{
            masterItem:"collar",
            variant:"collar_01",
            name:"Black Leather Collar with Purple Jewels",
            price:50,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                sexy:true,
            }
        },
        collar_02:{
            masterItem:"collar",
            variant:"collar_02",
            name:"Black Leather Collar with Metal Ring",
            price:50,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                sexy:true,
            }
        },
        collar_03:{
            masterItem:"collar",
            variant:"collar_03",
            name:"Black Collar with Metal Ring and Spikes",
            price:50,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                sexy:true,
            }
        },
        collar_04:{
            masterItem:"collar",
            variant:"collar_04",
            name:"Black Collar with Bell",
            price:50,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                sexy:true,
            }
        },
        collar_05:{
            masterItem:"collar",
            variant:"collar_05",
            name:"White Leather Collar with Gold Love Heart",
            price:50,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                white:true,
                sexy:true,
            }
        },
        collar_06:{
            masterItem:"collar",
            variant:"collar_06",
            name:"Red Collar with Black Lace",
            price:50,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                red:true,
                sexy:true,
            }
        },
        collar_bitch:{
            masterItem:"collar",
            variant:"collar_bitch",
            name:"Black Bitch Collar",
            price:50,
            daring:8,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                sexy:true,
                slutty:true,
                bitchcollar:true,
            }
        },
        collar_sissy_00:{
            masterItem:"collar",
            variant:"collar_sissy_00",
            name:"Pink Sissy Collar with Dog Tag",
            price:50,
            daring:9,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                sexy:true,
                slutty:true,
                sissycollar:true,
            }
        },
        collar_sissy_01:{
            masterItem:"collar",
            variant:"collar_sissy_01",
            name:"Pink Sissy Collar with Metal Ring",
            price:50,
            daring:9,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                sexy:true,
                slutty:true,
                sissycollar:true,
            }
        },
        collar_steel:{
            masterItem:"collar",
            variant:"collar_steel",
            name:"Metal Collar with Metal Ring",
            price:50,
            daring:8,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                sexy:true,
                slutty:true,
                metalcollar:true,
            }
        },    
    }
});