window.therapyArrivals= [
	{
		text: "You make it to the therapist's office a few minutes early and wait in the foyer for your session time.",
		chance: 10,
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 0},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return true;
		}
	},
	{
		text: "You make it to $therapist's office a few minutes early and wait in the foyer for your session time.",
		chance: 10,
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 1, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return true;
		}
	},
	{
		text: "You're running a little late and $therapist is waiting for you when you arrive.",
		chance: 10,
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 1, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return true;
		}
	},
	{
		text: "You arrive right on time at $therapist's office, but she's running a bit late with her current patient.  After a few minutes of waiting, she finally calls you in.",
		chance: 10,
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 1, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return true;
		}
	}
];

window.therapySessions=[
	{	//Introduction , first scene
		text: "You don't have to wait long, and as she shows out her previous patient, she welcomes you in with a smile.  Her office is softly lit, with expensive furniture and the traditional comfortable couch.\n\nWith a gesture toward the couch, she says, @@.therapist;\"Hello $player.name, I'm $therapist, and I'm glad you could make it. Please make yourself comfy and relax. There's some water there if you need some, and I have fresh cookies if you're feeling hungry.\"@@\n\nYou are, and the cookie is chocolate and perfect. You sit on the couch and enjoy it while she waits patiently. As you look around the room, you spot a PSBox console sitting in her TV cabinet, and she notices you glancing at it.\n\n\@@.therapist;\"Call of Honor is my favorite when I have a spare session slot. Do you play?\"@@\n\nHell yeah, you do! You spend a few minutes discussing tactics and favorite maps. She seems awesome.\n\n@@.therapist;\"You're here because $guardian was worried about your behavior at home. Would you like to tell me about that?\"@@\n\nYou want to trust $therapist, but talking about it is embarrassing, so you explain it was just a misunderstanding, and awkwardly try to switch topics. She nods and says she believes you. She also says you can discuss anything with her if and when you are ready to talk. She hints that she's studied a lot of unique relationships, and would be glad to help with friendly advice and give you some pointers.\n\nThe hour whizzes by in no time, and you're left feeling confident that $therapist will play a big role in helping you mature. You give her a hug that she returns with equal sentiment, and leave with your head high.",
		hasPassage: false,
		chance: 10,
		priority: 10,
		forceHypno: false,
		kinkHypno: false,
		allowTalks: false,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 0},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return false;
		},
		check: function() {
			return true;
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapist=1;
		},
		finishHypno: function() {}
	},
	{	//Introduction , second scene
		text: "$therapist calls you in, and she can tell straight away that something new is troubling you.  With a little prodding, you tell her how <<if $flags.playerChoseChastity>>your teacher's \"private tutoring\" is going much farther than you originally wanted to submit yourself to<<else>>your teacher $teacher is blackmailing you<<endif>>. $therapist is initially shocked, and talks about exposing her to the principal, but once you tell her about the damning choices you made at school, she sees your predicament.\n\n@@.therapist;\"I've got an idea that may buy you some time. Money is your problem right now, and if you pay her off, it will give you some time to figure out how to handle her. Who knows? She may get tired of the whole thing or come to her senses.\"@@\n\n$therapist is thoughtful for a few moments while you look to her for help.\n\n@@.therapist;\"I'm running a hypnosis research project that pays decent money to volunteers.  You're a little on the young side to participate, but I should be able to wrangle things for you. If you agree, I'll conduct the research during our sessions, and just refund the money $guardian is paying me straight to you. That's $<<print rewardMoney.hypnosis>> a session, if you're interested.\"@@\n\nHell yeah! Easy money! You agree quickly.\n\n@@.therapist;\"Great! Well, today's session is over, so we'll get into that next time. But before you leave, I need you to fill a short survey for the initial information for my research. Some of questions there might appear strange, but it is really necessary, so, please, don't overthink it and answer honestly.\"@@",
		hasPassage: true,
		passage: "TherapistSurvey",
		chance: 10,
		priority: 10,
		forceHypno: false,
		kinkHypno: false,
		allowTalks: false,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 1, max: 1},
			teacher: {min: 1, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return false;
		},
		check: function() {
			return true;
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapist=2;
		},
		finishHypno: function() {}
	},
	{	//Introduction , third scene, first hypno
		text: "@@.therapist;\"Come in, $player.name,\"@@ she says warmly. @@.therapist;\"Thank you for being a part of my hypnosis therapy research.\"\n\n\"I can't tell you what we're testing for, as that would compromise your results. What I can tell you is that you'll be subjected to various imagery and subliminal suggestions, and I'll be here keeping a close eye on you to assess how they affect you.\"\n\n\"There's nothing to worry about, we've already had hundreds of volunteers participate with no ill effects.\"@@\n\nThat's good enough for you, and you sit in front of the wall-mounted big screen television to begin watching. $therapist turns off the lights and presses a button on the remote.",
		hasPassage: false,
		chance: 10,
		priority: 10,
		forceHypno: true,
		kinkHypno: false,
		allowTalks: false,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 2, max: 2},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return true;
		},
		check: function() {
			return true;
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapist=3;
		},
		finishHypno: function() {
			State.active.variables.player.perversion.therapistCooldown=1;
		}
	},
	{	//Introduction , start of routine, choice to continue or stop hypno
		text: "Concerned about the effects from your last visit, you ask if this therapy could cause something like that?\n\n@@.therapist;\"Hmm, it seems you may have a very low resistance to this kind of therapy, which is interesting. Don't worry - if you experience any side effects, they should be temporary. The first session was a probe, so to speak, meant to gauge your reaction so I can calibrate the therapy to suit you. If you choose to continue in future sessions, you shouldn't have those side effects, and we'll instead focus on helping you feel more relaxed, and making it easier to deal with the stress in your life.\"@@\n\n<<if $kinkAllow.mindControl>>@@.therapist;\"I've looked at your survey and initial readings, and research protocol states that you are required to complete a hypnotherapy session whenever you visit my office. The study sponsors have also recommended that I allow you to participate in supplementary research projects. Most of these courses are one-time trials, but the pay if we include them is much bigger - $<<print rewardMoney.specialHypnosis>> each.@@<<else>>@@.therapist;\"You can stop the course if you're still concerned about side effects, but I've found several sponsors for short term, supplementary research projects, if you're interested.\"@@\n\n@@.therapist;\"Concerning the supplementary research sessions - you can also stop those at any time during the course if you feel uncomfortable, and it will not affect the basic participation pay in any way. Most of these courses are one-time trials, but the pay if we include them is much bigger - $<<print rewardMoney.specialHypnosis>> each.\"@@<<endif>>\n\nWell, that last session definitely felt weird. You are honestly scared by how the hypnotherapy affected you, but <<if $kinkAllow.mindControl>>it seems like, so long as you are visting $therapist, you have little choice in the matter.<<else>>you take a moment to think about it. Maybe it could make dealing with $teacher's demands easier?<<endif>>",
		hasPassage: false,
		chance: 10,
		priority: 10,
		forceHypno: false,
		kinkHypno: true,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 3, max: 3},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return true;
		},
		check: function() {
			return (State.active.variables.player.perversion.therapistCooldown <= 2);
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapistCooldown=3;
		},
		finishHypno: function() {
			window.misc.unpostponeClothes();
			State.active.variables.player.perversion.therapistCooldown++;
			if (State.active.variables.player.perversion.therapistCooldown > 5) {
				State.active.variables.player.perversion.therapistCooldown=0;
				State.active.variables.player.perversion.therapist=4;
			}
		}
	},
	{	//Talking about Friend
		text: "You mention that the stress of performing for $teacher is starting to get to you, and you're finding it hard to relax at nights. $therapist is thoughtful for a moment. @@.therapist;\"Something that has worked wonderfully for another client of mine are regular massages. Not only does he find the massages pleasurable, but he experiences total relaxation for the next couple of days.\"@@ Sounds nice.\n\n@@.therapist;\"I think he pays around $300 an hour to have one of the girls at the brothel take care of him... That might explain why he enjoys them so much.\"@@ She laughs. @@.therapist;\"That's no good for you though. We're trying to //save// you money.\"@@\n\n$therapist taps her fingers on her knee while she thinks. @@.therapist;\"Perhaps you know someone who could give you a massage for free? $Guardian, or a friend?\"@@ You think about whether $guardian would do that for you, but decide that based on the way things are going between the two of you, she wouldn't. $friend though... $friendG.he_she might be up for it.\n\nYou tell $therapist about $friend. She smiles brightly.\n\n @@.therapist;\"Oh, that sounds perfect! If $friend is generous enough to do that for you, I think it might really help you cope with your stress.\"@@\n\n You smile at each other.  You feel better already.",
		hasPassage: false,
		chance: 10,
		priority: 5,
		forceHypno: false,
		kinkHypno: true,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 2, max: 100},
			teacher: {min: 3, max: 100},
			friend: {min: 100, max: 100}
		},
		allowHypno: function() {
			return false;
		},
		check: function() {
			return true;
		},
		finishSession: function() {
			State.active.variables.player.perversion.friend=5;
		},
		finishHypno: function() {}
	},
	{	//Talking about Friend - massage oils
		text: "You tell $therapist how much the massages with $friend are relaxing you and helping you sleep at night. She beams at you and says, @@.therapist;\"Oh that's wonderful $player.name! It's so nice to know I've been able to help you. And I think it's so nice that you've been able to return $friendG.his_her generosity.\"@@\n\nShe's thoughtful for a moment.\n\n@@.therapist;\"Massaging someone is quite an intimate act. How are you coping with that aspect?\"@@ You confess that your relationship has become somewhat intimate, what with rubbing the oils in, seeing $friend naked from behind, and even seeing $friendG.him_her wearing your old butt-plug! @@.hero;Oops...@@\n\n$therapist simply nods.\n\n@@.therapist;\"Intimacy is very important to someone at your age, and I think exploring ways to increase that intimacy will lead you to greater happiness,\"@@ she says, smiling at you. @@.therapist;\"You and $friend enjoy playing games together, and I recommend making those games a bit more intimate as well. For example, you both wear butt-plugs from time to time it seems, so maybe think of a game you could play involving them?\"@@",
		hasPassage: false,
		chance: 10,
		priority: 5,
		forceHypno: false,
		kinkHypno: true,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 2, max: 100},
			teacher: {min: 3, max: 100},
			friend: {min: 100, max: 100}
		},
		allowHypno: function() {
			return false;
		},
		check: function() {
			return true;
		},
		finishSession: function() {
			State.active.variables.player.perversion.friend=10;
			State.active.variables.items.remotePlugs.disabled=false;
			State.active.variables.items.remotePlugs.cost=100;
		},
		finishHypno: function() {}
	},
	// Following sessions are essentially null-content sessions that may allow for further hypno, but contain no unique therapist content
	{	//Routine, until Teacher route start
		text: "$therapist calls you in, and the two of you pick up from where you left the previous session.  It's wonderful to talk openly with someone you trust so completely.\n\nThe hour whizzes by in no time, and the session finishes with one of the nice hugs that you're now looking forward to.",
		hasPassage: false,
		chance: 10,
		priority: 0,
		forceHypno: false,
		kinkHypno: false,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 1, max: 1},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return false;
		},
		check: function() {
			return true;
		},
		finishSession: function() {},
		finishHypno: function() {}
	},
	{	//Routine for perversion 3 (mind_0)
		text: "$therapist calls you in, and the two of you pick up where you left off in the previous session.  It's wonderful to talk openly with someone you trust so completely.\n\nAfter a while, you feel like you've discussed everything that's been going on recently, and $therapist looks at her watch. @@.therapist;\"Well, we still have some time left if you'd like to have a hypnosis session?\"@@\n\nYou're hesitant about it, and a little scared by how it affected you last time. What if you start enjoying what's happening to you?",
		hasPassage: false,
		chance: 10,
		priority: 1,
		forceHypno: false,
		kinkHypno: true,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 3, max: 3},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return true;
		},
		check: function() {
			return true;
		},
		finishSession: function() {},
		finishHypno: function() {
			window.misc.unpostponeClothes();
			State.active.variables.player.perversion.therapistCooldown++;
			if (State.active.variables.player.perversion.therapistCooldown > 5) {
				State.active.variables.player.perversion.therapistCooldown=0;
				State.active.variables.player.perversion.therapist=4;
			}
		}
	},
	{	//Routine for perversion 4 (mind_1) - first scene
		text: "$therapist calls you in, and the two of you pick up from where you'd finished in the previous session. It's wonderful to talk openly with someone you trust so completely.\n\nAfter a while, you feel like you've discussed everything that's been going on recently, and $therapist looks at her watch. @@.therapist;\"Well, we still have some time left if you'd like to have another hypnosis session?\"@@\n\nYou definitely feel more at ease with all that is happening - sometimes you're even curious about what this new part of your life will bring next. But you're not sure if you should go further with these hypnotherapy sessions. What if you become too accepting? What if you start to enjoy it?",
		hasPassage: false,
		chance: 10,
		priority: 2,
		forceHypno: false,
		kinkHypno: true,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 4, max: 4},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return true;
		},
		check: function() {
			return State.active.variables.player.perversion.therapistCooldown == 0;
		},
		finishSession: function() {},
		finishHypno: function() {
			State.active.variables.player.perversion.therapistCooldown++;
		}
	},
	{	//Routine for perversion 4 (mind_1)
		text: "$therapist calls you in, and the two of you pick up from where you ended your last session.  It's wonderful to talk openly with someone you trust so completely.\n\nAfter a while you feel you've discussed everything going on recently, and $therapist looks at her watch. @@.therapist;\"Well, we still have some time left if you'd like to have another hypnosis session?\"@@\n\nYou're still not sure if you should go further with these hypnotherapy sessions.",
		text: "",
		hasPassage: false,
		chance: 10,
		priority: 1,
		forceHypno: false,
		kinkHypno: true,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 4, max: 4},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return true;
		},
		check: function() {
			return true;
		},
		finishSession: function() {},
		finishHypno: function() {
			State.active.variables.player.perversion.therapistCooldown++;
			if (State.active.variables.player.perversion.therapistCooldown > 4) {
				State.active.variables.player.perversion.therapistCooldown=0;
				State.active.variables.player.perversion.therapist=5;
			}
		}
	},
	{	//Routine for perversion 5 (mind_2)
		text: "$therapist calls you in, and the two of you pick up from where you left off in the previous session.  It's wonderful to talk openly with someone you trust so completely.\n\nAfter a while you feel you've covered everything that's been going on recently, and $therapist looks at her watch. @@.therapist;\"Well, we still have some time left. Are you ready for another hypnosis session?\"@@\n\nYes. Yes, you are.",
		hasPassage: false,
		chance: 10,
		priority: 0,
		forceHypno: true,
		kinkHypno: true,
		allowTalks: true,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 5, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		allowHypno: function() {
			return true;
		},
		check: function() {
			return true;
		},
		finishSession: function() {},
		finishHypno: function() {
			State.active.variables.player.perversion.therapistCooldown++;
		}
	}
];

