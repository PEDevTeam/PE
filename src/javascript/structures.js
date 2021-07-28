window.rewardMoney={
	teacherFemaleUnderwear: 10,
	teacherFemaleClothing: 15,
	teacherButtplug: 5,
	teacherChastity: 10,
	teacherBra: 10,
	teacherAssistant: 15,
	teacherBullySex: 20,
	teacherPiss: 60,
	teacherWhore: 80,
	teacherSchoolslut: 30,
	teacherCoachPosing: 15,
	teacherCoachSucking: 25,
	teacherCoachWhoring: 15,
	uploadDefault: 30,
	uploadSpecial: 50,
	hypnosis: 20,
	specialHypnosis: 50,
	cheerPractice: 20
},

window.versionControl={
	update: function() {
		if (State.active.variables.gameVersion == 0.7900) {
			if (State.active.variables.player.perversion.teacher >= 4) { State.active.variables.player.perversion.crossdressing=10;	}
		}
	}
},

window.structures={
	updateStructure: function(base, addon, debugPrefix) {
		// adapted from https://stackoverflow.com/questions/14843815/#29563346
		// TODO: use this consistently to update all structures
		if (base === undefined) {
			base = {};
		}
		for (var prop in addon) {
			if (addon.hasOwnProperty(prop)) {
				if (typeof addon[prop] === 'object') {
					if (Array.isArray(addon[prop])) {
						if (base[prop] === undefined) {
							if (addon[prop].some(e => typeof e === 'object')) {
								console.log(`WARNING: Array ${debugPrefix}.${prop} contains at least one object!`);
							}
							console.log(`Setting up array ${debugPrefix}.${prop}…`);
							base[prop] = addon[prop];
						} else {
							console.log(`Array ${debugPrefix}.${prop} already exists:`, base[prop]);
						}
					} else if (addon[prop] === null) {
						base[prop] = addon[prop];
					} else{
						console.log(`Descending into ${debugPrefix}.${prop}…`);
						base[prop] = this.updateStructure(base[prop], addon[prop], debugPrefix+'.'+prop);
					}
				} else if (!base.hasOwnProperty(prop)) {
					console.log(`Setting up ${debugPrefix}.${prop}…`);
					base[prop] = addon[prop];
				} else {
					console.log(`${debugPrefix}.${prop} already exists:`, base[prop]);
				}
			}
		}
		return base;
	},
	updateStructures: function() {
		// Custom versonControl script
		// BUG - for some reason setupFriend conflicts with setupQuickSlot
		this.setupPlayer();
		this.setupStandaloneVars();
		this.setupClothesCheck();
		this.setupMinigameVars();
		this.setupStatus();
		this.setupAvatar();
		this.setupFlags();
		this.setupKinks();
		this.setupBody();
		this.setupFriend();
		this.setupFuta();
		this.setupQuickSlot();
		//this.setupItems();
		this.setupChores();
		this.setupDreams();
		this.setupLocations();
		this.setupFriendRiddles();
		this.setupTalks();
		this.setupPunishments();
		this.setupTasks();
		this.setupCheer();
		this.setupCheerFriend();
		this.setupClothingSets();
		this.setupItemVariantOverrides();
		this.setupItemMasterOverrides();
		this.setupTeam();
		this.setupStores();
		
		window.versionControl.update();
		State.active.variables.gameVersion = window.gameCode.version;
	},
	setupPlayer: function() {
		var vars = State.active.variables;
		vars.player = this.updateStructure(vars.player, window.playerList, "player");
		vars.player = this.updateStructure(vars.player, window.playerAddonsList, "player");
	},
	setupStandaloneVars: function() {
		var vars=State.active.variables;
		if (vars.avatarSize == null) { vars.avatarSize = 0; }
		if (vars.itemsSize == null) { vars.itemsSize = 2; }
		if (vars.roomSize == null) { vars.roomSize = 2; }
		if (vars.sidebarTab == null) { vars.sidebarTab = 0; }
		if (vars.bribeAmount == null) { vars.bribeAmount = 0; }
		if (vars.showimages == null) { vars.showimages = true; }
		if (vars.scene == null) { vars.scene = ""; }
		if (vars.showStats == null) { vars.showStats = false; }
		if (vars.restock == null) { vars.restock = []; }
		if (vars.selectScene == null) { vars.selectScene = {}; }
		if (vars.ass == null) { vars.ass = "ass"; }
		if (vars.butt == null) { vars.butt = "butt"; }
		if (vars.chest == null) { vars.chest = "flat chest"; }
		if (vars.lips == null) { vars.lips = "lips"; }
		if (vars.penis == null) { vars.penis = "penis"; }
		
		if (vars.allowance == null) { vars.allowance = 20; }
		if (vars.workRate == null) { vars.workRate = 10; }
		if (vars.teacher == null) { vars.teacher = "Miss Buxton"; }
		if (vars.therapist == null) { vars.therapist = "Stacy"; }
		if (vars.babysitter == null) { vars.babysitter = "Emma"; }
		if (vars.bully == null) { vars.bully = "Butch"; }
		if (vars.friend == null) { vars.friend = "your best friend"; }
		
		if (vars.guardian == null) { vars.guardian = "your mother"; }
		if (vars.Guardian == null) { vars.Guardian = "Your mother"; }
		if (vars.myguardian == null) { vars.myguardian = "my mother"; }
		if (vars.Myguardian == null) { vars.Myguardian = "My mother"; }
		
		if (vars.activeChore == null) { vars.activeChore = 0; }
		
		if (vars.inventory == null) { vars.inventory = []; }
		
		if (vars.reason == null) { vars.reason = {}; }

		if (vars.once == null) { vars.once = {}; } /* For checks that happen only once and never used anywhere else */

		if (vars.newInventory == null) { vars.newInventory = true; } //Use the new inventory system...
		
	},
	setupClothesCheck: function() {
		var clothes=window.clothes;
		var vars=State.active.variables;
		if (vars.reason == null) {
			vars.reason = {};
		}
		for (var i=0; i < Object.keys(clothes).length; i++) {
			if (vars.reason[Object.keys(clothes)[i]] == null) {
				vars.reason[Object.keys(clothes)[i]] = "";
			}
		}
	},
	setupMinigameVars: function() {
		var vars=State.active.variables;
		if (vars.minigames == null) { vars.minigames = {}; }
		
		if (vars.minigames.dreamgame == null) { vars.minigames.dreamgame = {}; }
		if (vars.minigames.coachgame == null) { vars.minigames.coachgame = {}; }
		if (vars.minigames.cheerGame == null) { vars.minigames.cheerGame = {}; }
		
		if (vars.minigames.dreamgame.alertness == null) { vars.minigames.dreamgame.alertness = 0; }
		if (vars.minigames.dreamgame.dreaminess == null) { vars.minigames.dreamgame.dreaminess = 0; }
		if (vars.minigames.dreamgame.lastActionId == null) { vars.minigames.dreamgame.lastActionId = 0; }
		if (vars.minigames.dreamgame.lastActionSuccess == null) { vars.minigames.dreamgame.lastActionSuccess = 0; }
		if (vars.minigames.dreamgame.actionSuccess == null) { vars.minigames.dreamgame.actionSuccess = []; }
		if (vars.minigames.dreamgame.lastActionSuccess == null) { vars.minigames.dreamgame.lastActionSuccess = 0; }
		if (vars.minigames.dreamgame.win == null) { vars.minigames.dreamgame.win = false; }
		if (vars.minigames.dreamgame.playedToday == null) { vars.minigames.dreamgame.playedToday = false; }
		
		if (vars.minigames.coachgame.alertness == null) { vars.minigames.coachgame.alertness = 0; }
		if (vars.minigames.coachgame.coachiness == null) { vars.minigames.coachgame.coachiness = 0; }
		if (vars.minigames.coachgame.lastActionId == null) { vars.minigames.coachgame.lastActionId = 0; }
		if (vars.minigames.coachgame.lastActionSuccess == null) { vars.minigames.coachgame.lastActionSuccess = 0; }
		if (vars.minigames.coachgame.actionSuccess == null) { vars.minigames.coachgame.actionSuccess = []; }
		if (vars.minigames.coachgame.lastActionSuccess == null) { vars.minigames.coachgame.lastActionSuccess = 0; }
		if (vars.minigames.coachgame.win == null) { vars.minigames.coachgame.win = false; }
		if (vars.minigames.coachgame.playedToday == null) { vars.minigames.coachgame.playedToday = false; }
		
		if (vars.minigames.cheerGame.turn == null) { vars.minigames.cheerGame.turn=0; } 
		if (vars.minigames.cheerGame.failCount == null) { vars.minigames.cheerGame.failCount = 0; }
		if (vars.minigames.cheerGame.lastActionId == null) { vars.minigames.cheerGame.lastActionId=-1; }
		if (vars.minigames.cheerGame.ignoreModesty == null) { vars.minigames.cheerGame.ignoreModesty = false; }
		if (vars.minigames.cheerGame.failedMove == null) { vars.minigames.cheerGame.failedMove = false; }
		if (vars.minigames.cheerGame.correct == null) { vars.minigames.cheerGame.correct = false; }
		if (vars.minigames.cheerGame.win == null) { vars.minigames.cheerGame.win = false; }
		if (vars.minigames.cheerGame.playedToday == null) { vars.minigames.cheerGame.playedToday = false; }

	},
	setupStatus: function() {
		var vars=State.active.variables;
		if (vars.status == null) { vars.status = {}; }
		if (vars.status.text == null) { vars.status.text = ""; }
		if (vars.status.scenesCounter == null) { vars.status.scenesCounter = 0; }
		if (vars.status.endDay == null) { vars.status.endDay = 0; }
		if (vars.status.endHour == null) { vars.status.endHour = 0; }
		if (vars.status.endMinute == null) { vars.status.endMinute = 0; }
	},
	setupAvatar: function() {
		var vars=State.active.variables;
		if (vars.avatar == null) { vars.avatar = {}; }
		if (vars.avatar.divider == null) { vars.avatar.divider = 0; }
		if (vars.avatar.mode == null) { vars.avatar.mode = 0; }
		if (vars.avatar.start == null) { vars.avatar.start = 0; }
		if (vars.avatar.help == null) { vars.avatar.help = 0; }
		if (vars.avatar.active == null) { vars.avatar.active = 0; }
		if (vars.avatar.classic == null) { vars.avatar.classic = 2; }
	},
	setupFlags: function() {
		var vars=State.active.variables;
		var flagsList=window.flagsList;
		if (vars.flags == null) {
			vars.flags = {};
		}
		for (var i=0; i < Object.keys(flagsList).length; i++) {
			if (vars.flags[Object.keys(flagsList)[i]] == null) {
				vars.flags[Object.keys(flagsList)[i]] = flagsList[Object.keys(flagsList)[i]];
			}
		}
	},
	setupKinks: function() {
		var vars=State.active.variables;
		var kinkList=window.kinkList;
		if (vars.kink == null) {
			vars.kink = {};
		}
		if (vars.kinkAllow == null) {
			vars.kinkAllow = {};
		}
		for (var i=0; i < Object.keys(kinkList).length; i++) {
			if (vars.kink[Object.keys(kinkList)[i]] == null) {
				vars.kink[Object.keys(kinkList)[i]] = kinkList[Object.keys(kinkList)[i]];
			}
			if (vars.kinkAllow[Object.keys(kinkList)[i]] == null) {
				vars.kinkAllow[Object.keys(kinkList)[i]] = kinkList[Object.keys(kinkList)[i]];
			}
		}
	},
	setupBody: function() {
		var bodyList=window.bodyList;
		if (State.active.variables.body == null) {
			State.active.variables.body = {};
		}
		for (var i=0; i < Object.keys(bodyList).length; i++) {
			if (State.active.variables.body[Object.keys(bodyList)[i]] == null) {
				State.active.variables.body[Object.keys(bodyList)[i]] = bodyList[Object.keys(bodyList)[i]];
			}
		}
	},
	setupFriend: function() {
		var friendList=window.friendList;
		if (State.active.variables.friendG == null) {
			State.active.variables.friendG = {};
		}
		for (var i=0; i < Object.keys(friendList).length; i++) {
			if (State.active.variables.friendG[Object.keys(friendList)[i]] == null) {
				State.active.variables.friendG[Object.keys(friendList)[i]] = friendList[Object.keys(friendList)[i]];
			}
		}
	},
	setupFuta: function() {
		var futaList=window.futaList;
		if (State.active.variables.futa == null) {
			State.active.variables.futa = {};
		}
		for (var i=0; i < Object.keys(futaList).length; i++) {
			if (State.active.variables.futa[Object.keys(futaList)[i]] == null) {
				State.active.variables.futa[Object.keys(futaList)[i]] = futaList[Object.keys(futaList)[i]];
			}
		}
	},
	setupQuickSlot: function() {
		var slotList=window.quickSlotList;
		if (State.active.variables.quickSlot == null) {
			State.active.variables.quickSlot = {};
		}
		for (var i=0; i < Object.keys(slotList).length; i++) {
			if (State.active.variables.quickSlot[Object.keys(slotList)[i]] == null) {
				State.active.variables.quickSlot[Object.keys(slotList)[i]] = {};
			}
			if (State.active.variables.quickSlot[Object.keys(slotList)[i]].name == null) {
				State.active.variables.quickSlot[Object.keys(slotList)[i]].name = slotList[Object.keys(slotList)[i]].name;
			}
			if (State.active.variables.quickSlot[Object.keys(slotList)[i]].extra == null) {
				State.active.variables.quickSlot[Object.keys(slotList)[i]].extra = slotList[Object.keys(slotList)[i]].extra;
			}
			if (State.active.variables.quickSlot[Object.keys(slotList)[i]].clothes == null) {
				State.active.variables.quickSlot[Object.keys(slotList)[i]].clothes = [];
			}
			if (State.active.variables.quickSlot[Object.keys(slotList)[i]].types == null) {
				State.active.variables.quickSlot[Object.keys(slotList)[i]].types = [];
			}
		}
	},

	setupItems_d: function() {
		var itemsC=window.itemsC;
		if (State.active.variables.items == null) {
			State.active.variables.items = {};
		}
		
		for (var i=0; i < Object.keys(itemsC).length; i++) {
			if (State.active.variables.items[Object.keys(itemsC)[i]] == null) {
				State.active.variables.items[Object.keys(itemsC)[i]] = {};
				
				var itemObject = State.active.variables.items[Object.keys(itemsC)[i]];
				var listItemsC = itemsC[Object.keys(itemsC)[i]];
				
				itemObject.id = listItemsC.id;
				
				if (listItemsC.clothingType > 0) {
					if (itemObject.ward == null) { itemObject.ward = false; }
				}
				
				if (listItemsC.maxAlt != null) {
					if (itemObject.curAlt == null) { itemObject.curAlt = 0; }
					if (itemObject.ownAlt == null) { itemObject.ownAlt = []; }
					if (itemObject.storeCur == null) { itemObject.storeCur = 0; }
					if (itemObject.storeAlt == null) { itemObject.storeAlt = []; }
				}
				
			}
		}
		
		// deleting items with no corresponding ID in JavaScript list
		var itemsList = State.active.variables.items;
		for (var i=0; i < Object.keys(itemsList).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(itemsC).length; j++) {
				if (itemsList[Object.keys(itemsList)[i]].id == itemsC[Object.keys(itemsC)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete itemsList[Object.keys(itemsList)[i]];
			}
		}
	},
	setupChores: function() {
		var choresList=window.choresList;
		if (State.active.variables.chores == null) {
			State.active.variables.chores = {};
		}
		
		for (var i=0; i < Object.keys(choresList).length; i++) {
			if (State.active.variables.chores[Object.keys(choresList)[i]] == null) {
				State.active.variables.chores[Object.keys(choresList)[i]] = {};
				
				var choreV = State.active.variables.chores[Object.keys(choresList)[i]];
				var choreJS = choresList[Object.keys(choresList)[i]];
				
				choreV.id = choreJS.id;
				if (choreV.active == null) { choreV.active = choreJS.active; }
				if (choreV.fail == null) { choreV.fail = false; }
				if (choreV.hardFail == null) { choreV.hardFail = false; }
				if (choreV.dayPerformed == null) { choreV.dayPerformed = -100; }
				
			}
		}
		
		// deleting chores with no corresponding ID in JavaScript list
		var choresSaved = State.active.variables.chores;
		for (var i=0; i < Object.keys(choresSaved).length; i++) {
			var found = false;
			for (var j=0; j < Object.keys(choresList).length; j++) {
				if (choresSaved[Object.keys(choresSaved)[i]].id == choresList[Object.keys(choresList)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete choresSaved[Object.keys(choresSaved)[i]];
			}
		}
	},
	
	setupDreams: function() {
		var dreamsGuardian=window.dreamsGuardian;
		var dreamsTeacher=window.dreamsTeacher;
		
		if (State.active.variables.dreams == null) {
			State.active.variables.dreams = {};
		}
		
		for (var i=0; i < Object.keys(dreamsGuardian).length; i++) {
			if (State.active.variables.dreams[Object.keys(dreamsGuardian)[i]] == null) {
				State.active.variables.dreams[Object.keys(dreamsGuardian)[i]] = {};
				
				var dreamObject = State.active.variables.dreams[Object.keys(dreamsGuardian)[i]];
				var dreamsG = dreamsGuardian[Object.keys(dreamsGuardian)[i]];

				if (dreamObject.id == null) { dreamObject.id = dreamsG.id; }
				if (dreamObject.active == null) { dreamObject.active = dreamsG.active; }
				if (dreamObject.startPriority == null) { dreamObject.startPriority = dreamsG.startPriority; }
				if (dreamObject.progress == null) { dreamObject.progress = 0; }
			}
		}
		
		for (var i=0; i < Object.keys(dreamsTeacher).length; i++) {
			if (State.active.variables.dreams[Object.keys(dreamsTeacher)[i]] == null) {
				State.active.variables.dreams[Object.keys(dreamsTeacher)[i]] = {};
				
				var dreamObject = State.active.variables.dreams[Object.keys(dreamsTeacher)[i]];
				var dreamsT = dreamsTeacher[Object.keys(dreamsTeacher)[i]];

				if (dreamObject.id == null) { dreamObject.id = dreamsT.id; }
				if (dreamObject.active == null) { dreamObject.active = dreamsT.active; }
				if (dreamObject.startPriority == null) { dreamObject.startPriority = dreamsT.startPriority; }
				if (dreamObject.progress == null) { dreamObject.progress = 0; }
			}
		}
		
		// deleting dreams with no corresponding ID in JavaScript list
		var dreamsList = State.active.variables.dreams;
		for (var i=0; i < Object.keys(dreamsList).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(dreamsGuardian).length; j++) {
				if (dreamsList[Object.keys(dreamsList)[i]].id == dreamsGuardian[Object.keys(dreamsGuardian)[j]].id) {
					var found = true;
					break;
				}
			}
			
			for (var j=0; j < Object.keys(dreamsTeacher).length; j++) {
				if (dreamsList[Object.keys(dreamsList)[i]].id == dreamsTeacher[Object.keys(dreamsTeacher)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete dreamsList[Object.keys(dreamsList)[i]];
			}
		}
	},
	
	setupLocations: function() {
		var vars=State.active.variables;
		var locationsJS=window.locationsJS;
		
		if (vars.locations == null) {
			vars.locations = {};
		}
		
		for (var i=0; i < Object.keys(locationsJS).length; i++) {
			if (vars.locations[Object.keys(locationsJS)[i]] == null) {
				vars.locations[Object.keys(locationsJS)[i]] = {};
				
				var locV = vars.locations[Object.keys(locationsJS)[i]];
				var locJS = locationsJS[Object.keys(locationsJS)[i]];

				if (locV.id == null) { locV.id = locJS.id; }
				if (locV.active == null) { locV.active = locJS.active; }
			}
		}
		
		// deleting dreams with no corresponding ID in JavaScript list
		var locNewList = State.active.variables.locations;
		for (var i=0; i < Object.keys(locNewList).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(locationsJS).length; j++) {
				if (locNewList[Object.keys(locNewList)[i]].id == locationsJS[Object.keys(locationsJS)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete locNewList[Object.keys(locNewList)[i]];
			}
		}
	},
	
	setupFriendRiddles: function() {
		var vars = State.active.variables;
		vars.friendRiddles = this.updateStructure(vars.friendRiddles, window.friendRiddles, "friendRiddles");
	},
	
	setupTalks: function() {
		var vars=State.active.variables;
		var talksList=window.therapistTalks;
		
		if (vars.therapistTalks == null) {
			vars.therapistTalks = {};
		}
		
		for (var i=0; i < Object.keys(talksList).length; i++) {
			if (vars.therapistTalks[Object.keys(talksList)[i]] == null) {
				vars.therapistTalks[Object.keys(talksList)[i]] = {};
				
				var object = vars.therapistTalks[Object.keys(talksList)[i]];
				var talksObj = talksList[Object.keys(talksList)[i]];

				if (object.id == null) { object.id = talksObj.id; }
				if (object.start == null) { object.start = talksObj.start; }
				if (object.finished == null) { object.finished = false; }
				if (object.progress == null) { object.progress = 0; }
			}
		}
		
		// deleting talks with no corresponding ID in JavaScript list
		var talksNewList = State.active.variables.therapistTalks;
		for (var i=0; i < Object.keys(talksNewList).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(talksList).length; j++) {
				if (talksNewList[Object.keys(talksList)[i]] && talksNewList[Object.keys(talksList)[i]].id == talksList[Object.keys(talksList)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete talksNewList[Object.keys(talksNewList)[i]];
			}
		}
	},
	
	setupPunishments: function() {
		var vars=State.active.variables;

		// punishments array
		
		var punList=window.teacherPunishments;
		
		if (vars.teacherPunishments == null) {
			vars.teacherPunishments = {};
		}
		
		for (var i=0; i < Object.keys(punList).length; i++) {
			if (vars.teacherPunishments[Object.keys(punList)[i]] == null) {
				vars.teacherPunishments[Object.keys(punList)[i]] = {};
				
				var object = vars.teacherPunishments[Object.keys(punList)[i]];
				var talksObj = punList[Object.keys(punList)[i]];

				if (object.id == null) { object.id = talksObj.id; }
				if (object.active == null) { object.active = talksObj.active; }
				if (object.progress == null) { object.progress = 0; }
				if (object.timeStart == null) { object.timeStart = -100; }
			}
		}
		
		// deleting punishments with no corresponding ID in JavaScript list
		var punNewList = State.active.variables.teacherPunishments;
		for (var i=0; i < Object.keys(punNewList).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(punList).length; j++) {
				if (punNewList[Object.keys(punList)[i]].id == punList[Object.keys(punList)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete punNewList[Object.keys(punNewList)[i]];
			}
		}
	},
	
	setupTasks: function() {
		var vars=State.active.variables;

		// Daring tasks
		var tasksList=window.tasksTeacher;
		if (vars.tasksTeacher == null) {
			vars.tasksTeacher = {};
		}
		
		for (var i=0; i < Object.keys(tasksList).length; i++) {
			if (vars.tasksTeacher[Object.keys(tasksList)[i]] == null) {
				vars.tasksTeacher[Object.keys(tasksList)[i]] = {};
				
				var taskTdObject = vars.tasksTeacher[Object.keys(tasksList)[i]];
				var taskListed = tasksList[Object.keys(tasksList)[i]];
				
				taskTdObject.id = taskListed.id;
				
				if (taskTdObject.canStart == null) { taskTdObject.canStart = taskListed.canStart; }
				if (taskTdObject.status == null) { taskTdObject.status = 0; }
				if (taskTdObject.progress == null) { taskTdObject.progress = 0; }
				if (taskTdObject.startDay == null) { taskTdObject.startDay = -100; }
			}
		}
		
		// Bodymods tasks
		var tasksBodyList=window.tasksTeacherBody;
		if (vars.tasksTeacherBody == null) {
			vars.tasksTeacherBody = {};
		}
		
		for (var i=0; i < Object.keys(tasksBodyList).length; i++) {
			if (vars.tasksTeacherBody[Object.keys(tasksBodyList)[i]] == null) {
				vars.tasksTeacherBody[Object.keys(tasksBodyList)[i]] = {};
				
				var taskTbObject = vars.tasksTeacherBody[Object.keys(tasksBodyList)[i]];
				var taskBodyListed = tasksBodyList[Object.keys(tasksBodyList)[i]];
				
				taskTbObject.id = taskBodyListed.id;
				
				if (taskTbObject.canStart == null) { taskTbObject.canStart = taskBodyListed.canStart; }
				if (taskTbObject.status == null) { taskTbObject.status = 0; }
				if (taskTbObject.progress == null) { taskTbObject.progress = 0; }
				if (taskTbObject.startDay == null) { taskTbObject.startDay = -100; }
			}
		}
		
		// Email tasks
		var emailList=window.tasksEmail;
		if (vars.tasksEmail == null) {
			vars.tasksEmail = {};
		}
		
		for (var i=0; i < Object.keys(emailList).length; i++) {
			if (vars.tasksEmail[Object.keys(emailList)[i]] == null) {
				vars.tasksEmail[Object.keys(emailList)[i]] = {};
				
				var taskEmObject = vars.tasksEmail[Object.keys(emailList)[i]];
				var emailListed = emailList[Object.keys(emailList)[i]];
				
				taskEmObject.id = emailListed.id;
				
				if (taskEmObject.canStart == null) { taskEmObject.canStart = emailListed.canStart; }
				if (taskEmObject.status == null) { taskEmObject.status = 0; }
				if (taskEmObject.progress == null) { taskEmObject.progress = 0; }
				if (taskEmObject.startDay == null) { taskEmObject.startDay = -100; }
				
			}
		}
		
		// deleting tasks with no corresponding ID in JavaScript list
		var tasksNewTeacher = State.active.variables.tasksTeacher;
		for (var i=0; i < Object.keys(tasksNewTeacher).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(tasksList).length; j++) {
				if (tasksNewTeacher[Object.keys(tasksList)[i]].id == tasksList[Object.keys(tasksList)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete tasksNewTeacher[Object.keys(tasksNewTeacher)[i]];
			}
		}
		
		var tasksBodyNewTeacher = State.active.variables.tasksTeacherBody;
		for (var i=0; i < Object.keys(tasksBodyNewTeacher).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(tasksBodyList).length; j++) {
				if (tasksBodyNewTeacher[Object.keys(tasksBodyList)[i]].id == tasksBodyList[Object.keys(tasksBodyList)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete tasksBodyNewTeacher[Object.keys(tasksBodyNewTeacher)[i]];
			}
		}

		// Friend tasks
		var tasksList=window.tasksFriend;
		if (vars.tasksFriend == null) {
		    vars.tasksFriend = {};
		}
		for (var attribute in tasksList) {
		    if (!(attribute in vars.tasksFriend)) {
			vars.tasksFriend[attribute] = tasksList[attribute];
		    }
		}
		for (var attribute in vars.tasksFriend) {
		    if (!(attribute in tasksList)) {
			delete vars.tasksFriend[attribute];
		    }
		}
	},
	setupCheer: function (){
		var vars = State.active.variables;
		vars.cheerleaders = this.updateStructure(vars.cheerleaders, window.cheerList, "cheerleaders");
	},
	
	setupCheerFriend: function () {
		var vars = State.active.variables;
		vars.cheerFriend = this.updateStructure(vars.cheerFriend, window.cheerFriendList, "cheerFriend");
	},

	setupClothingSets: function (){
		var vars=State.active.variables;
		var clothingSets = window.itemNavigator.clothingSets;
		if(vars.clothingSets == null){
			vars.clothingSets = [];
			
			for(var clothingSetIdx in clothingSets){
			vars.clothingSets.push(clothingSets[clothingSetIdx])
			}
		}
	},

	setupItemVariantOverrides: function(){
		var vars=State.active.variables;
		if(vars.itemVariantsOverrides == null){
			vars.itemVariantsOverrides = [];
		}
	},

	setupItemMasterOverrides: function(){
		var vars=State.active.variables;
		if(vars.itemMasterOverrides == null){
			vars.itemMasterOverrides = [];
		}
	},
	
	setupTeam: function () {
		var vars = State.active.variables;
		vars.team = this.updateStructure(vars.team, window.teamList, "team");
	},
	
	setupStores: function (){
		var vars=State.active.variables;
		var stores = window.stores;
		if(vars.stores == null){
			vars.stores = [];
		}
		for(var storeIdx in stores){
			vars.stores.push(stores[storeIdx])
		}

		//add in default bras and panties to store so we always have a base "set" available
		var defaultBraSet = window.itemFuncs.getItemByVariant('bra_00');
		var defaultPantySet = window.itemFuncs.getItemByVariant('panties_cotton_00');
		var defaultSexyBraSet = window.itemFuncs.getItemByVariant('bra_sexy_00');
		var defaultSexyPantySet = window.itemFuncs.getItemByVariant('panties_sexy_00');
		vars.stores[5].availableItemVariants.push(defaultBraSet);
		vars.stores[5].availableItemVariants.push(defaultPantySet);
		vars.stores[5].availableItemVariants.push(defaultSexyBraSet);
		vars.stores[5].availableItemVariants.push(defaultSexyPantySet);
	},
},

window.playerList={
	name: "",
	maleName: "",
	debugA: false,
	debugM: false,
	debugQ: false,
	debugN: 0,
	money: 0,
	location: "",
	bought: "",
	daring: 0,
	drunk: 0,
	arousal: 0,
	stamina: 0,
	eager: 0,
	reluctant: 0,
	workLastDay: 0,
	blowjobsToday: 0,
	maxBlowjobs: 1,
	heelsSkill: 0,
	daysInPanties: 0,
	hairColor: 1,
	quickSet: 0,
	shoppingType: 0,
	uploadType: 0,
	checkPlace: 0,
	masturbationType: 0,
	buttplugInflate: 0,
	alarmProgress: 0,
	bjDildoProgress: 0,
	choresPercent: 100,
	choreSpeed: 1,
	currentChore: 0,
	choreFails: 0,
	choreFailsCurrent: 0,
	choreFailPercent: 0,
	chorePunishmentHeels: 0,
	chorePunishmentDildo: 0,
	chorePunishmentDildoCooldown: 0,
	chorePunishmentDildoLimit: 3,
	salonTab: 0,
	salonSoftLimit: 400,
	salonLimit: 1000,
	schoolLastDay: 0,
	schoolTruantDays: 0,
	therapistMode: false,
	therapistLastDay: 0,
	therapistDays: [],
	therapistTime: 0,
	wager: 0,
	detention: false,
	alarmClockGuardian: false,
	batteryExpireDay: 0,
	batterySneakDay: 0,
	bribeDiscount: 0,
	bribeIncrease: 10,
	friendLastVisit: 0,
	clothes: [],
	clothesTmp: null,
	gameSkill: 0,
	fitness: 0,
	femaleName: false, //new flag
	clubPassword: '',
	clubPasswordFailed: false,
	tattoos: [],

	hasAlarmClock: false,
	hasBatteries: false,
	hasQualityBatteries: false,
	hasPlaygirl: false,
	hasVibrator: false,
	hasSpyCamera: false,
	hasStunGun: false,
	hasCamera: false,
	hasMassageOil: false,
	hasNailPolish: false,
	hasRemoteButtplug: false,

	hasVideoGameDecorations: false,
	hasPunkDecorations: false,
	hasFantasyDecorations: false,
	hasSportDecorations: false,
	hasClassicLamp: false,
	hasPurpleLamp: false,
	hasMulticolorLamp: false,

	stolenPlaygirl: false,
	stolenPanties: false,
	stolenSexyPanties: false,
	stolenLatexPanties: false,
	stolenVibrator: false,
	stolenStungun: false,

	canBuyStunGun: false,
	canBuyAlarmClock: true,
	canBuyBatteries: true,
	canBuyQualityBatteries: false,
	canBuyNailPolish: false,

	alarmClockCost: 20,
	batteriesCost: 5,
	qualityBatteriesCost: 10,
	playgirlCost: 100,
	vibratorCost: 60,
	spyCameraCost: 40,
	stunGunCost: 200,
	massageOilCost: 20,
	nailPolishCost: 10,

	videoGameDecorationsCost: 100,
	punkDecorationsCost: 80,
	fantasyDecorationsCost: 120,
	sportDecorationsCost: 90,
	classicLampCost: 20,
	purpleLampCost: 35,
	multicolorLampCost: 25,

	canVisitTestLab: false,
	shoeSize: 0,
},

window.playerAddonsList={
	room: {
		style: 0,
		lamp: 0,
		morning: 0,
		junkMax: 11,
		junkMaxGirl: 5,
		junk: [],
		jacket: 0,
		tie: 0,
		girljacket: 0,
		skirt: 0,
		girlstie: 0,
		drawer: false
	},
	daringFlag: {
		bathroomDoor: false,
		bribe: false,
		snooping: false,
		sleepingGrope: false,
		femaleClothes: false,
		femaleUnderwear: false,
		toiletsMasturbating: false,
		noUnderwear: false,
		posingtoCoach: false,
		handjob: false,
		bjBully: false,
		coachGame: false,
		coachGameWin: false,
		stunBully: false,
		quickFemaleSchool: false,
		quickFemaleCasual: false
	},
	punishments: {
		penalty: 0,
		penaltyMonday: 0,
		punSeverity: 0,
		lastPunName: 0,
		aphrodisiacDuration: 0,
		penaltySkipped: false,
		penaltyCollar: false,
		penaltyWaxed: false,
		penaltyClinic: false,
		penaltyTrials: false,
		penaltySissyShow: false,
		nailPolishPenalty: false,
		nailPolishPenaltyOver: false,
		refusedToPay: false,
		refusedToCrossdress: false
	},
	jobs: {
		active: false,
		salonPlan: 0,
		pay: 0,
		tips: 0,
		fastfoodPerversion: 0,
		adultstorePerversion: 0,
		workedToday: false
	},
	perversion: {
		guardian: 0,
		guardianCooldown: 0,
		guardianWatch: 0,
		guardianCorruption: 0,
		teacher: 0,
		teacherCooldown: 0,
		teacherPermChastity: 0,
		therapist: 0,
		therapistCooldown: 0,
		therapistTalk: 0,
		therapistTalkLevel: 0,
		assistant: 0,
		bullies: 0,
		boyfriend: 0,
		coach: 0,
		photogirl: 0,
		friend: 0,
		upload: 0,
		uploadCooldown: 0,
		crossdressing: 0,
		mall: 0,
		club: 0,
		danceClub: 0,
		clubToiletCooldown: 0,
		noseWagerCount: 0,
		bjFirst: 0,	/* "bully", "coach" */
		bjSkill: 0,
		vibratorFirst: 0, /* "guardian", "photoGirl", "coach", "badBoyfriend" */
		analFirst: 0, /* "guardian", "photoGirl", "coach", "badBoyfriend" */
		analSkill: 0,
		schoolSlut: 0,
		penisFirst: 0, /* "slave girls", "guardian", "femFriend", "cheerCaptain", "cheerBitch", "photoGirl" */
		ending: -1,
	},
	masturbate: {
		lastDay: 0,
		lastHour: 0,
		lastMinute: 0,
		DayTemp: 0,
		HourTemp: 0,
		MinuteTemp: 0,
		DayTease: 0,
		HourTease: 0,
		MinuteTease: 0
	},
	exp: {
		crossdressingExp: 0,
		chastityExp: 0,
		buttplugExp: 0,
		heelsExp: 0,
		dildoSuckExp: 0,
		crossdressingExp: 0,
		pettingFirst: 0,	/* "bully", "coach" */
		pettingExp: 0,
		handjobFirst: 0,	/* "bully", "coach" */
		handjobExp: 0,
		bjFirst: 0,	/* "bully", "coach" */
		bjExp: 0,
		vibratorFirst: 0, /* "guardian", "therapist", "shop" */
		vibratorExp: 0,
		analFirst: 0, /* "guardian", "photoGirl", "coach", "badBoyfriend" */
		analExp: 0,
		penisFirst: 0,
	},
	clothingSlots:{
		bra: null,
		buttplug: null,
		chastity: null,
		earring: null,
		eyewear: null,
		headwear: null,
		hosiery: null,
		mouth: null,
		neckwear: null,
		outerwear: null,
		shoes: null,
		underwear: null,
		maid: null,
	},
	stashedClothing:{
		bra: null,
		buttplug: null,
		chastity: null,
		earring: null,
		eyewear: null,
		headwear: null,
		hosiery: null,
		mouth: null,
		neckwear: null,
		outerwear: null,
		shoes: null,
		underwear: null,
		maid: null,
	},
	ending: {
		currentEnding: "none",
		endingsCompleted: 0,
		endingsTotal: 1,
		lessonSkip: false, /*toggles off daily lessons*/
		genericEndings: ["Trophy Wife"],
		endingDescriptions: ["@@.teacher;You will be trained to be the perfect arm candy and sexual partner.  Instruction will consist of proper deportment, as well as sexual techniqes. You will also be required to go on dates with prospective partners and modify your body into one your potential partner will be proud to show off.@@"], 
		
		comportment:  {
			numOfLessons: [3, 3, 3],
			classStatus: [0, 0, 0], 	/*ettiquite, poise, bimbo; 
									0 = not started, 1 = active, 2 = on hold, 3 = penalty class, 4 = passed, 5 = failed*/
			stepfordPath: false,
			preferredGender: 0, /*0 = none, 1 = female, 2 = male */
			
			etiquette:  {
				progress: 0,
				lessonFail:[0,0,0],
				partyRepeat: false,
				partyStart: false,
				voicePunish: false,
			},
			poise:	{
				progress:0,
				lessonFail: [0,0,0],
				
			},
			bimbo:	{
				progress: 0,
				lessonFail:[0,0,0],
				hotelBimboLesson: false,
				hotelRepeat: false,
			},
			partners:{
				guardian:	{
					id: "guardian",
					name: "",
					hair: [1, 2, 3, 4, 5],
					face: [0, 1, 2],
					lips: [0, 1, 2],
					breasts: [0, 1, 2, 3, 4],
					ass: [0, 1, 2],
					smoothing: [0, 1, 2, 3],
					numOfDates: 0,
					gender: 1,
				},
				coach:	{
					id: "coach",
					name: "Coach",
					hair: [3, 4, 5],
					face: [2],
					lips: [2],
					breasts: [4],
					ass: [2],
					smoothing: [3],
					numOfDates: 0,
					gender: 2,
				},
				ashley:	{
					id: "ashley",
					name: "Ashley",
					hair: [2, 3, 4, 5],
					face: [2],
					lips: [2],
					breasts: [2, 3, 4],
					ass: [2],
					smoothing: [0, 1, 2, 3],
					numOfDates: 0,
					gender: 1,
				},
				roxy:	{
					id: "roxy",
					name: "Roxy",
					hair: [1, 2, 3, 4, 5],
					face: [1, 2],
					lips: [0],
					breasts: [0],
					ass: [1, 2],
					smoothing: [1, 2, 3],
					numOfDates: 0,
					gender: 1,
				},
				jogger:	{
					id: "jogger",
					name: "the Jogger",
					hair: [1, 2, 3, 4, 5],
					face: [1, 2],
					lips: [1, 2],
					breasts: [1, 2, 3, 4],
					ass: [1, 2],
					smoothing: [1, 2, 3],
					numOfDates: 0,
					gender: 2,
					dateSexFlag: false,
				},
				dramaTeacher:	{
					id: "dramaTeacher",
					name: "Ms. Ravensong",
					hair: [2, 3, 5],
					face: [1, 2],
					lips: [1, 2],
					breasts: [1, 2, 3],
					ass: [0],
					smoothing: [0, 1, 2, 3],
					numOfDates: 0,
					gender: 1,
				},
			}
		},
	},
},

window.friendList={
	he_she: 'he',
	He_She: 'He',
	him_her: 'him',
	Him_Her: 'Him',
	his_her: 'his',
	His_Her: 'His',
	his_hers: 'his',
	His_Hers: 'His',
	gender: 'M',

	/* TODO: discuss whether these should indeed end up in "friendG" */
	snoop: 0,
	daysSinceLastVisit: 0,
	catchUp: 0,
	admitWhatsWrong: 0,
	admitLikingTrap: 0,
	leave_message: '',	/* Printed in end of Hang Out or early in Leav friend's house */
	adultBaby: false,
	ageBehavior: false,
	frilly: false,
	visit: {
        r2: 0,
        c3: 0,
    },
	tasks: {
		timesHelped: 0,
		bra: false,
		flats: false,
		legHair: false,
		mall: false,
		selfieFemaleClothes: false,
        selfieMakeup: false,
        selfieNightwear: false,
		posingSeductively: false,
		selfiePracticeHeels: false,
		crossdressAtPark: false,
		crossdressAroundBlock: false,
		danceAtHome: false,
		manicure_renewal: false,
		manicure: false,
		stockings: false,
		park: false,
		practiceHeels: false,
	},
	reactions: {
		hair: 0,
		color: 0,
		beautyMark: 0,
		heart: 0,
		butterfly: 0,
		bunny: 0,
		stockings: 0,
		sissy: 0,
		slut: 0,
		whore: 0,
		makeup: 0,
		pEars: 0,
		pNose: 0,
		pTongue: 0,
		pLip: 0,
		pBelly: 0,
		pNipples: 0,
		nails: 0,
		boobs: 0,
		lips: 0,
		butt: 0,
		face: 0,
		tattooOkCount: 0,
		tattooBadCount: 0,
		piercingBadCount: 0,
	},
	body:{
		boobs: 0,
	},
    seenBra: 0,
    seenChastity: 0, /* whether friend saw PC's chastity cage */
    seenFlatShoes: 0,
    seenMakeupClinic: 0,
    seenManicure: 0,
    seenPanties: 0,
    seenPlug: 0, /* whether friend saw PC's plug */
	seenWaxedLeg: 0,
	girlinessAttempt: 0, /* whether friend checked PC's girliness */
	girlinessFail: 0, /* whether PC failed girliness check before */
	blockAttempt: 0,
	blockFail: 0,
	friendTaskFrustration: 0,
	friendGetChastity: 0, /* whether friend wants to get a chastity cage himself */
	wearsChastity: 0, /* whether friend wears a chastity cage (unused) */
	wearsPlug: 0, /* whether friend wears a butt-plug (checked, but never set) */
	friendKiss: 0, /* how often PC and friend kissed */
	bonusDress: 0,
	parkAttempt: 0,
	parkFail: 0,
	seenDressUp: 0,
	evilFriend: 0,
	noUnderwear: 0,
},

window.futaList={
	he_she: 'he',
	He_She: 'He',
	him_her: 'him',
	Him_Her: 'Him',
	his_her: 'his',
	His_Her: 'His',
	his_hers: 'his',
	His_Hers: 'His',
	Boy_Girl: 'Boy',
	boy_girl: 'boy',
	Boys_Girls: 'Boys',
	boys_girls: 'boys',
	Guy_Girl: 'Guy',
	guy_girl: 'guy',
	team: 'football',
	Team: 'Football',
},

window.bodyList={
	bodyhair: {
		level : 0,
		disabled : false,
		maxLevel : 3,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : false
		},
		level1: {
			description : "Waxing",
			cost : 20,
			image : "hr_waxing.jpg",
			daring : 5,
			disabled : false
		},
		level2: {
			description : "Depilatory",
			cost : 30,
			image : "hr_depilatory.jpg",
			daring : 6,
			disabled : false
		},
		level3: {
			description : "Laser hair removal",
			cost : 200,
			image : "hr_laser.jpg",
			daring : 7,
			disabled : false
		}
	},

	penisShrink: {
		level : 0,
		disabled : true,
		maxLevel : 1,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Penis shrinking",
			cost : 20,
			image : "small_penis.jpg",
			daring : 9,
			disabled : true
		},
	},

	hairstyle: {
		level : 0, // 0 : boy, 1: short, 2 : medium, 3 : long, 4 : pigtails, 5 : curly
		disabled : false,
		maxLevel : 4,
		level0: {
			description: "Male haircut",
			disabled: true
		},
		level1: {
			description : "Short haircut",
			cost : 20,
			image : "hair_short_brown.jpg",
			daring : 5,
			disabled : true
		},
		level2: {
			description : "Medium haircut",
			cost : 30,
			image : "hair_medium_brown.jpg",
			daring : 6,
			disabled : true
		},
		level3: {
			description : "Long haircut",
			cost : 50,
			image : "hair_long_brown.jpg",
			daring : 6,
			disabled : true
		},
		level4: {
			description : "Pigtails",
			cost : 30,
			image : "hair_pigtails_brown.jpg",
			daring : 6,
			disabled : true
		},
		level5: {
			description : "Curly hair",
			cost : 40,
			image : "hair_curly_brown.jpg",
			daring : 6,
			disabled : true
		},
	},

	hairColor: 1,

	nose: {
		level : 0, // 0 : none, 1 : classic, 2 : button, 3 : piggy
		disabled : false,
		maxLevel : 3,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Classic nose",
			cost : 100,
			image : "nose_classic.jpg",
			daring : 6,
			disabled : true
		},
		level2: {
			description : "Button nose",
			cost : 200,
			image : "nose_button.jpg",
			daring : 6,
			disabled : true
		},
		level3: {
			description : "Piggy nose",
			cost : 20,
			image : "nose_piggy.jpg",
			daring : 6,
			disabled : true
		},
	},

	earsPierced: {
		level : 0,
		disabled : false,
		maxLevel : 1,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Ears piercing",
			cost : 30,
			image : "piercing_ears.jpg",
			daring : 2,
			disabled : true
		},
	},
	bellyPierced: {
		level : 0,
		disabled : false,
		maxLevel : 1,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Belly piercing",
			cost : 50,
			image : "piercing_belly.jpg",
			daring : 7,
			disabled : true
		},
	},
	lipsPierced: {
		level : 0,
		disabled : false,
		maxLevel : 1,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Lip piercing",
			cost : 20,
			image : "piercing_lips.jpg",
			daring : 7,
			disabled : true
		},
	},
	nipplesPierced: {
		level : 0,
		disabled : false,
		maxLevel : 1,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Nipples piercing",
			cost : 80,
			image : "piercing_nipples.jpg",
			daring : 7,
			disabled : true
		},
	},
	nosePierced: {
		level : 0,
		disabled : false,
		maxLevel : 1,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Nose piercing",
			cost : 40,
			image : "piercing_nose.jpg",
			daring : 7,
			disabled : true
		},
	},
	tonguePierced: {
		level : 0,
		disabled : false,
		maxLevel : 1,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Tongue piercing",
			cost : 30,
			image : "piercing_tongue.jpg",
			daring : 7,
			disabled : true
		},
	},


	surgerySexualReassignment: {
		level : 0,
		disabled : false,
		maxLevel : 2
	},
	
	boobs: {
		level : 0,
		semiLevel: 0,
		permLevel: 0,
		disabled : false,
		maxLevel : 4,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Breast implants - small",
			cost : 50,
			image : "breast_implants_stage1.gif",
			daring : 6,
			disabled : true
		},
		level2: {
			description : "Breast implants - average",
			cost : 100,
			image : "breast_implants_stage2.gif",
			daring : 6,
			disabled : true
		},
		level3: {
			description : "Breast implants - big",
			cost : 200,
			image : "breast_implants_stage3.gif",
			daring : 7,
			disabled : true
		},
		level4: {
			description : "Breast implants - massive",
			cost : 400,
			image : "breast_implants_stage4.gif",
			daring : 8,
			disabled : true
		},
	},

	lips: {
		level : 0, //0 : normal, 1 : enhanced, 2 : enhanced more
		semiLevel: 0,
		permLevel: 0,
		disabled : false,
		maxLevel : 2,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Lips enhancing",
			cost : 30,
			image : "bm_lips.gif",
			daring : 7,
			disabled : true
		},
		level2: {
			description : "Lips enhancing extra",
			cost : 100,
			image : "bm_lips_xl.gif",
			daring : 8,
			disabled : true
		},
	},

	ass: {
		level : 0,
		semiLevel: 0,
		permLevel: 0,
		disabled : false,
		maxLevel : 2,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Ass enhancing",
			cost : 30,
			image : "bm_ass.gif",
			daring : 7,
			disabled : true
		},
		level2: {
			description : "Ass enhancing extra",
			cost : 100,
			image : "bm_ass_xl.gif",
			daring : 8,
			disabled : true
		},
	},

	face: {
		level : 0,
		semiLevel: 0,
		permLevel: 0,
		disabled : false,
		maxLevel : 2,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Facial softening",
			cost : 100,
			image : "facial_softening.jpg",
			daring : 7,
			disabled : true
		},
		level2: {
			description : "Facial softening extra",
			cost : 300,
			image : "facial_surgery.jpg",
			daring : 8,
			disabled : true
		},
	},

	manicure: {
		level : 0, // 0 : normal, 1 : manicured, 2 : Garish manicure
		semiLevel: 0,
		permLevel: 0,
		disabled : false,
		maxLevel : 2,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Manicure",
			cost : 20,
			image : "manicure.jpg",
			daring : 7,
			disabled : true
		},
		level2: {
			description : "Garish manicure",
			cost : 200,
			image : "manicure_garish.jpg",
			daring : 9,
			disabled : true
		},
	},
	makeup: {
		level : 0, // 0 : none, 1 : subtle, 2 : normal, 3 : heavy, 4 : slutty
		semiLevel: 0,
		permLevel: 0,
		disabled : false,
		maxLevel : 4,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Subtle makeup",
			cost : 10,
			image : "makeup_subtle.jpg",
			daring : 5,
			disabled : true
		},
		level2: {
			description : "Professional makeup",
			cost : 30,
			image : "makeup_normal.jpg",
			daring : 7,
			disabled : true
		},
		level3: {
			description : "Heavy makeup",
			cost : 15,
			image : "makeup_heavy.jpg",
			daring : 8,
			disabled : true
		},
		level4: {
			description : "Bimbo makeup",
			cost : 50,
			image : "makeup_bimbo.jpg",
			daring : 7,
			disabled : true
		},
	},

	anal: {
		level : 0,
		semiLevel: 0,
		permLevel: 0,
		disabled : false,
		maxLevel : 3,
		level0: {
			description : "None",
			cost : 0,
			image : "none.jpg",
			daring : 0,
			disabled : true
		},
		level1: {
			description : "Anal smoothing",
			cost : 50,
			image : "ass_smoothening_1.jpg",
			daring : 8,
			disabled : true
		},
		level2: {
			description : "Anal smoothing plus",
			cost : 100,
			image : "ass_smoothening_2.jpg",
			daring : 9,
			disabled : true
		},
		level3: {
			description : "Anal smoothing extra",
			cost : 150,
			image : "ass_smoothening_3.jpg",
			daring : 10,
			disabled : true
		},
	},
	
	boobsNoticedTeacher: 0,
	lipsNoticedTeacher: 0,
	assNoticedTeacher: 0,
	faceNoticedTeacher: 0,
	manicureNoticedTeacher: 0,
	makeupNoticedTeacher: 0,
	analNoticedTeacher: 0,
	
	boobsNoticedGuardian: 0,
	lipsNoticedGuardian: 0,
	assNoticedGuardian: 0,
	faceNoticedGuardian: 0,
	manicureNoticedGuardian: 0,
	makeupNoticedGuardian: 0,
	analNoticedGuardian: 0,
	
	boobsNoticedFriend: 0,
	lipsNoticedFriend: 0,
	assNoticedFriend: 0,
	faceNoticedFriend: 0,
	manicureNoticedFriend: 0,
	makeupNoticedFriend: 0,
	analNoticedFriend: 0,
	
	boobsNoticedDJ: 0,

},

