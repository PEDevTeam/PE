window.dreamsSelector={
	randomDream: function(dreams) {
		var availableDreams=[];  // list of available dreams
		var chanceTotal=0;   // chance total
		var highestStartPriority=0;   // highest start priority
		var currentPriority=0;   // priority
		for (var i=0; i < Object.keys(dreams).length; i++) {
			var dreamJS=dreams[Object.keys(dreams)[i]];
			var dreamV=State.active.variables.dreams[dreamJS.id];

			if (!dreamV) { return; }

			if (dreamV.active && (!dreamJS.once || (dreamV.progress == 0)) && dreamJS.check()) {
				currentPriority = dreamJS.highestStartPriority;
				if (dreamV.highestStartPriority != null) {
					currentPriority = dreamV.highestStartPriority;
				}
				if (currentPriority > highestStartPriority) {
					availableDreams=[];
					chanceTotal=0;
					highestStartPriority=currentPriority;
				}
				if (currentPriority >= highestStartPriority) {
					availableDreams.push(dreamJS);
					chanceTotal+=dreamJS.chance;
				}
			}
		}
		if (availableDreams.length == 0) {
			return;
		}
		var rt=window.randomCode.getIntInclusive(1, chanceTotal);
		for (var i=0; i < availableDreams.length; i++) {
			rt-=availableDreams[i].chance;
			if (rt <= 0) {
				/*
				if (availableDreams[i].once) {
					State.active.variables.dreams[availableDreams[i].id].progress=1;
				}
				*/
				return availableDreams[i];
			}
		}
	},
	specialDreams: function(dreams) {
		for (var i=0; i < Object.keys(dreams).length; i++) {
			var dreamJS=dreams[Object.keys(dreams)[i]];
			var dreamV=State.active.variables.dreams[dreamJS.id];

			if (!dreamV) { return false; }

			if (dreamV.active && dreamJS.once && (dreamV.progress == 0) && dreamJS.check() && (dreamJS.highestStartPriority > 0)) {
				return true;
			}
		}
		return false;
	}
}