window.therapistTalks={
	talkStealing: {
		id: "talkStealing",
		name: "Talk about the bedroom incident",
		passage: "talkStealing",
		time: 10,
		start: true,
		check: function() {
			return [0,1,2,3].includes(State.active.variables.player.perversion.guardian) && (State.active.variables.flags.guardianSnoopingCaught);
		}
	},
	talkUnderwear: {
		id: "talkUnderwear",
		name: "Talk about girly underwear",
		passage: "talkUnderwear",
		time: 10,
		start: false,
		check: function() {
			return [0,1,2,3].includes(State.active.variables.player.perversion.teacher);
		}
	},
	talkNightwear: {
		id: "talkNightwear",
		name: "Talk about sleeping in female lingerie",
		passage: "talkNightwear",
		time: 20,
		start: false,
		check: function() {
			return [3].includes(State.active.variables.player.perversion.guardian);
		}
	},
	talkClinicWork: {
		id: "talkClinicWork",
		name: "Talk about being caught wearing a dress at the clinic",
		passage: "talkClinicWork",
		time: 20,
		start: true,
		check: function() {
			return [3].includes(State.active.variables.player.perversion.guardian) && State.active.variables.flags.talkClinicWork;
		}
	},
	talkChastity: {
		id: "talkChastity",
		name: "Talk about chastity cage",
		passage: "talkChastity",
		time: 20,
		start: false,
		check: function() {
			return !State.active.variables.flags.chastityKey;
		}
	},
	talkButtplug: {
		id: "talkButtplug",
		name: "Talk about butt-plug",
		passage: "talkButtplug",
		time: 10,
		start: false,
		check: function() {
			return [2,3,4,5].includes(State.active.variables.player.perversion.teacher) && (State.active.variables.therapistTalks.talkChastity.finished || State.active.variables.therapistTalks.talkChastityKey.finished);
		}
	},
	talkChastityKey: {
		id: "talkChastityKey",
		name: "Talk about giving up chastity key",
		passage: "talkChastityKey",
		time: 30,
		start: true,
		check: function() {
			return State.active.variables.flags.chastityKey;
		}
	},
	talkChastitySleep: {
		id: "talkChastitySleep",
		name: "Talk about troubles with sleep",
		passage: "talkChastitySleep",
		time: 10,
		start: false,
		check: function() {
			return [0,1,2,3,4].includes(State.active.variables.player.perversion.guardian) && State.active.variables.therapistTalks.talkChastityKey.finished && (!State.active.variables.therapistTalks.talkVibratorCaught.finished);
		}
	},
	talkCrossdressing: {
		id: "talkCrossdressing",
		name: "Talk about going out dressed as a girl",
		passage: "talkCrossdressing",
		time: 20,
		start: false,
		check: function() {
			return true;
		}
	},
	talkVibrator: {
		id: "talkVibrator",
		name: "Talk about masturbating with vibrator",
		passage: "talkVibrator",
		time: 30,
		start: false,
		check: function() {
			return [0,1,2,3,4,5].includes(State.active.variables.player.perversion.guardian) && (!State.active.variables.therapistTalks.talkVibratorCaught.finished);
		}
	},
	talkVibratorCaught: {
		id: "talkVibratorCaught",
		name: "Talk about being caught with vibrator",
		passage: "talkVibratorCaught",
		time: 30,
		start: true,
		check: function() {
			return [4,5].includes(State.active.variables.player.perversion.guardian) && State.active.variables.flags.vibratorCaught;
		}
	},
	talkUpload: {
		id: "talkUpload",
		name: "Talk about uploading a video",
		passage: "talkUpload",
		time: 20,
		start: true,
		check: function() {
			return [4,5,6].includes(State.active.variables.player.perversion.guardian) && (State.active.variables.player.perversion.upload > 0) && (!State.active.variables.therapistTalks.talkUploadCaught.finished);
		}
	},
	talkUploadCaught: {
		id: "talkUploadCaught",
		name: "Talk about your video being discovered",
		passage: "talkUploadCaught",
		time: 30,
		start: true,
		check: function() {
			return [5,6].includes(State.active.variables.player.perversion.guardian) && State.active.variables.flags.uploadCaught && (!State.active.variables.therapistTalks.talkMaid.finished);
		}
	},
	talkMaid: {
		id: "talkMaid",
		name: "Talk about becoming a maid",
		passage: "talkMaid",
		time: 30,
		start: true,
		check: function() {
			return [5,6].includes(State.active.variables.player.perversion.guardian);
		}
	},
	talkFuta: {
		id: "talkFuta",
		name: "Talk about shemales",
		passage: "talkFuta",
		time: 60,
		start: true,
		check: function() {
			return State.active.variables.kink.futa && (State.active.variables.player.perversion.assistant >= 6 || State.active.variables.player.perversion.teacher >= 7);
		}
	},
	talkPenisShrinking: {
		id: "talkPenisShrinking",
		name: "Talk about chastity being too tight",
		passage: "talkPenisShrinking",
		time: 20,
		start: true,
		check: function() {
			return State.active.variables.kink.penisShrink && State.active.variables.therapistTalks.talkChastityKey.finished;
		}
	},
	talkPenisShrinkingEnd: {
		id: "talkPenisShrinkingEnd",
		name: "Talk about your penis diminished size",
		passage: "talkPenisShrinkingEnd",
		time: 20,
		start: false,
		check: function() {
			return State.active.variables.kinkAllow.penisShrink;
		}
	}
},


