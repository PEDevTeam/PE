window.tasksFunction = {
	newTask: function(tasks) {
		var player=State.active.variables.player;
		var time=State.active.variables.time;
		var tl=[];  // list of available tasks
		var ct=0;   // chance total
		var sp=0;   // highest start priority
		for (var i=0; i < Object.keys(tasks).length; i++) {
			var task=tasks[Object.keys(tasks)[i]];
			var taskV=this.getVariableObject(task.id);
			if ((taskV.status == 0) && taskV.canStart && (task.canStartDays.indexOf(time.weekDay()) >= 0) && ((taskV.startDay + task.cooldown) < time.day) && (player.perversion.guardian >= task.perversion.guardian.min) && (player.perversion.guardian <= task.perversion.guardian.max) && (player.perversion.teacher >= task.perversion.teacher.min) && (player.perversion.teacher <= task.perversion.teacher.max) && (player.perversion.therapist >= task.perversion.therapist.min) && (player.perversion.therapist <= task.perversion.therapist.max) && task.Conditions()) {
				var priority=task.startPriority;
				if (taskV.startPriority != null) {
					priority=taskV.startPriority;
				}
				if (priority > sp) {
					tl=[];
					ct=0;
					sp=priority;
				}
				if (priority >= sp) {
					tl.push(task);
					ct+=task.chance;
				}
			}
		}
		if (tl.length == 0) {
			return;
		}
		var rt=window.randomCode.getIntInclusive(1, ct);
		for (var i=0; i < tl.length; i++) {
			rt-=tl[i].chance;
			if (rt <= 0) {
				var tlV=this.getVariableObject(tl[i].id);
				if (tl[i].id != "noTasksToday") {
					tlV.status=1;
					tlV.startDay=time.day;
				}
				return tl[i];
			}
		}
	},
	getVariableObject: function(taskId) {
		var task;
		
		task=State.active.variables.tasksTeacher[taskId];
		if (task != null) { return task }
		
		task=State.active.variables.tasksTeacherBody[taskId];
		if (task != null) { return task }
		
		task=State.active.variables.tasksEmail[taskId];
		if (task != null) { return task }

		return false;
	},
	activeTasks: function(tasks) {
		var tl=[];
		for (var i=0; i < Object.keys(tasks).length; i++) {
			var task=tasks[Object.keys(tasks)[i]];
			var taskV=this.getVariableObject(task.id);
			if (taskV.status > 0) {
				tl.push(task);
			}
		}
		return tl;
	},
	isTaskOverDue: function(task) {
		var time=State.active.variables.time;
		var taskV = this.getVariableObject(task.id);
		return time.day-taskV.startDay >= task.maxDays;
	},
	isTaskComplete: function(task) {
		var taskV = this.getVariableObject(task.id);
		return taskV.status == 2;
	},
	taskComplete: function(task) {
		var taskV = this.getVariableObject(task.id);
		if (taskV == null) {
			var errorString = "Error: no task with ID = @@.errorLog;"+task.id+"@@";
			state.active.variables.errorLog.push(errorString);
		}
		taskV.status = 2;
	},
	isTaskFail: function(task) {
		var taskV = this.getVariableObject(task.id);
		return taskV.status == 3;
	},
	taskRewardDebt: function(task) {
		var taskV = this.getVariableObject(task.id);
		if (taskV.rewardDebt != null) { return taskV.rewardDebt; }
		return task.rewardDebt;
	},
	taskRewardMoney: function(task) {
		var taskV = this.getVariableObject(task.id);
		if (taskV.rewardMoney != null) { return taskV.rewardMoney; }
		return task.rewardMoney;
	},
	emailPriority: function(task) {
		var oV;
		if (task == null) {
			return false;
		}
		if (task.startPriority == null) {
			return 0;
		}
		var startPriority=task.startPriority;
		var tasksEmail=State.active.variables.tasksEmail;
		oV=tasksEmail[task.id];
		if ((oV != null) && (oV.startPriority != null)) {
			startPriority = oV.startPriority;
		}
		return startPriority;
	},
	getTaskText: function(taskName, textObj, whichText) {
		if (!(whichText in textObj)) {
			return 'ERROR: getTaskText, task ' + taskName + ' does not have a member named ' + whichText;
		}
		var textProp = textObj[whichText];
		if (Array.isArray(textProp)) {
			var len = textProp.length;
			if (len < 1) {
				return 'ERROR: task ' + taskName + ' has empty array for text ' + whichText;
			}
			var i = Math.floor(Math.random() * len);
			return textProp[i];
		} else if (typeof(textProp) === 'function') {
			return textProp.call();
		} else {
			return textProp;
		}
	}
},