window.dreamsGuardian={
	Guardian01_1: {
		id: "Guardian01_1",
		name: "Guardian01_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You walk into the living room to find $guardian lying on her stomach, watching TV. Her short dress has risen up, exposing the lower curves of her bare ass. As you stand there, her thighs part a litavailableDreamse, revealing her g-string. The tiny strip of material sparsely covers her pussy. She begins to spread her legs wider, turning her head to smile at you...",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian01_2: {
		id: "Guardian01_2",
		name: "Guardian01_2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "It's a sunny day and $guardian is lying on a towel in the backyard, sun bathing.  As you walk closer, you can see she's naked, her soft skin glistening with tanning oil. She seems to be asleep, but as you sofavailableDreamsy approach, she turns her head to you and smiles, asking if you would rub more oil over her skin. You reach towards her with trembling hands...",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian01_3: {
		id: "Guardian01_3",
		name: "Guardian01_3",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You walk into the kitchen and find $guardian polishing the table with a soft cloth. Her loose-fitting top has come unfastened, revealing a tantalizing portion of her boobs. They jiggle vigorously whenever she finds a stubborn spot on the table. You watch, transfixed, as you make out the reddish-brown edges of her nipples. Just then, she looks up at you and smiles...",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian12_1: {
		id: "Guardian12_1",
		name: "Guardian12_1",
		image: "dream_bubbles.gif",
		imagePack: "dream bubbles",
		imagePack_final: "dream bubbles",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You open the bathroom door and see $guardian in the tub, clouds of bubbles barely concealing the nipples of her wonderful tits. Her eyes close, her hands rhythmically stirring the water as her fingers stroke down against her vulva. Her lips part with a sigh, and she murmurs. One hand slides up to her nipple, and she calls your name...",
		check: function() {
			return [1,2].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian12_2: {
		id: "Guardian12_2",
		name: "Guardian12_2",
		image: "dream_washer.gif",
		imagePack: "dream washer",
		imagePack_final: "dream washer",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You take your dirty clothes into the laundry and find $guardian sitting on the corner of the washing machine. Her panties cling between her calves, while her raised dress skirt is gathered up around her naked hips. The washer whirs steadily as she looks at you, arching her back and pressing her pussy hard against the vibrating metal. Then the spin cycle begins, and her grinding gets more urgent...",
		check: function() {
			return [1,2].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian23_1: {
		id: "Guardian23_1",
		name: "Guardian23_1",
		image: "dream_cucumber.gif",
		imagePack: "dream cucumber",
		imagePack_final: "dream cucumber",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You walk into the kitchen and find $guardian sitting on the floor with her back against the cabinets.  Her dress is hiked up and she's slowly pushing a huge cucumber into her pussy. Your eyes meet, but she doesn't stop. Instead, she just smiles at you lustfully. As she hilts the vegetable to her inner limit, she asks you for a carrot from the fridge...",
		check: function() {
			return [2,3].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian23_2: {
		id: "Guardian23_2",
		name: "Guardian23_2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You come home from school and enter the living room to find $guardian and a muscular man having sex on the floor. He pounds her furiously as she writhes in ecstasy beneath him. Noticing you, she beckons you to come close, tilting her head and opening her mouth in invitation...",
		check: function() {
			return [2,3].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian34_1: {
		id: "Guardian34_1",
		name: "Guardian34_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You're in the cinema, sitting next to $guardian. As the movie begins and the lights go out, she slips out of her chair and nesavailableDreamses between your legs on the floor. She gently unzips your pants and pulls out your hard penis, sucking it into her mouth. You put your hands on top of her head, pushing her gently back down each time she bobs up. You can feel your orgasm nearing...",
		check: function() {
			return [3,4,5].includes(State.active.variables.player.perversion.guardian);
		}
	},
	Guardian45_1: {
		id: "Guardian45_1",
		name: "Guardian45_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "You're in the bathroom locked in chastity and sitting next to $guardian, and she's telling you that personal hygiene is important. You feel one of her fingers probing your sphincter gently. @@.guardiandream;'$player.name,'@@ she sighs. @@.guardiandream;'You really have to take better care of yourself. You have two elbows, two knees, but only one anus.'@@\n	@@.guardiandream;'With your penis locked away, there is only one way to satisfy your needs, right?'@@ she asks with a smile.\n\n @@.heroT;'Yes...'@@ you whisper weakly, your aching dick straining in its cage.\n\n You clench your asshole tighavailableDreamsy around $guardian's genavailableDreamse fingers as she massages your rectum. You can feel your orgasm approaching...",
		check: function() {
			return [4,5,6,7].includes(State.active.variables.player.perversion.guardian);
		}
	},
	WannabeWoman: {
		id: "WannabeWoman",
		name: "Dream WannabeWoman",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: false,
		once: true,
		chance: 10,
		highestStartPriority: 1,
		description: "On your way home, you catch sight of a voluptuous young woman, a few years older than yourself. Not exacavailableDreamsy a stunning beauty, still she captivates your attention. Something about her movements, subavailableDreamse and graceful, almost as if she were gliding efforavailableDreamsessly about, strikes you as sublimely sexual. She does not reach up and touch her face, she caresses. She does not walk about, she sashays and struts. She does not smile and laugh, she radiates warmth and affection, and when she looks at you, and into your eyes, you are instanavailableDreamsy seduced, ensnared in her sensuality. With a wicked smile of self-assurance, she turns from you, laughing, and strides away, leaving you feeling empty and lost. As you take a deep breath, your whole body pulses with a need, a desire.\n You want her. You want to be like her. You want to be her...",
		check: function() {
			return playerCode.isMind_2();
		}
	},
	CagedBirds: {
		id: "CagedBirds",
		name: "Dream CagedBirds",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: false,
		once: true,
		chance: 20,
		highestStartPriority: 0,
		description: "On the way out of the mall, you stop at the pet store, your attention drawn to the new front window display of caged birds.\n You are struck by how pretty and elegant they are, each a beautiful display of delicate plumage as they bob and strut about on their perches in an attempt to attract attention. What lovely creatures, you think, so simple minded yet so charming in all their colorful finery. Even through the thick window glass, you can hear their chirping and tweeting, almost pleading for appreciation. As you admire these tragically trapped animals, you remember something you learned in school. It is the males of bird species that have the most colorful feathers, the most elaborate fringes, the most flamboyant appearances and presentations.\n Just like you, these caged preening pets are male under all that adornment...",
		check: function() {
			return [4,5,6].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Panties: {
		id: "Panties",
		name: "Dream Panties",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: true,
		active: false,
		once: true,
		chance: 10,
		highestStartPriority: 1,
		description: "Panties",
		check: function() {
			return [0,1,2].includes(State.active.variables.player.perversion.guardian);
		}
	},
	SchoolPantiesExposed: { /*not implemented*/
		id: "SchoolPantiesExposed",
		name: "Dream School panties exposed",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: true,
		active: false,
		once: true,
		chance: 10,
		highestStartPriority: 1,
		description: "",
		check: function() {
			return true;
		}
	},
	CumCake: {
		id: "CumCake",
		name: "Cum cake",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: true,
		active: false,
		once: true,
		chance: 10,
		highestStartPriority: 1,
		description: "Cum cake",
		check: function() {
			return true;
		}
	},
	PenisShrinking: {
		id: "PenisShrinking",
		name: "Dream Penis shrinking",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: true,
		active: false,
		once: true,
		chance: 10,
		highestStartPriority: 10,
		description: "",
		check: function() {
			return true;
		}
	},
	TrainingPenis: {
		id: "TrainingPenis",
		name: "Fake dick suck dream",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: true,
		active: false,
		once: true,
		chance: 10,
		highestStartPriority: 10,
		description: "",
		check: function() {
			return true;
		}
	},
	PissHypno: {
		id: "PissHypno",
		name: "Dream Piss hypno",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: false,
		once: true,
		chance: 10,
		highestStartPriority: 1,
		description: "You reach for the handle of the bathroom door, hoping to peek on $guardian in the shower, when suddenly the door opens all on its own.\n Still wet from the shower and wrapped in a towel, $guardian is standing there. @@.guardiandream;'I thought I heard someone out here.'@@ She takes you by the ear and pulls you into the bathroom. She looks at you harshly. @@.guardiandream;'I know you were trying to peek in on me, weren't you?'@@\n A sardonic look spreads across her face. @@.guardiandream;'Ok, fine, you want to watch? I got out of the shower early because I had to pee, so you can watch me do that.'@@ $Guardian pulls you over to the toilet, smiles, and drops her towel. She turns and sits on the seat, her legs spread.\n'Kneel!'\nYou fall to your knees as she pulls you down between her legs. She takes the back of your head and pulls you close to the seat, her clean-shaven pussy only an inch or two away from your mouth. Her other hand glides down her still wet body as she spreads her glistening pussy lips. You inhale her clean, tangy scent as she begins peeing into the bowl. You unconsciously open your mouth to lick your lips and look up into her eyes. Her evil smirk scares you. @@.guardiandream;'Oh is that what you want?'@@ She shifts on the toilet, and her golden stream begins spraying onto your open lips and face.\nYou sit there helpless as her piss fills your mouth. After a moment, she finishes, and she moves her hand to your mouth, closing it\n@@.guardiandream;'Swallow, piss whore'@@\nAs she calls you that, you feel your litavailableDreamse cock twitch in its cage... ",
		check: function() {
			return true;
		}
	}
}

window.dreamsTeacher={
	Teacher01_1: {
		id: "Teacher01_1",
		name: "Teacher01_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher undoes the top buttons of her blouse and leans forward to give you a better look at her soft breasts beneath.  You float forward until you're almost breathing on them, and she takes your head in her hands and pulls you firmly into her cleavage.  Her soft tits press against your cheeks and you bring your hands up to finally touch....",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Generic01_2: {
		id: "Teacher01_1",
		name: "Teacher01_2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher is sitting behind her desk, looking direcavailableDreamsy into your eyes. She takes one of her ample breasts in hand and gently but firmly squeezes. Her other hand drops out of sight behind the desk, between her legs. Halfway closing her eyes, she finds the right spot, gazing at you in arousal. She opens her mouth and licks her lips, her eyes pleading...",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher01_3: {
		id: "Teacher01_3",
		name: "Teacher01_3",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher idly takes a covered marker and puts one end in her mouth, gently moving it in and out, then runs her tongue all around it.  She closes her eyes and gently sucks on it as if it were a real cock, then opens her eyes and looks direcavailableDreamsy into yours, silenavailableDreamsy pleading for you to take its place.  You stand up and walk towards her, <<if playerCode.isWearingOn(itemTypes.Outerwear).female>>lifting your dress up<<else>>unzipping your pants<<endif>>...",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher01_4: {
		id: "Teacher01_4",
		name: "Teacher01_4",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher's clothes melt away and she stands there teaching the class dressed only in her lacy bra, panties and high-heels.  You can easily see her hard nipples poking through the lace, and she smiles at you as you focus on her pussy, seeing a damp spot appear as she enjoys being the focus of your attention.  She reaches behind her back and unclips her bra...",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher01_5: {
		id: "Teacher01_5",
		name: "Teacher01_5",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher is helping the student in front of you and bends down to his level.  Her short skirt rides up her smooth naked legs, just covering her crotch.  You reach forward and slide your hand up the inside of her thigh, hearing her voice catch as she continues helping the other boy. Her skin gets warmer and softer as your hand disappears under her skirt...",
		check: function() {
			return [0,1].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher02_1: {
		id: "Teacher02_1",
		name: "Teacher02_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: true,
		chance: 10,
		highestStartPriority: 1,
		description: "The cute girl sitting in front of you suddenly turns around and whispers to you. //\"Psst, $player.name. I was just wondering... are you gay?\"// Your cheeks flush red in embarrassment at her bold question, and she smirks and turns away before you can fumble an answer...",
		check: function() {
			return [2,3].includes(State.active.variables.player.perversion.teacher) && (State.active.variables.player.perversion.therapist == 3) && (State.active.variables.player.perversion.therapistCooldown == 1);
		}
	},
	Teacher02_2: {
		id: "Teacher02_2",
		name: "Teacher02_2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher takes hold of her blouse and rips it open, scattering some buttons over the floor.  Her braless tits stand firm and proud with pink nipples begging to be sucked.  She walks over to you, her breasts bouncing, grabbing the back of your head and firmly pulling your mouth over a succulent nipple.  She moans as you flick your tongue over it...",
		check: function() {
			return [2,3].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher02_3: {
		id: "Teacher02_3",
		name: "Teacher02_3",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher calls you up to her desk where she's sitting, then swivels in her chair and motions for you to kneel.  As you do, she puts her legs on your shoulders and pulls you in slowly.  You kiss your way up her calves, around her knees and up her soft thighs.  She hikes her skirt up, showing you a glimpse of lacy panties, before pulling you firmly...",
		check: function() {
			return [2,3].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher02_4: {
		id: "Teacher02_4",
		name: "Teacher02_4",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher is standing behind you and puts her hands on your shoulders, resting them gently for a moment, before slowly moving them down your chest.  You feel your cock grow hard as she continues moving towards it, then defavailableDreamsy avoiding it as she continues past along your legs.  She pauses, and you feel her breath on your ear as she starts moving her hands back up, this time along the inside of your legs, closer and closer to your cock...",
		check: function() {
			return [2,3].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher02_5: {
		id: "Teacher02_5",
		name: "Teacher02_5",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher is sitting at her desk while the class works quieavailableDreamsy on their writing task. You watch her as she takes a sip from a glass of water, but it slips and spills all over her blouse making it instanavailableDreamsy transparent. The cold water makes her nipples hard and firm and she begins unbuttoning her top...",
		check: function() {
			return [2,3].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher03_1: {
		id: "Teacher03_1",
		name: "Teacher03_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher is standing at the whiteboard and drops her marker.  She bends over at the waist, keeping her legs straight. That causes her skirt to pull tighter and tighter around her ass, until suddenly it rips open along the seam, showing her glorious bare ass.  Rather than cover it or stand up, she instead pivots and looks at you, smiling, then runs her hand up her leg and pushes a finger deep into her wet pussy.  She finger fucks herself for a moment then pulls out and puts it against her mouth...",
		check: function() {
			return [4,5].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher03_2: {
		id: "Teacher03_2",
		name: "Teacher03_2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher opens her desk drawer and pulls out a thick 10 inch dildo with a suction cup base. She stands up and slaps the dildo onto the middle of her chair, bends over and licks the tip, getting it wet.  Then she hikes up her skirt and moves into position, positioning the dildo in the right spot, and then starts to sit.  She looks you in the eyes as the dildo slowly disappears up her pussy, inch after inch until finally...",
		check: function() {
			return [4,5].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher03_3: {
		id: "Teacher03_3",
		name: "Teacher03_3",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher lifts her skirt up, sits on the corner of her desk facing the class, and spreads her legs.  She takes a covered marker, places it against her wet pussy, and slowly pushes it in.  She smiles at you and beckons with one finger for you to come forward. As you reach her she pulls the marker out and puts it to your lips.  You inhale her scent and open your mouth...",
		check: function() {
			return [4,5].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher04_1: {
		id: "Teacher04_1",
		name: "Teacher04_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher calls you up to the front, then kneels down in front of you and <<if playerCode.isWearingOn(itemTypes.Outerwear).female>>lifts up your dress<<else>>unzips your pants<<endif>>.  You look back at the class who seemed stunned, <<if playerCode.isWearingOn(itemTypes.Chastity)>>and you hear her cry with frustration as she taps on your chastity device, then stands up and shrugs.  Your penis strains against its cage...<<else>><<if playerCode.isWearingOn(itemTypes.Underwear)>>then you feel her wrench down your underwear and engulf<<else>>but your attention is immediately drawn back as she engulfs<<endif>> your hard cock with her wet mouth.  She sucks harder and harder...<<endif>>",
		check: function() {
			return [6].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher04_2: {
		id: "Teacher04_2",
		name: "Teacher04_2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher is writing on the lower part of the whiteboard, bending at the waist.  You leave your chair and walk confidenavailableDreamsy up to her, <<if playerCode.isWearingOn(itemTypes.Outerwear).female>>lifting your dress up<<else>>unzipping your pants<<endif>> <<if playerCode.isWearingOn(itemTypes.Underwear)>>and lowering your underwear <<endif>>as you approach.  With a swift move you pull down her skirt to her knees <<if playerCode.isWearingOn(itemTypes.Chastity)>>and bump your chastity device up against her naked pussy, feeling your penis strain harder and harder against the plastic.  She looks at you quizzically, and you turn to see the class giggling at your frustrated attempt...<<else>>and shove your hard cock deep into her dripping pussy with a firm thrust.  She immediately straightens up, tightening her pussy, squeezing you wonderfully, then bucks against you, moaning with need...<<endif>>",
		check: function() {
			return [6].includes(State.active.variables.player.perversion.teacher);
		}
	},
	Teacher05_1: {
		id: "Teacher05_1",
		name: "Teacher05_1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "It's morning break time, and you open the juice box that $guardian gave you this morning. You wonder why it's branded with the name of the clinic where she works. As you suck through the straw, the taste of sperm fills your mouth and you realize you're drinking pure cum. You stop in shock, but you're really thirsty....",
		check: function() {
			return State.active.variables.player.perversion.teacher >= 7 && State.active.variables.kink.cumEating;
		}
	},
	Teacher05_2: {
		id: "Teacher05_2",
		name: "Teacher05_2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher is walking around the classroom as the class is working away, and stops in front of your desk.  She suddenly holds down your arms and calls to the boy sitting behind you.  He <<if playerCode.isWearingOn(itemTypes.Outerwear).female>>lifts up your dress <<else>>unzips and pulls down your pants <<endif>><<if playerCode.isWearingOn(itemTypes.Underwear)>>and <<if playerCode.isWearingOn(itemTypes.Outerwear).female>>removes your <<endif>>underwear, <<endif>><<if playerCode.isWearingOn(itemTypes.AnalPlug)>>pops out your butt-plug, <<endif>>then rams his thick cock deep into your rectum.  You look up at $teacher to see her smiling evilly and leaning in to kiss you...",
		check: function() {
			return State.active.variables.player.perversion.teacher >= 7;
		}
	},
	Teacher05_3: {
		id: "Teacher05_3",
		name: "Teacher05_3",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "$teacher calls up three of the biggest boys to the front of the class and instructs them to drop their pants and underwear.  The class gasps as they do, revealing huge erections.  Then she calls for you to come up and suck them off.  With your cheeks burning in embarrassment, and the girls giggling at you, you walk up and kneel in front of the first boy.  He wastes no time in jamming it in your mouth and face fucks you as the class chants \"$player.name, $player.name, $player.name\"...",
		check: function() {
			return State.active.variables.player.perversion.teacher >= 7;
		}
	},
	TeacherCum1: {
		id: "TeacherCum1",
		name: "TeacherCum1",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "It's lunchtime, and the cafeteria is crowded. $teacher pulls you out of the queue and leads you towards a table in the middle of the room. On the table sits a big glass jug filled with a white fluid, and has a thick tube coming out the top. \"Now sit here and suck down your lunch $player.name.\" she commands loudly. The cafeteria falls silent as you sit and obey. The fluid is sperm, and you look up at the other students who are watching you in amusement and disgust. A slow clap begins, getting faster and faster as you suck hard...",
		check: function() {
			return State.active.variables.kink.cumEating && State.active.variables.player.perversion.teacher >= 6;
		}
	},
	TeacherCum2: {
		id: "TeacherCum2",
		name: "TeacherCum2",
		image: "",
		imagePack: "dream",
		imagePack_final: "dream x",
		hasPassage: false,
		active: true,
		once: false,
		chance: 10,
		highestStartPriority: 0,
		description: "It's lunchtime, and the cafeteria is crowded. $teacher pulls you out of the queue and leads you towards a table in the middle of the room. On the table sits a big glass jug filled with sperm, and has a thick tube attached to a dildo and straps coming out the top. You sit, and she quickly forces the dildo gag into your mouth and secures it with the straps behind your head. With a flick of her finger on a switch on top of the jug, you hear it begin to pump the sperm through the dildo into your mouth. You initially refuse to swallow, but the pump is relenavailableDreamsess and forces the cum into your stomach. The other students look over from time to time, but mosavailableDreamsy ignore you and eat their lunch with their friends while the pump works away...",
		check: function() {
			return State.active.variables.kink.cumEating && State.active.variables.player.perversion.teacher >= 7;
		}
	}
}