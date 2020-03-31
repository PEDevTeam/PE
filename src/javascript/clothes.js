window.daringValues={
	daringUnderwearNone: 6,
	daringUnderwearFemale: 3,
	daringClothesFemale: 5,
	daringCollar: 5,
	daringCollarSlutty: 8,
	daringHairband: 5,
	daringExtra: 5
}

window.clothes={
	setCage: function() {
		if (State.active.variables.flags.penisShrinkProgress) {
			State.active.variables.items.chastityDevice.name="CB-6000S chastity device";
			State.active.variables.items.chastityDevice.image="chastity_cb6000s.jpg";
		}
	},
	checkUnderwear: function() {
		var player=State.active.variables.player;
		var underwear=playerCode.isWearingOn(itemTypes.Underwear);
		if (player.daring < window.daringValues.daringUnderwearFemale) {
			return underwear && !underwear.female;
		} else if (player.daring < window.daringValues.daringUnderwearNone) {
			return underwear;
		} else {
			return true;
		}
	},
	dressedGuardian: {
		check: function() {
			var player=State.active.variables.player;
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var bra=playerCode.isWearingOn(itemTypes.Bras);
			var stockings=playerCode.isWearingOn(itemTypes.Stockings);
			var collar=playerCode.isWearingOn(itemTypes.Collar);
			var hairband=playerCode.isWearingOn(itemTypes.Hairband);
			var earrings=playerCode.isWearingOn(itemTypes.Earrings);
			var extras=playerCode.isWearingOn(itemTypes.Extra);
			if (!outerwear && underwear && underwear.female && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing female underwear";
				return false;
			}
			if (!outerwear && bra && bra.female && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing a bra";
				return false;
			}
			if (!outerwear && stockings && stockings.female && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing feminine socks";
				if (stockings.slutty) {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing stockings";
				}
				return false;
			}
			if (collar && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing a choker";
				if (collar.slutty) {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing a collar";
				}
				if (collar.daringRec >=  8) {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing such a collar";
				}
				return false;
			}
			if (hairband && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing a feminine hair accessory";
				return false;
			}
			if (extras && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing an extra accessory";
				return false;
			}
			if (!outerwear && player.perversion.guardian <= 4) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that without clothes";
				return false;
			}
			if (!outerwear && !underwear && player.perversion.guardian <= 4) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that naked";
				return false;
			}
			if (((outerwear && outerwear.female) || (shoes && shoes.female)) && (player.perversion.guardian <= 2)) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing female clothing";
				return false;
			}
			return true;
		}
	},
	dressedGuardianWork: {
		check: function() {
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			if (outerwear && outerwear.school) {
				State.active.variables.reason.dressedGuardianWork="Clinic policy forbids wearing a school uniform while on a part time job";
				return false;
			}
			return true;
		}
	},
	dressedWhore: {
		check: function() {
			var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			if (underwear) {
				State.active.variables.reason.dressedGuardianWork="You don't need underwear for that";
				return false;
			}
			if (!outerwear) {
				State.active.variables.reason.dressedGuardianWork="You need to wear something";
				return false;
			}
			if (!shoes) {
				State.active.variables.reason.dressedGuardianWork="You need to wear shoes";
				return false;
			}
			if (!outerwear.slutty || !shoes.slutty) {
				State.active.variables.reason.dressedGuardianWork="You're not dressed slutty enough";
				return false;
			}
			if (outerwear.sleepWear) {
				State.active.variables.reason.dressedGuardianWork="You can't wear sleepwear for that";
				return false;
			}
			return true;
		}
	},
	dressedClub: {
		check: function() {
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			if (outerwear && outerwear.school) {
				State.active.variables.reason.dressedClub="It's against the rules to wear any school clothes to the club";
				return false;
			}
			if (outerwear && !outerwear.female) {
				State.active.variables.reason.dressedClub="You don't think you could make it in wearing male clothing";
				return false;
			}
			if (underwear && !underwear.female) {
				State.active.variables.reason.dressedClub="You don't think it's a good idea to wear briefs to the club";
				return false;
			}
			return true;
		}
	},
	dressedOutside: {
		check: function() {
			var player=State.active.variables.player;
			var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var bra=playerCode.isWearingOn(itemTypes.Bras);
			var stockings=playerCode.isWearingOn(itemTypes.Stockings);
			var collar=playerCode.isWearingOn(itemTypes.Collar);
			var hairband=playerCode.isWearingOn(itemTypes.Hairband);
			var earrings=playerCode.isWearingOn(itemTypes.Earrings);
			var extras=playerCode.isWearingOn(itemTypes.Extra);
			if (outerwear.sleepWear) {
				State.active.variables.reason.dressedOutside="You can't wear sleepwear outside";
				return false;
			}
			if (!outerwear) {
				State.active.variables.reason.dressedOutside="You have to wear clothing outside";
				return false;
			}
			if (!shoes) {
				State.active.variables.reason.dressedOutside="You have to wear shoes outside";
				return false;
			}
			if (outerwear && outerwear.daringRec == 13) {
				State.active.variables.reason.dressedOutside="You can't go out wearing a maid uniform";
				return false;
			}
			if (shoes && shoes.daringRec == 13) {
				State.active.variables.reason.dressedOutside="You can't go out wearing ballet heels";
				return false;
			}
			if (!window.clothes.checkUnderwear()) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to do this " + (underwear ? "in that underwear" : "without underwear on");
				return false;
			}
			if (bra && (player.daring < window.daringValues.daringUnderwearFemale)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out wearing a bra";
				return false;
			}
			if (stockings && (player.daring < window.daringValues.daringUnderwearFemale)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out wearing feminine socks";
				if (stockings.slutty) {
					State.active.variables.reason.dressedOutside="You don't feel daring enough to go out wearing stockings";
				}
				return false;
			}
			if (collar && !collar.slutty && (player.daring < window.daringValues.daringCollar)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing a choker";
				return false;
			}
			if (collar && collar.slutty && (player.daring < collar.daringRec) && !State.active.variables.flags.collarLocked) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing such a collar";
				return false;
			}
			if (hairband && (player.daring < window.daringValues.daringHairband)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing a feminine hair accessory";
				return false;
			}
			if (extras && (player.daring < window.daringValues.daringExtra)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing an extra accessory";
				return false;
			}
			if ((player.daring < window.daringValues.daringClothesFemale) || (player.perversion.crossdressing < 7 && player.perversion.teacher < 4 && State.active.variables.tasksTeacher.wearDressToSchool.status <= 0)) {
				if (State.active.variables.flags.flatsFlag){
					if (outerwear.female || (shoes.female && shoes.id != "flats")) {
						State.active.variables.reason.dressedOutside="You don't feel daring enough to do this wearing more female clothing than your flats.";
						return false;
					}
				}
				else{
					if (outerwear.female || shoes.female) {
						State.active.variables.reason.dressedOutside="You don't feel daring enough to do this in female clothing";
						return false;
					}
				}
			}
			if (State.active.variables.flags.laundryAccident && underwear && underwear.female && playerCode.owns(itemsC.jocksLucky)) {
				State.active.variables.reason.dressedOutside="You don't want to go outside in wet underwear";
				return false;
			}
			return true;
		}
	},
	dressedFriend: {
		check: function() {
			var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			if (!window.clothes.checkUnderwear()) {
				State.active.variables.reason.dressedFriend="You don't feel daring enough for " + (underwear ? "that" : "no") + " underwear";
				return false;
			}
			if (outerwear.sleepWear) {
				State.active.variables.reason.dressedFriend="You can't wear sleepwear outside";
				return false;
			}
			if (!shoes) {
				State.active.variables.reason.dressedFriend="You have to wear shoes outside";
				return false;
			}
			if (!outerwear) {
				State.active.variables.reason.dressedFriend="You have to wear clothing outside";
				return false;
			}
			if (State.active.variables.player.daring < window.daringValues.daringClothesFemale) {
				if (outerwear.female || shoes.female) {
					State.active.variables.reason.dressedFriend="You don't feel daring enough to face your friend while wearing female clothing";
					return false;
				}
			}
			return true;
		}
	},
	dressedTherapy: {
		check: function() {
			var player=State.active.variables.player;
			if (!window.clothes.dressedOutside.check(1)) {
				return false;
			}
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			if ((outerwear.female || shoes.female) && (player.perversion.therapist < 3) && (player.perversion.guardian < 5)) {
				State.active.variables.reason.dressedTherapy="You don't feel ready to visit $therapist dressed like that";
				return false;
			}
			return true;
		}
	},
	dressedSchool: {
		check: function() {
			var player=State.active.variables.player;
			var items=State.active.variables.items;
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var stockings=playerCode.isWearingOn(itemTypes.Stockings);
			var collar=playerCode.isWearingOn(itemTypes.Collar);
			var hairband=playerCode.isWearingOn(itemTypes.Hairband);
			var earrings=playerCode.isWearingOn(itemTypes.Earrings);
			var extras=playerCode.isWearingOn(itemTypes.Extra);
			if (!window.clothes.dressedOutside.check(0)) {
				return false;
			}
			if (!outerwear.school) {
				State.active.variables.reason.dressedSchool="You need to wear the school uniform";
				return false;
			}
			if (outerwear.school && !outerwear.female && shoes.female && shoes.slutty) {
				State.active.variables.reason.dressedSchool="It is against rules to wear heels with pants";
				return false;
			}
			if (player.perversion.teacher < 10) {
				if (!shoes.school) {
					State.active.variables.reason.dressedSchool="You need to wear proper footwear";
					return false;
				}
				if (stockings && stockings.schoolAlt && (stockings.schoolAlt < items[stockings.id].curAlt) && (items[stockings.id].curAlt != 43)) {
					State.active.variables.reason.dressedSchool="Such stockings are against school uniform regulations, I need plain black stockings";
					if (!stockings.slutty) {
						State.active.variables.reason.dressedSchool="Such socks are against school uniform regulations, I need plain black socks";
					}
					return false;
				}
				if (hairband && hairband.schoolAlt && (hairband.schoolAlt < items[hairband.id].curAlt)) {
					State.active.variables.reason.dressedSchool="Such a hairband is against school uniform regulations";
					return false;
				}
				if (shoes && shoes.schoolAlt  && (items[shoes.id].curAlt != 40) && (items[shoes.id].curAlt <62) || items[shoes.id].curAlt >67) {
					if (shoes.schoolAlt < items[shoes.id].curAlt){
						State.active.variables.reason.dressedSchool="This style of shoes is against school uniform regulations, I need a more conservative looking type";
						return false;
					}
				}
				if (shoes && (shoes.daringRec >= 7)) {
					State.active.variables.reason.dressedSchool="Heeled shoes are against school uniform regulations";
					return false;
				}
			}
			if (State.active.variables.cheerleaders.active == false && (playerCode.owns(itemsC.rookieUniform) || playerCode.owns(itemsC.cheerDress))) {
				if (outerwear.cheer || shoes.cheer || (stockings && stockings.cheer && (items[stockings.id].curAlt == 43)) || (underwear && underwear.cheer)) {
					State.active.variables.reason.dressedSchool="You have been removed from the cheer squad and are no longer allowed to wear the cheer uniform to school";
					return false;
				}
			}
			if (State.active.variables.cheerleaders.active == true) {
				if ((outerwear && !outerwear.female) || (shoes && !shoes.female)) {
					State.active.variables.reason.dressedSchool="Rachel has ordered you to wear girl's clothes to school while you are on the cheer squad.";
					return false;
				}
				if ((playerCode.owns(itemsC.rookieUniform) || playerCode.owns(itemsC.cheerDress)) && (timeCode.isTuesday() || timeCode.isThursday()) && timeCode.haveSchool() && (!outerwear.cheer || !shoes.cheer || (stockings && !stockings.cheer && (items[stockings.id].curAlt != 43)) || (hairband && !hairband.cheer && (items[hairband.id].curAlt != 43)) || (underwear && !underwear.cheer))) {
					State.active.variables.reason.dressedSchool="You have cheer practice today and must wear the cheer uniform";
					return false;
				}
				if ((playerCode.owns(itemsC.rookieUniform) || playerCode.owns(itemsC.cheerDress)) && (timeCode.isMonday() && State.active.variables.cheerleaders.flags.prank2) && timeCode.haveSchool() && (!outerwear.cheer || !shoes.cheer || (stockings && !stockings.cheer && (items[stockings.id].curAlt != 43)) || (hairband && !hairband.cheer && (items[hairband.id].curAlt != 43)) || (underwear && !underwear.cheer))) {
					State.active.variables.reason.dressedSchool="Ashley ordered you to wear your cheer uniform to school today.";
					return false;
				}
				
				else if ((playerCode.owns(itemsC.rookieUniform) || playerCode.owns(itemsC.cheerDress)) && (outerwear.cheer || shoes.cheer || (stockings && stockings.cheer && (items[stockings.id].curAlt == 43))) && (!outerwear.cheer || !shoes.cheer || (stockings && !stockings.cheer && (items[stockings.id].curAlt != 43)) || (hairband && !hairband.cheer && (items[hairband.id].curAlt != 43)) || (underwear && !underwear.cheer))) {
					State.active.variables.reason.dressedSchool="You cannot mix school clothes with cheer clothes";
					return false;
				}
			}
			return true;
		}
	},
	dressedSleep: {
		check: function() {
			var player=State.active.variables.player;
			var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			if (shoes) {
				State.active.variables.reason.dressedSleep="You can't wear shoes to bed";
				return false;
			}
			if (outerwear) {
				if (!outerwear.sleepWear) {
					State.active.variables.reason.dressedSleep="You have to wear sleepwear to sleep";
					return false;
				}
				if ((player.daring < window.daringValues.daringUnderwearFemale) && outerwear.female) {
					State.active.variables.reason.dressedSleep="You don't feel daring enough";
					return false;
				}
			}
			return true;
		}
	},
	dressedMaid: {
		check: function() {
			var maid=playerCode.isWearing(itemsC.maidOutfit);
			if (!maid) {
				State.active.variables.reason.dressedMaid="You have to wear the maid outfit for this";
				return false;
			}
			return true;
		}
	},
	dressedFemale: function() {
		var underwear=playerCode.isWearingOn(itemTypes.Underwear);
		var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
		var shoes=playerCode.isWearingOn(itemTypes.Shoes);
		return (!underwear || underwear.female) && outerwear.female && shoes.female;	
	},
	dressedCheerFriend: function() {
		var underwear=playerCode.isWearingOn(itemTypes.Underwear);
		var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
		var shoes=playerCode.isWearingOn(itemTypes.Shoes);
		return (!underwear || (underwear.female && !underwear.cheer) && (outerwear.female && !(outerwear.school)) && (shoes.female && !(shoes.cheer)));	
	}
}
