window.therapyArrivals= [
	{
		text: "You make it to the therapist's office a few minutes early and wait in the foyer for your session time."
	},
	{
		text: "You make it to $therapist's office a few minutes early and wait in the foyer for your session time."
	},
	{
		text: "You're running a little late and $therapist is waiting for you when you arrive."
	},
	{
		text: "You arrive right on time at $therapist's office, but she's running a bit late with her current patient.  After a few minutes of waiting, she finally calls you in."
	}
];

window.therapistPerversion = Object.freeze({
	"notMet":0, 
	"introduced":1, 
	"tookSurvey":2, 
	"watchedPorn":3,
	"noticedEffect":4,
});

// scenes at the top are preferred over the scenes at the bottom
window.therapySessions=[
	{	//Introduction , first scene
		text: "You don't have to wait long, and as she shows out her previous patient, she welcomes you in with a smile.  Her office is softly lit, with expensive furniture and the traditional comfortable couch.\n\nWith a gesture toward the couch, she says, @@.therapist;\"Hello $player.name, I'm $therapist, and I'm glad you could make it. Please make yourself comfy and relax. There's some water there if you need some, and I have fresh cookies if you're feeling hungry.\"@@\n\nYou are, and the cookie is chocolate and perfect. You sit on the couch and enjoy it while she waits patiently. As you look around the room, you spot a PSBox console sitting in her TV cabinet, and she notices you glancing at it.\n\n\@@.therapist;\"Call of Honor is my favorite when I have a spare session slot. Do you play?\"@@\n\nHell yeah, you do! You spend a few minutes discussing tactics and favorite maps. She seems awesome.\n\n@@.therapist;\"You're here because $guardian was worried about your behavior at home. Would you like to tell me about that?\"@@\n\nYou want to trust $therapist, but talking about it is embarrassing, so you explain it was just a misunderstanding, and awkwardly try to switch topics. She nods and says she believes you. She also says you can discuss anything with her if and when you are ready to talk. She hints that she's studied a lot of unique relationships, and would be glad to help with friendly advice and give you some pointers.\n\nThe hour whizzes by in no time, and you're left feeling confident that $therapist will play a big role in helping you mature. You give her a hug that she returns with equal sentiment, and leave with your head high.<<set $player.therapistTime = 0>>",
		check() {
			return State.active.variables.player.perversion.therapist < therapistPerversion.introduced;
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapist = therapistPerversion.introduced;
		}
	},
	{	//Introduction , second scene
		text: "$therapist calls you in, and she can tell straight away that something new is troubling you. With a little prodding, you tell her how your teacher is giving you special tutoring, but you are struggling to keep up with the payments.\n\n@@.therapist;\"I've got an idea that may buy you some time.\"@@\n\n$therapist is thoughtful for a few moments while you look to her for help.\n\n@@.therapist;\"I'm running a research project that pays decent money to volunteers. I should be able to wrangle things for you. If you agree, I'll conduct the research during our sessions, and just refund the money $guardian is paying me straight to you. That's $<<print rewardMoney.therapistResearch>> a session, if you're interested.\"@@\n\n@@.hero;Hell yeah! Easy money!@@ You agree quickly.\n\n@@.therapist;\"Great! Before we can start, I need you to fill a short survey for the initial information for my research. Some of questions there might appear strange, but it is really necessary, so, please, don't overthink it and answer honestly.\"@@<<set $player.therapistTime = 0>>",
		passage: "TherapistSurvey",
		check() {
			return State.active.variables.player.perversion.therapist < therapistPerversion.tookSurvey;
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapist = therapistPerversion.tookSurvey;
		}
	},
	{	//Introduction, third scene, first porn movie
		text: "@@.therapist;\"Come in, $player.name,\"@@ she says warmly. @@.therapist;\"Thank you for being a part of my research. I want to  how pornography can affect behaviour of young adults.\"\n\n\"You will be presented pornographic material, and I'll be here keeping a close eye on you to assess how they affect you. However, there is a catch: You may absolutely must not masturbate. You and I need to stay professional here.\"@@\n\nOn one hand, you are surprised, but on the other hand, you are not too keen about wanking in front of $therapist.\n\n@@.therapist;\"There's nothing to worry about, we've already had hundreds of volunteers participate with no ill effects.\"@@\n\nThat's good enough for you, and you sit in front of the wall-mounted big screen television to begin watching. $therapist turns off the lights and presses a button on the remote.",
		check() {
			return State.active.variables.player.perversion.therapist < therapistPerversion.watchedPorn;
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapist = therapistPerversion.watchedPorn;
		}
	},
	{	//start of routine
		text: "Curious about your newfound interest in men, you ask if this research study could cause something like that?\n\n@@.therapist;\"Hmm, it seems you may have a very low resistance to this kind of material, which is interesting. Don't worry – if you experience any side effects, they should be temporary. The first session was a probe, so to speak, meant to gauge your reaction so I can calibrate the content to suit you. If you choose to continue in future sessions, you shouldn't have those side effects, and we'll instead focus on helping you feel more relaxed, and making it easier to deal with the stress in your life.\"@@\n\nWell, that last session definitely felt weird, but you have already seen so much porn in your life do not think participating in $therapist's research will affect you in the long run. It would surely make dealing with paying the tutition easier.\n\nNow that the immediate financial issues are sorted out, you can talk to $therapist about your personal experiences. I have allocated an additional time-slot so you can participate in my study after your personal councelling.",
		check() {
			return State.active.variables.player.perversion.therapist < therapistPerversion.noticedEffect;
		},
		finishSession: function() {
			State.active.variables.player.perversion.therapist = therapistPerversion.noticedEffect;
		}
	},
	// Following sessions are essentially null-content sessions with no unique therapist content to allow selection of other talks
	{	// Routine for high perversion
		text: "$therapist calls you in, and the two of you pick up where you left off in the previous session.  It's wonderful to talk openly with someone you trust so completely.\n\nAfter a while, you feel like you've discussed everything that's been going on recently, and $therapist looks at her watch. @@.therapist;\"Well, we still have some time left if you'd like to see another porn movie?\"@@\n\nYou still think it is odd to look at porn under professional supervision, but it pays good so you ignore your doubts.",
		check() {
			return false; // prndev does not want to rewrite this right now
		},
		finishSession: function() {}
	},
	{	// Routine until Teacher route start
		text: "$therapist calls you in, and the two of you pick up from where you left the previous session. It's wonderful to talk openly with someone you trust so completely.\n\nThe hour whizzes by in no time, and the session finishes with one of the nice hugs that you're now looking forward to.",
		check() {
			return false; // prndev does not want to rewrite this right now
		},
		finishSession: function() {}
	},
	{
		text: "$therapist calls you in, and the two of you pick up from where you left the previous session. It's wonderful to talk openly with someone you trust so completely.",
		check() {
			return true;
		},
		finishSession: function() {}
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

];

window.therapyCode={
	getSession: function() {
		return window.therapySessions.find(session => session.check());
	},
	getArrival: function() {
		return either(window.therapyArrivals);
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
		return tl;
	}
}