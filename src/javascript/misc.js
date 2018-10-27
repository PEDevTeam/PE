window.misc={
	unpostponeClothes: function(type) {
		var itemsC=window.itemsC;
		var items=State.active.variables.items;
		for (var i=0; i < Object.keys(items).length; i++) {
			if (items[Object.keys(items)[i]].postponed) {
				items[Object.keys(items)[i]].postponed=false;
			}
		}
		return;
	},
	resetGuardian: function() {
		if (State.active.variables.kink.incest) {
			State.active.variables.guardian="your mother";
			State.active.variables.Guardian="Your mother";
			State.active.variables.myguardian="my mother";
			State.active.variables.Myguardian="My mother";
		} else {
			State.active.variables.guardian=State.active.variables.babysitter;
			State.active.variables.Guardian=State.active.variables.babysitter;
			State.active.variables.myguardian=State.active.variables.babysitter;
			State.active.variables.Myguardian=State.active.variables.babysitter;
		}
	},
	between: function(stat, min, max) {
		if ((stat >= min) && (stat <= max)) {return true}
		return false;
	},
	masturbateCum: function() {
		if (this.between(State.active.variables.player.masturbationType, 500, 610)) {return true}
		if (this.between(State.active.variables.player.masturbationType, 300, 310)) {return true}
		return false;
	},
	masturbateChastity: function() {
		if (this.between(State.active.variables.player.masturbationType, 0, 110)) {return true}
		if (this.between(State.active.variables.player.masturbationType, 400, 410)) {return true}
		return false;
	},
	masturbateVibrator: function() {
		if ([5,6].includes($player.masturbationType % 100)) {return true}
		if (this.between(State.active.variables.player.masturbationType, 100, 110)) {return true}
		if (this.between(State.active.variables.player.masturbationType, 400, 610)) {return true}
		return false;
	},
	mmContent: function(score) {
		if (State.active.variables.player.perversion.mmChecks > 5) {
			return (State.active.variables.player.bisexuality + 10) >= score;
		}
		return true;
	},
	toggleKink: function(kink) {
		if (kink) {return "checked"}
		return "unchecked";
	},
	once: function(flagName) {
		if (State.active.variables.once[flagName]) {return false}
		State.active.variables.once[flagName]=true;
		return true;
	},
	text: function(obj) {
		if (!obj) {
			return 'ERROR: there is no such object';
		}
		if (Array.isArray(obj)) {
			var len = obj.length;
			if (len < 1) {
				return 'ERROR: object ' + obj + ' has empty array for text ';
			}
			var i = Math.floor(Math.random() * len);
			return obj[i];
		} else if (typeof(obj) === 'function') {
			return obj.call();
		} else {
			return obj;
		}
	},
	getSnoopItems: function() {
		var ra=[];
		var sia=[itemsC.pantiesCotton, itemsC.vibrator, itemsC.playgirlMagazine];
		var items=State.active.variables.items;
		for (var i=0; i < sia.length; i++) {
			if (!playerCode.owns(sia[i]) || (sia[i].maxAlt && !items[sia[i].id].ownAlt[40])) {
				if (!State.active.variables.events.readPlayGirl || (sia[i].id != itemsC.playgirlMagazine.id)) {
					ra.push(sia[i]);
				}
			}
		}
		return ra;
	},
	wager: {
		calculate: function() {
			var player=State.active.variables.player;
			if (player.daring >= 50) {
				player.wager=player.money;
			} else {
				player.wager=Math.trunc(player.money * (player.daring / 5));
				player.wager=Math.round(player.wager);
			}
			if (player.wager > 20) {
				player.wager=20;
			}
		}
	},
	calculateDistance: function(source, destination) {
		var distance = 0;
		
		if (source.id == window.locationsJS.tokenPlace.id) {
			var player=State.active.variables.player;
			if (player.locationX != null) {	source.x = player.locationX; }
			if (player.locationY != null) {	source.y = player.locationY; }
		}
		
		if (source.remote != 0 || destination.remote != 0) {
			distance = Math.max(source.remote, destination.remote);
			distance += source.busRange + destination.busRange;
			return distance;
		}
		
		distance = (source.x-destination.x)*(source.x-destination.x) + (source.y-destination.y)*(source.y-destination.y)
		
		distance = Math.ceil(0.2*Math.sqrt(distance))
		
		distance = 5*Math.round(distance)
		
		return distance;
	},
	calcSemiPermCost: function() {
		var body=State.active.variables.body;
		var items=window.itemsC;
		var cost=0;
		if (body.semiAss > body.permAss) {
			if (body.semiAss == 2) { cost+=items.AssEnhancingXL.cost; }
			if (body.semiAss == 1) { cost+=items.AssEnhancing.cost; }
		}
		if (body.semiLips > body.permLips) {
			if (body.semiLips == 2) { cost+=items.LipsEnhancingXL.cost; }
			if (body.semiLips == 1) { cost+=items.LipsEnhancing.cost; }
		}
		if (body.semiManicure > body.permManicure) {
			if (body.semiManicure == 2) { cost+=items.GarishManicure.cost; }
			if (body.semiManicure == 1) { cost+=items.Manicure.cost; }
		}
		if (body.semiBoobs > body.permBoobs) {
			if (body.semiBoobs == 4) { cost+=items.breastImplantsDD.cost; }
			if (body.semiBoobs == 3) { cost+=items.breastImplantsC.cost; }
			if (body.semiBoobs == 2) { cost+=items.breastImplantsB.cost; }
			if (body.semiBoobs == 1) { cost+=items.breastImplantsA.cost; }
		}
		if (body.semiMakeup > body.permMakeup) {
			if (body.semiMakeup == 4) { cost+=items.HeavyMakeup.cost; }
			if (body.semiMakeup == 3) { cost+=items.BimboMakeup.cost; }
			if (body.semiMakeup == 2) { cost+=items.NormalMakeup.cost; }
			if (body.semiMakeup == 1) { cost+=items.SubtleMakeup.cost; }
		}
		if (body.semiAnal > body.permAnal) {
			if (body.semiAnal == 3) { cost+=items.analSmoothing3.cost; }
			if (body.semiAnal == 2) { cost+=items.analSmoothing2.cost; }
			if (body.semiAnal == 1) { cost+=items.analSmoothing1.cost; }
		}
		cost = 10*Math.round(cost*0.05);
		// half cost rounded by 10
		return cost;
	},
	getRandomRiddle: function() {
		var ur=[];
		for (var i=0; i < window.friendRiddles.length; i++) {
			if (State.active.variables.friendRiddles[Object.keys(window.friendRiddles)[i]]) {
				ur.push(window.friendRiddles[i]);
			}
		}
		if (ur.length > 0) {
			var rr=window.randomCode.getIntInclusive(0, ur.length-1);
			State.active.variables.friendRiddles[Object.keys(ur)[rr]]=true;
			return ur[rr];
		}
	},
	carousel: function(interval) {
		var i;
		setTimeout(function() {
			var slides = document.getElementById("slides");
			if (slides != null) {
				var arr = slides.getElementsByTagName("object");
				for (i = 0; i < arr.length; i++) {
				  /*arr[i].style.display = "none";*/
				  arr[i].className = "hidden";
				}

				var fadingStyle = Math.floor(Math.min(interval, 5));
				arr[0].className = "fading"+fadingStyle;
				arr[1].className = "fadingNext";
				
				if (State.active.variables.slidesId) { clearTimeout(State.active.variables.slidesId); }
				State.active.variables.slide=0;
				window.misc.carouselRepeat(interval);
			}
		},0 );
	},
	carouselRepeat: function(interval) {
		State.active.variables.slidesId = setTimeout(function() {
			var slides = document.getElementById("slides");
			if (slides != null) {
				var arr = slides.getElementsByTagName("object");
				/*arr[State.active.variables.slide].style.display = "none";*/
				arr[State.active.variables.slide].className = "hidden";
				
				State.active.variables.slide++;
				if (State.active.variables.slide >= arr.length) {State.active.variables.slide = 0;}
				
				if (State.active.variables.slide >= arr.length) {State.active.variables.slide = 0;}

				var fadingStyle = Math.floor(Math.min(interval, 5));
				arr[State.active.variables.slide].className = "fading"+fadingStyle;

				setTimeout(function() {
				if ((State.active.variables.slide+1) >= arr.length) {
					arr[0].className = "fadingNext";
				} else {
					arr[State.active.variables.slide+1].className = "fadingNext";
				}
				},50 );
				
				window.misc.carouselRepeat(interval);
				/*console.log(fadingStyle);*/
			}
		},1000*interval );
	},
},

