const poiseActions = {
    "seat" : {
        "legs" : {
            "command" : "Knees together.",
            "options": ["Knees together", "Separate your knees", "Spread your legs"],
            "position": ["together", "slightly apart casual", "spread wide"]
        },
        "back": {
            "command" : "Back straight!",
            "options" : ["Sit tall", "Sit casual", "Slouch"],
            "position": ["up straight and stiff", "slightly relaxed", "slouching in your chair"]
        },
        "feet": {
            "command" : "Ankles crossed.",
            "options" : ["Cross your ankles", "Put your heels together", "Dangle your feet"],
            "position": ["crossed", "together", "dangling apart"]
        },
        "hands": {
            "command" : "Hands in your lap.",
            "options" : ["Cross your hands in your lap", "Put your hands at your side", "Let your arms dangle loosely"],
            "position": ["folded in your lap", "at your sides", "dangling loose"]
        },
        "chin": {
            "command" : "Chin up.",
            "options" : ["Raise your chin", "Lower your chin", "Tilt your head"],
            "position": ["proudly raised", "lowered to your chest", "tilted awkwardly"]
        },
        "eyes": {
            "command" : "Eyes forward.",
            "options" : ["Look straight ahead", "Look off to the side", "Look down"],
            "position": ["staight ahead", "off to the side", "down"]
        }
    },
    "stand" : {
        "straight" : {
            "command" : "Stand up straight.",
            "options": ["Stand tall", "Stand relaxed", "Slouch"],
            "position": ["tall", "relaxed", "slouched"]
        },
        "shoulders" : {
            "command" : "Shoulders back.",
            "options": ["Keep your shoulders upright and back", "Let your shoulders relax", "Roll your shoulders forward"],
            "position": ["pulled back", "neutral", "rolled forward"]
        },
        "arms" : {
            "command" : "Arms relaxed at your side.",
            "options": ["Rest arms gently", "Hold arms stiff", "Let your arms dangle loosely"],
            "position": ["nicely hanging at your side", "stiff", "dangling casually"]
        },
        "knees" : {
            "command" : "Knees together.",
            "options": ["Press your thighs tight", "Spread your knees slightly", "Take a wide stance"],
            "position": ["close together", "slightly separated", "bow-legged"]
        },
        "feet" : {
            "command" : "Toes straight.",
            "options": ["Point your toes straight ahead", "Angle your feet out", "Point your toes in"],
            "position": ["pointed straight head", "pointed outward", "pigeon-toed"]
        },
        "head" : {
            "command" : "Chin up.",
            "options": ["Look straight ahead", "Relax your head", "Look down"],
            "position": ["straight ahead", "slightly down", "at the floor"]
        },
    }
};
// cheesing random-walking a 3-item array
const orders = [
    [0,1,2],
    [0,2,1],
    [2,0,1],
    [2,1,0],
    [1,0,2],
    [1,2,0]];
 
macros['printCommand']= {
    handler:function(place, macroName, params ){
        var commands=poiseActions[params[0]];
        var commandItemName;
		var destPassage;
        if (params.length > 2) {
            commandItemName = params[1];
			destPassage = params[2];
        } else {
            var keys = Object.keys(commands);
            commandItemName = keys[ keys.length * Math.random() << 0];
			destPassage = params[1];
        }
        var commandItems = commands[commandItemName].options;
        var outStr = "@@.teacher;“" + commands[commandItemName].command + "”@@\n\n"
		
        outStr += "[[Remain still|" + destPassage + "][$sceneAction=0; ;$scenePosition='" + commandItemName + "']]\n";
        orders[random(5)].forEach(element => {
			if (element != State.active.variables.positionStatus[commandItemName]){
				outStr += "[[" + commandItems[element] + "|" + destPassage + "][$sceneAction=" + (element+1) + ";$scenePosition='" + commandItemName + "']]\n";
			}
        });
 
        new Wikifier(place, outStr);
    }
};
 
 
macros['printPosition']= {
    handler:function(place, macroName, params ){
        var actions=poiseActions[params[0]];
        var curPosition=params[0];
		var posStatus = params[1];
        var outStr;
 
        switch (curPosition) {
        case 'seat':
            outStr = "You are sitting " + actions.back.position[posStatus.back] + ". Your legs are " + actions.legs.position[posStatus.legs] + " with your feet " + actions.feet.position[posStatus.feet] + " under you. Your hands are " + actions.hands.position[posStatus.hands] + ", and your chin is " + actions.chin.position[posStatus.chin] + ". You are looking " + actions.eyes.position[posStatus.eyes] + ".";
            break;
        case 'stand':
            outStr = "You are standing " + actions.straight.position[posStatus.straight] + ". Your shoulders are " + actions.shoulders.position[posStatus.shoulders] + " with your arms " + actions.arms.position[posStatus.arms] + ". Your knees are " + actions.knees.position[posStatus.knees] + ", and your feet are " + actions.feet.position[posStatus.feet] + ". You are looking " + actions.head.position[posStatus.head] + ".";
            break;
        }
        
 
        new Wikifier(place, outStr);
    }
};
 
const dance = {
    "slow" : {
        "song" : "a slow country ballad",
		"link" : "https://www.youtube.com/watch?v=JYZMT8otKdI",
        "stance" : "close body contact",
        "dance" : "waltz",
        "mood" : "romantic",
        "finish" : "dip"
    },
    "fast" : {
        "song" : "a swinging rockabilly tune",
        "link" : "https://www.youtube.com/watch?v=sMPNjPpdjKU",
        "stance" : "butterfly",
        "dance" : "swing",
        "mood" : "jazzy",
        "finish" : "spin"
    },
    "slutty" : {
        "song" : "an up-tempo club hit",
		"link" : "https://www.youtube.com/watch?v=JYZMT8otKdI",
        "stance" : "separated",
        "dance" : "solo",
        "mood" : "slutty",
        "finish" : "twerk"
    }
}
macros['printDance']= {
    handler:function(place, macroName, params){
		var danceType = params[0];
        var outStr = dance[danceType].song;
        new Wikifier(place, outStr);
    }
};
 
const danceOptions = {
    "stance" : ["close body contact","separated", "banjo", "sidecar", "butterfly", "contra-body movement", "promenade"],
    "dance" : ["waltz", "solo", "rumba", "macarena", "swing"],
    "mood" : ["romantic", "serious", "jazzy", "slutty"],
    "finish" : ["dip", "spin", "twerk"]
}
 
macros['printDanceOptions']= {
    handler:function(place, macroName, params){
        var danceType=params[0];
        var stage=params[1];
        var destPassage=params[2];
        var outStr;
 
        switch(stage) {
            case "stance":
                outStr = "What stance will you take with your partner?\n\n";
                break;
            case "dance":
                outStr = "What style of dance will you perform?\n\n";
                break;
            case "mood":
                outStr = "As the song continues you have an opportunity to let your movements convey the emotion of the music, what will you do?\n\n";
                break;
            case "finish":
                outStr = "As the song continues you think about how you want to really make an impression when it finally comes to an end.\n\n";
                break;
        }
 
        danceOptions[stage].forEach(element => {
            if (element == dance[danceType][stage]) {
			outStr += "[[" +element + "|" + destPassage + "][$sceneAction='" + element + "';$sceneCorrect=true]]\n";
            } else {
                outStr += "[[" +element + "|" + destPassage + "][$sceneAction='" + element + "';$sceneCorrect=false]]\n";
            }
        });
 
        new Wikifier(place, outStr);
    }
};