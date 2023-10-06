window.misc={
	unpostponeClothes_d: function(type) {
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
	toggleKink: function(kink) {
		if (kink) {return "checked"}
		return "unchecked";
	},
	// getSnoopItems: function() {
	// 	var ra=[];
	// 	var sia=[itemsC.pantiesCotton, itemsC.vibrator, itemsC.playgirlMagazine];
	// 	var pantiesVar = window.itemF.itemTwee("pantiesCotton");
	// 	for (var i=0; i < sia.length; i++) {
	// 		if (sia[i] == itemsC.pantiesCotton && playerCode.owns(sia[i]) && !pantiesVar.ownAlt[40]){
	// 			ra.push(sia[i]);
	// 		}
	// 		else if (!playerCode.owns(sia[i])) {
	// 			ra.push(sia[i]);
	// 		}
	// 	}
	// 	return ra;
	// },
	getSnoopItems: function() {
		if(SugarCube.State){
            var actVar = SugarCube.State.active.variables;
        }
        else{
            var actVar = State.active.variables;
		}
		
		var snoopItems=[];
		for(var snoopItemIdx in window.misc.snoopItems){
			var snoopItem = window.misc.snoopItems[snoopItemIdx];
			if(snoopItem.type == "itemVariant"){
				if(!(window.inventoryFuncs.checkItemInInventory(snoopItem.item))){
					snoopItems.push(snoopItem);
				}
			}
			else{
				if(!(actVar.player[snoopItem.item])){
					snoopItems.push(snoopItem);
				}
			}
		}
		return snoopItems;
	},
	wager: {
		calculate: function() {
			var player=State.active.variables.player;
			if (player.daring >= 5) {
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
			if (body.semiAss == 2) { cost+=body.ass.level2.cost; }
			if (body.semiAss == 1) { cost+=body.ass.level1.cost; }
		}
		if (body.semiLips > body.permLips) {
			if (body.semiLips == 2) { cost+=body.lips.level2.cost; }
			if (body.semiLips == 1) { cost+=body.lips.level1.cost; }
		}
		if (body.semiManicure > body.permManicure) {
			if (body.semiManicure == 2) { cost+=body.manicure.level2.cost; }
			if (body.semiManicure == 1) { cost+=body.manicure.level1.cost; }
		}
		if (body.semiBoobs > body.permBoobs) {
			if (body.semiBoobs == 4) { cost+=body.boobs.level4.cost; }
			if (body.semiBoobs == 3) { cost+=body.boobs.level3.cost; }
			if (body.semiBoobs == 2) { cost+=body.boobs.level2.cost; }
			if (body.semiBoobs == 1) { cost+=body.boobs.level1.cost; }
		}
		if (body.semiMakeup > body.permMakeup) {
			if (body.semiMakeup == 4) { cost+=body.makeup.level4.cost; }
			if (body.semiMakeup == 3) { cost+=body.makeup.level3.cost; }
			if (body.semiMakeup == 2) { cost+=body.makeup.level2.cost; }
			if (body.semiMakeup == 1) { cost+=body.makeup.level1.cost; }
		}
		if (body.semiAnal > body.permAnal) {
			if (body.semiAnal == 3) { cost+=body.anal.level3.cost; }
			if (body.semiAnal == 2) { cost+=body.anal.level2.cost; }
			if (body.semiAnal == 1) { cost+=body.anal.level1.cost; }
		}
		cost = 10*Math.round(cost/20);
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
	getMallOnMouseOver: function(image, description, isItemSet, setName){
		var ip=document.getElementById('item_preview_mall');
		ip.src='Images/items/' + image + '';
		ip.className=''; 
		var ipd = document.getElementById('item_preview_description_mall'); 
		ipd.textContent=description;
		ipd.className='';
		var ips = document.getElementById('item_preview_set_mall');
		if(isItemSet){
			ips.className='tooltip';
			var itemVariantSetLogoText = document.createTextNode("👙 ");
			var itemVariantSetLogoSpan = document.createElement('span');
			var itemVariantSetText = document.createTextNode(setName);
			var itemVariantSetSpan = document.createElement('span');
			var itemVariantSetTooltipText = document.createTextNode("This item is part of a set, wear with other clothing with the same set name to match!");
			var itemVariantSetTooltipSpan = document.createElement('span');
			itemVariantSetLogoSpan.id = "itemVariantSetLogoSpan";
			itemVariantSetLogoSpan.classList.add('item-set-icon');
			itemVariantSetLogoSpan.appendChild(itemVariantSetLogoText);
			itemVariantSetSpan.id = "itemVariantSetSpan";
			itemVariantSetSpan.appendChild(itemVariantSetText);
			itemVariantSetTooltipSpan.id = "itemVariantSetTooltipSpan";
			itemVariantSetTooltipSpan.classList.add("tooltiptext");
			itemVariantSetTooltipSpan.appendChild(itemVariantSetTooltipText)
			ips.appendChild(itemVariantSetLogoSpan);
			ips.appendChild(itemVariantSetSpan);
			ips.appendChild(itemVariantSetTooltipSpan);
		}
	},
	getMallOnMouseOut: function(){
		document.getElementById('item_preview_mall').className='hidden'; 
		document.getElementById('item_preview_description_mall').className='hidden'
		document.getElementById('item_preview_set_mall').className='hidden'
		document.getElementById('item_preview_set_mall').innerHTML = '';
	},
	snoopItems: [
		{
			item: 'panties_cotton_40',
			type: 'itemVariant',
			name: 'panties',
		},
		{
			item: 'panties_sexy_40',
			type: 'itemVariant',
			name: 'g-string',
		},
		{
			item: 'panties_latex_40',
			type: 'itemVariant',
			name: 'latex panties',
		},
		{
			item: 'hasPlaygirl',
			type: 'variable',
			name: 'playgirl magazine',
		},
		{
			item: 'hasVibrator',
			type: 'variable',
			name: 'vibrator',
		}
	]
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
		question: "Some people prefer being on top, others prefer being on the bottom, and it always involves a bed. What is it?",
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
