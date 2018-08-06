window.playerCode={
	activateTherapist: function(numDays) {
		var player=State.active.variables.player;
		player.therapistMode=true;
		if (numDays < 4) {
			var d=State.active.variables.time.day+1;
			for (var i=0; i < numDays; i++) {
				player.therapistDays.push(d % 7);
				d+=Math.floor(7 / numDays);
			}
		} else {
			player.therapistDays.push([1,2,3,4,5]);
		}
	},	
	isWearing: function(item) {
		return State.active.variables.player.clothes.indexOf(item.name) >= 0;
	},
	isWearingOn: function(clothingType) {
		var o;
		var items=window.items;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if ((o.clothingType & clothingType) > 0) {
				if (State.active.variables.player.clothes.indexOf(o.name) >= 0) {
					return o;
				}
			}
		}
		return false;
	},
	getItemByName: function(name) {
		var o;
		var items=window.items;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if (o.name == name) {
				return o;
			}
		}
		return false;
	},
	getNaked: function() {
		var c=this.isWearingOn(window.itemTypes.Chastity);
		var player=State.active.variables.player;
		player.clothes=[];
		if (c && (player.flags.chastityKey || player.flags.chastityLocked)) {
			player.clothes.push(c.name);
		}
	},
	addPenalty:	function (penalties) {
		var player=State.active.variables.player;
		if (penalties < player.tasks.penalty) {
			player.tasks.penalty += penalties/player.tasks.penalty;
		}
		if (penalties == player.tasks.penalty) {
			player.tasks.penalty += 1;
		}
		if (penalties > player.tasks.penalty) {
			player.tasks.penalty = penalties;
		}
		if (State.active.variables.time.day % 7 == 1) {
			if (penalties < player.tasks.penaltyMonday) {
				player.tasks.penaltyMonday += penalties/player.tasks.penaltyMonday;
			}
			if (penalties == player.tasks.penaltyMonday) {
				player.tasks.penaltyMonday += 1;
			}
			if (penalties > player.tasks.penaltyMonday) {
				player.tasks.penaltyMonday = penalties;
			}
			player.tasks.penaltyMonday = 0.01*Math.floor(100*player.tasks.penaltyMonday);
		}
		player.tasks.penalty = 0.01*Math.floor(100*player.tasks.penalty);
	},
	updateSeverity:	function (penalties) {
		var player=State.active.variables.player;
		if (penalties == 0 && player.tasks.punSeverity > 1) {
			player.tasks.punSeverity -= 1;
		}
		if (penalties >= player.tasks.punSeverity) {
			player.tasks.punSeverity += 1;
			if (penalties > (player.tasks.punSeverity*2)) {
				player.tasks.punSeverity += 1;
			}
		}
	},
	masturbate: {
		isReady: function() {
			var time=State.active.variables.time;
			var masturbate=State.active.variables.player.masturbate;
			return ((time.day * 1440 + time.hour * 60 + time.minute) - (masturbate.lastDay * 1440 + masturbate.lastHour * 60 + masturbate.lastMinute)) >= masturbate.refractoryMinutes;
		},
		isCalm: function() {
			var time=State.active.variables.time;
			var masturbate=State.active.variables.player.masturbate;
			return (time.day * 1440 + time.hour * 60 + time.minute) <= (masturbate.DayTemp * 1440 + masturbate.HourTemp * 60 + masturbate.MinuteTemp);
		},
		isTeased: function() {
			var time=State.active.variables.time;
			var masturbate=State.active.variables.player.masturbate;
			return (time.day * 1440 + time.hour * 60 + time.minute) <= (masturbate.DayTease * 1440 + masturbate.HourTease * 60 + masturbate.MinuteTease);
		},
		sinceLastCum: function() {
			var time=State.active.variables.time;
			var masturbate=State.active.variables.player.masturbate;
			return (time.day * 1440 + time.hour * 60 + time.minute) - (masturbate.lastDay * 1440 + masturbate.lastHour * 60 + masturbate.lastMinute);
		},
		tease: function(hours) {
			var time=State.active.variables.time;
			var masturbate=State.active.variables.player.masturbate;
			masturbate.DayTease=time.day;
			masturbate.HourTease=time.hour;
			masturbate.MinuteTease=time.minute;
			masturbate.HourTease+=hours;
			while (masturbate.HourTease >= 24) {
				masturbate.DayTease++;
				masturbate.HourTease-=24;
			}
		},
		tempRelief: function(hours) {
			var time=State.active.variables.time;
			var player=State.active.variables.player;
			var masturbate=player.masturbate;
			if (this.isCalm()) {
				return;
			}
			window.playerCode.changeArousal(5);
			player.flags.forcedHorny=false;
			masturbate.DayTemp=time.day;
			masturbate.HourTemp=time.hour;
			masturbate.MinuteTemp=time.minute;
			masturbate.HourTemp+=hours;
			while (masturbate.HourTemp >= 24) {
				masturbate.DayTemp++;
				masturbate.HourTemp-=24;
			}
		},
		cum: function() {
			var time=State.active.variables.time;
			var player=State.active.variables.player;
			var masturbate=player.masturbate;
			window.playerCode.changeArousal(-100);
			window.playerCode.status.setStatus("Satisfied",3,0);
			player.flags.forcedHorny=false;
			masturbate.lastDay=time.day;
			masturbate.lastHour=time.hour;
			masturbate.lastMinute=time.minute;
		}
	},
	changeArousal: function(Delta) {
		var player=State.active.variables.player;
		player.arousal=Math.floor(player.arousal + Delta);
		player.arousal=Math.max(player.arousal, 0);
		player.arousal=Math.min(player.arousal, 100);
	},
	upArousalTo: function(Delta, Max) {
		var player=State.active.variables.player;
		var change=Math.max(Max - player.arousal, 0);
		player.arousal=Math.floor(player.arousal + change);
		player.arousal=Math.max(player.arousal, 0);
		player.arousal=Math.min(player.arousal, 100);
	},
	status: {
		setStatus: function(string, scenes, hours) {
			State.active.variables.status=string;
			var status=State.active.variables.player.status;
			var time=State.active.variables.time;
			status.scenesCounter=scenes;
			status.endDay=time.day;
			status.endHour=time.hour+hours;
			status.endMinute=time.minute;
			while (status.endHour >= 24) {
				status.endDay++;
				status.endHour-=24;
			}
		},
		checkStatus: function() {
			var status=State.active.variables.status;
			var time=State.active.variables.time;
			if (State.active.variables.status != "") {
				if (((time.day * 1440 + time.hour * 60 + time.minute) > (status.endDay * 1440 + status.endHour * 60 + status.endMinute)) || status.scenesCounter <= 0) {
					State.active.variables.status="";
					return false;
				}
				status.scenesCounter--;
				return true;
			}
			return false;
		}
	},
	isHalfHorny: function() {
		return (!this.isNotHorny() && !this.isHorny());
	},
	isNotHorny: function() {
		return State.active.variables.player.arousal < 20;
	},
	isHorny: function() {
		return State.active.variables.player.arousal >= 50;
	},
	hornyLevel: function() {
		if (this.isNotHorny()) {return 0;}
		if (this.isHalfHorny()) {return 1;}
		if (this.isHorny()) {return 2;}
		return 0;
	},
	isMind_0: function() {
		return (State.active.variables.player.perversion.therapist < 4);
	},
	isMind_1: function() {
		return (State.active.variables.player.perversion.therapist == 4);
	},
	isMind_2: function() {
		return (State.active.variables.player.perversion.therapist > 4);
	},
	isMind: function() {
		if (this.isMind_0()) {return 0;}
		if (this.isMind_1()) {return 1;}
		if (this.isMind_2()) {return 2;}
		return 0;
	},
	isMaid: function() {
		return (State.active.variables.player.perversion.guardian >= 5);
	},
	isButtslut: function() {
		return (State.active.variables.player.perversion.teacher >= 8);
	},
	isWaxed: function() {
		var items=window.items;
		return (this.owns(items.Waxing));
	},
	isHairless: function() {
		var items=window.items;
		return (this.owns(items.Depilatory) || this.owns(items.LaserHairRemoval));
	},
	haveHaircut: function() {
		var items=window.items;
		return (this.owns(items.HairShort) || this.owns(items.HairMedium) || this.owns(items.HairLong) || this.owns(items.HairPigtails) || this.owns(items.HairCurly));
	},
	hairStyle: function() {
		var style = 0;
		var items=window.items;
		if (this.owns(items.HairShort)) { style = 1; }
		if (this.owns(items.HairMedium)) { style = 2; }
		if (this.owns(items.HairLong)) { style = 3; }
		if (this.owns(items.HairPigtails)) { style = 4; }
		if (this.owns(items.HairCurly)) { style = 5; }
		return style;
	},
	scoreMakeup: function() {
		var makeupStyle = 0;
		var items=window.items;
		if (this.owns(items.SubtleMakeup)) { makeupStyle = 1; }
		if (this.owns(items.NormalMakeup)) { makeupStyle = 2; }
		if (this.owns(items.BimboMakeup)) { makeupStyle = 3; }
		if (this.owns(items.HeavyMakeup)) { makeupStyle = 4; }
		return makeupStyle;
	},
	scoreBoobs: function() {
		var boobsSize = 0;
		var items=window.items;
		if (this.owns(items.breastImplantsA)) { boobsSize = 1; }
		if (this.owns(items.breastImplantsB)) { boobsSize = 2; }
		if (this.owns(items.breastImplantsC)) { boobsSize = 3; }
		if (this.owns(items.breastImplantsDD)) { boobsSize = 4; }
		return boobsSize;
	},
	scoreAss: function() {
		var assSize = 0;
		var items=window.items;
		if (this.owns(items.AssEnhancing)) { assSize = 1; }
		if (this.owns(items.AssEnhancingXL)) { assSize = 2; }
		return assSize;
	},
	scoreLips: function() {
		var lipsSize = 0;
		var items=window.items;
		if (this.owns(items.LipsEnhancing)) { lipsSize = 1; }
		if (this.owns(items.LipsEnhancingXL)) { lipsSize = 2; }
		return lipsSize;
	},
	scoreAnalSmooth: function() {
		var analSmooth = 0;
		var items=window.items;
		if (this.owns(items.analSmoothing1)) { analSmooth = 1; }
		if (this.owns(items.analSmoothing2)) { analSmooth = 2; }
		if (this.owns(items.analSmoothing3)) { analSmooth = 3; }
		return analSmooth;
	},
	haveMakeup: function() {
		var items=window.items;
		return (this.owns(items.SubtleMakeup) || this.owns(items.NormalMakeup) || this.owns(items.BimboMakeup) || this.owns(items.HeavyMakeup));
	},
	haveBimboMakeup: function() {
		var items=window.items;
		return (this.owns(items.BimboMakeup) || this.owns(items.HeavyMakeup));
	},
	haveHeavyMakeup: function() {
		var items=window.items;
		return (this.owns(items.HeavyMakeup));
	},
	havePermanentMakeup: function() {
		var player=State.active.variables.player;
		return (player.permMakeup > 0 || player.semiPermMakeup > 0);
	},
	haveGirlyFace: function() {
		var items=window.items;
		return ((this.scoreMakeup() > 1) || this.owns(items.softeningFacial) || this.owns(items.surgeryFacial));
	},
	haveBoobs: function() {
		var items=window.items;
		return (this.owns(items.breastImplantsA) || this.owns(items.breastImplantsB) || this.owns(items.breastImplantsC) || this.owns(items.breastImplantsDD));
	},
	haveBplus: function() {
		var items=window.items;
		return (this.owns(items.breastImplantsB) || this.owns(items.breastImplantsC) || this.owns(items.breastImplantsDD));
	},
	haveCplus: function() {
		var items=window.items;
		return (this.owns(items.breastImplantsC) || this.owns(items.breastImplantsDD));
	},
	haveLips: function() {
		var items=window.items;
		return (this.owns(items.LipsEnhancing) || this.owns(items.LipsEnhancingXL));
	},
	haveAss: function() {
		var items=window.items;
		return (this.owns(items.AssEnhancing) || this.owns(items.AssEnhancingXL));
	},
	slutScoreBasic: function() {
		var score=0;
		var items=window.items;
		var itemTypes=window.itemTypes;
		var s=this.isWearingOn(itemTypes.Shoes);
		var st=(this.isWearing(items.stilettoHeels) || this.isWearing(items.maidOutfit));
		var o=this.isWearingOn(itemTypes.Outerwear);
		var u=this.isWearingOn(itemTypes.Underwear);
		var b=this.isWearingOn(itemTypes.AnalPlug);
		var c=this.isWearingOn(itemTypes.Chastity);
		var e=this.isWearingOn(itemTypes.Earrings);
		// Score
		if ((this.haveHeavyMakeup() && this.owns(items.LipsEnhancingXL) && this.owns(items.breastImplantsDD) && this.owns(items.AssEnhancingXL)) || (this.haveHeavyMakeup() && this.owns(items.breastImplantsDD) && this.haveLips() && this.haveAss() && (e && e.slutty) && (st))) {
			score=9;
			return score;
			// total whore
		}
		if ((this.haveHeavyMakeup() && (e && e.slutty) && (st)) || (this.haveHeavyMakeup() && (this.owns(items.LipsEnhancingXL) || this.owns(items.breastImplantsDD) || this.owns(items.AssEnhancingXL))) || (this.haveMakeup() && this.haveCplus() && this.haveLips() && this.haveAss() && (e && e.slutty) && (st))) {
			score=8;
			return score;
			// whorish girl
		}
		if (this.haveHeavyMakeup() || (this.haveBimboMakeup() && (st)) || (this.haveBimboMakeup() && this.haveCplus() && this.haveLips() && this.haveAss()) || (this.haveMakeup() && this.haveCplus() && this.haveLips() && (e) && (s && s.slutty))) {
			score=7;
			return score;
			//slutty girl
		}
		if (this.haveGirlyFace() && this.haveHaircut() && this.haveLips() && (this.haveCplus() || ((this.haveBplus() || this.haveAss()) && (s && s.slutty)))) {
			score=6;
			return score;
			//sexy girl
		}
		if (this.haveGirlyFace() && this.haveHaircut() && (this.haveBplus() || this.haveLips() || this.haveAss())) {
			score=5;
			return score;
			//ordinary girl
		}
		if (this.haveGirlyFace() || ((this.hairStyle() > 1) && this.haveMakeup()) || this.haveBplus()) {
			score=4;
			return score;
			//plain looking girl
		}
		if (this.haveHaircut() || (this.owns(items.HairShort) && this.isHairless() && (this.owns(items.breastImplantsA) || this.owns(items.Manicure) || this.haveMakeup()))) {
			score=3;
			return score;
			//very feminine boy
		}
		if (this.owns(items.breastImplantsA) || this.owns(items.Manicure) || (this.isHairless() && (!o || (o && o.female)))) {
			score=2;
			return score;
			//feminine boy
		}
		if ((u && u.female) || (c) || (b)) {
			score=1;
			return score;
			//ordinary boy
		}
		return score;
	},
	slutScore: function() {
		var score=this.slutScoreBasic();
		var o=this.isWearingOn(window.itemTypes.Outerwear);
		if (o) {
			if (o.female) {
				score+=10;
				}
			if (o.slutty) {
				score+=10;
				}
		}
		return score;
	},
	heelsCheck: function() {
		var s=this.isWearingOn(window.itemTypes.Shoes);
		var player=State.active.variables.player;
		if (s) {
			if (s.daringRec > 6) {
				if ((window.randomCode.getIntInclusive(0, 10) >= player.heelsSkill) && (window.randomCode.getIntInclusive(0, 2) == 0)) {
					player.heelsSkill++;
					player.flags.heelsFall=true;
					return true;
				}
				if (window.randomCode.getIntInclusive(0, 9) >= player.heelsSkill) {
					player.heelsSkill++;
				}
				return false;
			}
			if (s.daringRec > 3) {
				if ((window.randomCode.getIntInclusive(0, 5) >= player.heelsSkill) && (window.randomCode.getIntInclusive(0, 2) == 0)) {
					player.heelsSkill++;
					player.flags.heelsFall=true;
					return true;
				}
				if (window.randomCode.getIntInclusive(0, 4) >= player.heelsSkill) {
					player.heelsSkill++;
				}
				return false;
			}
		}
		return false;
	},
	hasSurgery: function() {
		var surgery=State.active.variables.player.surgery;
		return surgery.breasts || surgery.face;
	},
	payBribe: function() {
		var player=State.active.variables.player;
		player.money=player.money-Math.max(0, State.active.variables.bribeAmount-player.bribeDiscount);
		player.bribeDiscount=0;
		State.active.variables.bribeAmount=this.nextBribeAmount();
		player.flags.bribePaid=true;
	},
	payBribePartial: function() {
		var player=State.active.variables.player;
		player.bribeDiscount=player.bribeDiscount+player.money;
		player.bribeDiscount=this.bribeDiscount-State.active.variables.bribeAmount;
		player.money=0;
		player.flags.bribePaid=true;
		player.flags.bribeFail=true;
		State.active.variables.bribeAmount=this.nextBribeAmount();
	},
	payBribeRefusal: function() {
		var player=State.active.variables.player;
		player.bribeDiscount=player.bribeDiscount-State.active.variables.bribeAmount;
		player.flags.bribePaid=true;
		player.flags.bribeFail=true;
		State.active.variables.bribeAmount=this.nextBribeAmount();
	},
	nextBribeAmount: function() {
		var player=State.active.variables.player;		
		return Math.min(State.active.variables.bribeAmount + player.bribeIncrease, player.bribeCap);
	},
	owns: function(item) {
		return State.active.variables.inventory.indexOf(item.name) >= 0;
	},
	ownsType: function(clothingType) {
		var items=window.items;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if ((o.clothingType & clothingType) > 0) {
				if (State.active.variables.player.clothes.indexOf(o.name) >= 0) {
					return true;
				}
			}
		}
		return false;
	},
	saveQuickSlot: function(slot) {
		var player=State.active.variables.player;
		var items=window.items;
		if ((player.clothes.length == 0) || ((player.clothes.length == 1) && (this.isWearingOn(window.itemTypes.Chastity)))) {
			this.deleteQuickSlot(slot);
			return;
			}
		State.active.variables.quickSlot[slot].types=[];
		State.active.variables.quickSlot[slot].clothes=[];
		for (var i=0; i < player.clothes.length; i++) {
			var c=player.clothes[i];
			for (var j=0; j < Object.keys(items).length; j++) {
				var o=items[Object.keys(items)[j]];
				if (this.owns(o) && (o.name == c) && (o.clothingType != window.itemTypes.Chastity)) {
					State.active.variables.quickSlot[slot].clothes.push(o.name);
					var t=0;
					if (o.maxAlt) {
						t=o.curAlt;
					}
					State.active.variables.quickSlot[slot].types.push(t);
				}
			}
		}
	},
	deleteQuickSlot: function(slot) {
		var max=State.active.variables.quickSlot.length - slot;
		for (var i=0; i < max; i++) {
			var n=slot+i;
			var n2=slot+i+1;
			if (n2 >= State.active.variables.quickSlot.length) {
				State.active.variables.quickSlot[n].types=[];
				State.active.variables.quickSlot[n].clothes=[];
				return;
			}
			if ((State.active.variables.quickSlot[n2].clothes.length == 0) || (!State.active.variables.quickSlot[n2].extra)) {
				State.active.variables.quickSlot[n].types=[];
				State.active.variables.quickSlot[n].clothes=[];
				return;
			}
			State.active.variables.quickSlot[n].name=State.active.variables.quickSlot[n2].name;
			State.active.variables.quickSlot[n].types=State.active.variables.quickSlot[n2].types;
			State.active.variables.quickSlot[n].clothes=State.active.variables.quickSlot[n2].clothes;
		}
	},
	loadQuickSlot: function(slot) {
		var ch=this.isWearingOn(window.itemTypes.Chastity);
		var items=window.items;
		var player=State.active.variables.player;
		player.clothes=[];
		if (ch) {
			player.clothes.push(ch.name);
		}
		for (var i=0; i < State.active.variables.quickSlot[slot].clothes.length; i++) {
			var c=State.active.variables.quickSlot[slot].clothes[i];
			for (var j=0; j < Object.keys(items).length; j++) {
				var o=items[Object.keys(items)[j]];
				if (this.owns(o) && (o.name == c) && (o.clothingType != window.itemTypes.Chastity)) {
					player.clothes.push(c);
					if (o.maxAlt) {
						o.curAlt=State.active.variables.quickSlot[slot].types[i];
					}
				}
			}
		}
	},
	wearPajamas: function() {
		var c=this.isWearingOn(window.itemTypes.Chastity);
		var player=State.active.variables.player;
		var items=window.items;
		player.clothes=[];
		if (c) {
			player.clothes.push(c.name);
		}
		var o;
		for (var i=0; i < Object.keys(items).length; i++) {
			o=items[Object.keys(items)[i]];
			if (o.sleepWear && this.owns(o) && ((player.perversion.guardian >= 2) || !o.female)) {
				player.clothes.push(o.name);
				return;
			}
		}
	}
}
