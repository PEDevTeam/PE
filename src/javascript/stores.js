window.stores=[
	{
		name: "Electronics Store",
		image: "electronics_store.jpg",
		imagePack: "Electronics Store",
		description: "The electronics store sells a lot of cool gear.",
		daringRequired: 0,
		dayLastRefreshed: -10,
		newStock: false,
		masterItemsSold: [],
		itemFlagsSold: [
			{
				item: "hasAlarmClock",
				cost: "alarmClockCost",
				image: "Images/items/alarm_clock.jpg",
				description: "Alarm Clock",
				daring: 0,
				checkFlag: "canBuyAlarmClock"
			},
			{
				item: "hasBatteries",
				cost: "batteriesCost",
				image: "Images/items/battery.jpg",
				description: "Generic Batteries",
				daring: 0,
				checkFlag: "canBuyBatteries"
			},
			{
				item: "hasQualityBatteries",
				cost: "qualityBatteriesCost",
				image: "Images/items/battery_quality.jpg",
				description: "Quality Batteries",
				daring: 0,
				checkFlag: "canBuyQualityBatteries"
			},
			{
				item: "hasSpyCamera",
				cost: "spyCameraCost",
				image: "Images/items/spy_camera.jpg",
				description: "Spy Camera",
				daring: 0,
				checkFlag: ""
			},
			{
				item: "hasStunGun",
				cost: "stunGunCost",
				image: "Images/items/stun_gun.jpg",
				description: "Stun Gun",
				daring: 0,
				checkFlag: "canBuyStunGun"
			}
		],
		availableItemVariants: [],
		lastIndex: []
	},
	{
		name: "General Store",
		image: "general_store.jpg",
		imagePack: "General Store",
		description: "You can find a lot of random junk here.",
		daringRequired: 0,
		dayLastRefreshed: -10,
		newStock: false,
		masterItemsSold: [
			"rooms",
			"lamps",
		],
		itemFlagsSold: [],
		availableItemVariants: [],
		lastIndex: []
	},
	{
		name: "Doctor's Office",
		image: "doctor_office.jpg",
		imagePack: "Doctors Office",
		description: "You can get surgery done here.",
		daringRequired: 1000,
		dayLastRefreshed: -10,
		newStock: false,
		masterItemsSold: [],
		itemFlagsSold: [],
		availableItemVariants: [],
		lastIndex: []
	},
	{
		name: "Adult Book Shop",
		image: "sex_shop.jpg",
		imagePack: "Adult Book Shop",
		description: "For all your sexual needs. It feels like the cashier and other customers are staring at you.",
		daringRequired: 4,
		dayLastRefreshed: -10,
		newStock: false,
		masterItemsSold: [
			"chokers",
			"collar",
			"chastity",
			"buttplugs"
		],
		itemFlagsSold: [
			{
				item: "hasVibrator",
				cost: "vibratorCost",
				image: "Images/items/vibrator.jpg",
				description: "Vibrator",
				daring: 0,
				checkFlag: ""
			},
			{
				item: "hasMassageOil",
				cost: "massageOilCost",
				image: "Images/items/massage_oil.jpg",
				description: "Massage Oil",
				daring: 0,
				checkFlag: ""
			}
		],
		availableItemVariants: [],
		lastIndex: []
	},
	{
		name: "Fashion Central",
		image: "clothes_shop.jpg",
		imagePack: "Fashion Central",
		description: "Your first stop for fabulous feminine fashions!",
		daringRequired: 0,
		dayLastRefreshed: -10,
		newStock: false,
		masterItemsSold: [
			"schoolDress",
			"skirtTop",
			"casualDress",
			"sluttyDress",
			"hairbands",
			"hairbows",
			"chokers",
			"sunglasses",
			"glasses",
			"casualEarrings",
			"classyEarrings",
			"flashyEarrings",
			"plasticEarrings"
		],
		itemFlagsSold: [
			{
				item: "hasNailPolish",
				cost: "nailPolishCost",
				image: "Images/items/nail_polish.jpg",
				description: "Nail Polish",
				daring: 0,
				checkFlag: "canBuyNailPolish"
			},
		],
		availableItemVariants: [],
		lastIndex: []
	},
	{
		name: "Intimate Apparel",
		image: "lingerie_shop.jpg",
		imagePack: "Intimate Apparel",
		description: "For everything under your clothes.",
		daringRequired: 1,
		dayLastRefreshed: -10,
		newStock: false,
		logo: "<img src=\"./Images/general/Intimate_Apparel.png\" style=\"width: 150px; height: auto; margin-left: 8vw;\">",
		masterItemsSold: [
			"nightie",
			"bras",
			"sexyBras",
			"latexBras",
			"plainPanties",
			"sexyPanties",
			"latexPanties",
			"socks",
			"stockings",
			"latexStockings"
		],
		itemFlagsSold: [],
		availableItemVariants: [],
		lastIndex: []
	},
	{  
		name: "Klip Klops",
		image: "shoe_shop.jpg",
		imagePack: "Klip Klops",
		description: "Selling noisy foot things since 1985!",
		daringRequired: 0,
		dayLastRefreshed: -10,
		newStock: false,
		masterItemsSold: [
			"flats",
			"girlSneakers",
			"boots",
			"heeledBoots",
			"highBoots",
			"heels",
			"stripperHeels"
		],
		itemFlagsSold: [],
		availableItemVariants: [],
		lastIndex: []
	},
	{
		name: "Urbane Menswear",
		image: "StoreLogo_Urbane.jpg",
		imagePack: "Urbane Menswear",
		description: "Your favorite men's clothing store, and the only one in town.",
		daringRequired: 0,
		dayLastRefreshed: -10,
		newStock: false,
		logo: "<img src=\"./Images/general/Urbane.jpg\" style=\"width: 150px; height: auto; margin-left: 8vw;\">",
		masterItemsSold: [
			"blackShoes",
			"sneakers",
			"tshirtJeans",
			"schoolUniform",
			"boxers",
			"pyjamas"
		],
		itemFlagsSold: [],
		availableItemVariants: [],
		lastIndex: []
	}
];