window.flagsList={
	arrowsHelp: false,
	roomHelp: false,
	avatarHelp: false,
	checkSelfHelp: false,
	easyMinigames: false,
	bribePaid: false,
	bribeTransfered: false,
	bribeFail: false,
	cameraBathroom: false,
	cameraBedroom: false,
	forcedHorny: false,
	showDreamImage: false,
	restlessDream: false,
	catStuff: false,
	foxStuff: false,
	arcadeWin: false,
	PSBoxAnnoyed: false,
	exhausted: false,
	tired: false,
	redecorate: false,
	roomFuschia: false,
	roomOrchid: false,
	roomBdsm: false,
	spyCamLooked: false,
	sleepGuardianRoom: false,
	schoolWalk: false,
	aprilsFools: false,
	aprilsFoolsChast: false,
	trainingCockSuck: false,
	penisShrinkProgress: false,
	penisShrinkSleep: false,
	penisShrinkPunishment: false,
	walletForgottenStart: false,
	walletForgottenEnd: false,
	firstBuyDress: false,
	firstBuyShoes: false,
	firstBuyFlats: false,
	firstBuyHeels: false,
	firstBuyPanties: false,
	firstBuyBras: false,
	firstBuyStockings: false,
	firstBuyFemale: false,
	secondBuyFemale: false,
	friendNamed: false,
	friendIsMale: true,
	friendButtplugGame: false,
	friendNakedMassage: false,
	friendNoticeSalonPenalty: false,
	friendNoticeMakeup: false,
	friendNoticeBreastsDD: false,
	friendNoticeBreastsC: false,
	friendNoticeBreastsB: false,
	friendNoticeTattooHeart: false,
	friendNoticeLipsEnhancing: false,
	friendNoticeLipsEnhancingXL: false,
	friendNoticeManicure: false,
	friendNoticeNoseClassic: false,
	friendNoticeNoseButton: false,
	friendNoticeNosePiggy: false,
	friendNoticeBeautyMark: false,
	friendNoticePiercingEars: false,
	friendNoticePiercingLips: false,
	friendNoticePiercingNose: false,
	friendNoticePiercingTongue: false,
	friendNoticeHairMedium: false,
	friendNoticeHairLong: false,
	friendNoticeHairPigtails: false,
	friendNoticeHairCurly: false,
	maidWriter: false,
	maidUniform: false,
	teacherPanties: false,
	hairRibbon: false,
	heelsOff: false,
	batteriesExpire: false,
	bathroomPeep: false,
	nightieSleep: false,
	sleepWarning: false,
	sissyConfession: false,
	sissyConfessionStart: false,
	sissyConfessionShown: false,
	mallBlowjob: false,
	jogger: false,
	clinicDonorsHelp: false,
	femaleSchool: false,
	femaleClass: false,
	femaleHall: false,
	heelsFall: false,
	schoolButtplug: false,
	schoolChastity: false,
	nailGloss: false,
	cameraRecording: false,
	pissRecorded: false,
	pissDrunk: false,
	pissCaught: false,
	assistantTaskGiven: false,
	bullyTaskGiven: false,
	bullyRecorded: false,
	bullySucked: false,
	bullySteal: false,
	bullyDoubleteam: false,
	touristsMeet: false,
	whoreRecorded: false,
	whoreFucked: false,
	newBoyfriendIntro: false,
	newBoyfriend: false,
	guardianEvil: false,
	guardianBoyfriendIntro: false,
	guardianCumDrink: false,
	guardianCondoms: false,
	guardianCondomsAsk: false,
	guardianCondomsDone: false,
	guardianSnooping: false,
	guardianSnoopingCaught: false,
	guardianWork: false,
	talkClinicWork: false,
	guardianBfAgree: false,
	guardianBfBlame: false,
	guardianFuckedByStrapon: false,
	guardianTeacherTalk: false,
	guardianPunishDressUp: false,
	guardianPunishVibrator: false,
	guardianRuinedDress: false,
	straponForced: false,
	teacherNoticeHairRemovalPerm: false,
	teacherNoticeManicure: false,
	teacherNoticeManicurePerm: false,
	teacherNoticeNoseClassic: false,
	teacherNoticeNoseButton: false,
	teacherNoticeNosePiggy: false,
	teacherNoticeBreastsDD: false,
	teacherNoticeBreastsC: false,
	teacherNoticeBreastsB: false,
	teacherNoticeBreastsA: false,
	teacherNoticeAssEnhancingXL: false,
	teacherNoticeLipsEnhancingXL: false,
	teacherNoticePiercingLips: false,
	teacherNoticePiercingNose: false,
	teacherNoticePiercingBelly: false,
	teacherNoticePiercingTongue: false,
	teacherNoticePiercingNipples: false,
	teacherNoticeSubtleMakeup: false,
	teacherNoticeNormalMakeup: false,
	teacherNoticeBimboMakeup: false,
	teacherNoticeHeavyMakeup: false,
	teacherNoticeAnalSmooth2: false,
	teacherNoticeAnalSmooth3: false,
	guardianNoticesalonPenalty: false,
	guardianNoticeNormalMakeup: false,
	guardianNoticeBimboMakeup: false,
	guardianNoticeHeavyMakeup: false,
	guardianNoticeBreastsDD: false,
	guardianNoticeBreastsC: false,
	guardianNoticeBreastsB: false,
	guardianNoticeBreastsA: false,
	guardianNoticetattooHeart: false,
	guardianNoticeLipsEnhancing: false,
	guardianNoticeLipsEnhancingXL: false,
	guardianNoticeManicure: false,
	guardianNoticeGarishManicure: false,
	guardianNoticenoseClassic: false,
	guardianNoticenoseButton: false,
	guardianNoticenosePiggy: false,
	guardianNoticebeautyMark: false,
	guardianNoticePiercingEars: false,
	guardianNoticePiercingLips: false,
	guardianNoticePiercingNose: false,
	guardianNoticePiercingTongue: false,
	guardianNoticeHairShort: false,
	guardianNoticeHairMedium: false,
	guardianNoticeHairLong: false,
	guardianNoticeHairPigtails: false,
	guardianNoticeHairCurly: false,
	guardianNoticeChastity: false,
	guardianShopping: false,
	guardianShopCloth: false,
	guardianShopPhoto: false,
	guardianShopAdult: false,
	guardianShopTrig: false,
	gTrialLatexMaid: false,
	gTrialPenisGag: false,
	gTrialGiantVibroPlug: false,
	gTrialStrapOn: false,
	guardianStrapon: false,
	gTrialBalletHeels: false,
	gTrialCorset: false,
	gTrialChains: false,
	gTrialCollar: false,
	gTrialWhip: false,
	gTrialToilet: false,
	WebHorseCock: false,
	shoesCheck: false,
	laundryAccident: false,
	laundryAccident2: false,
	vibratorCaught: false,
	uploadDone: false,
	uploadCaught: false,
	boyfriendCaught: false,
	dreamgameCaught: false,
	dreamgameCaughtWin: false,
	dreamgameCaughtTalk: false,
	chastityKey: false,
	chastityLocked: false,
	collarLocked: false,
	wardrobeSelector: true,
	wardrobeSelectorFull: true,
	chastityWarning: false,
	lockedWeekend: false,
	chastityAgree: false,
	coachPosing: false,
	coachPosingHappy: false,
	coachPosingAngry: false,
	buttplugLost: false,
	taskGuideHandGirl: false,
	taskGuideHandWomanMan: false,
	taskGuideHandCouple: false,
	taskGuideHandTrap: false,
	roomOffer: false,
	choreCheck: false,
	choreLazy: false,
	confiscatedPSBox: false,
	confiscatedInternet: false,
	confiscatedVibrator: false,
	chorePunishment: false,
	chorePunMode: false,
	choreReward: false,
	choreRewAllowance: false,
	chorePunAllowance: false,
	choreRewCallOfHonor: false,
	choreRewSpinning: false,
	chorePunishmentHeels: false,
	chorePunishmentDildo: false,
	checkingGift: false,
	choreForcedFail: false,
	dominatrixDress: false,
	newCallOfHonorPlayed: false,
	chorePunOffer: false,
	chorePunKinky: false,
	choreRewClothes: false,
	salonVisited: false,
	salonVisitedFirst: false,
	salonHairRemoval: false,
	salonManicure: false,
	salonMakeup: false,
	salonBreast: false,
	salonLips: false,
	salonNose: false,
	salonAss: false,
	salonPenis: false,
	salonCorset: false,
	salonAnal: false,
	salonSemiPerm: false,
	salonPickNose: false,
	salonPenalty: false,
	salonPenaltyPayed: false,
	salonPiggyCoin: false,
	clothesPurged:false, //new flag
	delaySlut: 0,
	canGame: true,
	difficulty: 2,
	choreFactor: 1,
	bribeFactor: 1,
	metClothesClerk: false,
	quizState: "none",
	quiz: [0,0,0,0,0,0,0,0,0,0],
	daring3Add: false,
	visited111: false,
	slutWork: false, //Performed as school slut
	rewardFirst: true, //first time rewarding team
	failedReward: false, //did not give team reward in teacher task
	volleyFirst: true, //first time visiting the volleyball team
	firstTimeTAAnime: true, //first time meeting the TA in the anime club
	failedPrincipal: false, //did not work for principal in teacher task
	endSchoolSlut: 0,
	nancyChastTalk: false,
	slutGoodEnd: 0,
	slutBadEnd: 0,
	teacherSawPanties: false,
	friendBraTask: false,
	ashleyTrained: false,
	flatsFlag: false,
	flatsDelay: false,
	slutRoute: false,
	bullyRoute: false,
	mallUrbaneIntro: false,
	visitedCountyClub: false,
	dramaTeacherDate: false,
	mallKlipIntro: false,
	talkSneakIn: false,
	bribedTeacher: false,
	healthSocks: false,
	girlPants: false,
	partyEars: false,
	findDancePartner: false,
	danceLessonPartner: "none",
	poiseRemedialGuardian: false,
	bimboLessonPartner: "none",
	lessonMultiFail: false,
	storeLastRefreshed: [-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10],
	refreshTravel: false,
	holdPaymentIncrease: false,
},

