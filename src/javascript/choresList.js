window.choresList={
	vacuum1: {
		//easiest chore, just vacuum the house, no punishments on fail
		id: "vacuum1",
		name: "Vacuum the house",
		image: "vacuum.jpg",
		imagePack: "Vacuum",
		active: true,
		hasPassage: false,
		minutes: 30,
		reward: 10,
		perversionRequired: 0,
		perversionMax: 0,
		daringRequired: 0,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		extra: false,
		clearJunk: true,
		daysWait: 3,
		required: false,
		dayPerformed: -100
	},
	vacuum2: {
		id: "vacuum2",
		name: "Clean the house",
		image: "vacuum.jpg",
		imagePack: "Vacuum",
		active: true,
		hasPassage: false,
		minutes: 60,
		reward: 15,
		perversionRequired: 1,
		perversionMax: 2,
		daringRequired: 0,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		extra: true,
		clearJunk: true,
		daysWait: 4,
		required: false,
		dayPerformed: -100
	},
	vacuum3: {
		id: "vacuum3",
		name: "Clean the house through and through",
		image: "vacuum.jpg",
		imagePack: "Vacuum",
		active: true,
		hasPassage: false,
		minutes: 90,
		reward: 20,
		perversionRequired: 3,
		perversionMax: 4,
		daringRequired: 0,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		extra: true,
		clearJunk: true,
		daysWait: 4,
		required: false,
		dayPerformed: -100
	},
	maidCleaning: {
		id: "maidCleaning",
		name: "Maid cleaning",
		image: "maid_work.gif",
		imagePack: "Maid Work",
		active: true,
		hasPassage: true,
		minutes: 120,
		reward: 30,
		perversionRequired: 5,
		perversionMax: 7,
		daringRequired: 0,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: true,
		extra: true,
		clearJunk: true,
		daysWait: 4,
		required: false,
		dayPerformed: -100
	},
	kitchen1: {
		id: "kitchen1",
		name: "Wash the dishes",
		image: "wash_dishes.jpg",
		imagePack: "Wash Dishes",
		active: true,
		hasPassage: false,
		minutes: 30,
		reward: 5,
		perversionRequired: 0,
		perversionMax: 2,
		daringRequired: 0,
		extra: false,
		daysWait: 1,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		required: false,
		dayPerformed: -100
	},
	kitchen2: {
		id: "kitchen2",
		name: "Wash the dishes and clean sink",
		image: "wash_dishes.jpg",
		imagePack: "Wash Dishes",
		active: true,
		hasPassage: false,
		minutes: 60,
		reward: 10,
		perversionRequired: 3,
		perversionMax: 4,
		daringRequired: 0,
		extra: true,
		daysWait: 2,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		required: false,
		dayPerformed: -100
	},
	maidKitchen: {
		id: "maidKitchen",
		name: "Clean the kitchen",
		image: "maid_kitchen.gif",
		imagePack: "Maid Kitchen",
		active: true,
		hasPassage: false,
		minutes: 60,
		reward: 15,
		perversionRequired: 5,
		perversionMax: 7,
		daringRequired: 0,
		extra: true,
		daysWait: 2,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: true,
		required: false,
		dayPerformed: -100
	},
	bathroom1: {
		id: "bathroom1",
		name: "Clean bathroom and toilet",
		image: "maid_washing_floors.gif",
		imagePack: "Maid Washing Floors",
		active: true,
		hasPassage: false,
		minutes: 80,
		reward: 30,
		perversionRequired: 5,
		perversionMax: 7,
		daringRequired: 0,
		extra: false,
		daysWait: 7,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: true,
		required: false,
		dayPerformed: -100
	},
	bathroom2: {
		id: "bathroom2",
		name: "Wash your clothes",
		image: "wash_clothes.jpg",
		imagePack: "Wash Clothes",
		active: true,
		hasPassage: false,
		minutes: 30,
		reward: 5,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		perversionRequired: 0,
		perversionMax: 0,
		daringRequired: 0,
		extra: false,
		daysWait: 4,
		required: false,
		dayPerformed: -100
	},
	bathroom3: {
		id: "bathroom3",
		name: "Wash clothes",
		image: "wash_clothes.jpg",
		imagePack: "Wash Clothes",
		active: true,
		hasPassage: false,
		minutes: 60,
		reward: 10,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		perversionRequired: 1,
		perversionMax: 4,
		daringRequired: 0,
		extra: true,
		daysWait: 4,
		required: false,
		dayPerformed: -100
	},
	bathroom4:	{
		id: "bathroom4",
		name: "Clean the toilet",
		image: "clean_toilet.jpg",
		imagePack: "Clean Toilet",
		active: true,
		hasPassage: false,
		minutes: 60,
		reward: 20,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		perversionRequired: 4,
		perversionMax: 4,
		daringRequired: 0,
		extra: false,
		daysWait: 7,
		required: false,
		dayPerformed: -100
	},
	maidBathroom: {
		id: "maidBathroom",
		name: "Wash clothes carefully",
		image: "maid_wash_clothes.gif",
		imagePack: "Maid Wash Clothes",
		active: true,
		hasPassage: false,
		minutes: 120,
		reward: 20,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: true,
		perversionRequired: 5,
		perversionMax: 7,
		daringRequired: 0,
		extra: true,
		daysWait: 5,
		required: false,
		dayPerformed: -100
	},
	mowLawn: {
		id: "mowLawn",
		name: "Mow the lawn",
		image: "mow_lawn.jpg",
		imagePack: "Mow Lawn",
		active: true,
		hasPassage: false,
		minutes: 90,
		reward: 20,
		outside: true,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: false,
		perversionRequired: 0,
		perversionMax: 4,
		daringRequired: 0,
		extra: false,
		daysWait: 7,
		required: false,
		dayPerformed: -100
	},
	cleanSexToys: {
		id: "cleanSexToys",
		name: "Clean sex toys",
		image: "sex_toys_collection.jpg",
		imagePack: "Sex Toy Clean",
		active: true,
		hasPassage: false,
		minutes: 60,
		reward: 15,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: false,
		maid: true,
		perversionRequired: 5,
		perversionMax: 7,
		daringRequired: 0,
		extra: false,
		daysWait: 7,
		required: false,
		dayPerformed: -100
	},
	goShopping: {
		id: "goShopping",
		name: "Go shopping",
		active: true,
		hasPassage: true,
		minutes: 90,
		reward: 20,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: true,
		maid: false,
		perversionRequired: 6,
		perversionMax: 7,
		daringRequired: 0,
		extra: false,
		daysWait: 2,
		required: false,
		dayPerformed: -100
	},
	suckGuardianBoyfriend: {
		id: "suckGuardianBoyfriend",
		name: "Suck off her boyfriend",
		active: false,
		hasPassage: true,
		minutes: 30,
		reward: 15,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: true,
		maid: true,
		perversionRequired: 7,
		perversionMax: 10,
		daringRequired: 3,
		extra: false,
		daysWait: 4,
		required: false,
		dayPerformed: -100
	},
	cleanGuardianPussy: {
		id: "cleanGuardianPussy",
		name: "Clean out her pussy",
		active: false,
		hasPassage: true,
		minutes: 30,
		reward: 10,
		outside: false,
		femaleDress: false,
		fail: false,
		hardFail: false,
		nontimed: true,
		maid: true,
		perversionRequired: 7,
		perversionMax: 10,
		daringRequired: 3,
		extra: false,
		daysWait: 4,
		required: false,
		dayPerformed: -100
	}
};