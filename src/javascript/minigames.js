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
		if (State.active.variables.player.daringFlag.coachGameWin) {
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
		actionF: "You gently kiss the tip of her penis.",
		imagePack: "Coach Minigame Kiss It"
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
		actionF: "You lick around head of her dick, leaving no spots untouched.",
		imagePack: "Coach Minigame Lick It"
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
		actionF: "You place your lips over the head of her dick, slowly sucking it into your mouth and teasing it with your tongue.",
		imagePack: "Coach Minigame Suck It"
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
		actionF: "You take a breath before stretching your lips around the enormous dick, squeezing the half-hard penis down your throat until your lips meet her pubic hair.",
		imagePack: "Coach Minigame Deepthroat It"
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
		actionF: "You lick the entire length of her shaft, from the head to balls.",
		imagePack: "Coach Minigame Candy Lick"
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
		actionF: "You reach for Coach's swollen balls and gently massage them with your hands, giving occasional kisses.",
		imagePack: "Coach Minigame Balls"
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
		actionF: "You run your hands over Coach's half-hard cock, squeezing gently.",
		imagePack: "Coach Minigame Hand Job"
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
		actionF: "You turn around and rub her dick with your butt, sliding it between your butt cheeks.",
		imagePack: "Coach Minigame Ass Job"
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
		actionF: "You place your anus against her cock and push, trying to take it in.",
		imagePack: "Coach Minigame Cherry Pop"
	}
];

window.cheerMinigame = {
	getActionById: function(id) {
		for (var _i=0; _i < window.cheerGameList.length; _i++) {
			if (window.cheerGameList[_i].id==id) {
				return window.cheerGameList[_i];
			}
		}
		return false;
	},
	
	processAction: function(roundId, actionId) {
		var cheerGame=State.active.variables.minigames.cheerGame;
		var uniform = State.active.variables.cheerleaders.flags.slutUniform;
		var _r=this.getActionById(roundId);
		var _a=this.getActionById(actionId);
		cheerGame.failedMove = false;
		cheerGame.correct = false;
		if (roundId==actionId) {
			cheerGame.correct = true;
		}
		else {
			cheerGame.failCount++;
		}
		if (!cheerGame.ignoreModesty && uniform == 1){
			var chance = Math.random();
			if (chance >= 0.8){
				cheerGame.failedMove = true;
				cheerGame.failCount++;
				cheerGame.correct = false;
			}
		}
		cheerGame.turn++;
		cheerGame.lastActionId=actionId;
	},
	
	getRound: function(turn) {
		return window.cheerGameList[turn];
	},
	
	reset: function() {
		var cheerGame=State.active.variables.minigames.cheerGame;
		cheerGame.turn=0;
		cheerGame.failCount = 0;
		cheerGame.lastActionId=-1;
		cheerGame.ignoreModesty = false;
		cheerGame.failedMove = false;
		cheerGame.correct = false;
		cheerGame.win=false;
		cheerGame.playedToday=false;
	}	
}

