window.randomCode={
	getIntInclusive: function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	store: function(maxArray) {
		if (Array.isArray(maxArray)) {
			State.active.variables.stored=[];
			for (var i=0; i < maxArray.length; i++) {
				State.active.variables.stored.push(this.getIntInclusive(0, maxArray[i]));
			}
		} else {
			State.active.variables.stored=this.getIntInclusive(0, maxArray);
		}
	}	
}