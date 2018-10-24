window.interrupts = {
	selectEvent: function() {
		var time=State.active.variables.time;
		var tl=[];  // list of available events
		var ct=0;   // chance total
		var sp=0;   // highest start priority
		if (State.active.variables.sleepEvents == null) { State.active.variables.sleepEvents = {}; }
		for (var i=0; i < Object.keys(window.sleepEventsJS).length; i++) {
			var sEvent=window.sleepEventsJS[Object.keys(window.sleepEventsJS)[i]];
			if (State.active.variables.sleepEvents[sEvent.id] == null) {
				State.active.variables.sleepEvents[sEvent.id] = {};
				State.active.variables.sleepEvents[sEvent.id].canStart = true;
				if (sEvent.canStart != null) { State.active.variables.sleepEvents[sEvent.id].canStart = sEvent.canStart; }
				State.active.variables.sleepEvents[sEvent.id].startDay = -100;
				State.active.variables.sleepEvents[sEvent.id].progress = 0;
			}
			var sEventV=State.active.variables.sleepEvents[sEvent.id];
			if (sEventV.canStart && ((sEvent.canStartDays == null) || (sEvent.canStartDays.indexOf(time.weekDay()) >= 0)) && (sEvent.once || ((sEventV.startDay + sEvent.cooldown) < time.day)) && this.eventPerversion(sEventV) && sEvent.Conditions()) {
				var priority=sEvent.startPriority;
				if (sEventV.startPriority != null) {
					priority=sEventV.startPriority;
				}
				if (priority > sp) {
					tl=[];
					ct=0;
					sp=priority;
				}
				if (priority >= sp) {
					tl.push(sEvent);
					ct+=sEvent.chance;
				}
			}
		}
		if (tl.length == 0) {
			return false;
		}
		var rt=window.randomCode.getIntInclusive(1, ct);
		for (var i=0; i < tl.length; i++) {
			rt-=tl[i].chance;
			if (rt <= 0) {
				var tlV=State.active.variables.travelEvents[tl[i].id];
				tl[i].start();
				if (tl[i].once) { tlV.canStart = false; }
				tlV.startDay=time.day;
				State.active.variables.scene=tl[i].scene;
				return tl[i];
			}
		}
	},
	eventPerversion: function(travelEvent) {
		if (travelEvent.perversion == null) { return true; }
		var player=State.active.variables.player;
		return ((player.perversion.guardian >= travelEvent.perversion.guardian.min) && (player.perversion.guardian <= travelEvent.perversion.guardian.max) && (player.perversion.teacher >= travelEvent.perversion.teacher.min) && (player.perversion.teacher <= travelEvent.perversion.teacher.max) && (player.perversion.therapist >= travelEvent.perversion.therapist.min) && (player.perversion.therapist <= travelEvent.perversion.therapist.max));
	},
},

window.sleepEventsJS={
	straponSurprise: {
		id: "straponSurprise",
		passage: "Guardian kinky reward",
		scene: "strapon surprise",
		Conditions: function() {
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			return (!State.active.variables.events.outsideInDress && o && o.female);
		},
		canStartDays: [5],
		canStart: false,
		once: true,
		startPriority: 9,
		chance: 10,
		start: function() { window.events.record('straponSurprise'); }
	},
	straponForced: {
		id: "straponForced",
		passage: "Guardian kinky reward",
		scene: "strapon forced",
		Conditions: function() {
			return ((State.active.variables.time.weekDay() == 6) && (State.active.variables.flags.choreLazy || (State.active.variables.player.choreFailsCurrent >= 4)) && [15,17].includes(State.active.variables.player.perversion.guardianCorruption) && State.active.variables.flags.guardianPunishVibrator && State.active.variables.player.perversion.guardian == 4);
		},
		canStart: false,
		once: true,
		startPriority: 9,
		chance: 10,
		start: function() { window.events.record('straponForced'); }
	},
	guardianPunishDressUp: {
		id: "guardianPunishDressUp",
		passage: "Special punishments",
		scene: "forced dressup",
		Conditions: function() {
			return ((State.active.variables.flags.choreLazy || State.active.variables.player.choreFails >= 5) && (State.active.variables.time.weekDay() >= 3) && [3,4].includes(State.active.variables.player.perversion.guardian) && State.active.variables.player.perversion.guardianCooldown >= 5);
		},
		once: true,
		startPriority: 9,
		chance: 10,
		start: function() { State.active.variables.time.hour=23; window.events.record('guardianPunishDressUp'); }
	},
	penisShrinking: {
		id: "penisShrinking",
		passage: "penis shrinking event",
		scene: "forced dressup",
		Conditions: function() {
			return (State.active.variables.kink.penisShrink && State.active.variables.flags.penisShrinkSleep && State.active.variables.flags.penisShrinkProgress && (State.active.variables.body.penisShrink == 1) && (State.active.variables.time.weekDay() == 4));
		},
		canStart: false,
		once: true,
		startPriority: 9,
		chance: 10,
		start: function() { window.events.record('penisShrinking'); }
	},
	trainingCock: {
		id: "trainingCock",
		passage: "Suck training cock",
		scene: "alarm",
		Conditions: function() {
			return ((State.active.variables.player.chorePunishmentDildoCooldown > State.active.variables.player.chorePunishmentDildoLimit) && State.active.variables.flags.choreDildoAlarm && !State.active.variables.flags.trainingCockSuck && (State.active.variables.scene != "calmSleep"));
		},
		canStart: false,
		once: true,
		startPriority: 9,
		chance: 10,
		start: function() { window.events.record('trainingCock'); }
	},
	template: {
		id: "chastityOut",
		passage: "Travel events",
		scene: "chastityOut",
		Conditions: function() {
			return (!State.active.variables.events.outsideInChastity);
		},
		image: "",
		once: true,
		canStart: false,
		startPriority: 9,
		canStartDays: [1,2,3,4,5,6,7],
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		start: function() {}
	}
},