window.masturbateType={
	watchPornChastNoCum:	  1,
	watchPornChastCalm:		101,
	watchPornCalm:			201,
	watchPornCum:			301,
	watchPornChastCum:		401,
	watchPornVibCum:		501,
	watchPornVibCumNoHands:	601,
	spyCamChastNoCum:		  2,
	spyCamChastCalm:		102,
	spyCamCalm:				202,
	spyCamCum:				302,
	spyCamChastCum:			402,
	spyCamVibCum:			502,
	spyCamVibCumNoHands:	602,
	playgirlChastNoCum:		  3,
	playgirlChastCalm:		103,
	playgirlCalm:			203,
	playgirlCum:			303,
	playgirlChastCum:		403,
	playgirlVibCum:			503,
	playgirlVibCumNoHands:	602,
	vibPenisChastNoCum:		  4,
	vibPenisChastCalm:		104,
	vibPenisCalm:			204,
	vibPenisCum:			304,
	vibPenisChastCum:		404,
	vibPenisVibCum:			504,
	vibAssChastNoCum:		  5,
	vibAssChastCalm:		105,
	vibAssCalm:				205,
	vibAssCum:				305,
	vibAssChastCum:			405,
	vibAssVibCum:			505,
	vibAssVibCumNoHands:	605,
	horseChastNoCum:		  6,
	horseChastCalm:			106,
	horseCalm:				206,
	horseCum:				306,
	horseChastCum:			406,
	horseVibCum:			506,
	horseVibCumNoHands:		606,
	special:				999
},

