window.weekdaysCode=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.timeCode={
	weekDay: function() {
		return State.active.variables.time.day % 7;
	},
	weekDayText: function() {
		return window.weekdaysCode[State.active.variables.time.day % 7];
	},
	guardian: {
		isAwake: function() {
			var time=State.active.variables.time;
			return (time.hour * 60 + time.minute) >= (time.guardian.wakeHour * 60 + time.guardian.wakeMinute);
		},
		isShowering: function() {
			var time=State.active.variables.time;
			var t=(time.hour * 60 + time.minute) - (time.guardian.wakeHour * 60 + time.guardian.wakeMinute);
			return (t >= 0) && (t <= (State.active.variables.player.alarmClockGuardian ? 30 : 15));
		}
	},
	minutes: function() {
		var time=State.active.variables.time;
		return (time.day * 1440 + time.hour * 60 + time.minute);
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
		var time=State.active.variables.time;
		var player=State.active.variables.player;
		if ((time.day == 0) || (time.hour >= 15)) {
			time.day++;
		}
		time.guardian.wakeHour=8;
		time.guardian.wakeMinute=0;
		if (window.playerCode.owns(window.itemsC.alarmClock) || window.playerCode.isMaid()) {
			time.hour=7;
			time.minute=30;
			if (!player.alarmClockGuardian) {
				time.guardian.wakeMinute=window.randomCode.getIntInclusive(1, 3)*15;
			}
		} else if (player.alarmClockGuardian) {
			time.hour=8;
			time.minute=0;
		} else {
			time.hour=8;
			time.minute=0;
			this.addMinutes(window.randomCode.getIntInclusive(1, 14)*5);
			time.guardian.wakeHour=time.hour;
			time.guardian.wakeMinute=time.minute;
		}
		if (player.blowjobsToday > player.maxBlowjobs) {
			player.maxBlowjobs++;
			player.flags.moreBlowjobs=true;
		} else {
			player.flags.moreBlowjobs=false;		
		}
		player.blowjobsToday=0;
		player.flags.bribePaid=false;
		player.flags.bribeFail=false;
		window.dreamMinigame.reset();
		//window.coachgameCode.state.reset();
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
	},
	canSleep: function() {
		var time=State.active.variables.time;
		return (time.hour < 5) || (time.hour >= 15);
	},
	canNap: function() {
		var time=State.active.variables.time;
		return (time.hour >= 5) && (time.hour <= 21);
	},
	canWhore: function() {
		var time=State.active.variables.time;
		var player=State.active.variables.player;
		return (player.perversion.teacher >= 8) && (time.hour >= 19) && (time.hour <= 23);
	},
	canWork: function() {
		var time=State.active.variables.time;
		var player=State.active.variables.player;
		return this.isWeekend() && (time.hour >= 8) && (time.hour < 14) && (time.day > player.workLastDay);
	},
	isMallOpen: function() {
		var time=State.active.variables.time;
		return (time.hour >= 8) && (time.hour <= 18) && ((time.day % 7 != 1) || (time.hour >= 15));
	},
	isArcadeOpen: function() {
		var time=State.active.variables.time;
		return (time.hour >= 10) && (time.hour < 17);
	},
	haveSchool: function() {
		var time=State.active.variables.time;
		return !this.isWeekend() && (time.hour >= 7) && (time.hour < 12);
	},
	schoolRequired: function() {
		var time=State.active.variables.time;
		if ((time.day % 7 == 1) && (time.hour < 15)) {
			return true;
		}
		return false;
	},
	needTherapy: function() {
		var time=State.active.variables.time;
		var player=State.active.variables.player;
		var b=(timeCode.isMonday()) && (time.hour >= 15);
		var d=(!timeCode.isMonday()) && (time.hour >= 8);
		return player.therapistMode && (player.therapistDays.indexOf(time.day % 7) >= 0) && (player.therapistLastDay < time.day) && (b || d) && (time.hour < 21);
	},
	schoolMessage: function() {
		var time=State.active.variables.time;
		if (time.hour >= 20) {
			return "It's night time.";
		} else if (!this.isWeekend()) {
     		if (time.hour < 9) {
				return "You have school today.";
			} else if (time.hour < 12) {
				return "You're running late for school.";
			} else if (time.hour < 15) {
				return "It's too late to bother about school today.";
			} else {
				return "School is over for the day.";
			}
		} else {
			return "It's the weekend, so no school today.";
		}
	},
}
