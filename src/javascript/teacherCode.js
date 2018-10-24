window.teacherCode={
	selectPunishment: function (penalties, type, bodyMod) {
		var player=State.active.variables.player;
		var time=State.active.variables.time;
		var pp = player.perversion;
		var prio = 0;
		var sumChance = 0;
		var possiblePun = [];
		var minVal = 0; var maxVal = 1;
		var severity = Math.min((player.punishments.punSeverity + penalties) / 2, player.punishments.punSeverity);
		for (var i = 0; i < Object.keys(window.teacherPunishments).length; i++) {
			var p = window.teacherPunishments[Object.keys(window.teacherPunishments)[i]];
			var pV = State.active.variables.teacherPunishments[Object.keys(window.teacherPunishments)[i]];
			var bR = p.baseReq;
			if (!p.extraReq()) {
				continue;
			}
			if (!pV.active || (pV.timeStart + p.cooldown > time.day) || (!(p.punType & type)) || (prio > p.priority) || ((!bodyMod) && (p.punType & window.punTypes.FailToPayBodyMod)) || (bR.teacher[minVal] > pp.teacher) || (bR.teacher[maxVal] < pp.teacher) || (bR.guardian[minVal] > pp.guardian) || (bR.guardian[maxVal] < pp.guardian) || (bR.therapist[minVal] > pp.therapist) || (bR.therapist[maxVal] < pp.therapist) || (bR.penalties[minVal] > severity) || (bR.penalties[maxVal] < severity)) {
				continue;
			}
			if (p.priority > prio) { sumChance = 0; possiblePun = []; prio = p.priority; }
			possiblePun.push(i);
			sumChance += p.chance;
		}
		//player.testArray=possiblePun;
		/*
		if (possiblePun.length == 0) { return false; }
		if (possiblePun.length > 2) {
			possiblePun = possiblePun.filter(function (pun) { pun != player.punishments.lastPunName });
		}
		*/
		var rnd = window.randomCode.getIntInclusive(1, sumChance);
		for (var j = 0; j < possiblePun.length; j++) {
			var p = window.teacherPunishments[Object.keys(window.teacherPunishments)[possiblePun[j]]];
			sumChance -= p.chance;
			if (sumChance <= rnd) {
				var pV = State.active.variables.teacherPunishments[Object.keys(window.teacherPunishments)[possiblePun[j]]];
				if (p.onlyOnce) { pV.active = false; }
				p.start();
				pV.progress += 1;
				pV.timeStart = time.day;
				player.punishments.lastPunName = possiblePun[j];
				return p;
			}
		}
	},
	addPenalty:	function (penalties) {
		var player=State.active.variables.player;
		if (penalties < player.punishments.penalty) {
			player.punishments.penalty += penalties/player.punishments.penalty;
		}
		if (penalties == player.punishments.penalty) {
			player.punishments.penalty += 1;
		}
		if (penalties > player.punishments.penalty) {
			player.punishments.penalty = penalties;
		}
		if (State.active.variables.time.day % 7 == 1) {
			if (penalties < player.punishments.penaltyMonday) {
				player.punishments.penaltyMonday += penalties/player.punishments.penaltyMonday;
			}
			if (penalties == player.punishments.penaltyMonday) {
				player.punishments.penaltyMonday += 1;
			}
			if (penalties > player.punishments.penaltyMonday) {
				player.punishments.penaltyMonday = penalties;
			}
			player.punishments.penaltyMonday = 0.01*Math.floor(100*player.punishments.penaltyMonday);
		}
		player.punishments.penalty = 0.01*Math.floor(100*player.punishments.penalty);
		
		if (player.punishments.penalty > 10) { player.punishments.penalty = 10; }
	},
	updateSeverity:	function (penalties) {
		var player=State.active.variables.player;
		if (penalties == 0 && player.punishments.punSeverity > 3) {
			player.punishments.punSeverity -= 1;
		}
		if (penalties >= player.punishments.punSeverity) {
			player.punishments.punSeverity += 1;
			if (penalties > (player.punishments.punSeverity*2)) {
				player.punishments.punSeverity += 1;
			}
		}
	},
},

window.punTypes = {
	FailToPay: 1,
	FailToPayBodyMod: 2,
	Friday: 4,
	Willing: 8,
	All: 15
},