window.kinkList={
	incest: false,
	futa: false,

	semenConsumptionStarted: false,	
	semenConsumption: false,
	creampie: false,
	bukkake: false,
	cumEating: false,
	ownCum: false,
	cumSwap: false,

	watersportsStarted: false,	
	watersports: false,
	wetting: false,
	urineDrink: false,
	urinePlay: false,
	
	smallPenisStarted: false,
	smallPenis: false,
	penisShrink: false,
	sph: false,

	bdsmStarted: false,
	bdsm: false,
	painPlay: false,
	xPain: false,
	petPlay: false,
	bondage: false,
	facesit: false,
	trampling: false,

	footFetishStarted: false,
	footFetish: false,
	footDisplay: false,
	footWorship: false,
	hosiery: false,
	shoeBoot: false,
	footjob: false,

	odorStarted: false,
	odor: false,
	clothesOdor: false,
	shoeSockOdor: false,
	footOdor: false,
	armpitOdor: false,
	assOdor: false,
	genitalOdor: false,

	degradationStarted: false,
	degradation: false,
	curse: false,
	whoring: false,
	bimbo: false,
	spitting: false,
	abusive: false,
	mindControl: false,
	questionable: false,
	tattoo: false,
	piercing: false,

	agePlayStarted: false,
	agePlay: false,
	diapering: false,
	adultBaby: false,
	ageBehavior: false,

	xBodyStarted: false,
	xBody: false,
	bbw: false,
	hyperBreasts: false,
	hyperPenis: false,
	dwarf: false,
	tall: false,
	muscle: false,
	expansionWeight: false,
	
	clothingStarted: false,
	clothing: false,
	latex: false,
	leather: false,
	nylon: false,
	frilly: false,

	genderChangeStarted: false,
	genderChange: false
},