window.tasksTeacher={
	corsetTraining: {
		id: "corsetTraining",
		name:"Task Corset training",
		text: {
			given: "You have to sleep all night in a corset.",
			perform: "Despite your exhaustion, you struggle to get to sleep. The corset squeezes you incessantly, barely letting you get enough air to breathe.  Even yawning is painful. [[Go to sleep|Good morning][window.timeCode.newDay()]]",
			finish: "$teacher widely smiles.\n\n@@.teacher;\"I didn't want to tell you in class, but this looks great on you $player.name.@@",
			fail: "You're a bad, bad boy",
			reminder: "Don't forget about your corset training",
			checkMe: {
				given: "take a selfie at the public toilets while wearing female clothes.",
				finish: "You did it.",
				fail: "You failed to do that.",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: false,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	complexTemplate: {
		id: "complexTemplate",
		name:"Task complex template",
		text: {
			given: function() {
			const texts = ['Given 1', 'Given 2', 'Given ..', 'Given Rest'];
			let p = State.active.variables.tasksTeacher.taskName.progress;
			let index = Math.max(0, Math.min(p, texts.length - 1));
			return givens[index];
			},
			perform: "Perform text",
			finish: function() {
				const texts = ['Finish 1', 'Finish 2', 'Finish ..', 'Finish N'];
				const rnd_t = ['Finish rnd1', 'Finish ..', 'Finish rndN'];
				let p = State.active.variables.tasksTeacher.taskName.progress;
				if (p > texts.length) {
					let index = Math.floor(Math.random() * rnd_t.length);
					return rnd_t[index];
				} else {
					return finish[Math.max(0, p - 1)];
				}
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: false,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	trialChastity: {	// perv 2
		id: "trialChastity",
		name:"Task Trial chastity",
		text: {
			given: "I am not unreasonable. The items you will need are not cheap, so I will help you out. One of my friends has informed me there is an adult toy company undertaking some form of market research. You can inquire about it at the local adult store. I will put in a call to my friend for you later, just in case.",
			perform: "",
			finish: "$teacher smiles, looking smug, and you blush furiously knowing the reason.\n\n@@.teacher;\"I heard from my friend about your results. It was fascinating to hear just how much my advice helped you.@@",
			fail: "Hmm. You chose not to participate in the market research? It's your loss alone if you refuse my help. Take a mark.",
			reminder: "I hope you're going to be very thorough at my tasks.",
			checkMe: {
				given: "to check a market research at local adult store.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!playerCode.owns(itemsC.chastityDevice));
		},
		image: "",
		startPriority: 2,  // see priority system above
		canStart: false,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 2, max: 2 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 9,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 40,
		rewardDebt: 0,
		failPenalty: 0,
		events: {
			start: function() {
				State.active.variables.tasksTeacher.trialChastity.canStart = false;
			},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},

	selfieNightwear: {	// perv 3-4, cross 0-2
		id: "selfieNightwear",
		name:"Task Nightwear selfie",
		text: {
			given: "I have a special task for you today. Take a selfie while wearing sexy nightwear that shows your chastity cage.",
			perform: "",
			finish: "$teacher sends a copy of your sexy-nightwear selfie to her phone.\n\n@@.teacher;\"I think I'll keep this one.@@",
			fail: "Is it so hard to take a simple selfie? Such a disappointment. Take a mark for your lack of effort.",
			reminder: "Don't forget to take the selfie I was talking about.",
			checkMe: {
				given: "take a selfie while wearing a sexy nightie.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!playerCode.owns(itemsC.silkyTeddy)) || ((!State.active.variables.therapistTalks.talkNightwear.start) && [1,2].includes(State.active.variables.player.perversion.guardian)) || [0,1,2].includes(State.active.variables.player.perversion.crossdressTasks);
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 1, max: 10 }
		},
		chance: 20,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 50,
		failPenalty: 1,
		events: {
			start: function() {
				State.active.variables.tasksTeacher.selfieNightwear.startPriority = 0;
				State.active.variables.tasksTeacher.selfieNightwear.progress++;
				if (State.active.variables.player.perversion.crossdressTasks < 3) {
					State.active.variables.player.perversion.crossdressTasks++;
				}
			},
			finish: function() { return true; },
			success: function() {
				if (State.active.variables.tasksTeacher.selfieNightwear.progress >= 2) {
					State.active.variables.tasksTeacher.selfieNightwear.canStart = false;
				}
			},
			fail: function() { return false; }
		}
	},
	selfieFemaleClothes: {	// perv 3-3, cross 0-2
		id: "selfieFemaleClothes",
		name:"Task Female clothes selfie",
		text: {
			given: "I have a task for you today. Take a photo of yourself wearing female clothes.",
			perform: "",
			finish: "$teacher takes your phone and looks at the photo.\n\n@@.teacher;\"It suits you, $player.name. I think you should dress up like this more often.@@",
			fail: "How difficult could it be to simply put clothing on as instructed? Disappointing, $player.name! Take a mark.",
			reminder: "Don't forget to take that selfie I was talking about.",
			checkMe: {
				given: "take a selfie while wearing female clothes.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks <= 2);
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 20,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.selfieFemaleClothes.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 3) {
					State.active.variables.player.perversion.crossdressTasks++;
				}
			},
			fail: function() { return false; }
		}
	},
	selfieHomeMakeup: {	// perv 3-3, cross 0-2
		id: "selfieHomeMakeup",
		name:"Task Apply makeup",
		text: {
			given: "I have a task for you today. You need to try some things to understand women better. Film yourself applying makeup - lipstick, eyeshadow and so on. I want to see a real effort.",
			perform: "",
			finish: "$teacher takes your phone and watches the video.\n\n@@.teacher;\"Hmm, your first try was pitiful. The second too, but I see that you actually tried towards the end. You are clearly a beginner, $player.name, but you should keep at it - you'll learn eventually.  Until you do, you can always get help from the professionals if you want your makeup done right.@@",
			fail: "You did not even try to apply makeup? I am disappointed. Take a mark for not bothering.",
			reminder: "Don't forget to try applying makeup.",
			checkMe: {
				given: "try applying makeup.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks <= 2) && !playerCode.haveMakeup();
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.selfieHomeMakeup.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 3) {
					State.active.variables.player.perversion.crossdressTasks++;
				}
			},
			fail: function() { return false; }
		}
	},

	tryingClothesMall: {	// perv 3-3, cross 3-5, fem 30-34
		id: "tryingClothesMall",
		name:"Task Trying on clothes at Mall",
		text: {
			given: "I have a task for you today. I think you need to experiment more. Film yourself trying on dresses at one of local clothing stores.",
			perform: "",
			finish: "$teacher watches the video of you trying on dresses and burst out in laughter.\n\n@@.teacher;\"Ahahaha, your face when the zipper stuck. Oh, my - it's priceless.@@",
			fail: "I suppose your schedule was probably too busy to do what I asked. Take a mark for forgetting your trip to the clothing store.",
			reminder: "Don't forget to go and try on dresses.",
			checkMe: {
				given: "film yourself trying on different dresses at the clothing store.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return [3,4,5].includes(State.active.variables.player.perversion.crossdressTasks) || window.playerCode.femRange(30,34);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		feminization:	{ min: 0, max: 10 },
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=3;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.tryingClothesMall.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 6) {
					State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 4);
				}
			},
			fail: function() { return false; }
		}
	},
	posingSeductively: {	// perv 3-3, cross 3-5, fem 30-34
		id: "posingSeductively",
		name:"Task Pose seductively",
		text: {
			given: "I have a task for you today. I want you to work on your posing skills. Put on some fancy dress and make few photos, as seductive as possible.",
			perform: "",
			finish: "$teacher checks your photos, looking pleased. Suddenly her eyes widen and she shows a picture of you in a very compromising pose. You must have somehow missed the photo and haven't erased it like the rest.\n\n@@.teacher;\"Oh my, I didn't expect you to be so... enthusiastic about my task.\"@@\n\nEmbarrassed, you lower your eyes and curse your luck.\n\n@@.teacher;\"Good boy.@@",
			fail: "Ignoring my requests? You test my patience. Take a mark to refocus your attention.",
			reminder: "Don't forget about my task.",
			checkMe: {
				given: "make photos of yourself posing seductively in female clothes.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return [3,4,5].includes(State.active.variables.player.perversion.crossdressTasks) || window.playerCode.femRange(30,34);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=3;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.posingSeductively.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 6) {
					State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 4);
				}
			},
			fail: function() { return false; }
		}
	},
	danceAtHome: {	// perv 3-3, cross 3-5, fem 30-34
		id: "danceAtHome",
		name:"Task Dance at home",
		text: {
			given: "I have a task for you. I want you to put on a dress and dance on camera. But not just any kind of dance: do something slow and sensual.",
			perform: "",
			finish: "$teacher watches the video of you dancing. She raises an eyebrow and comments, @@.teacher;\"Better than I expected. Good, $player.name.@@",
			fail: "Too timid to make even a token attempt? What a disappointment. Take a mark for your cowardice.",
			reminder: "Don't forget about my task.",
			checkMe: {
				given: "film yourself dancing.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return [3,4,5].includes(State.active.variables.player.perversion.crossdressTasks) || window.playerCode.femRange(30,34);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=3;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.danceAtHome.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 6) {
					State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 4);
				}
			},
			fail: function() { return false; }
		}
	},
	
	crossdressAroundBlock: {	// perv 3-3, cross 6-8, fem 35-39
		id: "crossdressAroundBlock",
		name:"Task Crossdress around block",
		text: {
			given: "I have an interesting task for you. I think you need to be bolder in your experiments. Dress as a girl and go outside for a bit. I will need some photos as a proof.",
			perform: "",
			finish: "$teacher looks at the photos.\n\n@@.teacher;\"Good - not so scary after all, right? Look at your flushed face, I knew you would like it.@@",
			fail: "I see I have no photos from the simple trip outside I asked you to take. You must not take my requests seriously. Take a mark.",
			reminder: "Don't forget about my task.",
			checkMe: {
				given: "take photos of yourself outside in girls clothes.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return [6,7,8].includes(State.active.variables.player.perversion.crossdressTasks) || window.playerCode.femRange(35,39);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=6;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.crossdressAroundBlock.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 9) {
					State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 7);
				} else {
					window.events.record('readyOutsideDress');
				}
			},
			fail: function() { return false; }
		}
	},
	crossdressAtPark: {	// perv 3-3, cross 6-8, fem 35-39
		id: "crossdressAtPark",
		name:"Task Crossdress at the park",
		text: {
			given: "I have an interesting task for you. I think you need to experiment a bit more. I want few photos of you at the park, dressed as a girl.",
			perform: "",
			finish: "$teacher looks at the photos.\n\n@@.teacher;\"Pretty good. You look like you enjoyed it there.@@",
			fail: "You missed your outing at the park? Most disappointing, $player.name. Take a mark.",
			reminder: "Don't forget about my task.",
			checkMe: {
				given: "photograph yourself at the park wearing girls' clothes.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return [6,7,8].includes(State.active.variables.player.perversion.crossdressTasks) || window.playerCode.femRange(35,39);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=6;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.crossdressAtPark.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 9) {
					State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 7);
				} else {
					window.events.record('readyOutsideDress');
				}
			},
			fail: function() { return false; }
		}
	},
	crossdressOnline: {	// perv 3-3, cross 6-8, fem 35-39
		id: "crossdressOnline",
		name:"Task Crossdress online",
		text: {
			given: "I have a task for you. I think you should learn more about taking care of your appearance. I want you to post a few of your selfies on an online discussion board, and ask how they look. You can keep it decent and leave your face out of the picture, but send me the link as proof.",
			perform: "",
			finish: "$teacher smirks.\n\n@@.teacher;\"I saw the comments. It seems you could be quite popular if you chose to. It feels good to be appreciated, right?@@",
			fail: "I missed your link. Oh, you skipped my assignment? Pathetic. Take a mark for it.",
			reminder: "Do not forget about my task.",
			checkMe: {
				given: "to post your crossdressing selfies online.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return [6,7,8].includes(State.active.variables.player.perversion.crossdressTasks) || window.playerCode.femRange(35,39);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=6;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.crossdressOnline.canStart=false;
				if (State.active.variables.player.perversion.crossdressTasks < 9) {
					State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 7);
				} else {
					window.events.record('readyOutsideDress');
				}
			},
			fail: function() { return false; }
		}
	},
	
	windowshopping: {	// perv 3-4, cross 9+, fem 40-60
		id: "windowshopping",
		name:"Task Windowshopping",
		text: {
			given: "I have a special task for you today. Take several photos of yourself strolling around the mall dressed as a girl, window-shopping for girly things while locked in chastity. Please be sure to include your butt-plug.",
			perform: "",
			finish: "$teacher checks the photos on your phone. \n\n@@.teacher;\"Looking good. I especially like the upskirt shot.@@",
			fail: "You did not have the time to go for a walk? Are you this disobedient because you like to be punished? Have a mark, then.",
			reminder: "Don't forget to photograph yourself window-shopping.",
			checkMe: {
				given: "stroll around window-shopping for girly stuff while wearing a dress, chastity cage, and butt-plug.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 9) || window.playerCode.femRange(40,60);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 5,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				window.events.record('readyOutsideDress');
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=9;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 10);
			},
			fail: function() { return false; }
		}
	},
	suckPopsickle: {	// perv 3-4, cross 9+, fem 40-60
		id: "suckPopsickle",
		name:"Task Suck popsickle",
		text: {
			given: "I have a special task for you today. Dress as a girl and suck a popsicle suggestively in a public place.",
			perform: "",
			finish: "$teacher watches your video of you sucking the popsicle.\n\n@@.teacher;\"You enjoyed the attention, didn't you?@@",
			fail: "You could not be bothered to simply suck a popsicle? How incredibly lazy. Your disobedience is noted. Here's a mark.",
			reminder: "Don't forget to take that video I was talking about.",
			checkMe: {
				given: "dress as a girl and suck a popsicle suggestively in a public place.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 9) || window.playerCode.femRange(40,60);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 3,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				window.events.record('readyOutsideDress');
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=9;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 10);
			},
			fail: function() { return false; }
		}
	},
	girlyDesert: {	// perv 3-3, cross 9+, fem 40-60
		id: "girlyDesert",
		name:"Task Girly desert",
		text: {
			given: "I have a task for you today. Dress as a girl and go out to a café. Film yourself eating a desert there.",
			perform: "",
			finish: "$teacher watches the video of you eating your girly desert.\n\n@@.teacher;\"I knew you would pick something like that. As you see, looking like a girl can have its perks.@@",
			fail: "I see you ignored my directions. Perhaps you prefer discipline to dessert - do you really crave it that much? Enjoy this mark.",
			reminder: "Don't forget about my task.",
			checkMe: {
				given: "order a desert at a café while dressed as a girl.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 9) || window.playerCode.femRange(40,60);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				window.events.record('readyOutsideDress');
				if (State.active.variables.player.perversion.crossdressTasks < 6) {	State.active.variables.player.perversion.crossdressTasks=9;	}
			},
			finish: function() { return true; },
			success: function() {
				State.active.variables.player.perversion.crossdressTasks=Math.max(State.active.variables.player.perversion.crossdressTasks+1, 10);
			},
			fail: function() { return false; }
		}
	},

	selfieFemaleUniform: {	// perv 3, cross 9+
		id: "selfieFemaleUniform",
		name:"Task selfie in female uniform",
		text: {
			given: "I have a special task for you today. Make a photo set of yourself wearing school dress.",
			perform: "",
			finish: "$teacher smiles widely.\n\n@@.teacher;\"I did not want to bring it up in front of your peers, but this looks great on you, $player.name.@@",
			fail: "You disappoint me. I thought I was clear on what would happen if you failed to do what I asked. Take a mark.",
			reminder: "Don't forget about female uniform.",
			checkMe: {
				given: "to go to classes wearing a school dress.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 11);
		},
		image: "",
		startPriority: 10,
		canStart: true,
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 10,
		events: {
			start: function() { window.events.record('readyOutsideDress'); },
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.selfieFemaleUniform.canStart=false;
				State.active.variables.tasksTeacher.selfieFemaleUniform.progress++;
			},
			fail: function() { return false; }
		}
	},
	wearDressToSchool: {	// perv 3
		id: "wearDressToSchool",
		name:"Task Dress for school",
		text: {
			given: "Don't forget to wear a proper outfit to school.",
			perform: "",
			finish: "$teacher smiles widely.\n\n@@.teacher;\"I did not want to bring it up in front of your peers, but this looks great on you, $player.name.@@",
			fail: "You disappoint me. I thought I was clear on what would happen if you failed to do what I asked. Take a mark.",
			reminder: "Don't forget to wear a proper outfit to school.",
			checkMe: {
				given: "to go to classes wearing a school dress.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 10,
		canStart: false,
		canStartDays: [1,2,3,4,5],
		perversion: {
			teacher:	{ min: 3, max: 3 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,
		startDay: 0,
		maxDays: 99,
		cooldown: 1,
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 10,
		events: {
			start: function() { window.events.record('readyOutsideDress'); },
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	
	selfieMallToilets: {	// perv 3-5, cross 10+
		id: "selfieMallToilets",
		name:"Task Mall kissy selfie",
		text: {
			given: "I have a special task for you today. Make a kissy selfie at a public toilet while wearing female clothes.",
			perform: "",
			finish: "$teacher takes your phone and looks at your selfie.\n\n@@.teacher;\"This one will do. Good boy, $player.name.@@",
			fail: "I was expecting a selfie from you. No? Perhaps you simply enjoy being disciplined. A mark for you, then.",
			reminder: "Don't forget to take that selfie I was talking about.",
			checkMe: {
				given: "take a selfie at the public toilets in the mall while wearing female clothes.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 10);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() { State.active.variables.player.perversion.crossdressTasks++; },
			fail: function() { return false; }
		}
	},
	selfiePublicChastity: {	// perv 3-4, cross 12+
		id: "selfiePublicChastity",
		name:"Task Public chastity",
		text: {
			given: "I have a special task for you today. Go somewhere public while dressed as a girl, and take a selfie that shows your chastity.",
			perform: "",
			finish: "$teacher looks at the photo on your phone.\n\n@@.teacher;\"Nice. I bet it was an interesting experience for you.@@",
			fail: "No selfie? Are you so afraid someone will discover your secret? A mark for timidness.",
			reminder: "Don't forget to make a chastity selfie at some public place.",
			checkMe: {
				given: "make a selfie that shows chastity somewhere public.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 12);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() { State.active.variables.player.perversion.crossdressTasks++; },
			fail: function() { return false; }
		}
	},
	trickGuy: {	// perv 3-4, cross 12+
		id: "trickGuy",
		name:"Task Trick guy",
		text: {
			given: "I have a special task for you today. Offer some random guy a blowjob and take a shot of him waiting for you. It is up to you what to do next.",
			perform: "",
			finish: "$teacher smiles looking at the photo. \n\n@@.teacher;\"Very nice, $player.name.@@",
			fail: "Too honest to trick a stranger? Or just deluding yourself? A mark for your hypocrisy.",
			reminder: "Don't forget to trick some stranger.",
			checkMe: {
				given: "offer some random guy a blowjob and take a shot of him waiting for you.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 12);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() { State.active.variables.player.perversion.crossdressTasks++; },
			fail: function() { return false; }
		}
	},
	getHitOn: {	// perv 3-4, cross 12+
		id: "getHitOn",
		name:"Task Get hit on",
		text: {
			given: "I have a special task for you today. Record yourself getting hit on by some guy.",
			perform: "",
			finish: "$teacher checks your phone.\n\n@@.teacher;\"You loved it didn't you?@@",
			fail: "It's your fault that no one wants to hit on you. You put so little effort into your appearance. Take a mark.",
			reminder: "Don't forget to try and record yourself getting a guy's attention.",
			checkMe: {
				given: "record yourself getting hit on by a guy.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.crossdressTasks >= 12);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() { State.active.variables.player.perversion.crossdressTasks++; },
			fail: function() { return false; }
		}
	},

	
	TheClubIntro: { // perv 3+ cross 8+
		id: "TheClubIntro",
		name: "Task The Club Intro",
		text: {
			given: "I want you to go to the local nightclub for their free ladies\’ night event Saturday, to see if you can pass as a girl in public. Dress up nicely and get the bouncer to let you in. Obviously, if you have to pay the cover charge, you fail.",
			perform: "",
			finish: "$teacher examines your pink wristband from the club.\n\n@@.teacher;\"Well, it seems you can pass as a girl after all. Honestly, that’s great news for you, because you are not very good at passing for a boy.@@",
			fail: "You could not even get in the doors? I’m disappointed in you – are you too scared to even try?",
			reminder: "Be sure not to miss ladies night at the club this Saturday. Remember, you need get the bouncer to let you in.",
			checkMe: {
				given: "to go to the club on Saturday evening and get in for ladies\’ night by dressing as a girl.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven&#39;t done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.player.perversion.crossdressTasks >= 11) && (playerCode.slutScoreBasic() >= 4));
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 6,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {
				State.active.variables.tasksTeacher.TheClubIntro.canStart=false;
			},
			fail: function() { return false; }
		}
	},
	clubSelfieLadiesRoom: { // perv 4+
		id: "clubSelfieLadiesRoom",
		name: "Take a Selfie With a Woman in the Ladies\’ Room",
		text: {
			given: "You need to practice passing as a girl in public. Go back to the club this weekend and take a selfie with a woman in the ladies\’ room.",
			perform: "",
			finish: "$teacher looks at the selfie you took with the lady at the club.\n\n@@.teacher;\"I see you managed to get a girl to take a photo with you as one of our own. Good job.@@",
			fail: "You did not get a girl to take a selfie with you in the ladies\’ bathroom like I asked. Maybe you should work harder on your appearance if you\’re finding it difficult.",
			reminder: "I will remind you – you\’re to go to the club this weekend and take a selfie with a girl in the ladies\’ restroom.",
			checkMe: {
				given: "go to the club this weekend. Take a selfie with a girl in the ladies room.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.player.perversion.club > 0) && (playerCode.slutScoreBasic() > State.active.variables.tasksTeacher.clubSelfieLadiesRoom.progress));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 6,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	clubDancePanties: { // perv 4+
		id: "clubDancePanties",
		name: "Dance With, and Give panties to a Random Stranger",
		text: {
			given: "Go to the club this weekend, and dance with a stranger. Give the panties you’re wearing to them.",
			perform: "",
			finish: "$teacher reviews your latest efforts at the club.\n\n@@.teacher;\"Good, you danced with someone and gave your panties to them.@@",
			fail: "I am not pleased that you decided to ignore my instructions at the club. I’m adding a mark against you for your failure.",
			reminder: "Remember to dance with a random stranger at the club, and give them the panties you’re wearing.",
			checkMe: {
				given: "in the evening this weekend, dance with a stranger and give them the panties you’re wearing.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.player.perversion.club > 0) && (State.active.variables.tasksTeacher.clubDancePanties.progress < 15) && (State.active.variables.tasksTeacher.clubSelfieLadiesRoom.progress > 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 6,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 30,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() { window.events.record('readyNoUnderwear');},
			fail: function() { return false; }
		}
	},
	clubFlashBoobs: { // perv 5+
		id: "clubFlashBoobs",
		name: "Flash Boobs on the club dance floor",
		text: {
			given: "I think you need to get more comfortable with new part of yourself. Go to the club before the end of this weekend and talk the DJ into letting you flash your breasts to the crowd. Get a photo of it for proof.",
			perform: "",
			finish: "$teacher examines the photo from the club.\n\n@@.teacher;\"Well, this should help teach you how embarrassing it is for a woman to be objectified in public spaces. Just think how many other photos there must be floating around now. Though, maybe you actually enjoyed that? We'll see.",
			fail: "No photo? Then, obviously, no one at the club saw your boobs as I instructed, either. How disappointing.",
			reminder: "Talk to the DJ at the club this weekend and flash your boobs in front of the crowd. Be sure to get a photo of it.",
			checkMe: {
				given: "Go to the club this weekend, talk to the DJ and flash your breasts to the crowd. You need a photo.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.player.perversion.club > 0) && (State.active.variables.body.boobs > State.active.variables.body.boobsNoticedDJ) && (State.active.variables.body.boobs >= 2) && (State.active.variables.tasksTeacher.clubDancePanties.progress > 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 6,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 30,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	clubBarHandy: { // perv 6+
		id: "clubBarHandy",
		name: "Give a Hand Job at the Club Bar Without Being Caught",
		text: {
			given: "Go back to the club and find a random stranger. Provide them with… ‘manual stimulation’ at the bar. Do not get caught, or you are completely on your own and I will mark the task as a failure.\n\n\"Do not forget to bring me proof.",
			perform: "",
			finish: "$teacher looks over the proof of your hand job exploit at the club.\n\n@@.teacher;\"Well, it seems we have found a way to bring out another one of your ‘talents.’ Good job at the club.",
			fail: "It seems you could not manage a simple evening out, merely spending time with someone in a bar. I am adding a mark against you this week for your failure.",
			reminder: "Make sure you find a random stranger at the club, and use your hands to stimulate them - intimately.",
			checkMe: {
				given: "In the evening this weekend, give a hand job to a random stranger at the club bar.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.club > 0) && (State.active.variables.tasksTeacher.clubBarHandy.progress < 8) && (State.active.variables.body.boobsNoticedDJ > 0);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 6,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 30,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	clubDinnerGown: { // perv 6+
		id: "clubDinnerGown",
		name: "Dress up in an evening gown provided, then give a pre-arranged patron head under a table",
		text: {
			given: "I have something special in mind for you this Saturday: I’ve planned for you to have dinner with someone. I’ve located a gown for you, and I want you to wear it to the restaurant at the club - be sure to arrive early to pick it up. The maître d’ will introduce you to your dining companion when you arrive.\n\n\"This evening out was only possible through the extreme generosity of some of my social contacts, so you would be best served by not missing it.",
			perform: "",
			finish: "$teacher twirls a long stem rose with amusement.\n\n@@.teacher;\"I hope you enjoyed your evening out. Perhaps the experience will give you deeper respect for certain ‘social pressures’ a woman can face. At any rate, I trust the dinner… satisfied your appetite?",
			fail: "I went to great expense to arrange a fine dining experience and you were completely ungrateful in return. This certainly warrants a mark against you.",
			reminder: "Remember, you’re to go to the club restaurant for dinner this weekend in the gown I’ve arranged for you.",
			checkMe: {
				given: "I need to pick up the evening gown $teacher arranged and go to the club for dinner this weekend.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.club > 0) && (State.active.variables.player.punishments.penalty >= 2 || State.active.variables.kink.degradation);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 6,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 30,
		failPenalty: 8,
		events: {
			start: function() { State.active.variables.tasksTeacher.clubDinnerGown.canStart=false; },
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	
	
	selfieToiletsChastity: {	// perv 5-6
		id: "selfieToiletsChastity",
		name:"Task Flash chastity",
		text: {
			given: "I have a special task for you today. Flash your chastity cage to a stranger while wearing female clothes.",
			perform: "",
			finish: [
				'$teacher watches the video of you flashing your chastity cage to the man in the restroom.\n@@.teacher;\"That look on his face is priceless.@@',
				'$teacher watches the video of you flashing your chastity cage.\n@@.teacher;\"Nice pout, $player.name\.@@',
				'$teacher watches the \'flashing your chastity cage\' video.\n@@.teacher;\"Wink at the camera next time $player.name\.@@',
				'$teacher watches the video on your phone.\n@@.teacher;\"Awww, you look all hot and bothered $player.name\.@@',
				'$teacher watches the video.\n@@.teacher;\"I bet someone saw you filming this, $player.name\.@@'
			],
			fail: ["No video? Is our little sissy ashamed? A mark for disobedience.", "No video? Did you just forget? No matter. A mark for disobedience."],
			reminder: "Don't forget to record yourself flashing a stranger.",
			checkMe: {
				given: "flash your chastity cage to a stranger while wearing female clothes.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 6 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 0,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	askAdvice: {	// perv 3-4
		id: "askAdvice",
		name:"Task Ask advice",
		text: {
			given: "I have a special task for you today. Seek out one of your female classmates for some 'girl talk.' Ask her for some advice on something girly.",
			perform: "",
			finish: "$teacher smiles. \n\n@@.teacher;\"I hope you got some good advice from a classmate. Too bad that you need a push to open up.@@",
			fail: "Too shy to talk to your classmates? Here's a mark to encourage you to be bolder next time.",
			reminder: "Don't forget to talk with a classmate.",
			checkMe: {
				given: "ask a classmate for some advice on something girly.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 4 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	playButtplug: {	// perv 4-6
		id: "playButtplug",
		name:"Task Play with butt-plug",
		text: {
			given: "I have a special task for you today. Play with a butt-plug on camera while wearing a chastity cage.",
			perform: "",
			finish: "$teacher looks at the video of you playing with a butt-plug.\n\n@@.teacher;\"I bet you enjoyed it, sissy.@@",
			fail: "No video? Do you consider it a good idea to disappoint me? Take a mark.",
			reminder: "Don't forget to take the video I was talking about.",
			checkMe: {
				given: "film yourself playing with a butt-plug while wearing a chastity cage.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 6 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	askStranger: {	// perv 6-9
		id: "askStranger",
		name:"Task Ask stranger",
		text: {
			given: "I have a special task for you today. Film yourself asking a stranger to call you a sissy-slut, and having them write 'SISSY' on your back with a marker.",
			perform: "",
			finish: "$teacher looks at the smudged word on your back.\n\n@@.teacher;\"See, it wasn't that hard.@@",
			fail: "Too lazy to complete my requests. Such a sad little sissy. Take a mark.",
			reminder: "Don't forget to ask someone for an autograph.",
			checkMe: {
				given: "film yourself asking a stranger to call you a sissy-slut.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 9 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 4,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 15,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	fakeGirlfriend: {	// perv 6-9
		id: "fakeGirlfriend",
		name:"Task Fake girlfriend",
		text: {
			given: "I have a very special task for you. You see, one of my male friends is a closeted gay man, and his family and co-workers are among the most bigoted people I know. So your task is to act as his girlfriend in public for a couple of hours. I see the irony that you are the one best suited for this task, but who knows? You might make a friend!",
			// Alt ToDo - "My friend needs his beard again. I hope you didn't have anything planned.";
			perform: "",
			finish: "$teacher pats you on your head.\n\n@@.teacher;\"Good boy. My friend told me you were great.@@",
			fail: "You failed not only me, but also my friend and even yourself. A mark! There will be punishment.",
			reminder: "",
			checkMe: {
				given: "act as a fake girlfriend for $teacher's friend.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (playerCode.slutScoreBasic() > 6);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 9 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 5,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 5,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 50,
		failPenalty: 6,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	trainDildoBJ: {	// perv 5-7
		id: "trainDildoBJ",
		name:"Task train bj with dildo",
		text: {
			given: "I have a special task for you today. Take a dildo in your mouth as far as you can on camera.",
			perform: "",
			finish: "$teacher looks at the video of you practicing your deepthroating technique.\n\n@@.teacher;\"Hmm, you would make an excellent cocksucker.@@",
			fail: "No proof, no release. Is your little sissy mouth scared of a dildo? A mark for you.",
			reminder: "Don't forget to take the video I was talking about.",
			checkMe: {
				given: "film yourself deepthroating a dildo.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 7 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	guideHand: {	// perv 5-7
		id: "guideHand",
		name:"Task Guide hand",
		text: {
			given: "I have a special task for you today. Guide the hand of a stranger under your skirt at a public place while locked in chastity and going without underwear.",
			perform: "",
			finish: "$teacher looks at pictures you took.\n\n@@.teacher;\"I bet they were surprised.@@",
			fail: "No proof, no release. You will never understand humility without obedience. Take a mark.",
			reminder: "Don't forget about that task I mentioned...",
			checkMe: {
				given: "let a stranger touch your chastity in a public place.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!State.active.variables.flags.taskGuideHandGirl) || (!State.active.variables.flags.taskGuideHandWomanMan) || (!State.active.variables.flags.taskGuideHandCouple) || (!State.active.variables.flags.taskGuideHandTrap);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 7 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 4,  // number of days allowed before task will fail
		cooldown: 3,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	guardianSpank: {	// perv 4-8
		id: "guardianSpank",
		name:"Task Ask to be spanked",
		text: {
			given: "I have a special task for you today. Ask $guardian to give you a spanking. Tell her you were a disobedient little girl.",
			perform: "",
			finish: "$teacher examines your butt.\n\n@@.teacher;\"I hope you learned your lesson.@@",
			fail: "Do you not respect me? We'll see how you like your punishment. Here's a mark against you.",
			reminder: "Don't forget to ask for a spanking at home.",
			checkMe: {
				given: "ask $guardian for a spanking.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.punishments.penalty >= 1 && State.active.variables.flags.chorePunKinky);
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 8 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 5, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 3,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 3,
		events: {
			start: function() {
				State.active.variables.tasksTeacher.guardianSpank.startPriority = 0;
			},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	guardianFuck: {	// perv 4-10
		id: "guardianFuck",
		name:"Task Ask to be fucked",
		text: {
			given: "You were really obedient this week, just like a proper sissy should be. So your special task for today is to ask $guardian to fuck you with a strapon.",
			perform: "",
			finish: "$teacher smiles to you.\n\n@@.teacher;\"I've heard that you really enjoyed being fucked with that strapon.@@",
			fail: "Such a silly sissy, you don't even realize when I'm giving you a present. Such ungratefulness. Perhaps you can appreciate this mark?",
			reminder: "Don't forget to ask $guardian fuck you.",
			checkMe: {
				given: "ask $guardian fuck you.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return State.active.variables.flags.gTrialStrapOn && (State.active.variables.player.punishments.penalty == 0) && State.active.variables.flags.guardianStrapon;
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 5, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 1,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 1,
		events: {
			start: function() {
				State.active.variables.tasksTeacher.guardianFuck.startPriority = 0;
			},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	pissDrinking: {	// perv 8-10
		id: "pissDrinking",
		name:"Task Drink piss",
		text: {
			given: "Film yourself letting someone piss in your mouth and I will reduce your weekly debt.",
			perform: "",
			finish: "$teacher looks at the video of a man urinating down your throat.\n\n@@.teacher;\"Haha, nice work. Seems like you're finally learning your place.@@",
			fail: "No recording? Are you saying you're not even worthy of being used as a urinal? Take a mark.",
			reminder: "Don't forget about your special drink.",
			checkMe: {
				given: "offer yourself as a urinal to a stranger, and record yourself drinking their piss.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.kink.urineDrink) && (!State.active.variables.kink.futa);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 8, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 2,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 40,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	whoring: {	// perv 8-10
		id: "whoring",
		name:"Task Whoring",
		text: {
			given: "Offer yourself to a stranger like a common whore and I will reduce your weekly debt.",
			perform: "",
			finish: "$teacher looks at the video of you selling yourself like a whore.\n\n@@.teacher;\"So, did you like selling yourself like a cheap whore? It might be the only thing you're good for soon.@@",
			fail: "A slut like you should have little difficulty finding a client. A mark for your lackluster effort.",
			reminder: "Don't forget to dress properly for your street-walking experience.",
			checkMe: {
				given: "sell yourself like a common whore to a stranger.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!State.active.variables.kink.futa);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 8, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 20,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	gloryHole: {	// perv 10-10
		id: "gloryHole",
		name:"Task Glory hole",
		text: {
			given: "Film yourself servicing some men at a glory hole.",
			perform: "",
			finish: "$teacher checks the video of your depravity at the glory hole.\n\n@@.teacher;\"It seems you found your calling.@@",
			fail: "So, you decided you're above my instructions now? A mark barely covers it, but here is one nevertheless.",
			reminder: "Don't forget to visit a glory hole.",
			checkMe: {
				given: "film yourself servicing men at a glory hole.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!State.active.variables.kink.futa);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 10, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 5,
		rewardDebt: 20,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	schoolPublicToilet: {	// perv 10
		id: "schoolPublicToilet",
		name:"Task Public toilet",
		text: {
			given: "Spend the morning as a public toilet here at school.",
			perform: "",
			finish: "$teacher smirks at you.\n\n@@.teacher;\"I've heard that the toilets were quite popular today.@@",
			fail: "No proof - no discount. Take a mark.",
			reminder: "Don't forget about your assignment in the school toilets.",
			checkMe: {
				given: "spend the morning as a public toilet at school.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.teacherCooldown > 3);
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 10, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 15,
		failPenalty: 1,
		events: {
			start: function() {
				State.active.variables.tasksTeacher.schoolPublicToilet.startPriority = 0;
			},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	penaltySissyShow: {	// perv 4-10
		id: "penaltySissyShow",
		name:"Task Sissy Show",
		text: {
			given: "As your debt have grown I have a special task for you. Go to the Ivy college downtown and assist Ms Goodwill with her classes. Remember to dress as a proper schoolgirl when you go there.",
			perform: "",
			finish: "$teacher smirks at you.\n\n@@.teacher;\"I've heard your performance was enlightening. Good work.@@",
			fail: "So, you scoff my generous offer and ignored Ms Goodwill's class. A mark for your thoughtlessness.",
			reminder: "Don't forget your assignment with Ms Goodwill.",
			checkMe: {
				given: "assist Ms Goodwill at the college downtown. You need to be dressed as a schoolgirl.",
				finish: "Yeah, you did it.",
				fail: "You've chickened out and escaped at the last moment.",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.bribeAmount-State.active.variables.player.bribeDiscount >= 800);
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 800,
		failPenalty: 4,
		events: {
			start: function() {
				State.active.variables.tasksTeacher.penaltySissyShow.cooldown = window.randomCode.getIntInclusive(7, 12);
			},
			finish: function() { return true; },
			success: function() {
				if (State.active.variables.tasksTeacher.penaltySissyShow.progress >= 3) {
					State.active.variables.tasksTeacher.penaltySissyShow.rewardDebt = 50;
				}
				if (State.active.variables.tasksTeacher.penaltySissyShow.progress == 2) {
					State.active.variables.tasksTeacher.penaltySissyShow.rewardDebt = 100;
				}
				if (State.active.variables.tasksTeacher.penaltySissyShow.progress == 1) {
					State.active.variables.tasksTeacher.penaltySissyShow.rewardDebt = 200;
				}
				State.active.variables.tasksTeacher.penaltySissyShow.progress++;
				State.active.variables.player.punishments.penaltySissyShow = true;
			},
			fail: function() { return false; }
		}
	},
	penaltyTrials: {	// perv 3-10
		id: "penaltyTrials",
		name:"Task Penalty Trials",
		text: {
			given: "I will give you a chance to write off a considerable amount from your penalty. There is a fresh vacancy for testing new products at the adult toy company. You can ask about it at the local adult store.",
			perform: "",
			finish: "$teacher smirks at you.\n\n@@.teacher;\"I've heard your trials were really interesting. I think my friend described you as //a natural sissy//.@@",
			fail: "So, you chose to ignore my generous offer. A mark is hardly all you deserve, but take one anyway.",
			reminder: "Don't forget about this testing job at the local adult store.",
			checkMe: {
				given: "go to the Mall and ask for a job testing new adult products.",
				finish: "Yeah, you did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.bribeAmount-State.active.variables.player.bribeDiscount >= 400);
		},
		image: "",
		startPriority: 1,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 30,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 7,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 400,
		failPenalty: 4,
		events: {
			start: function() {
				State.active.variables.tasksTeacher.penaltyTrials.cooldown = window.randomCode.getIntInclusive(6, 9);
			},
			finish: function() { return true; },
			success: function() {
				if (State.active.variables.tasksTeacher.penaltyTrials.progress >= 3) {
					State.active.variables.tasksTeacher.penaltyTrials.rewardDebt = 25;
				}
				if (State.active.variables.tasksTeacher.penaltyTrials.progress == 2) {
					State.active.variables.tasksTeacher.penaltyTrials.rewardDebt = 50;
				}
				if (State.active.variables.tasksTeacher.penaltyTrials.progress == 1) {
					State.active.variables.tasksTeacher.penaltyTrials.rewardDebt = 100;
				}
				State.active.variables.tasksTeacher.penaltyTrials.progress++;
				State.active.variables.player.punishments.penaltyTrials = true;
			},
			fail: function() { return false; }
		}
	},
	noTasksToday: {
		id: "noTasksToday",
		name:"No tasks",
		text: {
			given: "I have no special tasks for you today.",
			perform: "",
			finish: "",
			fail: "",
			reminder: "",
			checkMe: {
				given: "",
				finish: "",
				fail: "",
				reminder: ""
			}
		},
		finishPassage: "Go to bedroom",
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 1,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 0,
		failPenalty: 0,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	}
}

window.tasksTeacherBody={
	getHaircut: {	// perv 4+
		id: "getHaircut",
		name:"Task Haircut",
		text: {
			given: "You definitely need a haircut. Next week I want to see you with a pretty haircut.",
			perform: "",
			finish: "$teacher looks at your hair.\n\n@@.teacher;\"Oh my, $player.name. It looks good on you.\"@@",
			fail: "If you are too lazy to take care of your hair, too bad. You can take a mark instead.",
			reminder: "Don't forget to get a haircut.",
			checkMe: {
				given: "get a haircut.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!playerCode.haveHaircut());
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 20,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 30,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (playerCode.haveHaircut());
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	getEarsPierced: {	// perv 4+
		id: "getEarsPierced",
		name:"Task Ears pierced",
		text: {
			given: "I think it is time to get your ears pierced. Next week I want to see you with a lovely earring.",
			perform: "",
			finish: "$teacher looks at your ears.\n\n@@.teacher;\"I see you pierced your ears, like I asked you to, good.\"@@",
			fail: "Are you that afraid of a little pain so you ignore my request? Too bad. Take a mark.",
			reminder: "Don't forget to get your ears pierced.",
			checkMe: {
				given: "get your ears pierced.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!State.active.variables.body.earsPierced);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 4, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 20,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 9,  // number of days before task available again
		rewardMoney: 30,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (State.active.variables.body.earsPierced);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	legHairRemoval: {	// perv 3+
		id: "legHairRemoval",
		name:"Task Leg hair removal",
		text: {
			given: "Your legs are so unsightly like that. Go get them depilated. I expect to see them cleaned up and silky smooth next week.",
			perform: "",
			finish: "$teacher looks at your depilated, feminine legs.\n\n@@.teacher;\"Smooth and lovely. Good.\"@@",
			fail: "I see you chose to let your legs go unkempt despite my instructions. Take a mark for disobeying me.",
			reminder: "Be sure to depilate your legs.",
			checkMe: {
				given: "get your legs depilated for next week.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.bodyhair == 0) && (State.active.variables.tasksTeacherBody.legHairRemoval.progress <= 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				if ((State.active.variables.body.bodyhair > 0) && State.active.variables.flags.salonHairRemoval) {
					State.active.variables.tasksTeacherBody.legHairRemoval.progress++;
				}
				return ((State.active.variables.body.bodyhair > 0) && State.active.variables.flags.salonHairRemoval);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	hairRemoval: {	// perv 3+
		id: "hairRemoval",
		name:"Task Hair removal",
		text: {
			given: "You need to do something with your body hair. Next week, I want to see your skin looking as smooth as a baby's bottom. I suggest waxing. It might hurt a bit, but the result worth it.",
			perform: "",
			finish: "$teacher looks at your hairless skin.\n\n@@.teacher;\"Nice and smooth, keep this up.\"@@",
			fail: "Was it forgetfulness or mere disobedience that led you to ignore me? Why do you still have body hair? Take a mark.",
			reminder: "Don't forget to take care of your body hair.",
			checkMe: {
				given: "get rid of your body hair next week.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.tasksTeacherBody.legHairRemoval.progress >= 1) && (State.active.variables.body.bodyhair <= 1));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (State.active.variables.body.bodyhair > 0);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	hairRemoval_renewal: {	// perv 3+
		id: "hairRemoval_renewal",
		name:"Task Hair removal renewal",
		text: {
			given: "I like how you look without body hair. Keep this up. I expect to see you just as smooth next week.",
			perform: "",
			finish: "$teacher looks at your hairless skin.\n\n@@.teacher;\"Nice and smooth. Keep this up.\"@@",
			fail: "Was it forgetfulness or mere disobedience that led you to ignore me? Why do you still have body hair? Take a mark.",
			reminder: "Don't forget to take care of your body hair.",
			checkMe: {
				given: "get rid of your body hair next week.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			if (State.active.variables.body.bodyhair == 2) {
				return true;
			}
			return false;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (((State.active.variables.body.bodyhair == 2) && State.active.variables.flags.salonHairRemoval) || (State.active.variables.body.bodyhair == 3));
			},
			success: function() {},
			fail: function() { return false; }
		}
	},

	makeup: {	// perv 5+
		id: "makeup",
		name:"Task makeup",
		text: {
			given: "You definitely need to have your face made up. Be a good boy and go find help if you cannot do it yourself",
			perform: "",
			finish: "$teacher looks at your made up face.\n\n@@.teacher;\"Very fetching! I find it amazing how much an expert's touch can improve one's appearance.\"@@",
			fail: "No makeup? You disappoint me. Take a mark on my behalf.",
			reminder: "Don't forget about makeup.",
			checkMe: {
				given: "wear makeup next week.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.makeup == 0) && (State.active.variables.tasksTeacher.selfieHomeMakeup.status == 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 3, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				if ((State.active.variables.body.makeup == 1)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your subtly made up face.\n\n@@.teacher;\"Excellent. Not flashy, but it really makes you look pretty.\"@@";
				} else if ((State.active.variables.body.makeup == 2)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Wow, you look very striking! It's amazing how much an expert's touch can change your appearance.\"@@";
				} else if ((State.active.variables.body.makeup == 3)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"You look like a pretty, air-headed bimbo. I love your choice.\"@@";
				} else if ((State.active.variables.body.makeup == 4)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Huh. I would say that this make up makes you look like a two-dollar whore, but it's done with great talent when you think about it. I think it's perfect for you.\"@@";
				} else if ((State.active.variables.body.makeup == 1) && (State.active.variables.body.permMakeup >= 1)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your subtly made up face.\n\n@@.teacher;\"Perfect! I love your conviction, well done.\"@@";
				} else if ((State.active.variables.body.makeup == 2) && (State.active.variables.body.permMakeup >= 2)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Wow, you took this to another level, looking sexy with no maintenance. I almost envy you.\"@@";
				} else if ((State.active.variables.body.makeup == 3) && (State.active.variables.body.permMakeup >= 3)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"You chose to always look like a dumb horny bimbo! That is so hot, I love it.\"@@";
				} else if ((State.active.variables.body.makeup == 4) && (State.active.variables.body.permMakeup >= 4)) {
					window.tasksTeacherBody.makeup.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Oh god, is it tattooed on? Just the thought that you did this to yourself is making me wet. I want to kiss whoever made the design.\"@@";
				}
				return (State.active.variables.body.makeup > 0);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	makeup_renewal: {
		id: "makeup_renewal",
		name:"Task makeup renewal",
		text: {
			given: "Be sure to keep up your makeup next week.",
			perform: "",
			finish: "$teacher looks at your made up face.\n\n@@.teacher;\"Good.\"@@",
			fail: "No makeup? You disappoint me. Take a mark.",
			reminder: "Don't forget about makeup.",
			checkMe: {
				given: "maintain your makeup next week.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.makeup > 0) && (State.active.variables.body.semiMakeup == 0) && (State.active.variables.body.permMakeup == 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				if ((State.active.variables.body.makeup == 1)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your subtly made up face.\n\n@@.teacher;\"Excellent, not flashy, but it really makes you look pretty.\"@@";
				}
				if ((State.active.variables.body.makeup == 2)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Wow, you look very striking! It's amazing how much an expert's touch can change your appearance.\"@@";
				}
				if ((State.active.variables.body.makeup == 3)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"You look like a pretty, air-headed bimbo. I love your choice.\"@@";
				}
				if ((State.active.variables.body.makeup == 4)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Huh. I would say that this make up makes you look like a two-dollar whore, but it's done with great talent when you think about it. I think it's perfect for you.\"@@";
				}
				if ((State.active.variables.body.makeup == 1) && (State.active.variables.body.permMakeup >= 1)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your subtly made up face.\n\n@@.teacher;\"Perfect! I love your conviction, well done.\"@@";
				}
				if ((State.active.variables.body.makeup == 2) && (State.active.variables.body.permMakeup >= 2)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Wow, you took this to another level, looking sexy with no maintenance. I almost envy you.\"@@";
				}
				if ((State.active.variables.body.makeup == 3) && (State.active.variables.body.permMakeup >= 3)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"You chose to always look like a dumb, horny bimbo! That is so hot, I love it.\"@@";
				}
				if ((State.active.variables.body.makeup == 4) && (State.active.variables.body.permMakeup >= 4)) {
					window.tasksTeacherBody.makeup_renewal.text.finish = "$teacher looks at your made up face.\n\n@@.teacher;\"Oh god, is it tattooed on? Just the thought that you did this to yourself is making me wet. I want to kiss whoever made the design.\"@@";
				}
				return (State.active.variables.flags.salonMakeup || (State.active.variables.body.semiMakeup > 0) || (State.active.variables.body.permMakeup > 0));
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	manicure: {	// perv 5+
		id: "manicure",
		name:"Task Manicure",
		text: {
			given: "You need to do something about your nails. Next week, I want to see you with a nice French manicure.",
			perform: "",
			finish: "$teacher looks at your manicure.\n\n@@.teacher;\"Fancy manicure, well done.\"@@",
			fail: "Your nails look awful. A mark for your lack of effort.",
			reminder: "Don't forget to get a manicure.",
			checkMe: {
				given: "style your nails.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.body.manicure == 0);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (State.active.variables.body.manicure > 0);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	manicure_renewal: {
		id: "manicure_renewal",
		name:"Task Manicure renewal",
		text: {
			given: "I like your manicure, so keep it up. I want you to maintain it properly.",
			perform: "",
			finish: "$teacher looks at your manicure.\n\n@@.teacher;\"Fancy manicure, well done.\"@@",
			fail: "Your nails look awful. A mark for your lack of effort.",
			reminder: "Don't forget to get a manicure.",
			checkMe: {
				given: "keep your nails properly treated.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.manicure > 0) && (State.active.variables.body.permManicure == 0) && (State.active.variables.body.semiManicure == 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (State.active.variables.flags.salonManicure);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	breastsIncrease: {	// perv A-6, B-6, C-7, DD-8
		id: "breastsIncrease",
		name:"Task breast increase",
		text: {
			given: "I think you need bigger breasts.",
			perform: "",
			finish: "$teacher looks at your breasts.\n\n@@.teacher;\"Good boy.\"@@",
			fail: "Too shy to try a boob job? Too bad, I thought you would enjoy that. Take a mark.",
			reminder: "Don't forget about that boob job you need to get.",
			checkMe: {
				given: "get bigger boobs.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.boobs <= 1) || ((State.active.variables.body.boobs <= 2) && State.active.variables.player.perversion.teacher >= 7) || ((State.active.variables.body.boobs <= 3) && State.active.variables.player.perversion.teacher >= 8)) && (State.active.variables.tasksTeacherBody.breastsMaintain.status == 0) && !State.active.variables.kink.flatChest;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 50,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {
				State.active.variables.tasksTeacherBody.breastsIncrease.progress = State.active.variables.body.boobs;
			},
			finish: function() {
				return (State.active.variables.body.boobs > State.active.variables.tasksTeacherBody.breastsIncrease.progress);
			},
			success: function() {
				if ((State.active.variables.body.boobs == 1)) {
					State.active.variables.tasksTeacherBody.breastsIncrease.rewardMoney = 50;
				}
				if ((State.active.variables.body.boobs == 2)) {
					State.active.variables.tasksTeacherBody.breastsIncrease.rewardMoney = 100;
				}
				if ((State.active.variables.body.boobs == 3)) {
					State.active.variables.tasksTeacherBody.breastsIncrease.rewardMoney = 200;
				}
				if ((State.active.variables.body.boobs == 4)) {
					State.active.variables.tasksTeacherBody.breastsIncrease.rewardMoney = 400;
				}
			},
			fail: function() { return false; }
		}
	},
	breastsMaintain: {
		id: "breastsMaintain",
		name:"Task breast maintain",
		text: {
			given: "Your breasts look so nice in your uniform. Make sure you have at least same size next week.",
			perform: "",
			finish: "$teacher looks at your breasts.\n\n@@.teacher;\"Good boy.\"@@",
			fail: "Huh. Breasts are too much of a burden for you? Very disappointing. Have a mark.",
			reminder: "Don't forget about your boob job.",
			checkMe: {
				given: "keep your boobs size.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.body.boobs > State.active.variables.body.permBoobs) && (State.active.variables.body.boobs > State.active.variables.body.semiBoobs) && (State.active.variables.tasksTeacherBody.breastsIncrease.status == 0) && !State.active.variables.kink.flatChest;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 50,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {
				State.active.variables.tasksTeacherBody.breastsMaintain.progress = State.active.variables.body.boobs;
			},
			finish: function() {
				return (State.active.variables.body.boobs >= State.active.variables.tasksTeacherBody.breastsMaintain.progress);
			},
			success: function() {
				if ((State.active.variables.body.boobs == 1)) {
					State.active.variables.tasksTeacherBody.breastsMaintain.rewardMoney = 50;
				}
				if ((State.active.variables.body.boobs == 2)) {
					State.active.variables.tasksTeacherBody.breastsMaintain.rewardMoney = 100;
				}
				if ((State.active.variables.body.boobs == 3)) {
					State.active.variables.tasksTeacherBody.breastsMaintain.rewardMoney = 200;
				}
				if ((State.active.variables.body.boobs == 4)) {
					State.active.variables.tasksTeacherBody.breastsMaintain.rewardMoney = 400;
				}
			},
			fail: function() { return false; }
		}
	},
	lipsIncrease: {	// perv 5+
		id: "lipsIncrease",
		name:"Task lips increase",
		text: {
			given: "I think you need fuller lips. That would make your face much more lovely.",
			perform: "",
			finish: "$teacher looks at your full lips.\n\n@@.teacher;\"I love how your lips look, definitely an improvement.\"@@",
			fail: "Aww, did you decide to draw the line at having your lips plumped? We'll see about that... Here's a mark.",
			reminder: "Don't forget about your lip treatment.",
			checkMe: {
				given: "make your lips a bit more plump.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!playerCode.haveLips());
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 50,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return ((State.active.variables.body.lips == 1) || (State.active.variables.body.lips == 2));
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	lipsMaintain: {
		id: "lipsMaintain",
		name:"Task lips maintain",
		text: {
			given: "You look lovely with those full lips, make sure you keep up with the treatment for next week.",
			perform: "",
			finish: "$teacher looks at your full lips.\n\n@@.teacher;\"Nice.\"@@",
			fail: "Got tired of having those pretty lips? Too bad. Have a mark to help rekindle your fondness for them.",
			reminder: "Don't forget about your lip treatment.",
			checkMe: {
				given: "keep your lips plump.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.lips == 1) && (State.active.variables.body.permLips <= 0) && (State.active.variables.body.semiLips <= 0) && (State.active.variables.tasksTeacherBody.lipsIncrease.status == 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 50,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (((State.active.variables.body.lips == 1) || (State.active.variables.body.lips == 2)) && State.active.variables.flags.salonLips);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	lipsMaintainXL: {
		id: "lipsMaintainXL",
		name:"Task lips maintain XL",
		text: {
			given: "I personally do not find sluts with oversized, cocksucking lips appealing, but I think that it's rather fitting for you. Make sure they stay this way.",
			perform: "",
			finish: "$teacher looks at your cocksucking lips.\n\n@@.teacher;\"I bet these things are cock magnets.\"@@",
			fail: "You were the one who chose to turn your mouth into a sex object. If you regret your decision, you only have yourself to blame. A mark.",
			reminder: "Don't forget about your lip treatment.",
			checkMe: {
				given: "keep your cocksucking lips pumped and fuckable.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.lips == 2) && (State.active.variables.body.permLips <= 1) && (State.active.variables.body.semiLips <= 1) && (State.active.variables.tasksTeacherBody.lipsIncrease.status == 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 100,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return ((State.active.variables.body.lips == 2) && State.active.variables.flags.salonLips);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	assIncrease: {	// perv 6+
		id: "assIncrease",
		name:"Task ass increase",
		text: {
			given: "I think you need to do something about your figure. I want to see you with a plump little butt next week.",
			perform: "",
			finish: "$teacher looks at your plump butt..\n\n@@.teacher;\"Looking good.\"@@",
			fail: "Was you afraid to not get into your favorite pants? You would have liked to have a plump ass. Mark for disobedience.",
			reminder: "Don't forget about your butt treatment.",
			checkMe: {
				given: "make your butt bigger.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (!playerCode.haveAss());
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 50,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (State.active.variables.body.ass > 0);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	assMaintain: {
		id: "assMaintain",
		name:"Task ass maintain",
		text: {
			given: "Make sure you keep up with your butt enhancing treatments.",
			perform: "",
			finish: "$teacher looks at your heart-shaped butt.\n\n@@.teacher;\"Now this is a figure that will turn some heads. Looking good.\"@@",
			fail: "Were you tired of people staring at your ass? I told you to maintain its plump form. Too bad, a mark for disobedience.",
			reminder: "Don't forget about your butt treatment.",
			checkMe: {
				given: "keep your butt properly plump.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.ass == 1) && (State.active.variables.body.permAss <= 0) && (State.active.variables.body.semiAss <= 0) && (State.active.variables.tasksTeacherBody.lipsIncrease.status == 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 50,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return ((State.active.variables.body.ass > 0) && State.active.variables.flags.salonAss);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	assMaintainXL: {
		id: "assMaintainXL",
		name:"Task ass maintain XL",
		text: {
			given: "Since you chose to have such a large ass, make sure you maintain that size and shape next week.",
			perform: "",
			finish: "$teacher looks at your enormous ass.\n\n@@.teacher;\"That ass is just asking to get spanked hard.\"@@",
			fail: "Aww, did someone regret giving themselves such a fat, fuckable sissy ass? We'll see what you regret... Take a mark.",
			reminder: "Don't forget about your ass treatment.",
			checkMe: {
				given: "keep your ass huge and soft.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.ass == 2) && (State.active.variables.body.permAss <= 1) && (State.active.variables.body.semiAss <= 1) && (State.active.variables.tasksTeacherBody.lipsIncrease.status == 0));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 5, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 100,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return ((State.active.variables.body.ass == 2) && State.active.variables.flags.salonAss);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	analSmooth: {	// perv 7+
		id: "analSmooth",
		name:"Task anal smoothening",
		text: {
			given: "You know, I think it's time for you to get an anal smoothing course. Next week I want to see you walk around with your anus nice and smooth.",
			perform: "",
			finish: "$teacher slides her finger along your anus, making you twitch from the sensation.\n\n@@.teacher;\"It is so smooth... such a good, obedient boy. I bet you enjoyed the procedure too, didn't you?\"@@",
			fail: "Too shy to try anal smoothening procedure. Afraid that sissy like you might enjoy it too much? A mark, for disobedience.",
			reminder: "Don't forget to get your anus smoothed out this weekend.",
			checkMe: {
				given: "sign for an anal smoothing procedure.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return (State.active.variables.body.anal == 0);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 7, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 100,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() {
				return (State.active.variables.body.anal > 0);
			},
			success: function() {},
			fail: function() { return false; }
		}
	},
	semiPermCheckUp: {
		id: "semiPermCheckUp",
		name:"Task semi-permanent treatments check up",
		text: {
			given: "You need to keep your body well cared, so sign for the semi-permanent treatments check up this weekend. Nancy would be delightful to see you.",
			perform: "",
			finish: "$teacher nods to you. @@.teacher;\"I hope you enjoyed your //check up// at the Salon.\"@@",
			fail: "You decided to skip your check up at the Salon? I'm adding cost of the check up to your weekly payment.",
			reminder: "Don't forget to get your regular check up.",
			checkMe: {
				given: "sign for the check up of your semi-permanent treatments.",
				finish: "You did it.",
				fail: "",
				reminder: "You haven't done it yet."
			}
		},
		Conditions: function() {
			return ((State.active.variables.body.semiAss > State.active.variables.body.permAss) || (State.active.variables.body.semiLips > State.active.variables.body.permLips) || (State.active.variables.body.semiManicure > State.active.variables.body.permManicure) || (State.active.variables.body.semiBoobs > State.active.variables.body.permBoobs) || (State.active.variables.body.semiMakeup > State.active.variables.body.permMakeup));
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [2,3,4,5],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 1, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 10,
		failPenalty: 3,
		events: {
			start: function() {},
			finish: function()  { return false; },
			success: function() {},
			fail: function() {
				State.active.variables.player.bribeDiscount-=window.misc.calcSemiPermCost();
				return false;
			},
		}
	},
	noTasksToday: {
		id: "noTasksToday",
		name:"No tasks",
		text: {
			given: "",
			perform: "",
			finish: "",
			fail: "",
			reminder: "",
			checkMe: {
				given: "",
				finish: "",
				fail: "",
				reminder: ""
			}
		},
		finishPassage: "Go to bedroom",
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 0,  // number of days allowed before task will fail
		cooldown: 1,  // number of days before task available again
		rewardMoney: 0,
		rewardDebt: 0,
		failPenalty: 0,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	}
}

window.tasksEmail={
	PinkRollers: {
		id: "PinkRollers",
		name:"PinkRollers",
		sender: "",
		PassageName: "Email links",
		PassageRepeat: true,
		AllowInbox: true,
		text: {
			given: "Special request",
			perform: "Hello. I have a special request. If you would send me a video of yourself playing with a dildo wearing pink rollerskates, I'll give you $50.\n\nThanks",
		},
		Conditions: function() {
			return (State.active.variables.player.perversion.upload > 3) && (!State.active.variables.flags.uploadCaught);
		},
		image: "",
		startPriority: 10,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 4, max: 4 }
		},
		chance: 5,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 5,  // number of days before task available again
		rewardMoney: 50,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	WebcamDildoAss: {
		id: "WebcamDildoAss",
		name:"WebcamDildoAss",
		sender: "",
		PassageName: "Email links",
		PassageRepeat: true,
		AllowInbox: true,
		text: {
			given: "Request for a video of dildo play",
			perform: "Hello. Show me what a good sissy you are. Film yourself fucking a dildo on camera. Reward will be $10. Oh, and do it while being locked in chastity.\n\nThanks",
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 3,  // number of days before task available again
		rewardMoney: 10,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	WebcamDeepthroat: {
		id: "WebcamDeepthroat",
		name:"WebcamDeepthroat",
		sender: "",
		PassageName: "Email links",
		PassageRepeat: true,
		AllowInbox: true,
		text: {
			given: "Request for a video of deepthroat practice",
			perform: "Hello. I would pay you a $10 for a video of you taking a dildo as far as you can down your throat. Make it look good and the money is yours.\n\nThanks",
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 3,  // number of days before task available again
		rewardMoney: 10,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	WebcamMaid: {
		id: "WebcamMaid",
		name:"WebcamMaid",
		sender: "",
		PassageName: "Email links",
		PassageRepeat: true,
		AllowInbox: true,
		text: {
			given: "Request for maid video",
			perform: "Hello. I would pay $20 for a video of you cleaning house dressed as a sexy maid. Two more conditions - you need to be locked in chastity and have a butt-plug in. It should be on video.\n\nThanks",
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 5, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 4,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	WebcamTail: {
		id: "WebcamTail",
		name:"WebcamTail",
		sender: "",
		PassageName: "Email links",
		PassageRepeat: true,
		AllowInbox: true,
		text: {
			given: "Video request",
			perform: "Hello. I would pay $20 for a video of you dressed as a fox girl. Wiggle your butt with a tail-plug in it and the money is yours. Be a good pet.\n\nThanks",
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 4,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	WebcamHorseCock: {
		id: "WebcamHorseCock",
		name:"WebcamHorseCock",
		sender: "",
		PassageName: "Email HorseCock",
		PassageRepeat: false,
		AllowInbox: false,
		text: {
			given: "Video request",
			perform: "Hello. I would pay $40 for a video of you jumping on a special horsecock dildo. Show me your hungry ass pussy taking it in and money is yours.\n\nThanks",
		},
		Conditions: function() {
			return (State.active.variables.body.anal >= 3);
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 6, max: 10 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 30,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 5,  // number of days allowed before task will fail
		cooldown: 13,  // number of days before task available again
		rewardMoney: 20,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	},
	WebcamSelfieChastity: {
		id: "WebcamSelfieChastity",
		name:"WebcamSelfieChastity",
		sender: "",
		PassageName: "Email links",
		PassageRepeat: true,
		AllowInbox: true,
		text: {
			given: "Request for a chastity photo",
			perform: "Hello. Take a photo of yourself locked in chastity. Reward will be $5.\n\nThanks",
		},
		Conditions: function() {
			return true;
		},
		image: "",
		startPriority: 0,  // see priority system above
		canStart: true,  // only if true can this task be picked
		canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
		perversion: {
			teacher:	{ min: 0, max: 5 },
			therapist:	{ min: 0, max: 10 },
			guardian:	{ min: 0, max: 10 }
		},
		chance: 10,
		status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
		progress: 0,  // for progressing scenes
		startDay: 0,  // day task was started
		maxDays: 3,  // number of days allowed before task will fail
		cooldown: 2,  // number of days before task available again
		rewardMoney: 5,
		rewardDebt: 0,
		failPenalty: 1,
		events: {
			start: function() {},
			finish: function() { return true; },
			success: function() {},
			fail: function() { return false; }
		}
	}
},
