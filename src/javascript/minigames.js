window.dreamMinigame = {
	getActionById: function(id) {
		for (var _i=0; _i < window.dreamgameList.length; _i++) {
			if (window.dreamgameList[_i].id==id) {
				return window.dreamgameList[_i];
			}
		}
		return false;
	},
	processAction: function(dreamId, actionId) {
		var dreamgame=State.active.variables.minigames.dreamgame;
		var _d=this.getActionById(dreamId);
		var _a=this.getActionById(actionId);
		if (!this.isAwake()) {
			dreamgame.win=_a.win;
		}
		if (dreamId==actionId) {
			dreamgame.alertness++;
			dreamgame.dreaminess+=2;
			dreamgame.lastActionSuccess=2;
			dreamgame.actionSuccess[actionId]=true;
		} else if (_d.dream.indexOf(actionId) >= 0) {
			dreamgame.alertness++;
			dreamgame.dreaminess++;
			dreamgame.lastActionSuccess=1;
			if (window.randomCode.getIntInclusive(1, 3) >= 2) {
				dreamgame.actionSuccess[actionId]=true;
			}
		} else {
			dreamgame.alertness+=_a.alert;
			dreamgame.lastActionSuccess=0;
			if (window.randomCode.getIntInclusive(1, 2) == 2) {
				dreamgame.actionSuccess[actionId]=true;
			}
		}
		dreamgame.turn++;
		dreamgame.lastActionId=actionId;
	},
	getRandomDream: function() {
		var dreamgame=State.active.variables.minigames.dreamgame;
		var _tc=0;
		for (var _i=0; _i < window.dreamgameList.length; _i++) {
			_tc+=window.dreamgameList[_i].chance;
		}
		var _rc=window.randomCode.getIntInclusive(1, _tc);
		for (var _i=0; _i < window.dreamgameList.length; _i++) {
			_rc-=window.dreamgameList[_i].chance;
			if (_rc <= 0) {
				if ((dreamgame.turn <= 4) && (window.dreamgameList[_i].alert > 2)) {
					return window.dreamgameList[0];
				} else if (window.dreamgameList[_i].win && (!this.canWin())) {
					return window.dreamgameList[0];
				} else {
					return window.dreamgameList[_i];
				}
			}
		}
	},
	canWin: function() {
		var dreamgame=State.active.variables.minigames.dreamgame;
		var _wa;
		for (var _i=0; _i < window.dreamgameList.length; _i++) {
			if (window.dreamgameList[_i].win) {
				_wa=window.dreamgameList[_i];
				break;
			}
		}
		return dreamgame.dreaminess - dreamgame.alertness > _wa.alert;
	},
	isAwake: function() {
		var time=State.active.variables.time;
		var dreamgame=State.active.variables.minigames.dreamgame;
		return (dreamgame.alertness >= dreamgame.dreaminess) || time.hour > time.guardian.wakeHour || (time.hour == time.guardian.wakeHour && time.minute >= time.guardian.wakeMinute);
	},
	reset: function() {
		var dreamgame=State.active.variables.minigames.dreamgame;
		dreamgame.turn=0;
		dreamgame.alertness=0;
		dreamgame.dreaminess=4;
		dreamgame.lastActionId=-1;
		dreamgame.lastActionSuccess=-1;
		dreamgame.actionSuccess=[];
		dreamgame.win=false;
		dreamgame.playedToday=false;
	}
},

