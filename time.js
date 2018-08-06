window.days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.timeCode={
	weekDay: function() {
		return State.active.variables.time.day % 7;
	},
	guardian: {
		isAwake: function() {
			return (State.active.variables.time.hour * 60 + State.active.variables.time.minute) >= (State.active.variables.time.guardian.wakeHour * 60 + State.active.variables.time.guardian.wakeMinute);
		},
		isShowering: function() {
			var t=(State.active.variables.time.hour * 60 + State.active.variables.time.minute) - (State.active.variables.time.guardian.wakeHour * 60 + State.active.variables.time.guardian.wakeMinute);
			return (t >= 0) && (t <= (State.active.variables.player.alarmClockGuardian ? 30 : 15));
		}
	},
	addMinutes: function(minutes) {
		State.active.variables.time.minute+=minutes;
		while (State.active.variables.time.minute >= 60) {
			this.addHours(1);
			State.active.variables.time.minute-=60;
		}
	},
	addHours: function(hours) {
		State.active.variables.time.hour+=hours;
		while (State.active.variables.time.hour >= 24) {
			State.active.variables.time.day++;
			State.active.variables.time.hour-=24;
		}
	},
	newDay: function() {
		if ((State.active.variables.time.day == 0) || (State.active.variables.time.hour >= 15)) {
			State.active.variables.time.day++;
		}
		State.active.variables.time.guardian.wakeHour=8;
		State.active.variables.time.guardian.wakeMinute=0;
		if (window.playerCode.owns(State.active.variables.items.alarmClock) || window.playerCode.isMaid()) {
			State.active.variables.time.hour=7;
			State.active.variables.time.minute=30;
			if (!State.active.variables.player.alarmClockGuardian) {
				State.active.variables.time.guardian.wakeMinute=window.randomCode.getIntInclusive(1, 3)*15;
			}
		} else if (State.active.variables.player.alarmClockGuardian) {
			State.active.variables.time.hour=8;
			State.active.variables.time.minute=0;
		} else {
			State.active.variables.time.hour=8;
			State.active.variables.time.minute=0;
			this.addMinutes(window.randomCode.getIntInclusive(1, 14)*5);
			State.active.variables.time.guardian.wakeHour=State.active.variables.time.hour;
			State.active.variables.time.guardian.wakeMinute=State.active.variables.time.minute;
		}
		if (State.active.variables.player.blowjobsToday > State.active.variables.player.maxBlowjobs) {
			State.active.variables.player.maxBlowjobs++;
			State.active.variables.player.flags.moreBlowjobs=true;
		} else {
			State.active.variables.player.flags.moreBlowjobs=false;		
		}
		State.active.variables.player.blowjobsToday=0;
		State.active.variables.player.flags.bribePaid=false;
		State.active.variables.player.flags.bribeFail=false;
		window.dreamgameCode.state.reset();
		window.coachgameCode.state.reset();
	},
	isWeekend: function() {
		return (State.active.variables.time.day % 7 == 0) || (State.active.variables.time.day % 7 == 6);
	},
	isMonday: function() {
		return (State.active.variables.time.day % 7 == 1);
	},
	isFriday: function() {
		return (State.active.variables.time.day % 7 == 5);
	},
	isThursday: function() {
		return (State.active.variables.time.day % 7 == 4);
	},
	isSaturday: function() {
		return (State.active.variables.time.day % 7 == 6);
	},
	isSunday: function() {
		return (State.active.variables.time.day % 7 == 0);
	},
	minutesToStr: function(minutes) {
		var m=minutes;
		var d=Math.floor(m / 1440);
		m-=d*1440;
		var h=Math.floor(m / 60);
		var s='';
		if (d > 0) {
			s=d + ' day' + (d > 1 ? 's' : '');
		}
		if (h > 0) {
			if (d > 0) {
				s+=', ';
			}
			s+=h + ' hour' + (h > 1 ? 's' : '');
		}
		if (d == 0 && h == 0) {
			return 'Just now';
		} else {
			return s + ' ago';
		}
	}
}