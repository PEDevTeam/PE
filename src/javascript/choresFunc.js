window.choresFunc={
	choresPercentCalc: function() {
		var ca=0;
		var cd=0;
		var chores=State.active.variables.chores;
		var player=State.active.variables.player;
		var time=State.active.variables.time;
		for (var i=0; i < Object.keys(choresList).length; i++) {
			var choreC = choresList[Object.keys(choresList)[i]];
			var choreV = chores[Object.keys(choresList)[i]];
			if (choreV.active && (choreC.daringRequired <= player.daring) && (choreC.perversionRequired <= player.perversion.guardian) && (choreC.perversionMax >= player.perversion.guardian)) {
				ca++;
				if ((choreV.dayPerformed + choreC.daysWait) >= time.day && (!choreV.hardFail)) {
					cd++;
				}
			}
		}
		if (ca <= 0) { ca=1; }
		ca=Math.floor(100*cd/ca);
		return ca;
	},
	choresAvailable: function() {
		var ca=0;
		var chores=State.active.variables.chores;
		var player=State.active.variables.player;
		var time=State.active.variables.time;
		for (var i=0; i < Object.keys(choresList).length; i++) {
			var choreC = choresList[Object.keys(choresList)[i]];
			var choreV = chores[Object.keys(choresList)[i]];
			if (choreV.active && (choreC.daringRequired <= player.daring) && (choreC.perversionRequired <= player.perversion.guardian) && (choreC.perversionMax >= player.perversion.guardian)) {
				if (choreV.dayPerformed + choreC.daysWait <= time.day) {
					ca++;
				}
			}
		}
		return ca;
	},
	choresFails: function() {
		var cf=0;
		var chores=State.active.variables.chores;
		var player=State.active.variables.player;
		for (var i=0; i < Object.keys(choresList).length; i++) {
			var choreC = choresList[Object.keys(choresList)[i]];
			var choreV = chores[Object.keys(choresList)[i]];
			if (choreV.active && choreV.fail && (choreC.daringRequired <= player.daring) && (choreC.perversionRequired <= player.perversion.guardian) && (choreC.perversionMax >= player.perversion.guardian)) {
				cf++;
			}
		}
		return cf;
	},
	canPerformChores: function() {
		var maxHour=21;
		var minHour=8;
		var minHourWork=15;
		var time=State.active.variables.time;
		var w=window.timeCode.isWeekend() && (time.hour >= minHour) && (time.hour < maxHour);
		var d=(time.hour >= minHourWork) && (time.hour < maxHour);
		return w || d;
	}
}
