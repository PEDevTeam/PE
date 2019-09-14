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
	setCage_d: function() {
		if (State.active.variables.flags.penisShrinkProgress) {
			State.active.variables.items.chastityDevice.name="CB-6000S chastity device";
			State.active.variables.items.chastityDevice.image="chastity_cb6000s.jpg";
		}
	},
	checkUnderwear: function() {
		var player=State.active.variables.player;
		//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
		var underwear=window.wardrobeFuncs.getWornItem('underwear');
		if (player.daring < window.daringValues.daringUnderwearFemale) {
			return underwear && !underwear.isFemale;
		} else if (player.daring < window.daringValues.daringUnderwearNone) {
			return underwear;
		} else {
			return true;
		}
	},
	dressedGuardian: {
		check: function() {
			var player=State.active.variables.player;
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var bra=playerCode.isWearingOn(itemTypes.Bras);
			var bra=window.wardrobeFuncs.getWornItem('bra');
			//var stockings=playerCode.isWearingOn(itemTypes.Stockings);
			var stockings=window.wardrobeFuncs.getWornItem('hosiery');
			//var collar=playerCode.isWearingOn(itemTypes.Collar);
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			//var hairband=playerCode.isWearingOn(itemTypes.Hairband);
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			//var earrings=playerCode.isWearingOn(itemTypes.Earrings);
			var earrings=window.wardrobeFuncs.getWornItem('earrings');
			//var extras=playerCode.isWearingOn(itemTypes.Extra);
			var eyewear=window.wardrobeFuncs.getWornItem('eyewear');
			var mouthwear=window.wardrobeFuncs.getWornItem('mouthwear');
			if (!outerwear && underwear && underwear.isFemale && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing female underwear";
				return false;
			}
			if (!outerwear && bra && bra.isFemale && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing a bra";
				return false;
			}
			if (!outerwear && stockings && stockings.isFemale && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing feminine socks";
				if (stockings.masterItem == "stockings") {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing stockings";
				}
				return false;
			}
			if (collar && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing choker";
				if (collar.masterItem == "collar") {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing collar";
				}
				if (collar.daring >=  8) {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing such collar";
				}
				return false;
			}
			if (hairband && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing feminine hair acessorry";
				return false;
			}
			if ((eyewear || mouthwear) && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing extra acessorry";
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
			if (((outerwear && outerwear.isFemale) || (shoes && shoes.isFemale)) && (player.perversion.guardian <= 2)) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing female clothing";
				return false;
			}
			return true;
		}
	},
	dressedGuardianWork: {
		check: function() {
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			if (outerwear && window.inventoryFuncs.hasTag(outerwear, 'school')) {
				State.active.variables.reason.dressedGuardianWork="Clinic policy forbids wearing a school uniform on a part time job";
				return false;
			}
			return true;
		}
	},
	dressedWhore: {
		check: function() {
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			var nightwear=window.wardrobeFuncs.getWornItem('nightwear');
			if (underwear) {
				State.active.variables.reason.dressedGuardianWork="You don't need underwear for that";
				return false;
			}
			if (nightwear) {
				State.active.variables.reason.dressedGuardianWork="You can't wear sleepwear for that";
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
			if (!window.inventoryFuncs.hasTag(outerwear, 'slutty') || !window.inventoryFuncs.hasTag(shoes, 'slutty')) {
				State.active.variables.reason.dressedGuardianWork="You're not dressed slutty enough";
				return false;
			}
			return true;
		}
	},
	dressedClub: {
		check: function() {
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			if (outerwear && window.inventoryFuncs.hasTag(outerwear, 'school')) {
				State.active.variables.reason.dressedClub="It's against the rules to wear any school clothes to the club";
				return false;
			}
			if (outerwear && !outerwear.isFemale) {
				State.active.variables.reason.dressedClub="You don't think you could make it in wearing male clothing";
				return false;
			}
			if (underwear && !underwear.isFemale) {
				State.active.variables.reason.dressedClub="You don't think it's a good idea to wear briefs to the club";
				return false;
			}
			return true;
		}
	},
	dressedOutside: {
		check: function() {
			var player=State.active.variables.player;
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var bra=playerCode.isWearingOn(itemTypes.Bras);
			var bra=window.wardrobeFuncs.getWornItem('bra');
			//var stockings=playerCode.isWearingOn(itemTypes.Stockings);
			var stockings=window.wardrobeFuncs.getWornItem('hosiery');
			//var collar=playerCode.isWearingOn(itemTypes.Collar);
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			//var hairband=playerCode.isWearingOn(itemTypes.Hairband);
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			//var earrings=playerCode.isWearingOn(itemTypes.Earrings);
			var earrings=window.wardrobeFuncs.getWornItem('earrings');
			//var extras=playerCode.isWearingOn(itemTypes.Extra);
			var eyewear=window.wardrobeFuncs.getWornItem('eyewear');
			var mouthwear=window.wardrobeFuncs.getWornItem('mouthwear');
			var nightwear=window.wardrobeFuncs.getWornItem('nightwear');
			if (nightwear) {
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
			if (outerwear && window.inventoryFuncs.hasTag(outerwear, 'maid')) {
				State.active.variables.reason.dressedOutside="You can't go out wearing a maid uniform";
				return false;
			}
			if (shoes && shoes.masterItem == "balletHeels") {
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
				if (stockings.masterItem == "stockings") {
					State.active.variables.reason.dressedOutside="You don't feel daring enough to go out wearing stockings";
				}
				return false;
			}
			if (collar && collar.masterItem == "choker" && (player.daring < window.daringValues.daringCollar)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing choker";
				return false;
			}
			if (collar && collar.masterItem == "collar" && (player.daring < collar.daring) && !State.active.variables.flags.collarLocked) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing such collar";
				return false;
			}
			if (hairband && (player.daring < window.daringValues.daringHairband)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing feminine hair acessorry";
				return false;
			}
			if ((eyewear || mouthwear) && (player.daring < window.daringValues.daringExtra)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing extra acessorry";
				return false;
			}
			if ((player.daring < window.daringValues.daringClothesFemale) || (player.perversion.crossdressing < 6 && player.perversion.teacher < 4 && State.active.variables.tasksTeacher.wearDressToSchool.status <= 0)) {
				if (State.active.variables.flags.flatsFlag){
					if (outerwear.isFemale || (shoes.isFemale && shoes.masterItem != "flats")) {
						State.active.variables.reason.dressedOutside="You don't feel daring enough to do this wearing more female clothing than your flats.";
						return false;
					}
				}
				else{
					if (outerwear.isFemale || shoes.isFemale) {
						State.active.variables.reason.dressedOutside="You don't feel daring enough to do this in female clothing";
						return false;
					}
				}
			}
			if (State.active.variables.flags.laundryAccident && underwear && underwear.isFemale && window.inventoryFuncs.isItemVariantOwned('lucky_jocks_00')) {
				State.active.variables.reason.dressedOutside="You don't want to go outside in wet underwear";
				return false;
			}
			return true;
		}
	},
	dressedFriend: {
		check: function() {
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			var nightwear=window.wardrobeFuncs.getWornItem('nightwear');
			if (!window.clothes.checkUnderwear()) {
				State.active.variables.reason.dressedFriend="You don't feel daring enough for " + (underwear ? "that" : "no") + " underwear";
				return false;
			}
			if (nightwear) {
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
				if (outerwear.isFemale || shoes.isFemale) {
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
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			if ((outerwear.isFemale || shoes.isFemale) && (player.perversion.therapist < 3) && (player.perversion.guardian < 5)) {
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
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var bra=playerCode.isWearingOn(itemTypes.Bras);
			var bra=window.wardrobeFuncs.getWornItem('bra');
			//var stockings=playerCode.isWearingOn(itemTypes.Stockings);
			var stockings=window.wardrobeFuncs.getWornItem('hosiery');
			//var collar=playerCode.isWearingOn(itemTypes.Collar);
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			//var hairband=playerCode.isWearingOn(itemTypes.Hairband);
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			//var earrings=playerCode.isWearingOn(itemTypes.Earrings);
			var earrings=window.wardrobeFuncs.getWornItem('earrings');
			//var extras=playerCode.isWearingOn(itemTypes.Extra);
			var eyewear=window.wardrobeFuncs.getWornItem('eyewear');
			var mouthwear=window.wardrobeFuncs.getWornItem('mouthwear');
			var nightwear=window.wardrobeFuncs.getWornItem('nightwear');
			if (!window.clothes.dressedOutside.check(0)) {
				return false;
			}
			if (!window.inventoryFuncs.hasTag(outerwear, 'school')) {
				State.active.variables.reason.dressedSchool="You need to wear the school uniform";
				return false;
			}
			if (window.inventoryFuncs.hasTag(outerwear, 'school') && !outerwear.isFemale && shoes.isFemale && window.inventoryFuncs.hasTag(shoes, 'heels')) {
				State.active.variables.reason.dressedSchool="It is against rules to wear heels with pants";
				return false;
			}
			if (player.perversion.teacher < 10) {
				if (!window.inventoryFuncs.hasTag(shoes, 'school')) {
					State.active.variables.reason.dressedSchool="You need to wear proper footwear";
					return false;
				}
				if (stockings && !window.inventoryFuncs.hasTag(stockings, 'school')) {
					State.active.variables.reason.dressedSchool="Such stockings are against school uniform regulations, I need plain black stockings";
					if (stockings.masterItem == "socks") {
						State.active.variables.reason.dressedSchool="Such socks are against school uniform regulations, I need plain black socks";
					}
					return false;
				}
				if (hairband && window.inventoryFuncs.hasTag(hairband, 'school')) {
					State.active.variables.reason.dressedSchool="Such hairband is against school uniform regulations";
					return false;
				}
				if (shoes && window.inventoryFuncs.hasTag(shoes, 'school')) {
					State.active.variables.reason.dressedSchool="Such style of shoes is against school uniform regulations, I need more conservative looking model";
					return false;
				}
				if (shoes && (shoes.daring >= 7)) {
					State.active.variables.reason.dressedSchool="Such heeled shoes are against school uniform regulations";
					return false;
				}
			}
			if (State.active.variables.cheerleaders.active == false && (window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress'))) {
				if (window.inventoryFuncs.hasTag(outerwear, 'cheer') || window.inventoryFuncs.hasTag(shoes, 'cheer') || (stockings && stockings.variant == "socks_43") || (underwear && window.inventoryFuncs.hasTag(underwear, 'cheer'))) {
					State.active.variables.reason.dressedSchool="You have been removed from the cheer squad and are no longer allowed to wear the cheer uniform to school";
					return false;
				}
			}
			if (State.active.variables.cheerleaders.active == true) {
				if ((outerwear && !outerwear.isFemale) || (shoes && !shoes.isFemale)) {
					State.active.variables.reason.dressedSchool="Rachel has ordered you to wear girl's clothes to school while you are on the cheer squad.";
					return false;
				}
				if ((window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress')) && (timeCode.isTuesday() || timeCode.isThursday()) && timeCode.haveSchool() && (!window.inventoryFuncs.hasTag(outerwear, 'cheer') || !window.inventoryFuncs.hasTag(shoes, 'cheer') || (stockings && !stockings.variant == "socks_43") || (hairband && !hairband.variant == "hairbow_43") || (underwear && !window.inventoryFuncs.hasTag(underwear, 'cheer')))) {
					State.active.variables.reason.dressedSchool="You have cheer practice today and must wear the cheer uniform";
					return false;
				}
				else if ((window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress')) && (window.inventoryFuncs.hasTag(outerwear, 'cheer') || window.inventoryFuncs.hasTag(shoes, 'cheer') || (stockings && stockings.variant == "socks_43")) && (!outerwear.cheer || !window.inventoryFuncs.hasTag(shoes, 'cheer') || (stockings && !stockings.variant == "socks_43") || (hairband && !hairband.variant == "hairbow_43") || (underwear && !window.inventoryFuncs.hasTag(underwear, 'cheer')))) {
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
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			var nightwear=window.wardrobeFuncs.getWornItem('nightwear');
			if (shoes) {
				State.active.variables.reason.dressedSleep="You can't wear shoes to bed";
				return false;
			}
			if(outerwear){
				State.active.variables.reason.dressedSleep="You have to wear sleepwear to sleep";
				return false;
			}
			if (nightwear) {
				if ((player.daring < window.daringValues.daringUnderwearFemale) && nightwear.isFemale) {
					State.active.variables.reason.dressedSleep="You don't feel daring enough";
					return false;
				}
			}
			return true;
		}
	},
	dressedMaid: {
		check: function() {
			//var maid=playerCode.isWearing(itemsC.maidOutfit);
			var maid=window.wardrobeFuncs.getWornItem('maid');
			if (!maid) {
				State.active.variables.reason.dressedMaid="You have to wear the maid outfit for this";
				return false;
			}
			return true;
		}
	},
	dressedFemale: function() {
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
		return (!underwear || underwear.isFemale) && outerwear.isFemale && shoes.isFemale;	
	},
	dressedCheerFriend: function() {
			//var underwear=playerCode.isWearingOn(itemTypes.Underwear);
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			//var outerwear=playerCode.isWearingOn(itemTypes.Outerwear);
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			//var shoes=playerCode.isWearingOn(itemTypes.Shoes);
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
		return (!underwear || (underwear.isFemale && !window.inventoryFuncs.hasTag(underwear, 'cheer')) && (outerwear.isFemale && !(window.inventoryFuncs.hasTag(outerwear, 'school'))) && (shoes.isFemale && !(window.inventoryFuncs.hasTag(shoes, 'cheer'))));	
	}
}
