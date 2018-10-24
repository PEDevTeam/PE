window.hypnoCode={
	getHypnoImage: function() {
		var ha=[];
		var tc=0;
		for (var i=0; i < window.hypnoImages.length; i++) {
			if (window.hypnoImages[i].conditions() && (State.active.variables.player.perversion.therapist == window.hypnoImages[i].stage)) {
				ha.push(window.hypnoImages[i]);
				tc+=window.hypnoImages[i].chance;
			}
		}
		tc=window.randomCode.getIntInclusive(1, tc);
		for (var j=0; j < ha.length; j++) {
			tc-=ha[j].chance;
			if (tc <= 0) {
				return ha[j].filename;
			}
		}
	}
},

window.hypnoImages=[
	{
		filename: "hypno_1_1.gif",
		chance: 10,
		stage: 3,
		conditions: function() { return true; }
	},
	{
		filename: "hypno_1_2.gif",
		chance: 10,
		stage: 3,
		conditions: function() { return true; }
	},
	{
		filename: "hypno_2_1.gif",
		chance: 10,
		stage: 4,
		conditions: function() { return true; }
	},
	{
		filename: "hypno_2_2.gif",
		chance: 10,
		stage: 4,
		conditions: function() { return true; }
	},
	{
		filename: "hypno_2_3.gif",
		chance: 10,
		stage: 4,
		conditions: function() { return true; }
	},
	{
		filename: "hypno_3_1.gif",
		chance: 10,
		stage: 5,
		conditions: function() { return true; }
	},
	{
		filename: "hypno_3_2.gif",
		chance: 10,
		stage: 5,
		conditions: function() { return true; }
	},
];