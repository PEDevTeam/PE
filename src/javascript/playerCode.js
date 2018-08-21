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
		return State.active.variables.player.clothes.indexOf(item.id) >= 0;
	},
	isWearingOn: function(clothingType) {
		var o;
		var items=window.itemsC;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if ((o.clothingType & clothingType) > 0) {
				if (State.active.variables.player.clothes.indexOf(o.id) >= 0) {
					return o;
				}
			}
		}
		return false;
	},
	getItemByName: function(name) {
		var o;
		var items=window.itemsC;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if (o.name == name) {
				return o;
			}
		}
		return false;
	},
	getItemById: function(id) {
		var o;
		var items=window.itemsC;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if (o.id == id) {
				return o;
			}
		}
		return false;
	},
	getRealItemById: function(id) {
		var o;
		var items=State.active.variables.items;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if (o.id == id) {
				return o;
			}
		}
		return false;
	},
	getNameById: function(id) {
		var o;
		var oV;
		var name="";
		var items=State.active.variables.items;
		for (var j=0; j < Object.keys(window.itemsC).length; j++) {
			o=window.itemsC[Object.keys(window.itemsC)[j]];
			oV=items[Object.keys(window.itemsC)[j]];
			if (o.id == id) {
				name = o.name;
				if ((oV != null) && (oV.name != null)) {
					name = oV.name;
				}
				return name;
			}
		}
		return false;
	},
	getName: function(item) {
		var oV;
		if (item == null) {
			return false;
		}
		var name=item.name;
		var items=State.active.variables.items;
		oV=items[Object.keys(item)];
		if ((oV != null) && (oV.name != null)) {
			name = oV.name;
		}
		return name;
	},
	getNaked: function() {
		var c=this.isWearingOn(window.itemTypes.Chastity);
		var player=State.active.variables.player;
		player.clothes=[];
		if (c && (player.flags.chastityKey || player.flags.chastityLocked)) {
			player.clothes.push(c.id);
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
			var refractoryMinutes=180;
			return ((time.day * 1440 + time.hour * 60 + time.minute) - (masturbate.lastDay * 1440 + masturbate.lastHour * 60 + masturbate.lastMinute)) >= refractoryMinutes;
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
			window.playerCode.setStatus("Satisfied",3,0);
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
	setStatus: function(string, scenes, hours) {
		var status=State.active.variables.status;
		var time=State.active.variables.time;
		status.text=string;
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
		if (State.active.variables.status.text != "") {
			if (((time.day * 1440 + time.hour * 60 + time.minute) > (status.endDay * 1440 + status.endHour * 60 + status.endMinute)) || status.scenesCounter <= 0) {
				State.active.variables.status.text="";
				return false;
			}
			status.scenesCounter--;
			return true;
		}
		return false;
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
		var body=State.active.variables.body;
		return (body.bodyhair == 1);
	},
	isHairless: function() {
		var body=State.active.variables.body;
		return (body.bodyhair >= 2);
	},
	haveHaircut: function() {
		var body=State.active.variables.body;
		return (body.hairstyle > 0);
	},
	hairstyle: function() {
		var body=State.active.variables.body;
		return body.hairstyle;
	},
	scoreMakeup: function() {
		var body=State.active.variables.body;
		return body.makeup;
	},
	scoreBoobs: function() {
		var body=State.active.variables.body;
		return body.boobs;
	},
	scoreAss: function() {
		var body=State.active.variables.body;
		return body.ass;
	},
	scoreLips: function() {
		var body=State.active.variables.body;
		return body.lips;
	},
	scoreAnalSmooth: function() {
		var body=State.active.variables.body;
		return body.anal;
	},
	haveMakeup: function() {
		var body=State.active.variables.body;
		return (body.makeup > 0);
	},
	haveBimboMakeup: function() {
		var body=State.active.variables.body;
		return (body.makeup >= 3);
	},
	haveHeavyMakeup: function() {
		var body=State.active.variables.body;
		return (body.makeup == 4);
	},
	havePermanentMakeup: function() {
		var player=State.active.variables.player;
		return (player.permMakeup > 0 || player.semiPermMakeup > 0);
	},
	haveGirlyFace: function() {
		var items=window.itemsC;
		return ((this.scoreMakeup() > 1) || this.owns(items.softeningFacial) || this.owns(items.surgeryFacial));
	},
	haveBoobs: function() {
		var body=State.active.variables.body;
		return (body.boobs > 0);
	},
	haveBplus: function() {
		var body=State.active.variables.body;
		return (body.boobs > 1);
	},
	haveCplus: function() {
		var body=State.active.variables.body;
		return (body.boobs > 2);
	},
	haveLips: function() {
		var body=State.active.variables.body;
		return (body.lips > 0);
	},
	haveAss: function() {
		var body=State.active.variables.body;
		return (body.ass > 0);
	},
	slutScoreBasic: function() {
		var score=0;
		var items=window.itemsC;
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
		if (this.haveGirlyFace() || ((this.hairstyle() > 1) && this.haveMakeup()) || this.haveBplus()) {
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
		var bribeCap=200;
		
		return Math.min(State.active.variables.bribeAmount + player.bribeIncrease, bribeCap);
	},
	calculateBribeIncrease: function() {
		var player=State.active.variables.player;
		
		if (player.perversion.teacher < 3) { return 10; }
		if (player.perversion.teacher < 5) { return 15; }
		if ((player.perversion.teacher == 5) && (player.perversion.teacherCooldown < 2)) { return 0; }
		if (player.perversion.teacher < 7) { return 20; }
		
		return 30;
	},
	owns: function(item) {
		return State.active.variables.inventory.indexOf(item.id) >= 0;
	},
	ownsType: function(clothingType) {
		var items=window.itemsC;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if ((o.clothingType & clothingType) > 0) {
				if (State.active.variables.player.clothes.indexOf(o.id) >= 0) {
					return true;
				}
			}
		}
		return false;
	},
	saveQuickSlot: function(slot) {
		var player=State.active.variables.player;
		var itemsC=window.itemsC;
		var items=State.active.variables.items;
		if ((player.clothes.length == 0) || ((player.clothes.length == 1) && (this.isWearingOn(window.itemTypes.Chastity)))) {
			this.deleteQuickSlot(slot);
			return;
			}
		State.active.variables.quickSlot[slot].types=[];
		State.active.variables.quickSlot[slot].clothes=[];
		for (var i=0; i < player.clothes.length; i++) {
			var c=player.clothes[i];
			for (var j=0; j < Object.keys(itemsC).length; j++) {
				var o=itemsC[Object.keys(itemsC)[j]];
				var oV=items[Object.keys(itemsC)[j]];
				if (this.owns(o) && (o.id == c) && (o.clothingType != window.itemTypes.Chastity)) {
					State.active.variables.quickSlot[slot].clothes.push(o.id);
					var t=0;
					if (o.maxAlt) {
						t=oV.curAlt;
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
		var itemsC=window.itemsC;
		var items=State.active.variables.items;
		var player=State.active.variables.player;
		player.clothes=[];
		if (ch) {
			player.clothes.push(ch.id);
		}
		for (var i=0; i < State.active.variables.quickSlot[slot].clothes.length; i++) {
			var c=State.active.variables.quickSlot[slot].clothes[i];
			for (var j=0; j < Object.keys(itemsC).length; j++) {
				var o=itemsC[Object.keys(itemsC)[j]];
				var oV=items[Object.keys(itemsC)[j]];
				if (this.owns(o) && (o.id == c) && (o.clothingType != window.itemTypes.Chastity)) {
					player.clothes.push(c);
					if (o.maxAlt) {
						oV.curAlt=State.active.variables.quickSlot[slot].types[i];
					}
				}
			}
		}
	},
	wearPajamas: function() {
		var c=this.isWearingOn(window.itemTypes.Chastity);
		var player=State.active.variables.player;
		var items=window.itemsC;
		player.clothes=[];
		if (c) {
			player.clothes.push(c.id);
		}
		var o;
		for (var i=0; i < Object.keys(items).length; i++) {
			o=items[Object.keys(items)[i]];
			if (o.sleepWear && this.owns(o) && ((player.perversion.guardian >= 2) || !o.female)) {
				player.clothes.push(o.id);
				return;
			}
		}
	},
	purgeMaleClothes: function() {
		var itemsC=window.itemsC;
		for (var i=0; i < Object.keys(itemsC).length; i++) {
			var o=itemsC[Object.keys(itemsC)[i]];
			if (o.clothingType != itemTypes.NotClothing && playerCode.owns(o) && !o.female) {
				State.active.variables.inventory.splice(State.active.variables.inventory.indexOf(o.id), 1);
			}
		}
	},
	disableMaleClothes: function() {
		var itemsC=window.itemsC;
		var items=State.active.variables.items;
		for (var i=0; i < Object.keys(itemsC).length; i++) {
			var o=itemsC[Object.keys(itemsC)[i]];
			var oV=items[Object.keys(itemsC)[i]];
			if ([itemTypes.Underwear, itemTypes.Outerwear, itemTypes.Shoes].includes(o.clothingType) && !o.female) {
				oV.disabled=true;
				oV.cost=0;
			}
		}
	},
}
