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
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			var bra=window.wardrobeFuncs.getWornItem('bra');
			var stockings=window.wardrobeFuncs.getWornItem('hosiery');
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			var earrings=window.wardrobeFuncs.getWornItem('earring');
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
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing a choker";
				if (collar.masterItem == "collar") {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing a collar";
				}
				if (collar.daring >=  8) {
					State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing such a collar";
				}
				return false;
			}
			if (hairband && player.perversion.guardian <= 3) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that while wearing a feminine hair accessory";
				return false;
			}
			if (((eyewear && eyewear.isFemale) || mouthwear) && player.perversion.guardian <= 3) {
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
			if (((outerwear && outerwear.isFemale) || (shoes && shoes.isFemale)) && (player.perversion.guardian <= 2)) {
				State.active.variables.reason.dressedGuardian="You don't feel comforable enough to do that wearing female clothing";
				return false;
			}
			return true;
		}
	},
	dressedGuardianWork: {
		check: function() {
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			if (outerwear && window.inventoryFuncs.hasTag(outerwear, 'school')) {
				State.active.variables.reason.dressedGuardianWork="Clinic policy forbids wearing a school uniform while on a part time job";
				return false;
			}
			return true;
		}
	},
	dressedWhore: {
		check: function() {
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			var nightwear=window.wardrobeFuncs.getWornItem('nightwear');
			if (underwear) {
				State.active.variables.reason.dressedWhore="You don't need underwear for that";
				return false;
			}
			if (nightwear) {
				State.active.variables.reason.dressedWhore="You can't wear sleepwear for that";
				return false;
			}
			if (!outerwear) {
				State.active.variables.reason.dressedWhore="You need to wear something";
				return false;
			}
			if (!shoes) {
				State.active.variables.reason.dressedWhore="You need to wear shoes";
				return false;
			}

			if (!window.inventoryFuncs.hasTag(outerwear, 'slutty') || !window.inventoryFuncs.hasTag(shoes, 'slutty')) {
				State.active.variables.reason.dressedWhore="You're not dressed slutty enough";
				return false;
			}
			if (window.clothes.dressedMaid.checkPartial()){
				State.active.variables.reason.dressedWhore="You can't wear your maid outfit outside";
				return false;
			}

			return true;
		}
	},
	dressedClub: {
		check: function() {
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
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
			if (window.clothes.dressedMaid.checkPartial()){
				State.active.variables.reason.dressedClub="You can't wear your maid outfit outside";
				return false;
			}
			return true;
		}
	},
	dressedOutside: {
		check: function() {
			var player=State.active.variables.player;
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			var bra=window.wardrobeFuncs.getWornItem('bra');
			var stockings=window.wardrobeFuncs.getWornItem('hosiery');
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			var earrings=window.wardrobeFuncs.getWornItem('earring');
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
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing a choker";
				return false;
			}
			if (collar && collar.masterItem == "collar" && (player.daring < collar.daring) && !State.active.variables.flags.collarLocked) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing such a collar";
				return false;
			}
			if (hairband && (player.daring < window.daringValues.daringHairband)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing a feminine hair accessory";
				return false;
			}
			if (((eyewear && eyewear.isFemale) || mouthwear) && (player.daring < window.daringValues.daringExtra)) {
				State.active.variables.reason.dressedOutside="You don't feel daring enough to go out while wearing an extra acessorry";
				return false;
			}
			if ((player.daring < window.daringValues.daringClothesFemale) || (player.perversion.crossdressing < 7 && player.perversion.teacher < 4 && State.active.variables.tasksTeacher.wearDressToSchool.status <= 0)) {
				if (State.active.variables.flags.flatsFlag){
					if ((outerwear && outerwear.isFemale) || (shoes && shoes.isFemale && shoes.masterItem != "flats")) {
						State.active.variables.reason.dressedOutside="You don't feel daring enough to do this wearing more female clothing than your flats.";
						return false;
					}
				}
				else{
					if ((outerwear && outerwear.isFemale) || (shoes && shoes.isFemale)) {
						State.active.variables.reason.dressedOutside="You don't feel daring enough to do this in female clothing";
						return false;
					}
				}
			}
			if (State.active.variables.flags.laundryAccident && underwear && underwear.isFemale && window.inventoryFuncs.isItemVariantOwned('lucky_jocks_00')) {
				State.active.variables.reason.dressedOutside="You don't want to go outside in wet underwear";
				return false;
			}
			if (window.clothes.dressedMaid.checkPartial()){
				State.active.variables.reason.dressedOutside="You can't wear your maid outfit outside";
				return false;
			}
			return true;
		}
	},
	dressedFriend: {
		check: function() {
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
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
				if ((outerwear && outerwear.isFemale) || (shoes && shoes.isFemale)) {
					State.active.variables.reason.dressedFriend="You don't feel daring enough to face your friend while wearing female clothing";
					return false;
				}
			}
			if (window.clothes.dressedMaid.checkPartial()){
				State.active.variables.reason.dressedFriend="You can't wear your maid outfit outside";
				return false;
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
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			if (((outerwear && outerwear.isFemale) || (shoes && shoes.isFemale)) && (player.perversion.therapist < therapistPerversion.noticedEffect /* TODO: this should consider the "crossdressing score" rather than therapist progress */) && (player.perversion.guardian < 5)) {
				State.active.variables.reason.dressedTherapy="You don't feel ready to visit $therapist dressed like that";
				return false;
			}
			if (window.clothes.dressedMaid.checkPartial()){
				State.active.variables.reason.dressedTherapy="You can't wear your maid outfit outside";
				return false;
			}
			return true;
		}
	},
	dressedSchool: {
		check: function() {
			var player=State.active.variables.player;
			var items=State.active.variables.items;
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			var bra=window.wardrobeFuncs.getWornItem('bra');
			var stockings=window.wardrobeFuncs.getWornItem('hosiery');
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			var earrings=window.wardrobeFuncs.getWornItem('earring');
			var eyewear=window.wardrobeFuncs.getWornItem('eyewear');
			var mouthwear=window.wardrobeFuncs.getWornItem('mouthwear');
			var nightwear=window.wardrobeFuncs.getWornItem('nightwear');
			if (!window.clothes.dressedOutside.check(0)) {
				return false;
			}
			if (outerwear && !window.inventoryFuncs.hasTag(outerwear, 'school')) {
				State.active.variables.reason.dressedSchool="You need to wear the school uniform";
				return false;
			}
			if (outerwear && shoes && window.inventoryFuncs.hasTag(outerwear, 'school') && !outerwear.isFemale && shoes.isFemale && window.inventoryFuncs.hasTag(shoes, 'heels')) {
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
				if (hairband && !window.inventoryFuncs.hasTag(hairband, 'school')) {
					State.active.variables.reason.dressedSchool="Such hairband is against school uniform regulations";
					return false;
				}
				if (shoes && !window.inventoryFuncs.hasTag(shoes, 'school')) {
					State.active.variables.reason.dressedSchool="This style of shoes is against school uniform regulations, I need a more conservative looking type";
					return false;
				}
				if (shoes && (shoes.daring >= 7)) {
					State.active.variables.reason.dressedSchool="Heeled shoes are against school uniform regulations";
					return false;
				}
			}
			if (State.active.variables.cheerleaders.active == false && (window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress'))) {
				if ((outerwear && window.inventoryFuncs.hasTag(outerwear, 'cheer')) || (shoes && window.inventoryFuncs.hasTag(shoes, 'cheer')) || (stockings && stockings.variant == "socks_43") || (underwear && window.inventoryFuncs.hasTag(underwear, 'cheer'))) {
					State.active.variables.reason.dressedSchool="You have been removed from the cheer squad and are no longer allowed to wear the cheer uniform to school";
					return false;
				}
			}
			if (State.active.variables.cheerleaders.active == true) {
				if ((outerwear && !outerwear.isFemale) || (shoes && !shoes.isFemale)) {
					State.active.variables.reason.dressedSchool="Rachel has ordered you to wear girl's clothes to school while you are on the cheer squad.";
					return false;
				}
				if ((window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress')) && (timeCode.isTuesday() || timeCode.isThursday()) && timeCode.haveSchool() && ((outerwear && !window.inventoryFuncs.hasTag(outerwear, 'cheer')) || (shoes && !window.inventoryFuncs.hasTag(shoes, 'cheer')) || (stockings && !stockings.variant == "socks_43") || (hairband && !hairband.variant == "hairbow_43") )) {
					State.active.variables.reason.dressedSchool="You have cheer practice today and must wear the cheer uniform";
					return false;
				}
				if ((window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress')) && (timeCode.isMonday() && State.active.variables.cheerleaders.flags.prank2) && timeCode.haveSchool() && ((outerwear && !window.inventoryFuncs.hasTag(outerwear, 'cheer')) || (shoes && !window.inventoryFuncs.hasTag(shoes, 'cheer')) || (stockings && !window.inventoryFuncs.hasTag(stockings, 'cheer') && (stockings.variant != "socks_43")) || (hairband && !window.inventoryFuncs.hasTag(hairband, 'cheer') && (!hairband.variant == "hairbow_43")))) {
					State.active.variables.reason.dressedSchool="Ashley ordered you to wear your cheer uniform to school today.";
					return false;
				}
				if ((window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress')) && (timeCode.isFriday() && State.active.variables.cheerleaders.progress == 8) && timeCode.haveSchool() && ((outerwear && !window.inventoryFuncs.hasTag(outerwear, 'cheer')) || (shoes && !window.inventoryFuncs.hasTag(shoes, 'cheer')) || (stockings && !window.inventoryFuncs.hasTag(stockings, 'cheer') && (stockings.variant != "socks_43")) || (hairband && !window.inventoryFuncs.hasTag(hairband, 'cheer') && (!hairband.variant == "hairbow_43")))) {
					State.active.variables.reason.dressedSchool="You have a cheer competiton today and must wear your uniform.";
					return false;
				}
				
				else if ((window.inventoryFuncs.isItemVariantOwned('rookie_uniform') || window.inventoryFuncs.isItemVariantOwned('cheer_dress')) && outerwear && (window.inventoryFuncs.hasTag(outerwear, 'cheer') || (shoes && window.inventoryFuncs.hasTag(shoes, 'cheer')) || (stockings && stockings.variant == "socks_43")) && ((outerwear && !window.inventoryFuncs.hasTag(outerwear, 'cheer')) || (shoes && !window.inventoryFuncs.hasTag(shoes, 'cheer')) || (stockings && !stockings.variant == "socks_43") || (hairband && !hairband.variant == "hairbow_43") )) {
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
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
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
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes = window.wardrobeFuncs.getWornItem('shoes');
			var hosiery = window.wardrobeFuncs.getWornItem('hosiery');
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			var bra=window.wardrobeFuncs.getWornItem('bra');
			
			if (!(outerwear && shoes && hosiery && collar && hairband)) {
				if (State.active.variables.flags.gTrialCorset && !bra){
					State.active.variables.reason.dressedMaid="You have to wear the full maid outfit for this, including dress, heels, stockings, corset, collar, and headband.";
				}
				else{
					State.active.variables.reason.dressedMaid="You have to wear the full maid outfit for this, including dress, heels, stockings, collar, and headband.";
				}
				
				return false;
			}
			
			if (State.active.variables.flags.gTrialCorset && (bra && !window.inventoryFuncs.hasTag(bra, 'maid'))){
				State.active.variables.reason.dressedMaid="You have to wear the proper corset with your maid outfit.";
				return false;
			}
			
			var maid = window.inventoryFuncs.hasTag(outerwear, 'maid') && window.inventoryFuncs.hasTag(shoes, 'maid') && window.inventoryFuncs.hasTag(hosiery, 'maid') && window.inventoryFuncs.hasTag(collar, 'maid') && window.inventoryFuncs.hasTag(hairband, 'maid');
			
			if (!maid) {
				State.active.variables.reason.dressedMaid="You have to wear the full maid outfit for this, including dress, heels, stockings, collar, and headband.";
				console.log("item not maid");
				return false;
			}
			return true;
		},
		
		checkPartial: function() {
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes = window.wardrobeFuncs.getWornItem('shoes');
			var hosiery = window.wardrobeFuncs.getWornItem('hosiery');
			var collar=window.wardrobeFuncs.getWornItem('neckwear');
			var hairband=window.wardrobeFuncs.getWornItem('headwear');
			
			if (outerwear &&  window.inventoryFuncs.hasTag(outerwear, 'maid')){
				return true;
			}
			if (shoes &&  window.inventoryFuncs.hasTag(shoes, 'maid')){
				return true;
			}
			if (hosiery &&  window.inventoryFuncs.hasTag(hosiery, 'maid')){
				return true;
			}
			if (collar &&  window.inventoryFuncs.hasTag(collar, 'maid')){
				return true;
			}
			if (hairband &&  window.inventoryFuncs.hasTag(hairband, 'maid')){
				return true;
			}
			return false;
		}
	},
	dressedFemale: function() {
			var underwear=window.wardrobeFuncs.getWornItem('underwear');
			var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
			var shoes=window.wardrobeFuncs.getWornItem('shoes');
		return (!underwear || underwear.isFemale) && outerwear && outerwear.isFemale && shoes && shoes.isFemale;	
	},
	dressedCheerFriend: function() {
		var underwear=window.wardrobeFuncs.getWornItem('underwear');
		var outerwear=window.wardrobeFuncs.getWornItem('outerwear');
		var shoes=window.wardrobeFuncs.getWornItem('shoes');
			
		return (!underwear || (underwear && underwear.isFemale && !window.inventoryFuncs.hasTag(underwear, 'cheer')) && (outerwear && outerwear.isFemale && !(window.inventoryFuncs.hasTag(outerwear, 'school'))) && (shoes && shoes.isFemale && !(window.inventoryFuncs.hasTag(shoes, 'cheer'))));	
	}
}