window.kinks= [
	{
		name: "Semen consumption",
		code: "Protein Diet Enrichment",
		image: "hypno_cum.gif",
		imagePack: "Hypno Cum",
		fadeOut: [
			"Cum",
			", why are you thinking about cum?",
			", cum is gross..."
		],
		fadeIn: [
			"Cum is good",
			", cum is tasty",
			", I love cum"
		],
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		priority: 5,
		check: function() {
			return State.active.variables.kinkAllow.semenConsumption && !State.active.variables.kink.semenConsumptionStarted;
		},
		start: function() {
			State.active.variables.kink.semenConsumption=true;
			State.active.variables.kink.semenConsumptionStarted=true;
			if ( State.active.variables.kinkAllow.creampie ) { State.active.variables.kink.creampie = true; }
			if ( State.active.variables.kinkAllow.bukkake ) { State.active.variables.kink.bukkake = true; }
			if ( State.active.variables.kinkAllow.cumEating ) { State.active.variables.kink.cumEating = true; }
			if ( State.active.variables.kinkAllow.ownCum ) { State.active.variables.kink.ownCum = true; }
			if ( State.active.variables.kinkAllow.cumSwap ) { State.active.variables.kink.cumSwap = true; }
			State.active.variables.dreams.CumCake.active=true;
		},
		stop: function() {
			State.active.variables.kinkAllow.semenConsumption = false;
			State.active.variables.kink.semenConsumption = false;
			State.active.variables.kink.creampie = false;
			State.active.variables.kink.bukkake = false;
			State.active.variables.kink.cumEating = false;
			State.active.variables.kink.ownCum = false;
			State.active.variables.kink.cumSwap = false;
			State.active.variables.kinkAllow.semenConsumption = false;
			State.active.variables.kinkAllow.creampie = false;
			State.active.variables.kinkAllow.bukkake = false;
			State.active.variables.kinkAllow.cumEating = false;
			State.active.variables.kinkAllow.ownCum = false;
			State.active.variables.kinkAllow.cumSwap = false;
			State.active.variables.dreams.CumCake.active=false; 
		}
	},
	{
		name: "Watersports",
		code: "Bodily Emissions Management",
		image: "hypno_piss.gif",
		imagePack: "Hypno Piss",
		fadeOut: [
			"Huh",
			", why are you thinking about urine",
			", urine is gross..."
		],
		fadeIn: [
			"Piss is so refreshing",
			", piss is so tasty",
			", I love to drink piss"
		],
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		priority: 5,
		check: function() {
			return State.active.variables.kinkAllow.watersports && !State.active.variables.kink.watersports && !State.active.variables.kink.watersportsStarted;
		},
		start: function() {
			State.active.variables.kink.watersports = true;
			State.active.variables.kink.watersportsStarted = true;
			if ( State.active.variables.kinkAllow.wetting ) { State.active.variables.kink.wetting = true; }
			if ( State.active.variables.kinkAllow.urineDrink ) { State.active.variables.kink.urineDrink = true; }
			if ( State.active.variables.kinkAllow.urinePlay ) { State.active.variables.kink.urinePlay = true; }
			State.active.variables.dreams.PissHypno.active=true;
		},
		stop: function() {
			State.active.variables.kinkAllow.watersports = false;
			State.active.variables.kink.watersports = false;
			State.active.variables.kink.wetting = false;
			State.active.variables.kink.urineDrink = false;
			State.active.variables.kink.urinePlay = false;
			State.active.variables.kinkAllow.watersports = false;
			State.active.variables.kinkAllow.wetting = false;
			State.active.variables.kinkAllow.urineDrink = false;
			State.active.variables.kinkAllow.urinePlay = false;
			State.active.variables.dreams.PissHypno.active=false;
		}
	},
	{
		name: "Small penis",
		code: "Sexual Prowess Hypotherapy",
		image: "hypno_sph.gif",
		imagePack: "Hypno SPH",
		fadeOut: [
			"Wait a second",
			", why am I thinking about small penises",
			", small penises are bad..."
		],
		fadeIn: [
			"A small penis is not so bad",
			", small penises are cute",
			", I would love to have a smaller penis"
		],
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		priority: 5,
		check: function() {
			return State.active.variables.kinkAllow.smallPenis && !State.active.variables.kink.smallPenis && !State.active.variables.kink.smallPenisStarted;
		},
		start: function() {
			State.active.variables.kink.smallPenis = true;
			State.active.variables.kink.smallPenisStarted = true;
			if ( State.active.variables.kinkAllow.penisShrink ) { State.active.variables.kink.penisShrink = true; }
			if ( State.active.variables.kinkAllow.sph ) { State.active.variables.kink.sph = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.smallPenis = false;
			State.active.variables.kink.smallPenis = false;
			State.active.variables.kink.penisShrink = false;
			State.active.variables.kink.sph = false;
			State.active.variables.kinkAllow.smallPenis = false;
			State.active.variables.kinkAllow.penisShrink = false;
			State.active.variables.kinkAllow.sph = false;
		}
	},
	{
		name: "BDSM",
		code: "Relationship Role Definition",
		image: "hypno_maso.gif",
		imagePack: "Hypno Maso",
		fadeOut: [
			"Wait a second",
			", why are you thinking about being spanked",
			", it's painful..."
		],
		fadeIn: [
			"I've been a bad boy",
			", I need to be spanked",
			", I need to be spanked so hard"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.bdsm && !State.active.variables.kink.bdsm && !State.active.variables.kink.bdsmStarted;
		},
		start: function() {
			State.active.variables.kink.bdsm = true;
			State.active.variables.kink.bdsmStarted = true;
			if ( State.active.variables.kinkAllow.painPlay ) { State.active.variables.kink.painPlay = true; }
			if ( State.active.variables.kinkAllow.xPain ) { State.active.variables.kink.xPain = true; }
			if ( State.active.variables.kinkAllow.petPlay ) { State.active.variables.kink.petPlay = true; }
			if ( State.active.variables.kinkAllow.bondage ) { State.active.variables.kink.bondage = true; }
			if ( State.active.variables.kinkAllow.facesit ) { State.active.variables.kink.facesit = true; }
			if ( State.active.variables.kinkAllow.trampling ) { State.active.variables.kink.trampling = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.bdsm = false;
			State.active.variables.kink.bdsm = false;
			State.active.variables.kink.painPlay = false;
			State.active.variables.kink.petPlay = false;
			State.active.variables.kink.bondage = false;
			State.active.variables.kink.facesit = false;
			State.active.variables.kink.trampling = false;
			State.active.variables.kinkAllow.bdsm = false;
			State.active.variables.kinkAllow.painPlay = false;
			State.active.variables.kinkAllow.petPlay = false;
			State.active.variables.kinkAllow.bondage = false;
			State.active.variables.kinkAllow.facesit = false;
			State.active.variables.kinkAllow.trampling = false;
		}
	},
	{
		name: "Foot fetish",
		code: "Bodily Extremity Encouragement",
		image: "hypno_1_1.gif",
		imagePack: "Hypno",
		fadeOut: [
			"Feet",
			", what is so special about it",
			", I don't understand..."
		],
		fadeIn: [
			"Feet",
			", so pretty",
			", so arousing..."
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.footFetish && !State.active.variables.kink.footFetish && !State.active.variables.kink.footFetishStarted;
		},
		start: function() {
			State.active.variables.kink.footFetish = true;
			State.active.variables.kink.footFetishStarted = true;
			if ( State.active.variables.kinkAllow.footDisplay ) { State.active.variables.kink.footDisplay = true; }
			if ( State.active.variables.kinkAllow.footWorship ) { State.active.variables.kink.footWorship = true; }
			if ( State.active.variables.kinkAllow.hosiery ) { State.active.variables.kink.hosiery = true; }
			if ( State.active.variables.kinkAllow.shoeBoot ) { State.active.variables.kink.shoeBoot = true; }
			if ( State.active.variables.kinkAllow.footjob ) { State.active.variables.kink.footjob = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.footFetish = false;
			State.active.variables.kink.footFetish = false;
			State.active.variables.kink.footDisplay = false;
			State.active.variables.kink.footWorship = false;
			State.active.variables.kink.hosiery = false;
			State.active.variables.kink.shoeBoot = false;
			State.active.variables.kink.footjob = false;
			State.active.variables.kinkAllow.footFetish = false;
			State.active.variables.kinkAllow.footDisplay = false;
			State.active.variables.kinkAllow.footWorship = false;
			State.active.variables.kinkAllow.hosiery = false;
			State.active.variables.kinkAllow.shoeBoot = false;
			State.active.variables.kinkAllow.footjob = false;
		}
	},
	{
		name: "Sweat and intense body odors",
		code: "Pheromone Enhancement",
		image: "hypno_1_1.gif",
		imagePack: "Hypno",
		fadeOut: [
			"Sweat",
			", it is gross",
			", why am I thinking about it..."
		],
		fadeIn: [
			"Sweaty bodies",
			", so heavy, so erotic",
			", its like I can smell sex in the air"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.odor && !State.active.variables.kink.odor && !State.active.variables.kink.odorStarted;
		},
		start: function() {
			State.active.variables.kink.odor = true;
			State.active.variables.kink.odorStarted = true;
			if ( State.active.variables.kinkAllow.clothesOdor ) { State.active.variables.kink.clothesOdor = true; }
			if ( State.active.variables.kinkAllow.shoeSockOdor ) { State.active.variables.kink.shoeSockOdor = true; }
			if ( State.active.variables.kinkAllow.footOdor ) { State.active.variables.kink.footOdor = true; }
			if ( State.active.variables.kinkAllow.armpitOdor ) { State.active.variables.kink.armpitOdor = true; }
			if ( State.active.variables.kinkAllow.assOdor ) { State.active.variables.kink.assOdor = true; }
			if ( State.active.variables.kinkAllow.genitalOdor ) { State.active.variables.kink.genitalOdor = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.odor = false;
			State.active.variables.kink.odor = false;
			State.active.variables.kink.clothesOdor = false;
			State.active.variables.kink.shoeSockOdor = false;
			State.active.variables.kink.footOdor = false;
			State.active.variables.kink.armpitOdor = false;
			State.active.variables.kink.assOdor = false;
			State.active.variables.kink.genitalOdor = false;
			State.active.variables.kinkAllow.clothesOdor = false;
			State.active.variables.kinkAllow.shoeSockOdor = false;
			State.active.variables.kinkAllow.footOdor = false;
			State.active.variables.kinkAllow.armpitOdor = false;
			State.active.variables.kinkAllow.assOdor = false;
			State.active.variables.kinkAllow.genitalOdor = false;
		}
	},
	{
		name: "Degradation",
		code: "Self-Confidence Strengthening",
		image: "hypno_1_1.gif",
		imagePack: "Hypno",
		fadeOut: [
			"What am I doing here?",
			"I'm not like that",
			", I don't like being degraded"
		],
		fadeIn: [
			"I feel so good to let go",
			", I feel so low and dirty",
			", I... I love it"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.degradation && !State.active.variables.kink.degradation && !State.active.variables.kink.degradationStarted;
		},
		start: function() {
			State.active.variables.kink.degradation = true;
			State.active.variables.kink.degradationStarted = true;
			if ( State.active.variables.kinkAllow.curse ) { State.active.variables.kink.curse = true; }
			if ( State.active.variables.kinkAllow.whoring ) { State.active.variables.kink.whoring = true; }
			if ( State.active.variables.kinkAllow.bimbo ) { State.active.variables.kink.bimbo = true; }
			if ( State.active.variables.kinkAllow.spitting ) { State.active.variables.kink.spitting = true; }
			if ( State.active.variables.kinkAllow.abusive ) { State.active.variables.kink.abusive = true; }
			if ( State.active.variables.kinkAllow.mindControl ) { State.active.variables.kink.mindControl = true; }
			if ( State.active.variables.kinkAllow.questionable ) { State.active.variables.kink.questionable = true; }
			if ( State.active.variables.kinkAllow.tattoo ) { State.active.variables.kink.tattoo = true; }
			if ( State.active.variables.kinkAllow.piercing ) { State.active.variables.kink.piercing = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.degradation = false;
			State.active.variables.kink.degradation = false;
			State.active.variables.kink.curse = false;
			State.active.variables.kink.whoring = false;
			State.active.variables.kink.bimbo = false;
			State.active.variables.kink.spitting = false;
			State.active.variables.kink.abusive = false;
			State.active.variables.kink.mindControl = false;
			State.active.variables.kink.questionable = false;
			State.active.variables.kink.tattoo = false;
			State.active.variables.kink.piercing = false;
			State.active.variables.kinkAllow.curse = false;
			State.active.variables.kinkAllow.whoring = false;
			State.active.variables.kinkAllow.bimbo = false;
			State.active.variables.kinkAllow.spitting = false;
			State.active.variables.kinkAllow.abusive = false;
			State.active.variables.kinkAllow.mindControl = false;
			State.active.variables.kinkAllow.questionable = false;
			State.active.variables.kinkAllow.tattoo = false;
			State.active.variables.kinkAllow.piercing = false;
		}
	},
	{
		name: "Age play",
		code: "Regression Therapy",
		image: "hypno_1_1.gif",
		imagePack: "Hypno",
		fadeOut: [
			"What?",
			"I'm not a baby?",
			"Why am I thinking about being a baby?"
		],
		fadeIn: [
			"I feel so helpless",
			", I need to be cared for",
			", I feel so small"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.agePlay && !State.active.variables.kink.agePlay && !State.active.variables.kink.agePlayStarted;
		},
		start: function() {
			State.active.variables.kink.agePlay = true;
			State.active.variables.kink.agePlayStarted = true;
			if ( State.active.variables.kinkAllow.diapering ) { State.active.variables.kink.diapering = true; }
			if ( State.active.variables.kinkAllow.adultBaby ) { State.active.variables.kink.adultBaby = true; }
			if ( State.active.variables.kinkAllow.ageBehavior ) { State.active.variables.kink.ageBehavior = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.agePlay = false;
			State.active.variables.kink.agePlay = false;
			State.active.variables.kink.diapering = false;
			State.active.variables.kink.adultBaby = false;
			State.active.variables.kink.ageBehavior = false;
			State.active.variables.kinkAllow.agePlay = false;
			State.active.variables.kinkAllow.diapering = false;
			State.active.variables.kinkAllow.adultBaby = false;
			State.active.variables.kinkAllow.ageBehavior = false;
		}
	},
	{
		name: "Xtreme body proportions",
		code: "Body Confidence Enabling",
		image: "hypno_1_1.gif",
		imagePack: "Hypno",
		fadeOut: [
			"Wait a second",
			", why am I having these fantasies",
			", it is so strange..."
		],
		fadeIn: [
			"Ordinary forms are so boring",
			", I want something special",
			", I love exoic looks"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.xBody && !State.active.variables.kink.xBody && !State.active.variables.kink.xBodyStarted;
		},
		start: function() {
			State.active.variables.kink.xBody = true;
			State.active.variables.kink.xBodyStarted = true;
			if ( State.active.variables.kinkAllow.bbw ) { State.active.variables.kink.bbw = true; }
			if ( State.active.variables.kinkAllow.hyperBreasts ) { State.active.variables.kink.hyperBreasts = true; }
			if ( State.active.variables.kinkAllow.hyperPenis ) { State.active.variables.kink.hyperPenis = true; }
			if ( State.active.variables.kinkAllow.dwarf ) { State.active.variables.kink.dwarf = true; }
			if ( State.active.variables.kinkAllow.tall ) { State.active.variables.kink.tall = true; }
			if ( State.active.variables.kinkAllow.muscle ) { State.active.variables.kink.muscle = true; }
			if ( State.active.variables.kinkAllow.expansionWeight ) { State.active.variables.kink.expansionWeight = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.xBody = false;
			State.active.variables.kink.xBody = false;
			State.active.variables.kink.bbw = false;
			State.active.variables.kink.hyperBreasts = false;
			State.active.variables.kink.hyperPenis = false;
			State.active.variables.kink.dwarf = false;
			State.active.variables.kink.tall = false;
			State.active.variables.kink.muscle = false;
			State.active.variables.kink.expansionWeight = false;
			State.active.variables.kinkAllow.bbw = false;
			State.active.variables.kinkAllow.hyperBreasts = false;
			State.active.variables.kinkAllow.hyperPenis = false;
			State.active.variables.kinkAllow.dwarf = false;
			State.active.variables.kinkAllow.tall = false;
			State.active.variables.kinkAllow.muscle = false;
			State.active.variables.kinkAllow.expansionWeight = false;
		}
	},
	{
		name: "Clothing",
		code: "Tactile Sensation Appreciation",
		image: "hypno_1_1.gif",
		imagePack: "Hypno",
		fadeOut: [
			"Wait a second",
			", why are you touching your clothes?",
			", why does this feel so wrong?"
		],
		fadeIn: [
			"Regular clothes are so boring",
			", I so want to be dressed up",
			", I love how it fills my senses, how it feels on my skin..."
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.clothing && !State.active.variables.kink.clothing && !State.active.variables.kink.clothingStarted;
		},
		start: function() {
			State.active.variables.kink.clothing = true;
			State.active.variables.kink.clothingStarted = true;
			if ( State.active.variables.kinkAllow.latex ) { State.active.variables.kink.latex = true; }
			if ( State.active.variables.kinkAllow.leather ) { State.active.variables.kink.leather = true; }
			if ( State.active.variables.kinkAllow.nylon ) { State.active.variables.kink.nylon = true; }
			if ( State.active.variables.kinkAllow.frilly ) { State.active.variables.kink.frilly = true; }
		},
		stop: function() {
			State.active.variables.kinkAllow.clothing = false;
			State.active.variables.kink.clothing = false;
			State.active.variables.kink.latex = false;
			State.active.variables.kink.leather = false;
			State.active.variables.kink.nylon = false;
			State.active.variables.kink.frilly = false;
			State.active.variables.kinkAllow.latex = false;
			State.active.variables.kinkAllow.leather = false;
			State.active.variables.kinkAllow.nylon = false;
			State.active.variables.kinkAllow.frilly = false;
		}
	},
	{
		name: "Gender change",
		code: "Gender Dysphoria Realignment",
		image: "hypno_1_1.gif",
		imagePack: "Hypno",
		fadeOut: [
			"I'm a boy",
			", I'm sure about it",
			", why am I so uncertain suddenly?"
		],
		fadeIn: [
			"I love girly things",
			", I don't feel comfortable as a boy",
			", I want to be a girl"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kinkAllow.genderChange && !State.active.variables.kink.genderChange && !State.active.variables.kink.genderChangeStarted;
		},
		start: function() {
			State.active.variables.kink.genderChangeStarted = true;
			State.active.variables.kink.genderChange = true;
		},
		stop: function() {
			State.active.variables.kinkAllow.genderChange = false;
			State.active.variables.kink.genderChange = false;
		}
	}
];

window.therapyCode={
	checkPerversion: function(obj) {
		var player=State.active.variables.player;
		return (obj.perversion.guardian.min <= player.perversion.guardian) && (obj.perversion.guardian.max >= player.perversion.guardian) && (obj.perversion.therapist.min <= player.perversion.therapist) && (obj.perversion.therapist.max >= player.perversion.therapist) && (obj.perversion.teacher.min <= player.perversion.teacher) && (obj.perversion.teacher.max >= player.perversion.teacher) && (obj.perversion.friend.min <= player.perversion.friend) && (obj.perversion.friend.max >= player.perversion.friend);
	},
	getRandomItem: function(array) {
		var a=[];
		var tc=0;
		var mp=0;
		for (var i=0; i < array.length; i++) {
			if (this.checkPerversion(array[i]) && array[i].check()) {
				if (array[i].priority > mp) {
					a=[];
					tc=0;
					mp=array[i].priority;
				}
				if (array[i].priority == mp) {
					a.push(array[i]);
					tc+=array[i].chance;
				}
			}
		}
		var rc=window.randomCode.getIntInclusive(1, tc);
		for (var i=0; i < a.length; i++) {
			rc-=a[i].chance;
			if (rc <= 0) {
				return a[i];
			}
		}
		return false;
	},
	getItemArray: function(array) {
		var a=[];
		var mp=0;
		for (var i=0; i < array.length; i++) {
			if (this.checkPerversion(array[i]) && array[i].check()) {
				if (array[i].priority > mp) {
					a=[];
					mp=array[i].priority;
				}
				if (array[i].priority == mp) {
					a.push(array[i]);
				}
			}
		}
		return a;
	},
	getSession: function() {
		return this.getRandomItem(window.therapySessions);
	},
	getArrival: function() {
		return this.getRandomItem(window.therapyArrivals);
	},
	getKinkArray: function() {
		return this.getItemArray(window.kinks);
	},
	getWatchedKink: function() {
		if (State.active.variables.watchingKink == null) { return; }
		if (!State.active.variables.watchingKink) { return; }
		for (var i=0; i < window.kinks.length; i++) {
			if (window.kinks[i].code == State.active.variables.watchingKink) {
				return window.kinks[i];
			}
		}
	},
	topicsList: function() {
		var tl=[];  // list of available talks
		for (var i=0; i < Object.keys(window.therapistTalks).length; i++) {
			var talk=window.therapistTalks[Object.keys(window.therapistTalks)[i]];
			var talkV=State.active.variables.therapistTalks[Object.keys(window.therapistTalks)[i]];
			if (talkV.start && !talkV.finished && talk.check()) {
				tl.push(talk);
			}
		}
		if (tl.length == 0) {
			return;
		}
		return tl;
	}
}
