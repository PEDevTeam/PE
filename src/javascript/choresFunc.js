window.choresFunc={
	choresPercentCalc: function() {
		var ca=0;
		var cd=0;
		var chores=State.active.variables.chores;
		var player=State.active.variables.player;
		var time=State.active.variables.time;
		for (var i=0; i < choresList.length; i++) {
			if (chores[i].active && (choresList[i].daringRequired <= player.daring) && (choresList[i].perversionRequired <= player.perversion.guardian) && (choresList[i].perversionMax >= player.perversion.guardian)) {
				ca++;
				if ((chores[i].dayPerformed + choresList[i].daysWait) >= time.day) {
					cd++;
				}
			}
		}
		if (ca <= 0) { ca=1; }
		ca=Math.floor(100*cd/ca);
		return ca;
	},
	choresRequired: function() {
		var chores=State.active.variables.chores;
		var player=State.active.variables.player;
		for (var i=0; i < choresList.length; i++) {
			if (chores[i].active && choresList[i].required && (choresList[i].daringRequired <= player.daring) && (choresList[i].perversionRequired <= player.perversion.guardian) && (choresList[i].perversionMax >= player.perversion.guardian)) {
				return true;
			}
		}
		return false;
	},
	choresAvailable: function() {
		var ca=0;
		var chores=State.active.variables.chores;
		var player=State.active.variables.player;
		var time=State.active.variables.time;
		for (var i=0; i < choresList.length; i++) {
			if (chores[i].active && (choresList[i].daringRequired <= player.daring) && (choresList[i].perversionRequired <= player.perversion.guardian) && (choresList[i].perversionMax >= player.perversion.guardian)) {
				if (chores[i].dayPerformed + choresList[i].daysWait <= time.day) {
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
		for (var i=0; i < choresList.length; i++) {
			if (chores[i].active && chores[i].fail && (choresList[i].daringRequired <= player.daring) && (choresList[i].perversionRequired <= player.perversion.guardian) && (choresList[i].perversionMax >= player.perversion.guardian)) {
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
		var r=this.choresRequired() && ((time.hour >= maxHour) || (time.hour < 6));
		return w || d || r;
	}
}