window.pornType={
	vanilla:			0,
	lesbians:			1,
	shemalesOnFemales:	2,
	onlyShemales:		3,
	malesOnShemales:	4,
	shemalesOnMales:	5,
	pegging:			6,
	femalesOnTraps:		7,
	malesOnTraps:		8,
	onlyTraps:			9,
	femalePoV:			10
},

window.friendRiddles = [
	{
		question: "Your finger fits right in it. You play with it when you're bored. Once you're married, you're stuck with the same one forever. What is it?",
		answer: "A ring!"
	},
	{
		question: " What's at least six inches long, goes in your mouth and is more fun if it vibrates?",
		answer: "A toothbrush!"
	},
	{
		question: "You play with it at night before bed. You can't be seen fiddling with it at work. You only let very, very special people touch it. What is it?",
		answer: "Your smartphone!"
	},
	{
		question: "What's long and hard and has cum in it?",
		answer: "A cuCUMber!"
	},
	{
		question: "What does every woman have that starts with a 'V' and that she can use to get what she wants?",
		answer: "Her voice!"
	},
	{
		question: "What goes up, lets out a load, and then goes back down?",
		answer: "An elevator!"
	},
	{
		question: "What do men keep in their pants that their partners sometimes blow?",
		answer: "Money!"
	},
	{
		question: "What's made of rubber, handed out at some schools, and exists to prevent mistakes?",
		answer: "Erasers!"
	},
	{
		question: "Arnold Schwarzenegger's is really long. Michael J. Fox's is really short. Mickey Mouse's isn't human. Madonna doesn't have one. What is it?",
		answer: "A last name!"
	},
	{
		question: "What starts with 'p' and ends with 'orn' and is the hottest part of the movie industry?",
		answer: "Popcorn!"
	},
	{
		question: "It's fun to do, but you hate knowing your parents do it, too. What is it?",
		answer: "Facebook!"
	},
	{
		question: "Every man has one. Some are big, and some are small. Blowing them feels great, but they drip if you aren't careful. What are they?",
		answer: "Noses!"
	},
	{
		question: "What gets longer when pulled, fits between breasts, slides neatly into a hole, has choked people when used improperly, and works best when jerked?",
		answer: "Seatbelts!"
	},
	{
		question: "What's white, gooey, sticky, and better to spit than to swallow?",
		answer: "Toothpaste!"
	},
	{
		question: "Some people prefer being on top, others prefer being on the bottom, and it always involves a bed.  What is it?",
		answer: "A bunk bed!"
	},
	{
		question: "What's squishy, bouncy, and comes in pairs?",
		answer: "Two bunnies!"
	},
	{
		question: "What’s a four-letter word that ends in “k” and means the same as intercourse?",
		answer: "Talk!"
	},
	{
		question: "What’s in a man’s pants that you won’t find in a girl’s dress?",
		answer: "Pockets!"
	},
	{
		question: "You stick your poles inside me. You tie me down to get me up. I get wet before you do. What am I?",
		answer: "A tent!"
	},
	{
		question: "If I miss, I might hit your bush. It’s my job to stuff your box. When I come, it’s news. What am I?",
		answer: "The paperboy!"
	},
	{
		question: "What four-letter word begins with “f” and ends with “k,” and if you can’t get it you can always just use your hands?",
		answer: "A fork!"
	},
	{
		question: "I’m spread out before being eaten. Your tongue gets me off. People sometimes lick my nuts. What am I?",
		answer: "Peanut butter!"
	},
	{
		question: "What is hard and hairy on the outside, soft and wet on the inside? The word begins with 'c', ends in 't', and there’s a 'u' and an 'n' between them.",
		answer: "A coconut!"
	},
	{
		question: "My business is briefs. I’m a cunning linguist. I plead and plead for it regularly. What am I?",
		answer: "A lawyer!"
	},
	{
		question: "Name a word that starts with 'f' and ends with 'u-c-k'?",
		answer: "Firetruck!"
	},
	{
		question: "I have a stiff shaft. My tip penetrates. I come with a quiver. What am I?",
		answer: "An arrow!"
	},
	{
		question: "I go in hard but come out soft, and I never mind if you want to blow me. What am I?",
		answer: "Bubblegum!"
	},
	{
		question: "How do you find a blind man in a nudist colony?",
		answer: "It's not hard!"
	}
];