window.quickSlotList={
	School: {
	name: "School",
	extra: false
	},
	School_b: {
	name: "School b",
	extra: true
	},
	School_c: {
	name: "School c",
	extra: true
	},
	Casual: {
	name: "Casual",
	extra: false
	},
	Casual_b: {
	name: "Casual b",
	extra: true
	},
	Casual_c: {
	name: "Casual c",
	extra: true
	},
	Slutty: {
	name: "Slutty",
	extra: false
	},
	Slutty_b: {
	name: "Slutty b",
	extra: true
	},
	Slutty_c: {
	name: "Slutty c",
	extra: true
	},
	Nightwear: {
	name: "Nightwear",
	extra: false
	},
	Maid: {
	name: "Maid",
	extra: false
	},
	Cheerleader: {
	name: "Cheerleader",
	extra: false
	},
	Custom: {
	name: "Custom",
	extra: false
	},
	Custom_a: {
	name: "Custom a",
	extra: true
	},
	Custom_b: {
	name: "Custom b",
	extra: true
	},
	Custom_c: {
	name: "Custom c",
	extra: true
	},
	Custom_d: {
	name: "Custom d",
	extra: true
	},
	Custom_e: {
	name: "Custom e",
	extra: true
	},
	Custom_f: {
	name: "Custom f",
	extra: true
	},
	Custom_g: {
	name: "Custom g",
	extra: true
	},
	Custom_h: {
	name: "Custom h",
	extra: true
	}
},

