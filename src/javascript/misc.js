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
		}
		if (!State.active.variables.incest) {
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
	getSnoopItems: function() {
		var ra=[];
		var sia=[itemsC.pantiesCotton, itemsC.vibrator, itemsC.playgirlMagazine, itemsC.pantiesLatex, itemsC.gString];
		for (var i=0; i < sia.length; i++) {
			if (!playerCode.owns(sia[i])) {
				ra.push(sia[i]);
			}
		}
		return ra;
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
	calcSemiPermCost: function() {
		var player=State.active.variables.player;
		var items=window.itemsC;
		var cost=0;
		if (player.semiPermAss > player.permAss) {
			if (player.semiPermAss == 1) { cost+=items.AssEnhancingXL.cost; }
			if (player.semiPermAss == 1) { cost+=items.AssEnhancing.cost; }
		}
		if (player.semiPermLips > player.permLips) {
			if (player.semiPermLips == 1) { cost+=items.LipsEnhancingXL.cost; }
			if (player.semiPermLips == 1) { cost+=items.LipsEnhancing.cost; }
		}
		if (player.semiPermManicure > player.permManicure) {
			if (player.semiPermManicure == 1) { cost+=items.GarishManicure.cost; }
			if (player.semiPermManicure == 1) { cost+=items.Manicure.cost; }
		}
		if (player.semiPermBoobs > player.permBoobs) {
			if (player.semiPermBoobs == 4) { cost+=items.breastImplantsDD.cost; }
			if (player.semiPermBoobs == 3) { cost+=items.breastImplantsC.cost; }
			if (player.semiPermBoobs == 2) { cost+=items.breastImplantsB.cost; }
			if (player.semiPermBoobs == 1) { cost+=items.breastImplantsA.cost; }
		}
		if (player.semiPermMakeup > player.permMakeup) {
			if (player.semiPermMakeup == 4) { cost+=items.HeavyMakeup.cost; }
			if (player.semiPermMakeup == 3) { cost+=items.BimboMakeup.cost; }
			if (player.semiPermMakeup == 2) { cost+=items.NormalMakeup.cost; }
			if (player.semiPermMakeup == 1) { cost+=items.SubtleMakeup.cost; }
		}
		if (player.semiPermAnal > player.permAnal) {
			if (player.semiPermAnal == 3) { cost+=items.analSmoothing3.cost; }
			if (player.semiPermAnal == 2) { cost+=items.analSmoothing2.cost; }
			if (player.semiPermAnal == 1) { cost+=items.analSmoothing1.cost; }
		}
		cost = 10*Math.round(cost/20);
		return cost;
	},
}