window.dreamgameList=[
	{
		id: 1,
		win: false,
		success: false,
		chance: 3,
		clue: "With a short intake of breath, her mouth parts, and she licks her lips.",
		hint: "I should kiss her.",
		alert: 1,
		dream: [4],
		option: "Kiss her Lips",
		action: "You gently kiss $guardian's lips."
	},
	{
		id: 2,
		win: false,
		success: false,
		chance: 4,
		clue: "She moves her hand over her chest and rests it on the pillow.",
		hint: "I should touch her boobs.",
		alert: 1,
		dream: [3],
		option: "Touch her tits",
		action: "You run your hands over $guardian's soft tits, squeezing gently."
	},
	{
		id: 3,
		win: false,
		success: false,
		chance: 3,
		clue: "With a short intake of breath, she moves her hand over her chest.",
		hint: "It seems she want her tits sucked.",
		alert: 2,
		dream: [2],
		option: "Suck on her tits",
		action: "You place your lips over one of $guardian's nipples and suck gently, teasing her nipple with your tongue."
	},
	{
		id: 4,
		win: false,
		success: false,
		chance: 5,
		clue: "She moves her hand up her body and rests it over her head.",
		hint: "I should touch her hair.",
		alert: 1,
		dream: [1],
		option: "Stroke her hair",
		action: "You reach up and gently stroke $guardian's silky hair."
	},
	{
		id: 5,
		win: false,
		success: false,
		chance: 5,
		clue: "She bends her leg, bringing her knee upwards a little.",
		hint: "I should rub her thighs.",
		alert: 2,
		dream: [6],
		option: "Rub her thighs",
		action: "You run your hand slowly up and down $guardian's smooth thighs."
	},
	{
		id: 6,
		win: false,
		success: false,
		chance: 2,
		clue: "Her breathing quickens slightly, and she turns her head into the pillow.",
		hint: "I should rub her pussy.",
		alert: 2,
		dream: [5, 7],
		option: "Touch her pussy",
		action: "You reach between $guardian's slightly parted legs and give her pussy the slightest of touches."
	},
	{
		id: 7,
		win: false,
		success: false,
		chance: 1,
		clue: "Her breathing quickens, and she brings her knee upwards a little.",
		hint: "I could finger her pussy.",
		alert: 4,
		dream: [5, 6],
		option: "Finger her pussy",
		action: "You place your finger between $guardian's legs, right where you imagine her pussy to be and push gently into her."
	},
	{
		id: 8,
		win: false,
		success: false,
		chance: 4,
		clue: "She brings her knee upwards a little and turns her head into the pillow.",
		hint: "I should touch her butt.",
		alert: 1,
		dream: [5],
		option: "Touch her ass",
		action: "You run your hand lightly over $guardian's smooth soft ass."
	},
	{
		id: 9,
		win: true,
		success: false,
		chance: 1,
		clue: "She turns her head into the pillow, breathing gently.",
		hint: "Time to finger her horny ass.",
		alert: 7,
		dream: [8],
		option: "Finger her ass",
		action: "You place your hand lightly on $guardian's ass. With one finger, you push slowly between her cheeks until your reach her anus."
	}
];

window.coachMinigame = {
	getCActionById: function(id) {
		for (var _i=0; _i < window.coachgameList.length; _i++) {
			if (window.coachgameList[_i].id==id) {
				return window.coachgameList[_i];
			}
		}
		return false;
	},
	processAction: function(coachId, actionId) {
		var coachgame=State.active.variables.minigames.coachgame;
		var _d=this.getCActionById(coachId);
		var _a=this.getCActionById(actionId);
		if (!this.isCame()) {
			coachgame.win=_a.win;
		}
		if (coachId==actionId) {
			coachgame.alertness++;
			coachgame.coachiness+=2;
			coachgame.lastActionSuccess=2;
			coachgame.actionSuccess[actionId]=true;
		} else if (_d.coach.indexOf(actionId) >= 0) {
			coachgame.alertness++;
			coachgame.coachiness++;
			coachgame.lastActionSuccess=1;
		} else {
			coachgame.alertness+=_a.alert;
			coachgame.lastActionSuccess=0;
		}
		coachgame.turn++;
		coachgame.lastActionId=actionId;
	},
	getRandomCoach: function() {
		var coachgame=State.active.variables.minigames.coachgame;
		var _tc=0;
		for (var _i=0; _i < window.coachgameList.length; _i++) {
			_tc+=window.coachgameList[_i].chance;
		}
		var _rc=window.randomCode.getIntInclusive(1, _tc);
		for (var _i=0; _i < window.coachgameList.length; _i++) {
			if (window.coachgameList[_i].win && (this.canWin()) && (window.randomCode.getIntInclusive(1, 2) == 1)) {
				return window.coachgameList[_i];
			}
		}
		for (var _i=0; _i < window.coachgameList.length; _i++) {
			_rc-=window.coachgameList[_i].chance;
			if (_rc <= 0) {
				if ((coachgame.turn <= 3) && (window.coachgameList[_i].alert > 2)) {
					return window.coachgameList[0];
				} else if (window.coachgameList[_i].win && (!this.canWin())) {
					return window.coachgameList[_i-1];
				} else if ((_i > 0) && (window.coachgameList[_i].id == coachgame.lastActionId)) {
					return window.coachgameList[_i-1];
				} else {
					return window.coachgameList[_i];
				}
			}
		}
	},
	canWin: function() {
		var coachgame=State.active.variables.minigames.coachgame;
		var _wa;
		for (var _i=0; _i < window.coachgameList.length; _i++) {
			if (window.coachgameList[_i].win) {
				_wa=window.coachgameList[_i];
				break;
			}
		}
		return ((coachgame.coachiness - coachgame.alertness > _wa.alert) && (State.active.variables.player.perversion.coach >= 3));
	},
	halfWin: function() {
		var coachgame=State.active.variables.minigames.coachgame;
		return ((coachgame.coachiness - coachgame.alertness) > 4);
	},
	isCame: function() {
		var coachgame=State.active.variables.minigames.coachgame;
		return (coachgame.alertness >= coachgame.coachiness) || (coachgame.turn > 10);
	},
	reset: function() {
		var coachgame=State.active.variables.minigames.coachgame;
		coachgame.turn=0;
		coachgame.alertness=0;
		coachgame.coachiness=4;
		coachgame.lastActionId=-1;
		coachgame.lastActionSuccess=-1;
		coachgame.actionSuccess=[];
		coachgame.win=false;
		coachgame.playedToday=false;
		if (State.active.variables.events.coachGameWin) {
			coachgame.coachiness=8;
		}
	}
}

