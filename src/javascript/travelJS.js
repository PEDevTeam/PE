window.travelFunction = {
	selectEvent: function() {
		var time=State.active.variables.time;
		var tl=[];  // list of available events
		var ct=0;   // chance total
		var sp=0;   // highest start priority
		if (State.active.variables.travelEvents == null) { State.active.variables.travelEvents = {}; }
		for (var i=0; i < Object.keys(window.travelEventsJS).length; i++) {
			var tEvent=window.travelEventsJS[Object.keys(window.travelEventsJS)[i]];
			if (State.active.variables.travelEvents[tEvent.id] == null) {
				State.active.variables.travelEvents[tEvent.id] = {};
				State.active.variables.travelEvents[tEvent.id].canStart = true;
				if (tEvent.canStart != null) { State.active.variables.travelEvents[tEvent.id].canStart = tEvent.canStart; }
				State.active.variables.travelEvents[tEvent.id].startDay = -100;
				State.active.variables.travelEvents[tEvent.id].progress = 0;
			}
			var tEventV=State.active.variables.travelEvents[tEvent.id];
			if (tEventV.canStart && ((tEvent.canStartDays == null) || (tEvent.canStartDays.indexOf(time.weekDay()) >= 0)) && (tEvent.once || ((tEventV.startDay + tEvent.cooldown) < time.day)) && this.eventPerversion(tEventV) && tEvent.Conditions()) {
				var priority=tEvent.startPriority;
				if (tEventV.startPriority != null) {
					priority=tEventV.startPriority;
				}
				if (priority > sp) {
					tl=[];
					ct=0;
					sp=priority;
				}
				if (priority >= sp) {
					tl.push(tEvent);
					ct+=tEvent.chance;
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

window.travelEventsJS={
	outsideInPanties: {
		id: "outsideInPanties",
		passage: "Travel events",
		scene: "outsideInPanties",
		Conditions: function() {
			var u=playerCode.isWearingOn(itemTypes.Underwear);
			return (!State.active.variables.events.outsideInPanties && u && u.female);
		},
		once: true,
		startPriority: 5,
		canStart: true,
		chance: 10,
		start: function() { window.events.record('outsideInPanties'); State.active.variables.dreams.Panties.active = true; }
	},
	outsideInSluttyPanties: {
		id: "outsideInSluttyPanties",
		passage: "Travel events",
		scene: "outsideInSluttyPanties",
		Conditions: function() {
			var u=playerCode.isWearingOn(itemTypes.Underwear);
			return (!State.active.variables.events.outsideInSluttyPanties && u && u.female);
		},
		once: true,
		startPriority: 9,
		chance: 10,
		start: function() { window.events.record('outsideInPanties'); window.events.record('outsideInSluttyPanties'); }
	},
	outsideWithButtplug: {
		id: "outsideWithButtplug",
		passage: "Travel events",
		scene: "outsideWithButtplug",
		Conditions: function() {
			return (!State.active.variables.events.outsideWithButtplug && playerCode.isWearingOn(itemTypes.AnalPlug));
		},
		once: true,
		startPriority: 5,
		canStart: true,
		chance: 10,
		start: function() { window.events.record('outsideWithButtplug'); }
	},
	outsideInChastity: {
		id: "outsideInChastity",
		passage: "Travel events",
		scene: "outsideInChastity",
		Conditions: function() {
			return (!State.active.variables.events.outsideInChastity && playerCode.isWearingOn(itemTypes.Chastity));
		},
		once: true,
		startPriority: 9,
		canStart: true,
		chance: 10,
		start: function() { window.events.record('outsideInChastity'); }
	},
	outsideInDress: {
		id: "outsideInDress",
		passage: "Travel events",
		scene: "outsideInDress",
		Conditions: function() {
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			return (!State.active.variables.events.outsideInDress && o && o.female);
		},
		once: true,
		startPriority: 9,
		chance: 10,
		start: function() { window.events.record('readyOutsideDress'); }
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