window.teacherPunishments = {
	punName: {
		id: "punName",
		punType:	window.punTypes.FailToPay + window.punTypes.FailToPayBodyMod + window.punTypes.Friday,
		description:'Teachers description of what you are to do',
		text:		'What happens during the punishment unlessed handled in passage',
		passage:	'Name of passage that implements punishment',
		active:		false,
		onlyOnce:	false,
		chance:		10,
		priority:	0,
		baseReq:	{ teacher: [0, 10], guardian: [0, 10], therapist: [0, 10], penalties: [0, 10] },
		extraReq:	function () {
					return true;	// or return State.active.variables.kink.XXX;
				},
		cooldown:	7,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	nailPolishPenalty: {
		id:	"nailPolishPenalty",
		punType:	window.punTypes.FailToPay,
		description:'Teachers description of what you are to do',
		text:		'Teacher paints PCs nails',
		passage:	'nailPolishPenalty',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	10,
		baseReq:	{ teacher: [0, 2], guardian: [0, 10], therapist: [0, 10], penalties: [0, 3] },
		extraReq:	function () {
					return true;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	takingKeyFromChastity: {
		id:	"takingKeyFromChastity",
		punType:	window.punTypes.FailToPay,
		description:'Teachers description of what you are to do',
		text:		'Teacher takes the key from PC chastity cage',
		passage:	'takingKeyFromChastity',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	10,
		baseReq:	{ teacher: [0, 2], guardian: [0, 10], therapist: [0, 10], penalties: [0, 10] },
		extraReq:	function () {
					return true;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	wearDressToSchool: {
		id:	"wearDressToSchool",
		punType:	window.punTypes.FailToPay,
		description:'Teachers description of what you are to do',
		text:		'Teacher takes the key from PC chastity cage',
		passage:	'wearDressToSchool',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	10,
		baseReq:	{ teacher: [3, 3], guardian: [0, 10], therapist: [0, 10], penalties: [0, 10] },
		extraReq:	function () {
					return (State.active.variables.events.taskedToWearDressToSchool != null);
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	
	punStool: {
		id:	"punStool",
		punType:	window.punTypes.Friday + window.punTypes.Willing,
		description:'Teachers description of what you are to do',
		text:		'Teacher makes PC undress and sits on him',
		passage:	'punStool',
		active:		true,
		onlyOnce:	false,
		chance:		10,
		priority:	0,
		baseReq:	{ teacher: [0, 10], guardian: [0, 10], therapist: [0, 10], penalties: [0, 4] },
		extraReq:	function () {
					return true;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	punishmentSpanking: {
		id:	"punishmentSpanking",
		punType:	window.punTypes.Friday + window.punTypes.Willing,
		description:'Teachers description of what you are to do',
		text:		'Teacher spanks PC',
		passage:	'punishmentSpanking',
		active:		true,
		onlyOnce:	false,
		chance:		1,
		priority:	0,
		baseReq:	{ teacher: [0, 10], guardian: [0, 10], therapist: [0, 10], penalties: [0, 10] },
		extraReq:	function () {
					return true;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	feetLicking: {
		id:	"feetLicking",
		punType:	window.punTypes.Friday + window.punTypes.Willing,
		description:'Teachers description of what you are to do',
		text:		'Teacher puts collar on PC, pet play, boot worship, spitting',
		passage:	'feetLicking',
		active:		true,
		onlyOnce:	false,
		chance:		10,
		priority:	0,
		baseReq:	{ teacher: [0, 10], guardian: [0, 10], therapist: [0, 10], penalties: [2, 6] },
		extraReq:	function () {
					return State.active.variables.kink.footFetish;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	punishmentLickBoots: {
		id:	"punishmentLickBoots",
		punType:	window.punTypes.Friday + window.punTypes.Willing,
		description:'Teachers description of what you are to do',
		text:		'Teacher puts collar on PC, pet play, boot worship, spitting',
		passage:	'punishmentLickBoots',
		active:		true,
		onlyOnce:	false,
		chance:		10,
		priority:	0,
		baseReq:	{ teacher: [0, 10], guardian: [0, 10], therapist: [0, 10], penalties: [2, 6] },
		extraReq:	function () {
					return State.active.variables.kink.shoeBoot;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	readingStory: {
		id:	"readingStory",
		punType:	window.punTypes.Friday + window.punTypes.Willing,
		description:'Teachers description of what you are to do',
		text:		'Teacher makes PC read erotical story while being plugged',
		passage:	'readingStory',
		active:		true,
		onlyOnce:	false,
		chance:		10,
		priority:	0,
		baseReq:	{ teacher: [0, 10], guardian: [0, 10], therapist: [0, 10], penalties: [2, 6] },
		extraReq:	function () {
					return true;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	
	sitOnDildo: {
		id:	"sitOnDildo",
		punType:	window.punTypes.Friday + window.punTypes.Willing,
		description:'Teachers description of what you are to do',
		text:		'Teacher apply her most severe punishment',
		passage:	'sitOnDildo',
		active:		true,
		onlyOnce:	false,
		chance:		20,
		priority:	0,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [7, 10] },
		extraReq:	function () {
					return true;
				},
		cooldown:	1,
		start:		function () {},
		end:		function () {},
	},
	
	PenisShrinking: {
		id:	"PenisShrinking",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo penis shrinking procedure',
		passage:	'PenisShrinking',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	5,
		baseReq:	{ teacher: [0, 10], guardian: [0, 10], therapist: [0, 10], penalties: [0, 10] },
		extraReq:	function () {
					return State.active.variables.kink.penisShrink && (!(State.active.variables.body.penisShrink == 1));
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	Waxing: {
		id:	"Waxing",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo waxing procedure',
		passage:	'Waxing',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [0, 5], guardian: [0, 10], therapist: [0, 10], penalties: [0, 3] },
		extraReq:	function () {
					return (!playerCode.isHairless()) && (!playerCode.isWaxed());
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	LaserHairRemoval: {
		id:	"LaserHairRemoval",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo LaserHairRemoval procedure',
		passage:	'LaserHairRemoval',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 7], guardian: [0, 10], therapist: [0, 10], penalties: [2, 6] },
		extraReq:	function () {
					return !(State.active.variables.body.bodyhair == 3);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	Haircut: {
		id:	"Haircut",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo Haircut procedure',
		passage:	'Haircut',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [0, 6], guardian: [0, 10], therapist: [0, 10], penalties: [0, 4] },
		extraReq:	function () {
					return !playerCode.haveHaircut();
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	PiercingEars: {
		id:	"PiercingEars",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo PiercingEars procedure',
		passage:	'PiercingEars',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [0, 7], guardian: [0, 10], therapist: [0, 10], penalties: [0, 4] },
		extraReq:	function () {
					return (!State.active.variables.body.earsPierced);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	AssEnhancing: {
		id:	"AssEnhancing",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo AssEnhancing procedure',
		passage:	'AssEnhancing',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [0, 6], guardian: [0, 10], therapist: [0, 10], penalties: [0, 6] },
		extraReq:	function () {
					return (State.active.variables.body.ass <= 0) && (!State.active.variables.flags.teacherNoticeAssEnhancing);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	LipsEnhancing: {
		id:	"LipsEnhancing",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo LipsEnhancing procedure',
		passage:	'LipsEnhancing',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [0, 6], guardian: [0, 10], therapist: [0, 10], penalties: [0, 6] },
		extraReq:	function () {
					return (State.active.variables.body.lips <= 0) && (!State.active.variables.flags.teacherNoticeLipsEnhancing);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	AssEnhancingXL: {
		id:	"AssEnhancingXL",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo AssEnhancingXL procedure',
		passage:	'AssEnhancingXL',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [5, 10], guardian: [0, 10], therapist: [0, 10], penalties: [4, 8] },
		extraReq:	function () {
					return (State.active.variables.body.ass <= 1) && (!State.active.variables.flags.teacherNoticeAssEnhancingXL);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	LipsEnhancingXL: {
		id:	"LipsEnhancingXL",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo LipsEnhancingXL procedure',
		passage:	'LipsEnhancingXL',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [5, 10], guardian: [0, 10], therapist: [0, 10], penalties: [4, 8] },
		extraReq:	function () {
					return (State.active.variables.body.lips <= 1) && (!State.active.variables.flags.teacherNoticeLipsEnhancingXL);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	SubtleMakeup: {
		id:	"SubtleMakeup",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo SubtleMakeup procedure',
		passage:	'SubtleMakeup',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [0, 6], guardian: [0, 10], therapist: [0, 10], penalties: [0, 6] },
		extraReq:	function () {
					return (!playerCode.haveMakeup());
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	NormalMakeup: {
		id:	"NormalMakeup",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo NormalMakeup procedure',
		passage:	'NormalMakeup',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 6], guardian: [0, 10], therapist: [0, 10], penalties: [3, 6] },
		extraReq:	function () {
					return (State.active.variables.body.makeup <= 1) && (!State.active.variables.flags.teacherNoticeNormalMakeup);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	HeavyMakeup: {
		id:	"HeavyMakeup",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo HeavyMakeup procedure',
		passage:	'HeavyMakeup',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [5, 10] },
		extraReq:	function () {
					return (State.active.variables.body.makeup <= 3) && (!State.active.variables.flags.teacherNoticeHeavyMakeup) && (State.active.variables.body.semiMakeup <= 3);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	PermanentHeavyMakeup: {
		id:	"PermanentHeavyMakeup",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo PermanentHeavyMakeup procedure',
		passage:	'PermanentHeavyMakeup',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	2,
		baseReq:	{ teacher: [8, 10], guardian: [0, 10], therapist: [0, 10], penalties: [7, 10] },
		extraReq:	function () {
					return State.active.variables.kink.tattoo && (State.active.variables.body.permMakeup <= 3);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	Manicure: {
		id:	"Manicure",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo Manicure procedure',
		passage:	'Manicure',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 6], guardian: [0, 10], therapist: [0, 10], penalties: [0, 6] },
		extraReq:	function () {
					return (State.active.variables.body.manicure == 0) && (!State.active.variables.flags.teacherNoticeManicure);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	GarishManicure: {
		id:	"GarishManicure",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo GarishManicure procedure',
		passage:	'GarishManicure',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [6, 10] },
		extraReq:	function () {
					return (!(State.active.variables.body.manicure == 2)) && (!State.active.variables.flags.teacherNoticeManicurePerm);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	breastImplantsA: {
		id:	"breastImplantsA",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo breastImplantsA procedure',
		passage:	'breastImplantsA',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [3, 6], guardian: [0, 10], therapist: [0, 10], penalties: [0, 5] },
		extraReq:	function () {
					return (!State.active.variables.flags.teacherNoticeBreastsA) && (!playerCode.haveBoobs());
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	breastImplantsB: {
		id:	"breastImplantsB",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo breastImplantsA procedure',
		passage:	'breastImplantsB',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [3, 7], guardian: [0, 10], therapist: [0, 10], penalties: [0, 6] },
		extraReq:	function () {
					return (!State.active.variables.flags.teacherNoticeBreastsB) && (!playerCode.haveBplus());
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	breastImplantsC: {
		id:	"breastImplantsC",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo breastImplantsC procedure',
		passage:	'breastImplantsC',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [5, 8], guardian: [0, 10], therapist: [0, 10], penalties: [2, 7] },
		extraReq:	function () {
					return (!State.active.variables.flags.teacherNoticeBreastsC) && (!playerCode.haveCplus());
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	breastImplantsDD: {
		id:	"breastImplantsDD",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo breastImplantsDD procedure',
		passage:	'breastImplantsDD',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [3, 8] },
		extraReq:	function () {
					return (!(State.active.variables.body.boobs == 4)) && (!State.active.variables.flags.teacherNoticeBreastsDD);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	softeningFacial: {
		id:	"softeningFacial",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo softeningFacial procedure',
		passage:	'softeningFacial',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 6], guardian: [0, 10], therapist: [0, 10], penalties: [2, 6] },
		extraReq:	function () {
					return (State.active.variables.body.face == 0);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	surgeryFacial: {
		id:	"surgeryFacial",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo surgeryFacial procedure',
		passage:	'surgeryFacial',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [5, 8], guardian: [0, 10], therapist: [0, 10], penalties: [3, 7] },
		extraReq:	function () {
					return (State.active.variables.body.face < 2);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	nosePiggy: {
		id:	"nosePiggy",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo nosePiggy procedure',
		passage:	'nosePiggy',
		active:		false, //disabled
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 6], guardian: [0, 10], therapist: [0, 10], penalties: [3, 7] },
		extraReq:	function () {
					return (State.active.variables.body.nose == 0) && (!State.active.variables.flags.teacherNoticeNosePiggy);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	tattooBunny: {
		id:	"tattooBunny",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo tattooBunny procedure',
		passage:	'tattooBunny',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [0, 6], guardian: [0, 10], therapist: [0, 10], penalties: [2, 6] },
		extraReq:	function () {
					return State.active.variables.kink.tattoo && (!playerCode.owns(itemsC.tattooBunny));
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	tattooButterfly: {
		id:	"tattooButterfly",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo tattooButterfly procedure',
		passage:	'tattooButterfly',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 6], guardian: [0, 10], therapist: [0, 10], penalties: [3, 7] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.tattooButterfly)) && State.active.variables.kink.tattoo;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	tattooStockings: {
		id:	"tattooStockings",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo tattooStockings procedure',
		passage:	'tattooStockings',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 6], guardian: [0, 10], therapist: [0, 10], penalties: [4, 7] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.tattooStockings)) && State.active.variables.kink.tattoo;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	tattooStupidWhore: {
		id:	"tattooStupidWhore",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo tattooStupidWhore procedure',
		passage:	'tattooStupidWhore',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [6, 10] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.tattooStupidWhore)) && State.active.variables.kink.tattoo;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	tattooSlut: {
		id:	"tattooSlut",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo tattooSlut procedure',
		passage:	'tattooSlut',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [6, 9] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.tattooSlut)) && State.active.variables.kink.tattoo;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	tattooSissy: {
		id:	"tattooSissy",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo tattooSissy procedure',
		passage:	'tattooSissy',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [6, 9] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.tattooSissy)) && State.active.variables.kink.tattoo;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	tattooHeart: {
		id:	"tattooHeart",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo tattooHeart procedure',
		passage:	'tattooHeart',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [6, 9] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.tattooHeart)) && State.active.variables.kink.tattoo;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	PiercingTongue: {
		id:	"PiercingTongue",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo PiercingTongue procedure',
		passage:	'PiercingTongue',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [5, 10], guardian: [0, 10], therapist: [0, 10], penalties: [4, 8] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.PiercingTongue)) && State.active.variables.kink.piercing;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	PiercingNipples: {
		id:	"PiercingNipples",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo PiercingNipples procedure',
		passage:	'PiercingNipples',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [5, 10], guardian: [0, 10], therapist: [0, 10], penalties: [2, 8] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.PiercingNipples)) && State.active.variables.kink.piercing;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	PiercingLips: {
		id:	"PiercingLips",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo PiercingLips procedure',
		passage:	'PiercingLips',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [2, 8] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.PiercingLips)) && State.active.variables.kink.piercing;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	PiercingBelly: {
		id:	"PiercingBelly",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo PiercingBelly procedure',
		passage:	'PiercingBelly',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [3, 8] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.PiercingBelly)) && State.active.variables.kink.piercing;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	PiercingNose: {
		id:	"PiercingNose",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo PiercingNose procedure',
		passage:	'PiercingNose',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 10], guardian: [0, 10], therapist: [0, 10], penalties: [3, 8] },
		extraReq:	function () {
					return (!playerCode.owns(itemsC.PiercingNose)) && State.active.variables.kink.piercing;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	
	analSmoothing1: {
		id:	"analSmoothing1",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo analSmoothing1 procedure',
		passage:	'analSmoothing1',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [4, 5], guardian: [0, 10], therapist: [0, 10], penalties: [2, 8] },
		extraReq:	function () {
					return (State.active.variables.body.semiAnal <= 0) && (State.active.variables.body.anal <= 0);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	analSmoothing2: {
		id:	"analSmoothing2",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo analSmoothing2 procedure',
		passage:	'analSmoothing2',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [6, 7], guardian: [0, 10], therapist: [0, 10], penalties: [3, 8] },
		extraReq:	function () {
					return (State.active.variables.body.semiAnal <= 1) && (State.active.variables.body.anal <= 1);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	analSmoothing3: {
		id:	"analSmoothing3",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo analSmoothing3 procedure',
		passage:	'analSmoothing3',
		active:		true,
		onlyOnce:	false,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [8, 10], guardian: [0, 10], therapist: [0, 10], penalties: [4, 9] },
		extraReq:	function () {
					return true;
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
	analSmoothingPermanent: {
		id:	"analSmoothingPermanent",
		punType:	window.punTypes.FailToPayBodyMod,
		description:'Teachers description of what you are to do',
		text:		'Teacher forces PC to undergo analSmoothingPermanent procedure',
		passage:	'analSmoothingPermanent',
		active:		true,
		onlyOnce:	true,
		chance:		10,
		priority:	1,
		baseReq:	{ teacher: [10, 10], guardian: [0, 10], therapist: [0, 10], penalties: [6, 10] },
		extraReq:	function () {
					return (State.active.variables.body.permAnal <= 2) && (State.active.variables.body.anal >= 3);
				},
		cooldown:	1,	// Cooldown in days since last given
		start:		function () {},
		end:		function () {},
	},
}