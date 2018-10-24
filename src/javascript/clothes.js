window.femValues={
	femUnderwearFemale: 10,
	femClothesFemale: 40,
	femSchoolDress: 50,
	femUnderwearNone: 55,
	femChoker: 50,
	femCollar: 55,
	femCollarSlutty: 80,
	femHairband: 50,
	femExtra: 50
}

window.clothes={
	setCage: function() {
		if (State.active.variables.flags.penisShrinkProgress) {
			State.active.variables.items.chastityDevice.name="CB-6000S chastity device";
			State.active.variables.items.chastityDevice.image="chastity_cb6000s.jpg";
		}
	},
	checkStat: function(stat) {
		var player=State.active.variables.player;
		return ((player.feminization < stat) && (player.daring < stat));
	},
	checkUnderwear: function() {
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		if (this.checkStat(window.femValues.femUnderwearFemale)) {
			return u && !u.female;
		} else if (this.checkStat(window.femValues.femUnderwearNone) && !State.active.variables.flags.laundryAccident) {
			return u;
		} else {
			return true;
		}
	},
	dressedGuardian: function() {
		var player=State.active.variables.player;
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		var br=playerCode.isWearingOn(itemTypes.Bras);
		var st=playerCode.isWearingOn(itemTypes.Stockings);
		var co=playerCode.isWearingOn(itemTypes.Collar);
		var hb=playerCode.isWearingOn(itemTypes.Hairband);
		var ea=playerCode.isWearingOn(itemTypes.Earrings);
		var ex=playerCode.isWearingOn(itemTypes.Extra);
		if (!o && u && u.female && player.perversion.guardian <= 3) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing female underwear";
			return false;
		}
		if (!o && br && br.female && player.perversion.guardian <= 3) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing a bra";
			return false;
		}
		if (!o && st && st.female && player.perversion.guardian <= 3) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing feminine socks";
			if (st.slutty) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing stockings";
			}
			return false;
		}
		if (co) {
			if (player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing choker";
				return false;
			}
			if (co.slutty && (player.perversion.guardian <= 4)) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing collar";
				return false;
			}
			if (co.schoolSlut && (player.perversion.guardian <= 5)) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing such collar";
				return false;
			}
		}
		if (hb && player.perversion.guardian <= 3) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing feminine hair acessorry";
			return false;
		}
		if (ex && player.perversion.guardian <= 3) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing extra acessorry";
			return false;
		}
		if (!o && player.perversion.guardian <= 4) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that without clothes";
			return false;
		}
		if (!o && !u && player.perversion.guardian <= 4) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that naked";
			return false;
		}
		if (((o && o.female) || (s && s.female)) && (player.perversion.guardian <= 2)) {
			State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing female clothing";
			return false;
		}
		return true;
	},
	dressedGuardianWork: function() {
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		if (o && o.school) {
			State.active.variables.reason.dressedGuardianWork="Clinic policy forbids wearing a school uniform on a part time job";
			return false;
		}
		return true;
	},
	dressedWhore: function() {
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		if (u) {
			State.active.variables.reason.dressedGuardianWork="You don't need underwear for that";
			return false;
		}
		if (!o) {
			State.active.variables.reason.dressedGuardianWork="You need to wear something";
			return false;
		}
		if (!s) {
			State.active.variables.reason.dressedGuardianWork="You need to wear shoes";
			return false;
		}
		if (!o.slutty || !s.slutty) {
			State.active.variables.reason.dressedGuardianWork="You're not dressed slutty enough";
			return false;
		}
		if (o.sleepWear) {
			State.active.variables.reason.dressedGuardianWork="You can't wear sleepwear for that";
			return false;
		}
		return true;
	},
	dressedClub: function() {
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var u=playerCode.isWearingOn(itemTypes.Outerwear);
		if (o && o.school) {
			State.active.variables.reason.dressedClub="It's against the rules to wear any school clothes to the club";
			return false;
		}
		if (o && !o.female) {
			State.active.variables.reason.dressedClub="You don't think you could make it in wearing male clothing";
			return false;
		}
		if (u && !u.female) {
			State.active.variables.reason.dressedClub="You don't think it's a good idea to wear briefs to the club";
			return false;
		}
		return true;
	},
	dressedOutside: function() {
		var player=State.active.variables.player;
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		var br=playerCode.isWearingOn(itemTypes.Bras);
		var st=playerCode.isWearingOn(itemTypes.Stockings);
		var co=playerCode.isWearingOn(itemTypes.Collar);
		var hb=playerCode.isWearingOn(itemTypes.Hairband);
		var ea=playerCode.isWearingOn(itemTypes.Earrings);
		var ex=playerCode.isWearingOn(itemTypes.Extra);
		if (o.sleepWear) {
			State.active.variables.reason.dressedOutside="You can't wear sleepwear outside";
			return false;
		}
		if (!o) {
			State.active.variables.reason.dressedOutside="You have to wear clothing outside";
			return false;
		}
		if (!s) {
			State.active.variables.reason.dressedOutside="You have to wear shoes outside";
			return false;
		}
		if (o && o.id == "maidOutfit") {
			State.active.variables.reason.dressedOutside="You can't go out wearing a maid uniform";
			return false;
		}
		if (s && s.id == "balletHeels") {
			State.active.variables.reason.dressedOutside="You can't go out wearing ballet heels";
			return false;
		}
		if (!window.clothes.checkUnderwear()) {
			State.active.variables.reason.dressedOutside="You don't feel daring enough to do this " + (u ? "in that underwear" : "without underwear on");
			return false;
		}
		if (br && (this.checkStat(window.femValues.femUnderwearFemale))) {
			State.active.variables.reason.dressedOutside="You don't feel daring enough to go out wearing a bra";
			return false;
		}
		if (st && (this.checkStat(window.femValues.femUnderwearFemale))) {
			State.active.variables.reason.dressedOutside="You don't feel daring enough to go out wearing feminine socks";
			if (st.slutty) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out wearing stockings";
			}
			return false;
		}
		if (co && !co.slutty && (this.checkStat(window.femValues.femChoker))) {
			State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing choker";
			return false;
		}
		if (co && co.slutty && (this.checkStat(co.femRec)) && !State.active.variables.flags.collarLocked) {
			State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing such collar";
			return false;
		}
		if (hb && (this.checkStat(window.femValues.femHairband))) {
			State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing feminine hair acessorry";
			return false;
		}
		if (ex && (this.checkStat(window.femValues.femExtra))) {
			State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing extra acessorry";
			return false;
		}
		if (this.checkStat(window.femValues.femClothesFemale)) {
			if (o.female) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to do this in female clothing";
				return false;
			}
			if (s.female) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to do this in feminine footwear";
				return false;
			}
		}
		return true;
	},
	dressedFriend: function() {
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		if (!window.clothes.checkUnderwear()) {
			State.active.variables.reason.dressedFriend="You don't feel daring enough for " + (u ? "that" : "no") + " underwear";
			return false;
		}
		if (o.sleepWear) {
			State.active.variables.reason.dressedFriend="You can't wear sleepwear outside";
			return false;
		}
		if (!s) {
			State.active.variables.reason.dressedFriend="You have to wear shoes outside";
			return false;
		}
		if (!o) {
			State.active.variables.reason.dressedFriend="You have to wear clothing outside";
			return false;
		}
		if (this.checkStat(window.femValues.femClothesFemale)) {
			if (o.female || s.female) {
				State.active.variables.reason.dressedFriend="You don't feel daring enough to face your friend while wearing female clothing";
				return false;
			}
		}
		return true;
	},
	dressedTherapy: function() {
		var player=State.active.variables.player;
		if (!window.clothes.dressedOutside()) {
			return false;
		}
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		if ((o.female || s.female) && (player.perversion.therapist < 3) && (player.perversion.guardian < 5)) {
			State.active.variables.reason.dressedTherapy="You don't feel ready to visit $therapist dressed like that";
			return false;
		}
		return true;
	},
	dressedSchool: function() {
		var player=State.active.variables.player;
		var items=State.active.variables.items;
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		var st=playerCode.isWearingOn(itemTypes.Stockings);
		var co=playerCode.isWearingOn(itemTypes.Collar);
		var hb=playerCode.isWearingOn(itemTypes.Hairband);
		var ea=playerCode.isWearingOn(itemTypes.Earrings);
		var ex=playerCode.isWearingOn(itemTypes.Extra);
		var c=playerCode.isWearingOn(itemTypes.Chastity);
		if (!window.clothes.dressedOutside()) {
			return false;
		}
		if (!o.school) {
			State.active.variables.reason.dressedSchool="You need to wear the school uniform";
			return false;
		}
		if (!s.school) {
			State.active.variables.reason.dressedSchool="You need to wear proper footwear";
			return false;
		}
		if (o.school && !o.female && s.female && s.slutty) {
			State.active.variables.reason.dressedSchool="It is against rules to wear heels with pants";
			return false;
		}
		if (o.school && o.female && (player.perversion.teacher < 4) && (State.active.variables.events.taskedToWearDressToSchool == null)) {
			State.active.variables.reason.dressedSchool="You don't want to go to the school in the female uniform";
			return false;
		}
		if (State.active.variables.flags.chastityKey) {
			if (!c) {
				State.active.variables.reason.dressedSchool="You need to wear chastity device";
				return false;
			}
			if (c && !State.active.variables.flags.chastityLocked) {
				State.active.variables.reason.dressedSchool="You need to lock your chastity device";
				return false;
			}
		}
		if (player.perversion.teacher < 8) {
			if (st && st.schoolAlt && (st.schoolAlt < items[st.id].curAlt)) {
				State.active.variables.reason.dressedSchool="Such stockings are against school uniform regulations, I need plain black stockings";
				if (!st.slutty) {
					State.active.variables.reason.dressedSchool="Such socks are against school uniform regulations, I need plain black socks";
				}
				return false;
			}
			if (hb && hb.schoolAlt && (hb.schoolAlt < items[hb.id].curAlt)) {
				State.active.variables.reason.dressedSchool="Such hairband is against school uniform regulations";
				return false;
			}
			if (s && s.schoolSlut) {
				State.active.variables.reason.dressedSchool="Such heeled shoes are against school uniform regulations";
				return false;
			}
			if (s && s.schoolAlt && (s.schoolAlt < items[s.id].curAlt) && (items[s.id].curAlt != 40)) {
				State.active.variables.reason.dressedSchool="Such style of shoes is against school uniform regulations, I need more conservative looking model";
				return false;
			}
		}
		return true;
	},
	dressedSleep: function() {
		var player=State.active.variables.player;
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		if (s) {
			State.active.variables.reason.dressedSleep="You can't wear shoes to bed";
			return false;
		}
		if (o) {
			if (!o.sleepWear) {
				State.active.variables.reason.dressedSleep="You have to wear sleepwear to sleep";
				return false;
			}
			if ((this.checkStat(window.femValues.femUnderwearFemale)) && o.female) {
				State.active.variables.reason.dressedSleep="You don't feel daring enough";
				return false;
			}
		}
		return true;
	},
	dressedMaid: function() {
		var o=playerCode.isWearing(itemsC.maidOutfit);
		if (!o) {
			State.active.variables.reason.dressedMaid="You have to wear the maid outfit for this";
			return false;
		}
		return true;
	},
	dressedFemale: function() {
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		return (!u || u.female) && o.female && s.female;	
	}
}