window.cheerGameList=[
	{
		id: 1,
		win: false,
		success: false,
		chance: 3,
		clue: "I spotted you dancing<br />Made all the girls stare",
		option: "Two step",
		actionPass: "You step left and right, following along to the beat, feeling your skirt sway slightly from side to side. Thankfully, it’s not enough to reveal anything more than what you’re already showing off.",
		actionIgnore: "You throw yourself into the music as you step side to side with the beat. Your skirt swishes sharply along with your movement, drawing attention to your hips and the <<if $kinkAllow.diapering>>bulging of your skirt<<else>>barely-covered bulge awkwardly lifting your skirt<<endif>>.",
		actionFail: "You try to step in time along with the music, but as soon as you feel your skirt start to travel across the top of your <<if $kinkAllow.diapering>>diaper<<else>>chastity<<endif>>, you freeze in place."
	},
	{
		id: 2,
		win: false,
		success: false,
		chance: 4,
		clue: "Those lips, brown eyes,<br />And sexy hair",
		option: "Turn around and roll hips",
		actionPass: "You turn on your left heel, ending with your back to the theater seats. Your skirt floats upwards as you twirl, giving the audience a <<if $kinkAllow.diapering>>brief glimpse of your pink diaper<<else>>lovely, if brief, glimpse of the curve of your ass<<endif>>.",
		actionIgnore: "You turn on your left heel, ending your back to the theater seats. You feel your skirt fly up as you spin, giving everyone watching a brief glimpse of your <<if $kinkAllow.diapering>>diapered<<else>>naked<<endif>> ass. Then, you roll your hips in a circle, as if playing with a hula hoop. <br \><br \>The hip roll is slow and sensual, and you’re sure that if there were an audience, all eyes would be <<if $kinkAllow.diapering>>staring at your padded<<else>>ogling your near-naked<<endif>> backside.",
		actionFail: "You gingerly turn to face the back of the stage. The move is slow and out of step, and you awkwardly rush through your hip roll to try to get back on beat."
	},
	{
		id: 3,
		win: false,
		success: false,
		chance: 3,
		clue: "I should shake my thing<br />Show you I want you",
		option: "Twerk",
		actionPass: "You arch your back as point your butt behind you, rocking your hips to make your ass bounce. As you skirt flips up and down over your backside, you can hear laughter coming from the judges’ table.<br \><br \>@@.hero;At least they’re enjoying this.@@",
		actionIgnore: "You bend your knees and drop low, arching your spine and presenting your ass to anyone behind you. The stage lights warm your <<if $kinkAllow.diapering>>soft padding<<else>>bare cheeks<<endif>>, reminding you that with your back arched so sharply, your skirt offers no coverage of your ass.<br \><br \>You rock your hips up and down, making your <<if $kinkAllow.diapering>>diapered<<else>>exposed<<endif>> butt cheeks bounce, and hear giggles of delight from the judges.<br \><br \>@@.hero;I can’t believe I just showed off my ass like that…@@",
		actionFail: "You lower your hips, but keep your back straight, trying to keep your barely-there skirt from revealing every inch of your <<if $kinkAllow.diapering>>diaper<<else>>ass cheeks<<endif>>. You rock your hips in a move that looks more like awkward hip thrusting than twerking."
	},
	{
		id: 4,
		win: false,
		success: false,
		chance: 5,
		clue: "Tell your boys you’ll be back<br />I wanna see what you can do",
		option: "Turn back and beckon with finger",
		actionPass: "You spin and plant your right foot just as your skirt threatens to reveal a little too much. Swaying with the music, you stretch out your arm towards the void beyond the stage and beckon for your imaginary partner to join you.",
		actionIgnore: "You take a step down-stage with your right foot, swaying your hips sensually side-to-side and feeling your skirt slide tantalizingly along your <<if $kinkAllow.diapering>>thick diaper<<else>>plastic-covered cock<<endif>> as you crook your finger towards the inky blackness before you. The longing look on your face and your alluring posture encouraging your imaginary partner to join your sultry dance.",
		actionFail: "You slowly rotate towards the void beyond the stage, and wiggle your finger back towards yourself, unconvincingly beckoning towards a non-existent partner.<br \><br \>@@.cheerBitch;\“C’mon!\”@@ Ashley yells into the microphone. @@.cheerBitch;\“Make them want to fuck you!\”@@<br \><br \>You nervously try to be more alluring, but know it’s still a weak effort."
	},
	{
		id: 5,
		win: false,
		success: false,
		chance: 5,
		clue: "You’re a sexy guy<br />I’m a dirty girl",
		option: "Point at audience, point at self",
		actionPass: "You cock your hip to the right as you point out at the dim light of the exit sign at the back of the theater. <<if $minigames.cheerGame.turn < 9>>You hold the pose for the first lyric, before shifting your hips to the left, then place your hand over your chest, identifying yourself with the second lyric.<<else>>You hold the pose for the first few beats, before shifting your hips to the left, then place your hand over your chest for the rest of the measure.<<endif>>",
		actionIgnore: "You cock your hip to the right as you point out at the dim light of the exit sign at the back of the theater, sensing the <<if $kinkAllow.diapering>>crotch of your diaper<<else>>tip of your chastity device<<endif>> peeking out from under your skirt as you move. <<if $minigames.cheerGame.turn lt 9>>You hold the pose for the first lyric, before shifting your hips to the left, then place your hand over your chest, identifying yourself with the second lyric. Again you sense that your skirt is displaced just enough to reveal your <<if $kinkAllow.sph>>little <<endif>>secret, and you hope the girls can’t see it.<<else>>You hold the pose for the first few beats, before shifting your hips to the left, then place your hand over your chest for the rest of the measure. Again you sense that your skirt is displaced just enough to reveal your <<if $kinkAllow.sph>>little <<endif>>secret, and you hope the girls can’t see it.<<endif>>",
		actionFail: "You weakly point out towards the seats, then turn you finger back towards yourself.<br \><br \>@@.cheerLackey1;\“Really?\”@@ Heather asks into the mic, looking perturbed.<br \><br \>You tremble, knowing she’s docking you points, and wondering why you didn’t throw more confidence into such a simple move."
	},
	{
		id: 6,
		win: false,
		success: false,
		chance: 2,
		clue: "Let’s make this dance floor<br />Our own nasty world",
		option: "Body roll",
		actionPass: "You rock your shoulders back and let the body roll fall down your torso. You feel your skirt flip up as you rock your hips forward and pray that no one can see what lies underneath. The quick snicker coming from the judge’s table does little to ease your mind.",
		actionIgnore: "Your body turns to liquid as you allow the roll to move through you like a wave through water. Even though you’re focusing on the dance, you realize as your hips thrust forward that, if anyone were directly in front of you, you’d be presenting them a full view of your <<if $kinkAllow.diapering>>thickly-padded crotch<<else>>tightly-locked cock<<endif>>.<br \><br \>For a moment, you think you hear a quiet chuckle come from beyond the edge of the stage, but quickly brush it off. After all, it’s just you, Ashley, Heather, and Veronica here, right?",
		actionFail: "You start to let the roll travel down your torso, but find yourself unable to thrust your hips forward. No matter how hard you try, your body is unwilling to so blatantly present your <<if $kinkAllow.diapering>>padded crotch<<else>>locked cock<<endif>>, even if nothing but the darkness would see it."
	},
	{
		id: 7,
		win: false,
		success: false,
		chance: 1,
		clue: "I need that, uh,<br />to get me off",
		option: "Run hands down body and stick out ass",
		actionPass: "You slowly run your hands down your torso, letting out a pleased moan as you lose yourself in the sensation. When your hands reach your torso, you gyrate your hips and use the momentum to rotate until you’re facing the curtain, your ass jutting appealingly behind you.<br \><br \>You hear a wolf whistle coming from the judges table and your face turns bright red.",
		actionIgnore: "Momentarily forgetting how flimsy your uniform is, you firmly caress your <<if playerCode.haveBoobs() or $cheerleaders.flags.falsies>>breasts<<else>>chest<<endif>> with your hands and cause the straps of your top to shift unintentionally. Your <<if $cheerleaders.flags.falsies>>falsies<<else>>nipples<<endif>> pop out and are briefly exposed, and you nearly freeze in surprise. Thankfully, you hold your composure and fight to recover from your little uniform malfunction.<br \><br \>You slide your hands down your bare midriff, turning your back to the audience as your hands reach your crotch. Following it up, you push your hips back, presenting your ass and <<if $kinkAllow.diapering>>princess-covered diaper<<else>>dangling chastity<<endif>> to the void.",
		actionFail: "Your hands less caress your body and more hover over it as you’re desperate to not disturb the thin straps covering your <<if playerCode.haveBoobs() or $cheerleaders.flags.falsies>>breasts<<else>>chest<<endif>>. You quickly turn towards the curtain and arch your back just slightly, revealing just a bit more of your ass but ensuring <<if $kinkAllow.diapering>>the majority of your diaper remains covered<<else>>your boy-parts remain well-covered by your hips<<endif>>.<br \><br \>@@.cheerLackey1;\“Farther!\”@@ Heather orders. @@.cheerLackey1;\“I want to see every inch of those cheeks!\”@@<br \><br \>You hesitate.<br \><br \>@@.cheerLackey1;\“Do it!\”@@ she shouts.<br \><br \>You jump and extend your butt far behind you, feeling your skirt ride up out of view and your <<if $kinkAllow.diapering>>pink-padded butt put on full display<<else>>caged dick dangling down perversely between your legs<<endif>>."
	},
	{
		id: 8,
		win: false,
		success: false,
		chance: 4,
		clue: "Dancin’ till<br />My clothes come off",
		option: "Shake dat ass",
		actionPass: "You stretch your arms above your head and break into a rapid shimmy. Your skirt flits back and forth behind you, offering tantalizing glimpses of your <<if $kinkAllow.diapering>>diapered<<elseif playerCode.haveAss()>>jiggling<<else>>tight<<endif>> ass. The three judges laugh and applaud your efforts, but their praise only deepens your humiliation.",
		actionIgnore: "Your heart thunders in your chest. This is it. Time for your \“signature move.\” You stretch your arms over your head and shimmy your hips. Your tiny skirt jostles violently with your shaking and you feel it flip up behind you, ensuring your <<if $kinkAllow.diapering>>diapered<<elseif playerCode.haveAss()>>jiggling<<else>>tight<<endif>> ass is on full display.<br \><br \>You twist your hips even harder, but no amount of wriggling will dislodge the flap of fabric. Instead, it only serves to make your ass jiggle more enticingly.<br \><br \>Ashley is clearly pleased, misreading your desperation for enthusiasm. @@.cheerBitch;\“Woo! Shake it, baby!\”@@ she hollers over the <<if $kinkAllow.diapering>>crinkling of your diaper<<else>>music<<endif>>.<br \><br \>You blush as you finish the move and turn back towards the front, subtly fixing your skirt behind you before the \“judges\” can notice.",
		actionFail: "Your heart starts to race. Time for your \“signature move.\” You stretch your arms over your head and… freeze in panic. No matter how hard your brain wills it, your body simply will not execute the move - your terror at the risk of exposure is too great.<br \><br \>@@.cheerBitch;\“C’mon, shake dat ass!\”@@ Ashley orders, slamming her hand threateningly onto the table.<br \><br \>Your face contorts in anguish as you can’t bring yourself to debase yourself like this, even if it means lost points."
	},
	{
		id: 9,
		win: true,
		success: false,
		chance: 1,
		clue: "The vocals drop out of the song, leading into the instrumental bridge.",
		option: "Shout “S - L - U - T, That's what the boys all call me”",
		actionPass: "You snap to attention and shout your cheer, your voice amplified many times over by the microphone clipped to your top. @@.heroT;\“S – L – U – T!\”@@ you shout, clapping along to the first two letters and throwing your hands into a high-‘V’ for the last two letters. <br \><br \>With your hands still raised, you drop into a perfect cartwheel, feeling the skirt brushing up above its waistband at the apex of the move. Cool air caresses your skin just above your <<if $kinkAllow.diapering>>diaper's waistband<<else>>penis<<endif>>, and it occurs to you that, for a brief instant, you just showed off everything.<br \><br \>You continue cheering during your cartwheel. @@.heroT;\“That’s what the boys all call me!\”@@ you shout, finishing by pointing at yourself with both your thumbs on the word \“me.\”<br \><br \>The three cheerleaders are practically falling over each other in laughter, clearly reacting to your shameless display.",
		actionIgnore: "You snap to attention and shout your cheer, your voice amplified many times over by the microphone clipped to your top. @@.heroT;\“S – L – U – T!\”@@ you shout, clapping along to the first two letters and throwing your hands into a high-‘V’ for the last two letters. <br \><br \>With your hands still raised, you drop into a perfect cartwheel, feeling the skirt brushing up above its waistband at the apex of the move. Cool air caresses your skin just above your <<if $kinkAllow.diapering>>diaper's waistband<<else>>penis<<endif>>, and it occurs to you that, for a brief instant, you just showed off everything.<br \><br \>You continue cheering during your cartwheel. @@.heroT;\“That’s what the boys all call me!\”@@ you shout, finishing by pointing at yourself with both your thumbs on the word \“me.\”<br \><br \>The three cheerleaders are practically falling over each other in laughter, clearly reacting to your shameless display.",
		actionFail: "@@.heroT;\“S – l -u -t\”@@ you mutter, clapping and motioning limply along with the letters. Even at a lowered volume, your voice still echoes through the theater thanks to your microphone.<br \><br \>@@.cheerBitch;\“Louder!\”@@ Ashley shouts.<br \><br \>You slightly increase your volume. @@.heroT;\“That’s what the boys…\”@@ You tumble to the side for your cartwheel, allowing your legs to flex back in an effort to keep your skirt from flipping up. It only kind of helps. Once back upright, you point at yourself with your thumbs, finishing the lyric, @@.heroT;\“…all call me.\”@@"
	},
	{
		id: 10,
		win: true,
		success: false,
		chance: 1,
		clue: "The bridge continues.",
		option: "Chant “F - U - C - K, Please use my holes every day!”",
		actionPass: "@@.heroT;\“F – U – C – K!\”@@ you shout, alternating between pumping your arms into the air and out to your sides. Your chant booms from the theater speakers, preventing you from blocking out the sound of your voice shouting the humiliating cheer.<br \><br \>You turn and face away from the theater seats. @@.heroT;\“Please use my holes…\”@@ you cheer as your hand shakily grabs the hem of your skirt, flipping it into the air. @@.heroT;\“…every day!\”@@<br \><br \>It feels like an eternity until your skirt settles back into place, and your face glows red as the words of your cheer sear themselves into your mind.",
		actionIgnore: "@@.heroT;\“F – U – C – K!\”@@ you shout, throwing your arms alternately straight up into the air and directly out from your shoulders with each letter as your voice echoes through the theater.<br \><br \>@@.heroT;\“Please use my holes…\”@@ You spin on your heel, making a full rotation before you stop with your back towards downstage. You reach behind you and flip up the meager strip of fabric that’s supposed to serve as your skirt. @@.heroT;\“…every day!\”@@<br \><br \>The words of your cheer sear themselves into your mind, and you shiver in shame, knowing you basically just asked someone to fuck your ass.",
		actionFail: "Your voice is weak as you try to choke out the cheer. @@.heroT;\“F – u – c – k,\”@@ you chant, pumping your arms up and out according to Ashley’s orders. Of course, with the microphone amplifying your every syllable, it makes little difference how quiet you are.<br \><br \>You turn away from the theater seats. @@.heroT;\“Please use my holes…\”@@ You grab the hem of your skirt pull it up, before immediately yanking it back down. @@.heroT;\“…every day.\”@@<br \><br \>@@.cheerLackey2;\“Deduction!\”@@ Veronica announces into the microphone, and you know she was hoping to see more."
	}
];