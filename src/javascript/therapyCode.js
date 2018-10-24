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
		text: "$therapist calls you in, and she can tell straight away that something new is troubling you.  With a little prodding, you tell her how your teacher $teacher is blackmailing you.  $therapist is initially shocked, and talks about exposing her to the principal, but once you tell her that you foolishly tried to bribe her, she sees your predicament.\n\n@@.therapist;\"I've got an idea that may buy you some time. Money is your problem right now, and if you pay her off, it will give you some time to figure out how to handle her. Who knows? She may get tired of the whole thing or come to her senses.\"@@\n\n$therapist is thoughtful for a few moments while you look to her for help.\n\n@@.therapist;\"I'm running a hypnosis research project that pays decent money to volunteers.  You're a little on the young side to participate, but I should be able to wrangle things for you. If you agree, I'll conduct the research during our sessions, and just refund the money $guardian is paying me straight to you. That's $<<print rewardMoney.hypnosis>> a session, if you're interested.\"@@\n\nHell yeah! Easy money! You agree quickly.\n\n@@.therapist;\"Great! Well, today's session is over, so we'll get into that next time. But before you leave, I need you to fill a short survey for the initial information for my research. Some of questions there might appear strange, but it is really necessary, so, please, don't overthink it and answer honestly.\"@@",
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
		text: "Concerned about the effects from your last visit, you ask if this therapy could cause something like that?\n\n@@.therapist;\"Hmm, it seems you may have a very low resistance to this kind of therapy, which is interesting. Don't worry - if you experience any side effects, they should be temporary. The first session was a probe, so to speak, meant to gauge your reaction so I can calibrate the therapy to suit you. If you choose to continue in future sessions, you shouldn't have those side effects, and we'll instead focus on helping you feel more relaxed, and making it easier to deal with the stress in your life.\"@@\n\n@@.therapist;\"You can stop the course if you're still concerned about side effects, but I've found several sponsors for short term, supplementary research projects, if you're interested.\"@@\n\n@@.therapist;\"Concerning the supplementary research sessions - if you choose to participate you won' be able to interrupt the session till end. Most of these courses are one-time trials, but the pay if we include them is bigger - $<<print rewardMoney.specialHypnosis>> each.\"@@\n\nWell, that last session definitely felt weird. You are honestly scared by how it affected you, but you take a moment to think about it. Maybe it could make dealing with $teacher's demands easier?",
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
			friend: {min: 4, max: 4}
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
			friend: {min: 9, max: 9}
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
			window.events.record('hypnoMild');
			if (State.active.variables.events.hypnoMild > 5 && State.active.variables.player.daring > 40) {
				window.events.record('hypnoModerate');
				State.active.variables.player.perversion.therapist=4;
			}
		}
	},
	{	//Routine for perversion 4 (mind_1) - first scene
		text: "$therapist calls you in, and the two of you pick up from where you'd finished in the previous session. It's wonderful to talk openly with someone you trust so completely.\n\nAfter a while, you feel like you've discussed everything that's been going on recently, and $therapist looks at her watch. @@.therapist;\"Well, we still have some time left if you'd like to have another hypnosis session?\"@@\n\nYou definitely feel more at ease with all that is happening - sometimes you're even curious about what this new part of your life will bring next. But you're not sure if you should go further with these hypnotherapy sessions. What if you become too accepting? What if you start to enjoy it?",
		text: "",
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
			return State.active.variables.events.hypnoMild <= 1;
		},
		finishSession: function() {},
		finishHypno: function() {
			window.events.record('hypnoModerate');
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
			window.events.record('hypnoModerate');
			if (State.active.variables.events.hypnoModerate > 5 && State.active.variables.player.daring > 70) {
				window.events.record('hypnoHeavy');
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
			window.events.record('hypnoHeavy');
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
			return State.active.variables.kink.penisShrink;
		}
	}
},


