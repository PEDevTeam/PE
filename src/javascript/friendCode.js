window.friendCode={
	// returns a listing of items the PC needs to wear for interaction with friend
	missingAttire: function () {
		var vars=State.active.variables;
		
		// get state of current attire
		let u=playerCode.isWearingOn(itemTypes.Underwear);
		let o=playerCode.isWearingOn(itemTypes.Outerwear);
		let c=playerCode.isWearingOn(itemTypes.Chastity);
		let f=playerCode.isWearingOn(itemTypes.Shoes);
		let p=playerCode.isWearingOn(itemTypes.Stockings);
		let b=playerCode.isWearingOn(itemTypes.AnalPlug);
		let bra = playerCode.isWearingOn(itemTypes.Bras);
		
		// detect missing items, map to a short description
		let missing = [];
		if (u.female == 0) {
			missing.push("panties");
		}
		if (c == 0) {
			missing.push("the cage");
		}
		if (p == 0 || (p && p.female == 0)) {
			missing.push("stockings");
		}
		if (bra == 0) {
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