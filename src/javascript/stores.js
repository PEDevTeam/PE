window.stores=[
	{
		name: "Electronics Store",
		image: "electronics_store.jpg",
		imagePack: "Electronics Store",
		description: "The electronics store sells a lot of cool gear.",
		daringRequired: 0,
		masterItemsSold: [],
		itemFlagsSold: [
			{
				item: "hasAlarmClock",
				cost: "alarmClockCost"
			},
			{
				item: "hasBatteries",
				cost: "batteriesCost"
			},
			{
				item: "hasQualityBatteries",
				cost: "qualityBatteriesCost"
			},
			{
				item: "hasSpyCamera",
				cost: "spyCameraCost"
			},
			{
				item: "hasStunGun",
				cost: "stunGunCost"
			}
		]
	},
	{
		name: "General Store",
		image: "general_store.jpg",
		imagePack: "General Store",
		description: "You can find a lot of random junk here.",
		daringRequired: 0,
		masterItemsSold: [
			"rooms",
			"lamps",
		],
		itemFlagsSold: []
	},
	{
		name: "Doctor's Office",
		image: "doctor_office.jpg",
		imagePack: "Doctors Office",
		description: "You can get surgery done here.",
		daringRequired: 1000,
		masterItemsSold: [],
		itemFlagsSold: []
	},
	{
		name: "Adult Book Shop",
		image: "sex_shop.jpg",
		imagePack: "Adult Book Shop",
		description: "For all your sexual needs. It feels like the cashier and other customers are staring at you.",
		daringRequired: 4,
		masterItemsSold: [
			"chokers",
			"collar",
			"chastity",
			"buttplugs"
		],
		itemFlagsSold: [
			{
				item: "hasVibrator",
				cost: "vibratorCost"
			},
			{
				item: "hasMassageOil",
				cost: "massageOilCost"
			}
		]
	},
	{
		name: "Fashion Central",
		image: "clothes_shop.jpg",
		imagePack: "Fashion Central",
		description: "Your first stop for fabulous feminine fashions!",
		daringRequired: 0,
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
				cost: "nailPolishCost"
			},
		]
	},
	{
		name: "Intimate Apparel",
		image: "lingerie_shop.jpg",
		imagePack: "Intimate Apparel",
		description: "For everything under your clothes.",
		daringRequired: 1,
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
		itemFlagsSold: []
	},
	{  
		name: "Klip Klops",
		image: "shoe_shop.jpg",
		imagePack: "Klip Klops",
		description: "Selling noisy foot things since 1985!",
		daringRequired: 0,
		masterItemsSold: [
			"flats",
			"girlSneakers",
			"boots",
			"heeledBoots",
			"highBoots",
			"heels",
			"stripperHeels"
		],
		itemFlagsSold: []
	},
	{
		name: "Urbane Menswear",
		image: "StoreLogo_Urbane.jpg",
		imagePack: "Urbane Menswear",
		description: "Your favorite men's clothing store, and the only one in town.",
		daringRequired: 0,
		logo: "<img src=\"./Images/general/Urbane.jpg\" style=\"width: 150px; height: auto; margin-left: 8vw;\">",
		masterItemsSold: [
			"blackShoes",
			"sneakers",
			"tshirtJeans",
			"schoolUniform",
			"boxers",
			"pyjamas"
		],
		itemFlagsSold: []
	}
];