window.cheerList={
	//Main Cheerleader Arc
	active: false,		//If the cheerleader arc is active or not [bool]
	progress: -1,		//Current progress in cheerleader arc [int]
	fakeName: window.playerList.name,	//Fake name used by player [str]
	position: 1,		//player's position in the squad, [int], [1 = base, 2 = flyer]
	bitchAffinity: 0,		//player's relationship to cheer bitch [int]
	bullySawWorkout: false,
	rainyDay: false,
	canPractice: true, 	//can practice cheerleading after school
	cleanDone: 0,	//how much cleaning of the equipment room the player has done.
	
	//variables for scene control over more than one page break or values that may be useful in later episodes
	//all variables are type [bool] unless noted otherwise
	flags: {
		skippedPractice: false,	//did not attend practice
		madeUpPractice: false,	//attended makeup practice after skipping
		grope: false,	//groped cheer traitor
		beg: false,	//begged cheer bitch for mercy
		fakeName: false,	//used a fake name
		stoleUniform: false,	//stole guardians uniform
		lateForPractice: false, 	//waited in toilet until late for practice
		bullyLeft: false, 		//waited in toilet until bully left
		complain: false,	//complained about practice
		slutUniform: 0,	//chosen slutty uniform [int], [0 = more modest + plug, 1 = more slutty]
		sarahTalk: 0,	//talked with cheer friend about Sarah [int], [0 = did not talk, 1 = tell the truth, 2 = lie]
		metBro: false,	//met Ashley's brother at the library.
		panties: false,	//PC tries to wear panties to his fake try-out
		wig: false,		//PC wears a wig to the try-out, worth +1 slut score adjustment
		falsies: false,	//PC wears a bust enhancer to the try-out, worth +1 or +2 slut score adjustment based on starting breast size
		makeup: false,	//PC tries to put on makeup before the try-out, worth +1 slut score adjustment
		prankBeg: false,	//PC begs for mercy to end prank
		prank1Finish: false, //PC completed tryout prank 
		prank2: false,	//controls access to gym prank
		guardianPractice: false, //allows player to practice cheerleading with guardian
		dancePractice: false, //allows player to practice dancing
		prankTeam: "none", //which team the player chose for the locker room prank

		//notice body mods flags for cheer captain and cheer friend 
		//in cheer arc, both trigger off the same set of variables
		//all variables start as false and are type [bool] unless noted otherwise
		
		noticeSkin: false,
		noticeMan: false,
		noticeManPerm: false,
		noticeHairS: false,
		noticeHairM: false,
		noticeHairL: false,
		noticeHairPig: false,
		noticeHairCurl: false,
		noticeMakeSub: false,
		noticeMakePro: false,
		noticeMakeBim: false,
		noticeMakeHeavy: false,
		noticeTatHeart: false,
		noticePierceEar: false,
		noticePierceLip: false,
		noticePierceNose: false,
		noticePierceTongue: false,
		noticeBreasts: 0, //[int]; [0 = no breasts, 1 = A, 2 = B, 3 = C, 4 = DD]
		noticeLips: false,
		noticeLipsXL: false,
		noticeAss: false,
		noticeAssXL: false,
		noticeNoseClass: false,
		noticeNoseButt: false,
		noticeNosePig: false,
		noticeFace: false,
		noticeFace2: false
	},
	game: {
		athleticism: 0,	//PC's athelticism score portion
		presentation: 0,	//PC's presentation score.  If uniform 1, score equals 8-abs(6-adjustedSlutScore)
		execution: 10,	//PC's execution score.  Each mistake deducts one point.
		finalScore: 0,	//PC's final score.  Eventually equal to (cheerleaders.game.athleticism + cheerleaders.game.presentation + cheerleaders.game.execution*2)/4
		adjustedSlutScore: 0,	//basic slut score adjusted for temporary mods.  Eventually equal to max(slutScoreBasic, min(7, cheerleaders.game.adjustedSlutScore)
		practiced: false, //practiced ashley's cheer before tryout.
	}
},

window.cheerFriendList={
	progress: 0,	//current progress in side events, [int]
	affinity: 0,		//current affinity of cheer friend to PC, [int]
	currentSE: 0,		//currently available side event
	name: 'Lauren',		//Name for cheer friend, [str], default = 'Lauren'
	prize: 'money',		//prize offered cheer friend's brother
	
	//current attraction of cheer friend to PC (affinity + modified slut score), [int]
	//attraction: affinity + ((5-abs(window.playerCode.slutScoreBasic() - 6))+(floor(window.playerCode.slutScore()/10)-2)) ,
	getAttraction: function(){
		return this.affinity + ((5-Math.abs(window.playerCode.slutScoreBasic() - 6))+(Math.floor(window.playerCode.slutScore()/10)-2))
	},

	flags: {
		acceptInvite: false,	//accepting cheer friend's request to meet, [bool]
		boy: 1,		//type of boy PC suggests cheer friend likes [int],[1 = jock, 2 = bad boy, 3 = nerd]
		force: false,	//took diary by force
		visitedHouse: false, //visited house in SE 5
		genderPref: "", //stated preferred gender
	}
},

window.teamList={
	sport: "football",
	mean: "Rich",
	nice: "Mike",
	center: "Carl",
	voice: "malevoice",
}
