// Macro <<selectScene>>
//   by Andrew Svedby (c) 2018-01-02
// Released under the same license as SugarCube

// Macro needs a variable to store its state. This variable is called
//  $selectScene and must be initialized to {}, i.e. an empty object
//  <<set $selectScene = {}>>
//  Put this where ever you initialize your variables.

// <<selectScene ID Strategy>>
// <<scene>> Scene 1
//   ...
// <</selectScene>>

// ID is a unique string that identifies this instance of the macro
// Strategy is any of SEQ, RND, SEQ2RND and RND2RND

// If strategy is RND, <<selectScene>> will randomly select a <<scene>>
//  and display it. If there are more then 2 <<scene>> it will avoid
//  picking the last <<scene>> picked.

// If strategy is SEQ2RND, it will go through all <<scene>> one by
//  one for each call to <<selectScene>>. Once all <<scene>> has been
//  displayed, <<scene>> is picked as if strategy was RND.

// If strategy is RDN2RND, it will go through all <<scene>> in a
//  random order for each call to <<selectScene>>. Once all <<scene>>
//  has been displayed, <<scene>> is picked as if strategy was RND

// If strategy is SEQ, it will go through all <<scene>> one by one
//  for each call to <<selectScene>>. Once all <<scene>> has been
//  displayed, the last <<scene>> will continue to be displayed.

// <<restIsRandom>> switches strategy SEQ to RND for all remaining
//  <<scene>>

// <<selectScene ID SEQ>>
// <<scene>> First
// <<scene>> Second
// <<restIsRandom>>
// <<scene>> Random 1
// <<scene>> Random 2
// <<scene>> Random 3
// <</selectScene>>

// First time selectScene is called 'First' will be displayed, second
//  time 'Second' will be displayed. There after 'Random 1' to 'Random3'
//  will be randomly selected as if strategy was RND

// <<scene Chance>> where Chance is a natural number (i.e. a non
//  negative integer). If no chance is given, the default value of 10
//  will be used.
// This will bias the chance of any given <<scene>> to be displayed
// For strategy SEQ, chance can only be used after <<restIsRandom>>
//  because scenes before that are stepped through sequentially.
// For strategies SEQ2RND and RND2RND, chance is ignored untill all
//  scenes has been showed once. If you want to display a scene only in
//  the first phase but not in the RND phase, use <<scene 0>> for that
//  I.e. scene has zero chance of being picked.

// State stored in State.active.variables.selectScene[ID]
// { checksum:		"<strategy>:weight: ... :restIsRnd: .... ",
//   strategy:		SEQ/RND/SEQ2RND/RND2RND,
//   perm:		[indices to this.payload[i] for first pass through],
//   scenes:		[indices into this.payload[i] for all scenes (or scenes after <<restIsRandom>>)],
//   chances:		[ev chance value for payload or 10 if no chance given],
//   last:		index_of_last_scene_shown,
// }
//