window.kinks= [
	{
		name: "Semen consumption",
		code: "Protein Diet Enrichment",
		image: "hypno_cum.gif",
		hypnoLines: [
			"You love taste of cum",
			"Sissy like you should crave cum",
			"Cum is only thing that matters"
		],
		fadeOut: [
			"Cum",
			"Why am I thinking about cum?",
			"Cum is gross..."
		],
		fadeIn: [
			"Cum is good",
			"Cum is tasty",
			"I love cum"
		],
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		priority: 5,
		check: function() {
			return State.active.variables.kink.semenConsumption && !State.active.variables.kinkHypno.semenConsumptionHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.semenConsumptionHypnoStarted=true;
			State.active.variables.kinkHypno.semenConsumption=true;
			State.active.variables.dreams.CumCake.active=true;
		},
		stop: function() {
			State.active.variables.kinkHypno.semenConsumption = false;
			State.active.variables.kink.semenConsumption = false;
			State.active.variables.kink.creampie = false;
			State.active.variables.kink.bukkake = false;
			State.active.variables.kink.cumEating = false;
			State.active.variables.kink.ownCum = false;
			State.active.variables.kink.cumSwap = false;
			State.active.variables.dreams.CumCake.active=false; 
		}
	},
	{
		name: "Watersports",
		code: "Bodily Emissions Management",
		image: "hypno_piss.gif",
		hypnoLines: [
			"You love taste of urine",
			"You are born to be public toilet",
			"Your purpose is to serve"
		],
		fadeOut: [
			"Huh",
			"Why am I thinking about urine",
			"Urine is gross..."
		],
		fadeIn: [
			"Piss is so refreshing",
			"Piss is so tasty",
			"I love to drink piss"
		],
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		priority: 5,
		check: function() {
			return State.active.variables.kink.watersports && !State.active.variables.kinkHypno.watersportsHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.watersportsHypnoStarted = true;
			State.active.variables.kinkHypno.watersports = true;
			State.active.variables.dreams.PissHypno.active=true;
		},
		stop: function() {
			State.active.variables.kinkHypno.watersports = false;
			State.active.variables.kink.watersports = false;
			State.active.variables.kink.wetting = false;
			State.active.variables.kink.urineDrink = false;
			State.active.variables.kink.urinePlay = false;
			State.active.variables.dreams.PissHypno.active=false;
		}
	},
	{
		name: "Small penis",
		code: "Sexual Prowess Hypotherapy",
		image: "hypno_sph.gif",
		hypnoLines: [
			"Having small penis is a bliss",
			"Forget about using your tiny prick",
			"Your pityful clitty is what you deserve"
		],
		fadeOut: [
			"Wait a second",
			"Why am I thinking about small penises",
			"Small penises are bad..."
		],
		fadeIn: [
			"A small penis is not so bad",
			"Small penises are cute",
			"I would love to have a smaller penis"
		],
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		priority: 5,
		check: function() {
			return State.active.variables.kink.smallPenis && !State.active.variables.kinkHypno.smallPenisHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.smallPenisHypnoStarted = true;
			State.active.variables.kinkHypno.smallPenis = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.smallPenis = false;
			State.active.variables.kink.smallPenis = false;
			State.active.variables.kink.penisShrink = false;
			State.active.variables.kink.sph = false;
		}
	},
	{
		name: "BDSM",
		code: "Relationship Role Definition",
		image: "hypno_maso.gif",
		hypnoLines: [
			"Ask to be spanked",
			"It's what you deserve",
			"Submit to being tied and dominated"
		],
		fadeOut: [
			"Wait a second",
			"Why am I thinking about being spanked",
			"It's painful..."
		],
		fadeIn: [
			"I've been a bad boy",
			"I need to be spanked",
			"I need to be spanked so hard"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.bdsm && !State.active.variables.kinkHypno.bdsmHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.bdsmHypnoStarted = true;
			State.active.variables.kinkHypno.bdsm = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.bdsm = false;
			State.active.variables.kink.bdsm = false;
			State.active.variables.kink.painPlay = false;
			State.active.variables.kink.petPlay = false;
			State.active.variables.kink.bondage = false;
			State.active.variables.kink.facesit = false;
			State.active.variables.kink.trampling = false;
		}
	},
	{
		name: "Foot fetish",
		code: "Bodily Extremity Encouragement",
		image: "hypno_1_1.gif",
		hypnoLines: [
			"You love women legs and feet",
			"Worship it, get down and lick it",
			"Kneel and accept your place"
		],
		fadeOut: [
			"Feet",
			"What is so special about it",
			"I don't understand..."
		],
		fadeIn: [
			"Feet",
			"So pretty",
			"So arousing..."
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.footFetish && !State.active.variables.kinkHypno.footFetishHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.footFetishHypnoStarted = true;
			State.active.variables.kinkHypno.footFetish = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.footFetish = false;
			State.active.variables.kink.footFetish = false;
			State.active.variables.kink.footDisplay = false;
			State.active.variables.kink.footWorship = false;
			State.active.variables.kink.hosiery = false;
			State.active.variables.kink.shoeBoot = false;
			State.active.variables.kink.footjob = false;
		}
	},
	{
		name: "Sweat and intense body odors",
		code: "Pheromone Enhancement",
		image: "hypno_1_1.gif",
		hypnoLines: [
			"You love smell of sweaty bodies",
			"So intense, so arousing",
			"Give in, let it in"
		],
		fadeOut: [
			"Sweat",
			"It is gross",
			"Why am I thinking about it..."
		],
		fadeIn: [
			"Sweaty bodies",
			"So heavy, so erotic",
			"Its like I can smell sex in the air"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.odor && !State.active.variables.kinkHypno.odorHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.odorHypnoStarted = true;
			State.active.variables.kinkHypno.odor = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.odor = false;
			State.active.variables.kink.odor = false;
			State.active.variables.kink.clothesOdor = false;
			State.active.variables.kink.shoeSockOdor = false;
			State.active.variables.kink.footOdor = false;
			State.active.variables.kink.armpitOdor = false;
			State.active.variables.kink.assOdor = false;
			State.active.variables.kink.genitalOdor = false;
		}
	},
	{
		name: "Degradation",
		code: "Self-Confidence Strengthening",
		image: "hypno_1_1.gif",
		hypnoLines: [
			"You are just a toy",
			"Accept your place",
			"Kneel and serve"
		],
		fadeOut: [
			"What am I doing here?",
			"I'm not like that",
			"I don't like being degraded"
		],
		fadeIn: [
			"I feel so good to let go",
			"I feel so low and dirty",
			"I... I love it"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.degradation && !State.active.variables.kinkHypno.degradationHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.degradationHypnoStarted = true;
			State.active.variables.kinkHypno.degradation = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.degradation = false;
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
		}
	},
	{
		name: "Age play",
		code: "Regression Therapy",
		image: "hypno_1_1.gif",
		hypnoLines: [
			"Who is a cute little baby?",
			"You are, yes you are",
			"Suck that pacifier"
		],
		fadeOut: [
			"What?",
			"I'm not a baby?",
			"Why am I thinking about being a baby?"
		],
		fadeIn: [
			"I feel so helpless",
			"I need to be cared for",
			"I feel so small"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.agePlay && !State.active.variables.kinkHypno.agePlayHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.agePlayHypnoStarted = true;
			State.active.variables.kinkHypno.agePlay = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.agePlay = false;
			State.active.variables.kink.agePlay = false;
			State.active.variables.kink.diapering = false;
			State.active.variables.kink.adultBaby = false;
			State.active.variables.kink.ageBehavior = false;
		}
	},
	{
		name: "Xtreme body proportions",
		code: "Body Confidence Enabling",
		image: "hypno_1_1.gif",
		hypnoLines: [
			"Focus on your body",
			"You can change anything",
			"Just ask and be who you want to be"
		],
		fadeOut: [
			"Wait a second",
			"Why am I having these fantasies",
			"It is so strange..."
		],
		fadeIn: [
			"Ordinary forms are so boring",
			"I want something special",
			"I love exoic looks"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.xBody && !State.active.variables.kinkHypno.xBodyHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.xBodyHypnoStarted = true;
			State.active.variables.kinkHypno.xBody = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.xBody = false;
			State.active.variables.kink.xBody = false;
			State.active.variables.kink.bbw = false;
			State.active.variables.kink.flatChest = false;
			State.active.variables.kink.hyperBreasts = false;
			State.active.variables.kink.hyperPenis = false;
			State.active.variables.kink.dwarf = false;
			State.active.variables.kink.tall = false;
			State.active.variables.kink.muscle = false;
			State.active.variables.kink.expansionWeight = false;
		}
	},
	{
		name: "Clothing",
		code: "Tactile Sensation Appreciation",
		image: "hypno_1_1.gif",
		hypnoLines: [
			"You want to dress pretty",
			"Tight dresses feel so good on your body",
			"You love sexy clothes"
		],
		fadeOut: [
			"Wait a second",
			"Why are you touching your clothes?",
			"Why does this feel so wrong?"
		],
		fadeIn: [
			"Regular clothes are so boring",
			"I so want to be dressed up",
			"I love how it fills my senses, how it feels on my skin..."
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.clothing && !State.active.variables.kinkHypno.clothingHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.clothingHypnoStarted = true;
			State.active.variables.kinkHypno.clothing = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.clothing = false;
			State.active.variables.kink.clothing = false;
			State.active.variables.kink.latex = false;
			State.active.variables.kink.leather = false;
			State.active.variables.kink.nylon = false;
			State.active.variables.kink.frilly = false;
		}
	},
	{
		name: "Gender change",
		code: "Gender Dysphoria Realignment",
		image: "hypno_1_1.gif",
		hypnoLines: [
			"Be honest with yourself",
			"Isn't living as a girl make you happy?",
			"Just accept it"
		],
		fadeOut: [
			"I'm a boy",
			"I'm sure about it",
			"Why am I so uncertain suddenly?"
		],
		fadeIn: [
			"I love girly things",
			"I don't feel comfortable as a boy",
			"I want to be a girl"
		],
		priority: 5,
		perversion: {
			guardian: {min: 0, max: 100},
			therapist: {min: 0, max: 100},
			teacher: {min: 0, max: 100},
			friend: {min: 0, max: 100}
		},
		check: function() {
			return State.active.variables.kink.genderChange && !State.active.variables.kinkHypno.genderChangeHypnoStarted;
		},
		start: function() {
			State.active.variables.kinkHypno.genderChangeHypnoStarted = true;
			State.active.variables.kinkHypno.genderChange = true;
		},
		stop: function() {
			State.active.variables.kinkHypno.genderChange = false;
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