window.coachgameList=[
	{
		id: 1,
		win: false,
		success: false,
		chance: 1,
		alert: 2,
		coach: [4],
		clue: "The head of Coach's half-hard penis pulses and oozes with precum.",
		hint: "Kiss it, sissy, show my cockhead you love and respect it.",
		extrahint: "I should kiss the tip.",
		option: "Kiss the tip of his penis",
		action: "You gently kiss the tip of his penis.",
		clueF: "The head of Coach's half-hard penis pulses and oozes with precum.",
		hintF: "Kiss it, sissy, show my cockhead you love and respect it.",
		extrahintF: "I should kiss the tip.",
		optionF: "Kiss the tip of her penis",
		actionF: "You gently kiss the tip of her penis."
	},
	{
		id: 2,
		win: false,
		success: false,
		chance: 4,
		alert: 1,
		coach: [3],
		clue: "Coach's half-hard penis twitches and perks up a bit.",
		hint: "Lick around the head, slut, clean it up.",
		extrahint: "I should lick around the head.",
		option: "Lick around the head of his dick",
		action: "You lick around head of his dick, leaving no spots untouched.",
		clueF: "Coach's half-hard penis twitches and perks up a bit.",
		hintF: "Lick around the head, slut, clean it up.",
		extrahintF: "I should lick around the head.",
		optionF: "Lick around the head of her dick",
		actionF: "You lick around head of her dick, leaving no spots untouched."
	},
	{
		id: 3,
		win: false,
		success: false,
		chance: 3,
		alert: 2,
		coach: [2],
		clue: "With a short intake of breath, Coach opens his eyes as his penis drips precum.",
		hint: "Suck it, faggot, but suck it softly.",
		extrahint: "I should suck it softly.",
		option: "Take the head in your mouth and suck softly",
		action: "You place your lips over the head of his dick, slowly sucking it into your mouth and teasing it with your tongue.",
		clueF: "With a short intake of breath, Coach opens her eyes as her penis drips precum.",
		hintF: "Suck it, faggot, but suck it softly.",
		extrahintF: "I should suck it softly.",
		optionF: "Take the head in your mouth and suck softly",
		actionF: "You place your lips over the head of her dick, slowly sucking it into your mouth and teasing it with your tongue."
	},
	{
		id: 4,
		win: false,
		success: false,
		chance: 5,
		alert: 1,
		coach: [1],
		clue: "Coach winces as his dick softens a bit.",
		hint: "Deepthroat it, cocksucker, as far as you can.",
		extrahint: "I should deepthroat it.",
		option: "Suck him down as deep as you can",
		action: "You take a breath before stretching your lips around the enormous dick, squeezing the half-hard penis down your throat until your lips meet his pubic hair.",
		clueF: "Coach winces as her dick softens a bit.",
		hintF: "Deepthroat it, cocksucker, as far as you can.",
		extrahintF: "I should deepthroat it.",
		optionF: "Suck her down as deep as you can",
		actionF: "You take a breath before stretching your lips around the enormous dick, squeezing the half-hard penis down your throat until your lips meet her pubic hair."
	},
	{
		id: 5,
		win: false,
		success: false,
		chance: 5,
		alert: 2,
		coach: [6],
		clue: "Coach's half-hard penis twitches, swaying from side to side.",
		hint: "Lick it like candy, sissy, the whole thing, balls too.",
		extrahint: "I should lick the whole length of his penis and his balls.",
		option: "Lick the length of his penis and his balls",
		action: "You lick the entire length of his shaft, from the head to balls.",
		clueF: "Coach's half-hard penis twitches, swaying from side to side.",
		hintF: "Lick it like candy, sissy, the whole thing, balls too.",
		extrahintF: "I should lick the whole length of her penis and her balls.",
		optionF: "Lick the length of her penis and her balls",
		actionF: "You lick the entire length of her shaft, from the head to balls."
	},
	{
		id: 6,
		win: false,
		success: false,
		chance: 2,
		alert: 2,
		coach: [5, 7],
		clue: "Coach winces, his cock twitching as it stops leaking precum.",
		hint: "Play with my balls sissy.",
		extrahint: "I should massage his balls.",
		option: "Massage his big balls",
		action: "You reach for Coach's swollen balls and gently massage them with your hands, giving occasional kisses.",
		clueF: "Coach winces, her cock twitching as it stops leaking precum.",
		hintF: "Play with my balls sissy.",
		extrahintF: "I should massage her balls.",
		optionF: "Massage her big balls",
		actionF: "You reach for Coach's swollen balls and gently massage them with your hands, giving occasional kisses."
	},
	{
		id: 7,
		win: false,
		success: false,
		chance: 1,
		alert: 3,
		coach: [5, 6],
		clue: "His breathing quickens and his dick pulses rapidly.",
		hint: "Use your hands faggot, touch it, like you wish you could touch yours.",
		extrahint: "I should gently rub it.",
		option: "Rub his shaft with your hands",
		action: "You run your hands over Coach's half-hard cock, squeezing gently.",
		clueF: "Her breathing quickens and her dick pulses rapidly.",
		hintF: "Use your hands faggot, touch it, like you wish you could touch yours.",
		extrahintF: "I should gently rub it.",
		optionF: "Rub her shaft with your hands",
		actionF: "You run your hands over Coach's half-hard cock, squeezing gently."
	},
	{
		id: 8,
		win: false,
		success: false,
		chance: 4,
		alert: 1,
		coach: [5],
		clue: "Coach smirks, watching you squirm before him.",
		hint: "Get your pansy-ass over here and rub my cock with it.",
		extrahint: "I should rub it with my ass.",
		option: "Turn around and rub his dick between your butt cheeks",
		action: "You turn around and rub his dick with your butt, sliding it between your butt cheeks.",
		clueF: "Coach smirks, watching you squirm before her.",
		hintF: "Get your pansy-ass over here and rub my cock with it.",
		extrahintF: "I should rub it with my ass.",
		optionF: "Turn around and rub her dick between your butt cheeks",
		actionF: "You turn around and rub her dick with your butt, sliding it between your butt cheeks."
	},
	{
		id: 9,
		win: true,
		success: false,
		chance: 1,
		alert: 9,
		coach: [8],
		clue: "His cock perks up, looking hard and ready.",
		hint: "Time to pop your cherry.",
		extrahint: "Now he is ready to fuck me, time to present my anus to him.",
		option: "Place your anus against his dick and push",
		action: "You place your anus against his cock and push, trying to take it in.",
		clueF: "Her cock perks up, looking hard and ready.",
		hintF: "Time to pop your cherry.",
		extrahintF: "Now she is ready to fuck me, time to present my anus to her.",
		optionF: "Place your anus against her dick and push",
		actionF: "You place your anus against her cock and push, trying to take it in."
	}
];