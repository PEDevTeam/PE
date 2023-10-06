if(typeof window.items == "undefined"){
    window.items = {};
}

$.extend(true, window.items, {
    itemMasters:{
        //Headwear
        hairbands:{
            itemType:"headwear",
            clothingSlot:"headwear",
            name:"Hairband",
            itemMaster: "hairbands",
            daring:6,
            disabled:false,
            hasWorn:false,
            isMale:false,
            isFemale:true,
            tags:{
                plain:true,
            }
        },
        hairbows:{
            itemType:"headwear",
            clothingSlot:"headwear",
            name:"Hairbow",
            itemMaster: "hairbows",
            daring:5,
            disabled:false,
            hasWorn:false,
            isMale:false,
            isFemale:true,
            tags:{
                plain:true,
            }
        }
    },
    itemChildren:{
        //hairbands
        hairbands00:{
            masterItem:"hairbands",
            variant:"hairband_00",
            name:"Red Hairband with Red Bow",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                red:true,
                plain:true,
                school:true,
            }
        },
        hairbands01:{
            masterItem:"hairbands",
            variant:"hairband_01",
            name:"Black Hairband with Diamonds",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
                school:true,
            }
        },
        hairbands02:{
            masterItem:"hairbands",
            variant:"hairband_02",
            name:"Pink Hairband with Pink Bow",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                plain:true,
                school:true,
            }
        },
        hairbands03:{
            masterItem:"hairbands",
            variant:"hairband_03",
            name:"Blue Hairband with Blue Bow",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                blue:true,
                plain:true,
                school:true,
            }
        },
        hairbands04:{
            masterItem:"hairbands",
            variant:"hairband_04",
            name:"Black Hairband with Black Bow",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                black:true,
                plain:true,
                school:true,
            }
        },
        hairbands05:{
            masterItem:"hairbands",
            variant:"hairband_05",
            name:"Blue and Silver Tiara",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                blue:true,
                plain:true,
            }
        },
        hairbands06:{
            masterItem:"hairbands",
            variant:"hairband_06",
            name:"Tortoise Brown Hairband",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                brown:true,
                plain:true,
            }
        },
        hairbands07:{
            masterItem:"hairbands",
            variant:"hairband_07",
            name:"Pink Satin Hairband with Bow",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                plain:true,
            }
        },
        hairbands08:{
            masterItem:"hairbands",
            variant:"hairband_08",
            name:"White Hairband with Pink Bow",
            price:20,
            daring:6,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                white:true,
                plain:true,
            }
        },
        hairbands09:{
            masterItem:"hairbands",
            variant:"hairband_09",
            name:"Black Cat Ear Hairband",
            price:20,
            daring:6,
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
		maidHairband:{
			masterItem:"hairbands",
			variant:"maid_headband",
			name:"Black Maid Headband",
			price:0,
            daring:0,
            disabled:true,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:false,
            tags:{
				black:true,
                maid:true,
            }
		},

        //hairbows
        hairbows00:{
            masterItem:"hairbows",
            variant:"hairbow_00",
            name:"Tartan Red Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                red:true,
                plain:true,
                tartan:true,
                school:true,
            }
        },
        hairbows01:{
            masterItem:"hairbows",
            variant:"hairbow_01",
            name:"Black Hairbow",
            price:10,
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
        hairbows02:{
            masterItem:"hairbows",
            variant:"hairbow_02",
            name:"Pink Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                plain:true,
            }
        },
        hairbows03:{
            masterItem:"hairbows",
            variant:"hairbow_03",
            name:"Purple Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                purple:true,
                plain:true,
            }
        },
        hairbows04:{
            masterItem:"hairbows",
            variant:"hairbow_04",
            name:"White Hairbow with Pink Polkadots",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                white:true,
                plain:true,
            }
        },
        hairbows05:{
            masterItem:"hairbows",
            variant:"hairbow_05",
            name:"Black Hairbow with White Polkadots",
            price:10,
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
        hairbows06:{
            masterItem:"hairbows",
            variant:"hairbow_06",
            name:"Pink Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                plain:true,
            }
        },
        hairbows07:{
            masterItem:"hairbows",
            variant:"hairbow_07",
            name:"Red Hairbow with Diamond Loveheart",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                red:true,
                plain:true,
            }
        },
        hairbows08:{
            masterItem:"hairbows",
            variant:"hairbow_08",
            name:"Pink Hairbow with Shiny Silver",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                plain:true,
            }
        },
        hairbows09:{
            masterItem:"hairbows",
            variant:"hairbow_09",
            name:"Light Green Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                green:true,
                plain:true,
            }
        },
        hairbows10:{
            masterItem:"hairbows",
            variant:"hairbow_10",
            name:"Pink Hairbow with White Polkadots",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                plain:true,
            }
        },
        hairbows11:{
            masterItem:"hairbows",
            variant:"hairbow_11",
            name:"Red Velvet Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                red:true,
                plain:true,
            }
        },
        hairbows12:{
            masterItem:"hairbows",
            variant:"hairbow_12",
            name:"Rainbow Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                red:true,
                plain:true,
            }
        },
        hairbows13:{
            masterItem:"hairbows",
            variant:"hairbow_13",
            name:"Pink and Purple Hairbow with Flower",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                pink:true,
                purple:true,
                plain:true,
            }
        },
        hairbows14:{
            masterItem:"hairbows",
            variant:"hairbow_14",
            name:"Blue Gingham Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                blue:true,
                plain:true,
            }
        },
        hairbows15:{
            masterItem:"hairbows",
            variant:"hairbow_43",
            name:"Red, White and Black Hairbow",
            price:10,
            daring:5,
            disabled:false,
            isMale:false,
            isFemale:true,
            isItemSet:false,
            setName:"",
            canBuy:true,
            tags:{
                red:true,
                white:true,
                black:true,
                plain:true,
                school:true,
				cheer: true,
            }
        },    
    }
});