Macro.add('selectScene', {
    tags	: ['scene', 'scene-if', 'restIsRandom'],
    handler() {
	var sceneOK = (index) => {
	    var payload = this.payload[index];
	    if (payload.name != 'scene-if') {
		return true;
	    } else {
		var ret = false;
		try { ret = Scripting.evalJavaScript(payload.args[0]); }
		catch (ex) { ret = false; }
		return ret;
	    }
	};
	var rand = (limit) => Math.floor(Math.random() * limit);
	var checksum = 0;
	var hash =  (str) => {
	    var len = str.length, i = 0;
	    while (i < len) {
		checksum = ((checksum << 5) - checksum + str.charCodeAt(i++)) << 0;
	    }
	};
	if (this.args.length != 2) {
	    return this.error('takes two arguments, <id> and <strategy>');
	}
	var id = this.args[0], strategy = this.args[1];
	if (!['SEQ', 'SEQ2RND', 'RND', 'RND2RND'].includes(strategy)) {
	    return this.error('strategy "' + strategy + '" is not correct');
	}
	if (this.payload.length < 2) {
	    return this.error('requires at least one <<scene>>');
	}
	
	// This is where the state is stored
	var topObj = State.active.variables.selectScene;
	
	// Compute checksum
	hash(strategy);
	for (var i = 1; i < this.payload.length; ++i) {
	    hash(this.payload[i].args.raw);
	    hash(this.payload[i].contents);
	}

	var errorStr = '';
	var expErrors = '';
	// Reset state if state exists and checksum has changed
	if ((id in topObj) && (topObj[id].checksum != checksum)) {
	    errorStr = '@@.debugMsg;id "' + id + '" is not unique or has been changed@@ ';
	    delete topObj[id];
	}
	
	if (! (id in topObj)) { // No state for this id, so create it
	    var scenesObj = {
		strategy: strategy,
		checksum: checksum,
		scenes: [], perm: [], chances: [], 
		last: -1,
	    };
			
	    // Iterate over this.payload and store in scenesObj
	    var restIsRnd = false; var chances = [];
	    var lastSceneType = ''; var nonZeroChance = false;
	    for (var i = 1; i < this.payload.length; ++i) {
		var chance = undefined;
		var payload = this.payload[i];
		var argsLen = payload.args.length;
		lastSceneType = payload.name;
		if (payload.name == 'restIsRandom') {
		    if (strategy != 'SEQ' && strategy != 'RND') {
			return this.error('<<restIsRandom>> can only be used with strategy SEQ or RND');
		    } else if (restIsRnd) {
			return this.error('<<restIsRandom>> can only be called once');
		    } else if (i + 2 > this.payload.length) {
			return this.error('<<restIsRandom>> must have at least one <<scene>> after it');
		    }
		    restIsRnd = true;
		    scenesObj.scenes = [];
		    continue;

		} else if (payload.name == 'scene-if') {
		    if (argsLen == 0) {
			return this.error('<<scene-if>> must have one argument, expression');
		    } else if (argsLen > 2) {
			return this.error('<<scene-if>> only takes two args, expression and chance');
		    }
		    // Try to evalluate expression, collect errors
		    try { Scripting.evalJavaScript(payload.args[0]); }
		    catch (ex) { expErrors += '<<scene-if>> bad conditional expression ' + ex.message + ' '; }
		    if (argsLen == 2) {
			chance = payload.args[1];
		    }
		} else {	// must be <<scene>>
		    if (argsLen > 1) {
			return this.error('<<scene>> only takes one arg, chance');
		    } else if (argsLen == 1) {
			chance = payload.args[0];
		    }
		}

		if (chance === undefined) {
		    chance = 10;
		} else 	if (!Number.isInteger(chance)) {
		    return this.error('chance must be an integer, not ' + chance);
		} else if (chance < 0) {
		    return this.error('chance can not be negative');
		} else if (strategy == 'SEQ' && !restIsRnd) {
		    return this.error('chance can only be set after <<restIsRandom>> for strategy SEQ');
		} else if (strategy == 'RND' && chance == 0) {
		    return this.error("chance can't be zero for strategy RND");
		} else if (restIsRnd && chance == 0) {
		    return this.error("chance can't be zero after <<restIsRanndom>>");
		}

		if (chance > 0) { scenesObj.scenes.push(i); }
		scenesObj.chances[i] = chance;
		// Build permutation for SEQ,SEQ2RND, and RND2RND
		if ((strategy == 'SEQ2RND' || strategy == 'SEQ')
		    && !restIsRnd) {
		    // 'Permutation' is in sequential order
		    scenesObj.perm.unshift(i);
		} else if (strategy == 'RND2RND' ||
			   (strategy == 'RND' && !restIsRnd)) {
		    var j = rand(scenesObj.perm.length + 1);
		    scenesObj.perm.splice(j, 0, i);
		}
	    }
	    if (expErrors) {
		return this.error(expErrors);
	    }
	    // For strategy SEQ, if no <<restIsRandom>>, get 'stuck' on last scene
	    if (strategy == 'SEQ' && !restIsRnd) {
		scenesObj.scenes = [scenesObj.perm[0]];
	    }
	    
	    // SEQ with no <<restIsRandom>> can not have a <<scene-if>> as last scene
	    if (strategy == 'SEQ' && !restIsRnd && lastSceneType == 'scene-if') {
		return this.error('Last scene can not be <<scene-if>> for strategy SEQ');
	    }

	    // Sanity check on chanses
	    if (scenesObj.scenes.length == 0) {
		return this.error('Not all chance can be zero');
	    }
	    topObj[id] = scenesObj;		// Store state for id
	} // End of adding new selectScene

	// Find state for id
	var obj = topObj[id];
	
	// Find scene, first in perm and then in scenes
	var index = -1;
	while (obj.perm.length > 0) {
	    index = obj.perm.pop();
	    if (sceneOK(index)) {
		break;
	    }
	    index = -1;
	}
	if (index == -1) {
	    if (strategy == 'SEQ') {
		obj.strategy = 'RND';
	    }
	    var scenes = obj.scenes.filter(sceneOK);
	    var len = scenes.length;
	    var chanceTot = 0;
	    for (var i = 0; i < len; i++) {
		var scenesIndex = scenes[i];
		if (len < 3 || scenesIndex != obj.last) {
		    chanceTot += obj.chances[scenesIndex];
		}
	    }
	    // Find a random scene (except last scene selected)
	    //  weighted by chance
	    var chance = rand(chanceTot);
	    for (var i = 0; i < len; i++) {
		var scenesIndex = scenes[i];
		if (len < 3 || scenesIndex != obj.last) {
		    chance -= obj.chances[scenesIndex];
		    if (chance < 0) {
			index = scenesIndex;
			break;
		    }
		}
	    }
	}
	if (!State.active.variables.player.debugA) { errorStr = ''; }
	obj.last = index;		// Store index to selected scene
	jQuery(this.output).wiki(errorStr + this.payload[index].contents);
    }
});
