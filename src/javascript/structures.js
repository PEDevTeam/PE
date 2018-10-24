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
	hypnosis: 10,
	specialHypnosis: 20
},

window.versionControl={
	update: function() {}
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
		
		if (vars.events == null) { vars.events = {}; }
		
		if (vars.errorLog == null) { vars.errorLog = []; }
		
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
		if (vars.kinkHypno == null) {
			vars.kinkHypno = {};
		}
		for (var i=0; i < Object.keys(kinkList).length; i++) {
			if (vars.kink[Object.keys(kinkList)[i]] == null) {
				vars.kink[Object.keys(kinkList)[i]] = kinkList[Object.keys(kinkList)[i]];
			}
			if (vars.kinkHypno[Object.keys(kinkList)[i]] == null) {
				vars.kinkHypno[Object.keys(kinkList)[i]] = kinkList[Object.keys(kinkList)[i]];
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
			}
			
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
			}
			var dreamObject = State.active.variables.dreams[Object.keys(dreamsGuardian)[i]];
			var dreamsG = dreamsGuardian[Object.keys(dreamsGuardian)[i]];

			if (dreamObject.id == null) { dreamObject.id = dreamsG.id; }
			if (dreamObject.active == null) { dreamObject.active = dreamsG.active; }
			if (dreamObject.startPriority == null) { dreamObject.startPriority = dreamsG.startPriority; }
			if (dreamObject.progress == null) { dreamObject.progress = 0; }
		}
		
		for (var i=0; i < Object.keys(dreamsTeacher).length; i++) {
			if (State.active.variables.dreams[Object.keys(dreamsTeacher)[i]] == null) {
				State.active.variables.dreams[Object.keys(dreamsTeacher)[i]] = {};
			}
			var dreamObject = State.active.variables.dreams[Object.keys(dreamsTeacher)[i]];
			var dreamsT = dreamsTeacher[Object.keys(dreamsTeacher)[i]];

			dreamObject.id = dreamsT.id;
			if (dreamObject.active == null) { dreamObject.active = dreamsT.active; }
			if (dreamObject.startPriority == null) { dreamObject.startPriority = dreamsT.startPriority; }
			if (dreamObject.progress == null) { dreamObject.progress = 0; }
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
			}				
			var locV = vars.locations[Object.keys(locationsJS)[i]];
			var locJS = locationsJS[Object.keys(locationsJS)[i]];

			locV.id = locJS.id;
			if (locV.active == null) { locV.active = locJS.active; }
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
		var talksList=window.therapistTalks;
		
		if (State.active.variables.therapistTalks == null) {
			State.active.variables.therapistTalks = {};
		}
		
		for (var i=0; i < Object.keys(talksList).length; i++) {
			if (State.active.variables.therapistTalks[Object.keys(talksList)[i]] == null) {
				State.active.variables.therapistTalks[Object.keys(talksList)[i]] = {};
			}
			var talkObject = State.active.variables.therapistTalks[Object.keys(talksList)[i]];
			var talksObj = talksList[Object.keys(talksList)[i]];

			talkObject.id = talksObj.id;
			if (talkObject.start == null) { talkObject.start = talksObj.start; }
			if (talkObject.finished == null) { talkObject.finished = false; }
			if (talkObject.progress == null) { talkObject.progress = 0; }
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
		
		if (State.active.variables.teacherPunishments == null) {
			State.active.variables.teacherPunishments = {};
		}
		
		for (var i=0; i < Object.keys(punList).length; i++) {
			if (State.active.variables.teacherPunishments[Object.keys(punList)[i]] == null) {
				State.active.variables.teacherPunishments[Object.keys(punList)[i]] = {};
			}
			var punObject = State.active.variables.teacherPunishments[Object.keys(punList)[i]];
			var talksObj = punList[Object.keys(punList)[i]];

			punObject.id = talksObj.id;
			if (punObject.active == null) { punObject.active = talksObj.active; }
			if (punObject.progress == null) { punObject.progress = 0; }
			if (punObject.timeStart == null) { punObject.timeStart = -100; }
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
		// daring tasks
		var tasksList=window.tasksTeacher;
		if (State.active.variables.tasksTeacher == null) {
			State.active.variables.tasksTeacher = {};
		}
		
		for (var i=0; i < Object.keys(tasksList).length; i++) {
			if (State.active.variables.tasksTeacher[Object.keys(tasksList)[i]] == null) {
				State.active.variables.tasksTeacher[Object.keys(tasksList)[i]] = {};
			}
			var taskTdObject = State.active.variables.tasksTeacher[Object.keys(tasksList)[i]];
			var taskListed = tasksList[Object.keys(tasksList)[i]];
			
			taskTdObject.id = taskListed.id;
			
			if (taskTdObject.canStart == null) { taskTdObject.canStart = taskListed.canStart; }
			if (taskTdObject.status == null) { taskTdObject.status = 0; }
			if (taskTdObject.progress == null) { taskTdObject.progress = 0; }
			if (taskTdObject.startDay == null) { taskTdObject.startDay = -100; }
		}
		
		// Bodymods tasks
		var tasksBodyList=window.tasksTeacherBody;
		if (State.active.variables.tasksTeacherBody == null) {
			State.active.variables.tasksTeacherBody = {};
		}
		
		for (var i=0; i < Object.keys(tasksBodyList).length; i++) {
			if (State.active.variables.tasksTeacherBody[Object.keys(tasksBodyList)[i]] == null) {
				State.active.variables.tasksTeacherBody[Object.keys(tasksBodyList)[i]] = {};
			}
			var taskTbObject = State.active.variables.tasksTeacherBody[Object.keys(tasksBodyList)[i]];
			var taskBodyListed = tasksBodyList[Object.keys(tasksBodyList)[i]];
			
			taskTbObject.id = taskBodyListed.id;
			
			if (taskTbObject.canStart == null) { taskTbObject.canStart = taskBodyListed.canStart; }
			if (taskTbObject.status == null) { taskTbObject.status = 0; }
			if (taskTbObject.progress == null) { taskTbObject.progress = 0; }
			if (taskTbObject.startDay == null) { taskTbObject.startDay = -100; }
		}
		
		// Email tasks
		var emailList=window.tasksEmail;
		if (State.active.variables.tasksEmail == null) {
			State.active.variables.tasksEmail = {};
		}
		
		for (var i=0; i < Object.keys(emailList).length; i++) {
			if (State.active.variables.tasksEmail[Object.keys(emailList)[i]] == null) {
				State.active.variables.tasksEmail[Object.keys(emailList)[i]] = {};
			}
			var taskEmObject = State.active.variables.tasksEmail[Object.keys(emailList)[i]];
			var emailListed = emailList[Object.keys(emailList)[i]];
			
			taskEmObject.id = emailListed.id;
			
			if (taskEmObject.canStart == null) { taskEmObject.canStart = emailListed.canStart; }
			if (taskEmObject.status == null) { taskEmObject.status = 0; }
			if (taskEmObject.progress == null) { taskEmObject.progress = 0; }
			if (taskEmObject.startDay == null) { taskEmObject.startDay = -100; }
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
		
		var tasksEmailNew = State.active.variables.tasksEmail;
		for (var i=0; i < Object.keys(tasksEmailNew).length; i++) {
			var found = false;
			
			for (var j=0; j < Object.keys(emailList).length; j++) {
				if (tasksEmailNew[Object.keys(emailList)[i]].id == emailList[Object.keys(emailList)[j]].id) {
					var found = true;
					break;
				}
			}
			
			if (!found) {
				delete tasksEmailNew[Object.keys(tasksEmailNew)[i]];
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
	keyholder: "", /* teacher, guardian, coach, bully */
	drunk: 0,
	arousal: 0,
	stamina: 0,
	daring: 0, /* general progression stat */
	submission: 0, /* Acceptance stats */
	exhibition: 0,
	feminization: 0,
	bisexuality: 0,
	bodyMod: 0,
	oralM: 0, /* blowjob */
	oralF: 0, /* cunnilingus */
	analM: 0, /* penile penetration */
	analF: 0, /* pegging */
	analT: 0, /* plugs and other toys */
	eager: 0,
	reluctant: 0,
	workLastDay: 0,
	blowjobsToday: 0,
	maxBlowjobs: 1,
	heelsSkill: 0,
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
	alarmClockGuardian: false,
	batteryExpireDay: 0,
	batterySneakDay: 0,
	bribeDiscount: 0,
	bribeIncrease: 10,
	friendLastVisit: 0,
	clothes: []
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
	mood: {
		guardian: 0,
		teacher: 0
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
		pornType: 0,
		upload: 0,
		uploadCooldown: 0,
		crossdressTasks: 0,
		mall: 0,
		club: 0,
		danceClub: 0,
		mmScore: 0,
		mmChecks: 0,
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
		chastityExp: 0,
		buttplugExp: 0,
		heelsExp: 0,
		dildoSuckExp: 0,
		crossdressingExp: 0,
		pettingFirst: false,	/* "bully", "coach" */
		pettingExp: 0,
		handjobFirst: false,	/* "assistant" */
		handjobExp: 0,
		bjFirst: false,	/* "bully", "coach" */
		bjExp: 0,
		vibratorFirst: false, /* "guardian", "therapist", "shop" */
		vibratorExp: 0,
		analFirst: false, /* "guardian", "photoGirl", "coach", "badBoyfriend" */
		analExp: 0,
		femaleUnderwear: false,
		femaleSluttyUnderwear: false,
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
	freckles: 0,
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
	detention: false,
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
	guardianPunishVibrator: false,
	guardianRuinedDress: false,
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
	salonPiggyCoin: false
},

window.kinkList={
	incest: false,
	futa: false,

	semenConsumptionHypnoStarted: false,
	semenConsumption: false,
	creampie: false,
	bukkake: false,
	cumEating: false,
	ownCum: false,
	cumSwap: false,

	watersportsHypnoStarted: false,
	watersports: false,
	wetting: false,
	urineDrink: false,
	urinePlay: false,
	
	smallPenisHypnoStarted: false,
	smallPenis: false,
	penisShrink: false,
	sph: false,

	bdsmHypnoStarted: false,
	bdsm: false,
	painPlay: false,
	xPain: false,
	petPlay: false,
	bondage: false,
	facesit: false,
	trampling: false,

	footFetishHypnoStarted: false,
	footFetish: false,
	footDisplay: false,
	footWorship: false,
	hosiery: false,
	shoeBoot: false,
	footjob: false,

	odorHypnoStarted: false,
	odor: false,
	clothesOdor: false,
	shoeSockOdor: false,
	footOdor: false,
	armpitOdor: false,
	assOdor: false,
	genitalOdor: false,

	degradationHypnoStarted: false,
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

	agePlayHypnoStarted: false,
	agePlay: false,
	diapering: false,
	adultBaby: false,
	ageBehavior: false,

	xBodyHypnoStarted: false,
	xBody: false,
	bbw: false,
	flatChest: false,
	hyperBreasts: false,
	hyperPenis: false,
	dwarf: false,
	tall: false,
	muscle: false,
	expansionWeight: false,
	
	clothingHypnoStarted: false,
	clothing: false,
	latex: false,
	leather: false,
	nylon: false,
	frilly: false,

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