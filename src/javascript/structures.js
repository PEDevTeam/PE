window.rewardMoney={
	teacherFemaleUnderwear: 10,
	teacherFemaleClothing: 15,
	teacherButtplug: 5,
	teacherChastity: 10,
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
		this.setupItems();
		this.setupChores();
		this.setupDreams();
		this.setupLocations();
		this.setupFriendRiddles();
		this.setupTalks();
		this.setupPunishments();
		this.setupTasks();
		this.setupCheer();
		this.setupCheerFriend();
		
		window.versionControl.update();
		State.active.variables.gameVersion = window.gameCode.version;
	},
	setupPlayer: function() {
		var vars=State.active.variables;
		var playerList=window.playerList;
		if (vars.player == null) {
			vars.player = {};
		}
		for (var i=0; i < Object.keys(playerList).length; i++) {
			if (vars.player[Object.keys(playerList)[i]] == null) {
				vars.player[Object.keys(playerList)[i]] = playerList[Object.keys(playerList)[i]];
			}
		}
		
		var playerAddonsList=window.playerAddonsList;
		for (var i=0; i < Object.keys(playerAddonsList).length; i++) {
			if (vars.player[Object.keys(playerAddonsList)[i]] == null) {
				vars.player[Object.keys(playerAddonsList)[i]] = {};
				var object = vars.player[Object.keys(playerAddonsList)[i]];
				var listObject = playerAddonsList[Object.keys(playerAddonsList)[i]];
				for (var j=0; j < Object.keys(listObject).length; j++) {
					if (object[Object.keys(listObject)[j]] == null) {
						object[Object.keys(listObject)[j]] = listObject[Object.keys(listObject)[j]];
					}
				}
			}
		}
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

	setupItems: function() {
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
		var vars=State.active.variables;
		var riddlesList=window.friendRiddles;
		if (vars.friendRiddles == null) {
			vars.friendRiddles = {};
		}
		for (var i=0; i < Object.keys(riddlesList).length; i++) {
			if (vars.flags[Object.keys(riddlesList)[i]] == null) {
				vars.flags[Object.keys(riddlesList)[i]] = false;
			}
		}
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
				if (talksNewList[Object.keys(talksList)[i]].id == talksList[Object.keys(talksList)[j]].id) {
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
	},
	setupCheer: function (){
		var vars=State.active.variables;
		var cheerList=window.cheerList;
		if (vars.cheerleaders == null) {
			vars.cheerleaders = {};
		}
		for (var i=0; i < Object.keys(cheerList).length; i++) {
			if (vars.cheerleaders[Object.keys(cheerList)[i]] == null) {
				vars.cheerleaders[Object.keys(cheerList)[i]] = cheerList[Object.keys(cheerList)[i]];
			}
		}
		
		for (var i=0; i < Object.keys(cheerList.flags).length; i++) {
			if (vars.cheerleaders[Object.keys(cheerList.flags)[i]] == null) {
				vars.cheerleaders[Object.keys(cheerList.flags)[i]] = {};
				var object = vars.cheerleaders[Object.keys(cheerList.flags)[i]];
				var listObject = cheerList.flags[Object.keys(cheerList.flags)[i]];
				for (var j=0; j < Object.keys(listObject).length; j++) {
					if (object[Object.keys(listObject)[j]] == null) {
						object[Object.keys(listObject)[j]] = listObject[Object.keys(listObject)[j]];
					}
				}
			}
		}
	},
	
	setupCheerFriend: function (){
		var vars=State.active.variables;
		var cheerFriendList=window.cheerFriendList;
		if (vars.cheerFriend == null) {
			vars.cheerFriend = {};
		}
		for (var i=0; i < Object.keys(cheerFriendList).length; i++) {
			if (vars.cheerFriend[Object.keys(cheerFriendList)[i]] == null) {
				vars.cheerFriend[Object.keys(cheerFriendList)[i]] = cheerFriendList[Object.keys(cheerFriendList)[i]];
			}
		}
		
		for (var i=0; i < Object.keys(cheerFriendList.flags).length; i++) {
			if (vars.cheerFriend[Object.keys(cheerFriendList.flags)[i]] == null) {
				vars.cheerFriend[Object.keys(cheerFriendList.flags)[i]] = {};
				var object = vars.cheerFriend[Object.keys(cheerFriendList.flags)[i]];
				var listObject = cheerFriendList.flags[Object.keys(cheerFriendList.flags)[i]];
				for (var j=0; j < Object.keys(listObject).length; j++) {
					if (object[Object.keys(listObject)[j]] == null) {
						object[Object.keys(listObject)[j]] = listObject[Object.keys(listObject)[j]];
					}
				}
			}
		}
	},
},

window.playerList={
	name: "",
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
	gameSkill: 0,
	fitness: 0,
	femaleName: false, //new flag
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
		analSkill: 0
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
		analExp: 0
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
	His_Hers: 'His'
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
	guy_girl: 'guy'
},

window.bodyList={
	bodyhair: 0,
	penisShrink: 0,
	hairstyle: 0,
	hairColor: 1,
	nose: 0,
	earsPierced: false,
	
	boobs: 0,
	lips: 0,
	ass: 0,
	face: 0,
	manicure: 0,
	makeup: 0,
	anal: 0,
	
	semiBoobs: 0,
	semiLips: 0,
	semiAss: 0,
	semiFace: 0,
	semiManicure: 0,
	semiMakeup: 0,
	semiAnal: 0,
	
	permBoobs: 0,
	permLips: 0,
	permAss: 0,
	permFace: 0,
	permManicure: 0,
	permMakeup: 0,
	permAnal: 0,
	
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
},

window.kinkList={
	incest: false,
	futa: false,

	semenConsumptionStart: false,	
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
		slutUniform: 1,	//chosen slutty uniform [int], [1 = more modest + plug, 2 = more slutty]
		sarahTalk: 0,	//talked with cheer friend about Sarah [int], [0 = did not talk, 1 = tell the truth, 2 = lie]
		metBro: false,	//met Ashley's brother at the library.
		panties: false,	//PC tries to wear panties to his fake try-out
		wig: false,		//PC wears a wig to the try-out, worth +1 slut score adjustment
		falsies: false,	//PC wears a bust enhancer to the try-out, worth +1 or +2 slut score adjustment based on starting breast size
		makeup: false,	//PC tries to put on makeup before the try-out, worth +1 slut score adjustment
		prankBeg: false,	//PC begs for mercy to end prank

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
		correctAnswer: false,	//flag for correct answer
		failChance: 0,	//chance of failure due to slutty uniform
		ignoreModesty: false,	//flag for reducing fail chance due to slutty uniform
		failCount: 0,		//the number of times player failed to perform the correct move
		answer: 1,		//variable to track which answer was given previously
		failedMove: false	//flag for failing a move due to slutty uniform
	}
}

window.cheerFriendList={
	progress: 0,	//current progress in side events, [int]
	affinity: 0,		//current affinity of cheer friend to PC, [int]
	currentSE: 0,		//currently available side event
	name: 'Lauren',		//Name for cheer friend, [str], default = 'Lauren'
	
	//current attraction of cheer friend to PC (affinity + modified slut score), [int]
	//attraction: affinity + ((5-abs(window.playerCode.slutScoreBasic() - 6))+(floor(window.playerCode.slutScore()/10)-2)) ,
	getAttraction: function(){
		return this.affinity + ((5-Math.abs(window.playerCode.slutScoreBasic() - 6))+(Math.floor(window.playerCode.slutScore()/10)-2))
	},

	flags: {
		acceptInvite: false,	//accepting cheer friend's request to meet, [bool]
		boy: 1		//type of boy PC suggests cheer friend likes [int],[1 = jock, 2 = bad boy, 3 = nerd]
	}
}

