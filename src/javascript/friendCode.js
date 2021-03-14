window.friendCode={
	// returns a listing of items the PC needs to wear for interaction with friend
	missingAttire: function () {
		var vars=State.active.variables;
		
		// get state of current attire
		let underwear=window.wardrobeFuncs.getWornItem('underwear');
		let outerwear=window.wardrobeFuncs.getWornItem('outerwear');
		let chastity=window.wardrobeFuncs.getWornItem('chastity');
		let shoes=window.wardrobeFuncs.getWornItem('shoes');
		let hosiery=window.wardrobeFuncs.getWornItem('hosiery');
		let plug=window.wardrobeFuncs.getWornItem('buttplug');
		let bra=window.wardrobeFuncs.getWornItem('bra');
		
		// detect missing items, map to a short description
		let missing = [];
		if (underwear.isFemale == 0) {
			missing.push("panties");
		}
		if (!chastity) {
			missing.push("the cage");
		}
		if ((!hosiery) || (hosiery && hosiery.isFemale == 0)) {
			missing.push("stockings");
		}
		if (!bra) {
			missing.push("a bra");
		}
		if (vars.body.bodyhair == 0 && vars.friendG.seenWaxedLeg == 1) {
			missing.push("a shave");
		}
		
		// construct a listing in natural language (English, hopefully)
		let out = [];
		missing.forEach((e,i) => {
			if (i == missing.length-1 && out.length > 0) {
				out.push(" and ")
			} else if (i > 0) {
				out.push(", ")
			}
			out.push(e);
		});
		return out.join("");
	}
}