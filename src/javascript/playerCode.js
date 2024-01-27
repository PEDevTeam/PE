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
	isWearing_d: function(item) {
		return State.active.variables.player.clothes.indexOf(item.id) >= 0;
	},
	isWearingOn_d: function(type) {
		for (var j=0; j < State.active.variables.player.clothes.length; j++) {
			var o=window.itemsC[State.active.variables.player.clothes[j]];
			if (o && ((o.clothingType & type) > 0)) {
				return o;
			}
		}
		
		return false;
	},
	getNaked_d: function() {
		//var c=this.isWearingOn(window.itemTypes.Chastity);
		var chastity=window.wardrobeFuncs.getWornItem('chastity');
		var player=State.active.variables.player;
		player.clothes=[];
		if (chastity && (State.active.variables.flags.chastityKey || State.active.variables.flags.chastityLocked)) {
			player.clothes.push(chastity);
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
			var masturbate=State.active.variables.player.masturbate;
			if (this.isCalm()) {
				return;
			}
			window.playerCode.changeArousal(5);
			State.active.variables.flags.forcedHorny=false;
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
			var masturbate=State.active.variables.player.masturbate;
			window.playerCode.changeArousal(-100);
			window.playerCode.setStatus("Satisfied",3,0);
			State.active.variables.flags.forcedHorny=false;
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
		return (State.active.variables.player.perversion.therapist < 4);//Unaffected mind, PC tries to resist feminization, but being pervy teenager any lewd stuff makes him horny. After getting some sexual experience learns to enjoy being fucked, but still resists and object that he likes it even just for a show.
	},
	isMind_1: function() {
		return (State.active.variables.player.perversion.therapist == 4);//Curious/Tempted - PC acts curious, but object too direct lewd stuff. After getting some sexual experience might behave flirty and admits that he enjoys his new sex life.
	},
	isMind_2: function() {
		return (State.active.variables.player.perversion.therapist > 4);//Corrupted - PC's deepest desires are brought to surface and amplified. Mostly welcomes feminization, except for too extreme stuff. After experiencing various types of sexual intercourse becomes cock-addicted.
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
		return (State.active.variables.body.bodyhair.level == 1);
	},
	isHairless: function() {
		return (State.active.variables.body.bodyhair.level >= 2);
	},
	isHairy: function() {
		return (State.active.variables.body.bodyhair.level == 0);
	},
	isInChastity: function() {
		return window.wardrobeFuncs.isItemMasterWearing('chastity');
	    //return this.isWearingOn(itemTypes.Chatisty);
	},
	isLockedInChastity: function() {
		return (window.wardrobeFuncs.isItemMasterWearing('chastity') &&
		        State.active.variables.flags.chastityLocked);
	},
	haveHaircut: function() {
		return (State.active.variables.body.hairstyle.level > 0);
	},
	hairstyle: function() {
		return State.active.variables.body.hairstyle.level;
	},
	scoreMakeup: function() {
		return State.active.variables.body.makeup.level;
	},
	scoreBoobs: function() {
		return State.active.variables.body.boobs.level;
	},
	scoreAss: function() {
		return State.active.variables.body.ass.level;
	},
	scoreLips: function() {
		return State.active.variables.body.lips.level;
	},
	scoreAnalSmooth: function() {
		return State.active.variables.body.anal.level;
	},
	haveMakeup: function() {
		return (State.active.variables.body.makeup.level > 0);
	},
	haveBimboMakeup: function() {
		return (State.active.variables.body.makeup.level >= 3);
	},
	haveHeavyMakeup: function() {
		return (State.active.variables.body.makeup.level == 4);
	},
	havePermanentMakeup: function() {
		return (State.active.variables.body.makeup.permLevel > 0 || State.active.variables.body.makeup.semiLevel > 0);
	},
	haveManicure: function(){
		return (State.active.variables.body.manicure.level > 0);
	},
	haveGirlyFace: function() {
		return (State.active.variables.body.makeup.level > 0 || State.active.variables.body.face.level > 0);
	},
	haveBoobs: function() {
		return (State.active.variables.body.boobs.level > 0);
	},
	haveBplus: function() {
		return (State.active.variables.body.boobs.level > 1);
	},
	haveCplus: function() {
		return (State.active.variables.body.boobs.level > 2);
	},
	haveDplus: function() {
		return(State.active.variables.body.boobs.level > 3);
	},
	haveLips: function() {
		return (State.active.variables.body.lips.level > 0);
	},
	haveAss: function() {
		return (State.active.variables.body.ass.level > 0);
	},
	obviousFemaleAppearance: function() {
		var body=State.active.variables.body;
		//var fo=this.isWearingOn(itemTypes.Outerwear).female;
		//var fs=this.isWearingOn(itemTypes.Shoes).slutty;
		//var e=this.isWearingOn(itemTypes.Earrings);
		var fo=window.wardrobeFuncs.getWornItem('outerwear').isFemale;
		var fs=window.inventoryFuncs.hasTag(window.wardrobeFuncs.getWornItem('shoes'), 'slutty');
		var e=window.wardrobeFuncs.getWornItem('earring');
		if (fo || fs || e || body.makeup.level>1 || body.hairstyle.level>1 || body.boobs.level>1 || body.lips.level>1 || body.manicure.level>0) {
			return true;
		}
		return false;
	},    
	slutScoreBasic: function() {
		var score=0;
		// var items=window.itemsC;
		// var itemTypes=window.itemTypes;
		var body=State.active.variables.body;
		//var s=this.isWearingOn(itemTypes.Shoes);
		var shoes=window.wardrobeFuncs.getWornItem('shoes');
		//var st=(this.isWearing(items.stilettoHeels) || this.isWearing(items.maidOutfit));
		var stilettos=(window.wardrobeFuncs.isItemMasterWearing('stripperHeels') || window.wardrobeFuncs.isItemMasterWearing('maidDress'));
		//var o=this.isWearingOn(itemTypes.Outerwear);
		var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
		//var u=this.isWearingOn(itemTypes.Underwear);
		var underwear=window.wardrobeFuncs.getWornItem('underwear');
		//var b=this.isWearingOn(itemTypes.AnalPlug);
		var buttplug=window.wardrobeFuncs.getWornItem('buttplug');
		//var c=this.isWearingOn(itemTypes.Chastity);
		var chastity=window.wardrobeFuncs.getWornItem('chastity');
		//var e=this.isWearingOn(itemTypes.Earrings);
		var earring=window.wardrobeFuncs.getWornItem('earring');
		// Score
		if ((body.makeup.level>=4 && body.lips.level>=2 && body.boobs.level>=4 && body.ass.level>=2) || (body.makeup.level>=4 && body.boobs.level>=4 && body.lips.level>=1 && body.ass.level>=1 && (earring && window.itemFuncs.hasTag(earring, 'slutty')) && (stilettos))) {
			score=9;
			return score;
			// total whore
		}
		if (((body.makeup.level>=4 && (earring && window.itemFuncs.hasTag(earring, 'slutty')) && (stilettos)) || (body.makeup.level>=4 && (body.lips.level>=2 || body.boobs.level>=4 || body.ass.level>=2))) || (body.makeup.level>=2 && body.boobs.level>=3 && body.lips.level>=1 && body.ass.level>=1 && (earring && window.itemFuncs.hasTag(earring, 'slutty')) && (stilettos))) {
			score=8;
			return score;
			// whorish girl
		}
		if (body.makeup.level>=4 || (body.makeup.level>=3 && (stilettos)) || (body.makeup.level>=3 && body.boobs.level>=3 && body.lips.level>=1 && body.ass.level>=1) || (body.makeup.level>=2 && body.boobs.level>=3 && body.lips.level>=1 && (earring) && (shoes && window.itemFuncs.hasTag(shoes, 'slutty')))) {
			score=7;
			return score;
			//slutty girl
		}
		if (this.haveGirlyFace() && body.hairstyle.level>1 && body.lips.level>=1 && (body.boobs.level>=3 || ((body.boobs.level>=2 || body.ass.level>=1) && (shoes && window.itemFuncs.hasTag(shoes, 'slutty'))))) {
			score=6;
			return score;
			//sexy girl
		}
		if (this.haveGirlyFace() && body.hairstyle.level>1 && (body.boobs.level>=2 || body.lips.level>=1 || body.ass.level>=1)) {
			score=5;
			return score;
			//ordinary girl
		}
		if (this.haveGirlyFace() || (body.hairstyle.level>1 && body.makeup.level>=2) || body.boobs.level>=2) {
			score=4;
			return score;
			//plain looking girl
		}
		if (body.hairstyle.level>1 || (body.hairstyle.level==1 && body.bodyhair>=2 && (body.boobs.level==1 || body.manicure.level==1 || body.makeup.level>=2))) {
			score=3;
			return score;
			//very feminine boy
		}
		if (body.boobs.level==1 || body.manicure.level==1 || (body.bodyhair>=2 && (!outerwear || (outerwear && outerwear.isFemale)))) {
			score=2;
			return score;
			//feminine boy
		}
		if ((underwear && underwear.isFemale) || (chastity) || (buttplug)) {
			score=1;
			return score;
			//ordinary boy
		}
		return score;
	},
	slutScore: function() {
		var score=this.slutScoreBasic();
		//var o=this.isWearingOn(window.itemTypes.Outerwear);
		var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
		if (outerwear) {
			if (outerwear.isFemale) {
				score+=10;
				}
			if (window.itemFuncs.hasTag(outerwear, 'slutty')) {
				score+=10;
				}
		}
		return score;
	},
	heelsCheck: function() {
		//var s=this.isWearingOn(window.itemTypes.Shoes);
		var shoes=window.wardrobeFuncs.getWornItem('shoes');
		var player=State.active.variables.player;
		if (shoes && window.itemFuncs.hasTag(shoes, 'heels')) {
			if (shoes.daring > 6) {
				if ((window.randomCode.getIntInclusive(0, 10) >= player.heelsSkill) && (window.randomCode.getIntInclusive(0, 2) == 0)) {
					player.heelsSkill++;
					State.active.variables.flags.heelsFall=true;
					return true;
				}
				if (window.randomCode.getIntInclusive(0, 9) >= player.heelsSkill) {
					player.heelsSkill++;
				}
				return false;
			}
			if (shoes.daring > 4) {
				if ((window.randomCode.getIntInclusive(0, 5) >= player.heelsSkill) && (window.randomCode.getIntInclusive(0, 2) == 0)) {
					player.heelsSkill++;
					State.active.variables.flags.heelsFall=true;
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
		player.money-=Math.max(0, State.active.variables.bribeAmount-player.bribeDiscount);
		player.bribeDiscount=0;
		State.active.variables.bribeAmount=window.playerCode.nextBribeAmount();
		State.active.variables.flags.bribePaid=true;
	},
	payBribePartial: function() {
		var player=State.active.variables.player;
		player.bribeDiscount+=player.money;
		player.bribeDiscount-=State.active.variables.bribeAmount;
		player.money=0;
		State.active.variables.flags.bribePaid=true;
		State.active.variables.flags.bribeFail=true;
		State.active.variables.bribeAmount=window.playerCode.nextBribeAmount();
	},
	payBribeRefusal: function() {
		var player=State.active.variables.player;
		player.bribeDiscount-=State.active.variables.bribeAmount;
		State.active.variables.flags.bribePaid=true;
		State.active.variables.flags.bribeFail=true;
		State.active.variables.bribeAmount=window.playerCode.nextBribeAmount();
	},
	nextBribeAmount: function() {
		var player=State.active.variables.player;
		return Math.min(State.active.variables.bribeAmount + player.bribeIncrease, 200*State.active.variables.flags.bribeFactor);
	},
	calculateBribeIncrease: function() {
		var player=State.active.variables.player;
		var vars = State.active.variables;
		
		player.bribeIncrease = 0;
		if (!vars.flags.holdPaymentIncrease) {
			if (player.perversion.teacher < 3) { player.bribeIncrease = 10*State.active.variables.flags.bribeFactor; return; }
			if (player.perversion.teacher < 5) { player.bribeIncrease = Math.floor(15*State.active.variables.flags.bribeFactor); return; }
			if ((player.perversion.teacher == 5) && (player.perversion.teacherCooldown < 2)) { player.bribeIncrease = 0; return; }
			if (player.perversion.teacher < 7) { player.bribeIncrease = 20*State.active.variables.flags.bribeFactor; return; }

			player.bribeIncrease = 30*State.active.variables.flags.bribeFactor;
		} else{
			vars.flags.holdPaymentIncrease = false; 
			return;
		}
	},
	owns_d: function(item) {
		return State.active.variables.inventory.indexOf(item.id) >= 0;
	},
	ownsType_d: function(clothingType) {
		var items=window.itemsC;
		for (var j=0; j < Object.keys(items).length; j++) {
			o=items[Object.keys(items)[j]];
			if ((o.clothingType & clothingType) > 0) {
				if (State.active.variables.inventory.indexOf(o.id) >= 0) {
					return true;
				}
			}
		}
		return false;
	},
	saveQuickSlot_d: function(slot) {
		var player=State.active.variables.player;
		var itemsC=window.itemsC;
		var items=State.active.variables.items;
		if ((player.clothes.length == 0) || ((player.clothes.length == 1) && (window.wardrobeFuncs.getWornItem('chastity')))) {
			this.deleteQuickSlot(slot);
			return;
			}
			
		var quickS=State.active.variables.quickSlot;
		var quick=quickS[Object.keys(quickS)[slot]];
		
		quick.types=[];
		quick.clothes=[];
		
		for (var i=0; i < player.clothes.length; i++) {
			var c=player.clothes[i];
			for (var j=0; j < Object.keys(itemsC).length; j++) {
				var o=itemsC[Object.keys(itemsC)[j]];
				var oV=items[Object.keys(itemsC)[j]];
				if (this.owns(o) && (o.id == c) && (o.clothingType != window.itemTypes.Chastity)) {
					quick.clothes.push(o.id);
					var t=0;
					if (o.maxAlt) {
						t=oV.curAlt;
					}
					quick.types.push(t);
				}
			}
		}
	},
	wearClothesJS_d: function(id) {
		if (!id) {
			return;
		}
		var item=window.itemsC[id];
		if (!item) {
			return;
		}
		var ca=state.active.variables.player.clothes;
		for (var i=ca.length-1; i>=0; i--) {		
			var pc=window.itemsC[ca[i]];
			if ((pc==null) || (((pc.clothingType + pc.cantWearWith) & (item.clothingType + item.cantWearWith)) > 0)) {
				state.active.variables.player.clothes.splice(i, 1);
			}
		}
		state.active.variables.player.clothes.push(id);
		if (ca.length > 0) {
			state.active.variables.player.clothes=state.active.variables.player.clothes.sort();
		}
	},
	removeClothesJS_d: function(id) {
		if (!id) {
			return;
		}
		var i=state.active.variables.player.clothes.indexOf(id);
		if (i >= 0) {
			state.active.variables.player.clothes.splice(i, 1);
		}
	},
	clothesOverride: function() {
		//var itemsC=window.itemsC;
		/* Check for wet panties */
		if (State.active.variables.flags.laundryAccident) {
			// var itemsC=window.itemsC;
			// var player=State.active.variables.player;
			
			// var i=player.clothes.indexOf(itemsC.pantiesCotton.id);
			// if (i >= 0) {
			// 	player.clothes.splice(i, 1);
			// }
			// var i=player.clothes.indexOf(itemsC.gString.id);
			// if (i >= 0) {
			// 	player.clothes.splice(i, 1);
			// }
			// var i=player.clothes.indexOf(itemsC.pantiesLatex.id);
			// if (i >= 0) {
			// 	player.clothes.splice(i, 1);
			// }
			window.wardrobeFuncs.removeItemMaster('plainPanties');
			window.wardrobeFuncs.removeItemMaster('sexyPanties');
			window.wardrobeFuncs.removeItemMaster('latexPanties');
		}
		/* Forcing on Maid stuff */
		//if (playerCode.isWearing(window.itemsC.maidOutfit)) {
		if (window.wardrobeFuncs.isItemMasterWearing('maidDress')) {
			if (State.active.variables.flags.gTrialBalletHeels) {
				window.wardrobeFuncs.wearRandomItemByMaster('balletHeels');
				//this.wearClothesJS('balletHeels');
			} else {
				if (State.active.variables.flags.gTrialLatexMaid) {
					//State.active.variables.items.stilettoHeels.curAlt=39;
					//this.wearClothesJS('stilettoHeels');
					window.wardrobeFuncs.wearItemVariant('heels_stripper_39');
				} else {
					//State.active.variables.items.highHeel3.curAlt=39;
					//this.wearClothesJS('highHeel3');
					window.wardrobeFuncs.wearItemVariant('heels_39');
				}
			}
			
			if (State.active.variables.flags.gTrialLatexMaid) {
				//if (!playerCode.isWearing(window.itemsC.stockingsLatex)) {
				if (!window.wardrobeFuncs.isItemMasterWearing('latexStockings')) {
					//State.active.variables.items.stockingsLatex.curAlt=39;
					//this.wearClothesJS('stockingsLatex');
					window.wardrobeFuncs.wearItemVariant('stockings_latex_39');
				}
			} else {
				// State.active.variables.items.stockings.curAlt=39;
				// this.wearClothesJS('stockings');
				window.wardrobeFuncs.wearItemVariant('stockings_39');
			}

			//if (playerCode.isWearing(window.itemsC.cheerBriefs)) {
			if (window.wardrobeFuncs.isItemMasterWearing('cheerBriefs')) {
				//this.removeClothesJS('cheerBriefs');
				window.wardrobeFuncs.removeItemMaster('cheerBriefs');
			}
		}
	},
	deleteQuickSlot: function(slot) {
		var quickS=State.active.variables.quickSlot;
		var max=Object.keys(quickS).length - slot;

		for (var i=0; i < max; i++) {
			var n=slot+i;
			var n2=slot+i+1;
			if (n2 >= State.active.variables.quickSlot.length) {
				quickS[Object.keys(quickS)[n]].types=[];
				quickS[Object.keys(quickS)[n]].clothes=[];
				return;
			}
			if ((quickS[Object.keys(quickS)[n2]].clothes.length == 0) || (!quickS[Object.keys(quickS)[n2]].extra)) {
				quickS[Object.keys(quickS)[n]].types=[];
				quickS[Object.keys(quickS)[n]].clothes=[];
				return;
			}
			quickS[Object.keys(quickS)[n]].name=quickS[Object.keys(quickS)[n2]].name;
			quickS[Object.keys(quickS)[n]].types=quickS[Object.keys(quickS)[n2]].types;
			quickS[Object.keys(quickS)[n]].clothes=quickS[Object.keys(quickS)[n2]].clothes;
		}
	},
	loadQuickSlot_d: function(slot) {
		//var ch=this.isWearingOn(window.itemTypes.Chastity);
		var chastity=window.wardrobeFuncs.getWornItem('chastity');
		var itemsC=window.itemsC;
		var items=State.active.variables.items;
		var player=State.active.variables.player;
		player.clothes=[];
		if (chastity) {
			player.clothes.push(chastity);
		}
		
		var quickS=State.active.variables.quickSlot;
		var quick=quickS[Object.keys(quickS)[slot]];
		
		for (var i=0; i < quick.clothes.length; i++) {
			var c=quick.clothes[i];
			for (var j=0; j < Object.keys(itemsC).length; j++) {
				var o=itemsC[Object.keys(itemsC)[j]];
				var oV=items[Object.keys(itemsC)[j]];
				if (this.owns(o) && (o.id == c) && (o.clothingType != window.itemTypes.Chastity)) {
					player.clothes.push(c);
					if (o.maxAlt) {
						oV.curAlt=quick.types[i];
					}
				}
			}
		}
		
		window.playerCode.clothesOverride();
	},
	wearPajamas_d: function() {
		//var c=this.isWearingOn(window.itemTypes.Chastity);
		var chastity=window.wardrobeFuncs.getWornItem('chastity');
		var player=State.active.variables.player;
		var items=window.itemsC;
		player.clothes=[];
		if (chastity) {
			player.clothes.push(chastity);
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
	purgeMaleClothes_d: function() {
		var itemsC=window.itemsC;
		for (var i=0; i < Object.keys(itemsC).length; i++) {
			var o=itemsC[Object.keys(itemsC)[i]];
			if ((o.clothingType != itemTypes.NotClothing && o.clothingType != itemTypes.Extra) && playerCode.owns(o) && !o.female) {
				State.active.variables.inventory.splice(State.active.variables.inventory.indexOf(o.id), 1);
			}
		}
	},
	disableMaleClothes_d: function() {
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
	checkGameSkill: function (){
		var player=State.active.variables.player;
		var skillLevel = player.gameSkill;
		return skillLevel;
	},
	improveGameSkill: function(){
		var player=State.active.variables.player;
		var skillLevel = player.gameSkill;
		var skillImprove = Math.floor((Math.random() * 3) + 1);
		player.gameSkill = skillLevel + skillImprove;
		return skillImprove;
	},
	friendUniformCheck: function() {
		var pass = true;
		var under=window.wardrobeFuncs.getWornItem('underwear');
		var shoes=window.wardrobeFuncs.getWornItem('shoes');
		var stockings = window.wardrobeFuncs.getWornItem('hosiery');
		var chastity = window.wardrobeFuncs.getWornItem('chastity');
		var outer = window.wardrobeFuncs.getWornItem('outerwear');
		var player=State.active.variables.player;

		if((!under || (under && !under.isFemale)) || !chastity || !stockings || (!shoes ||(shoes && !shoes.isFemale)) || (player.location != locationsJS.school.id && (!outer ||(outer && !outer.isFemale))) || playerCode.isHairy()){
			pass = false;
		}
		return pass;
	}
}
