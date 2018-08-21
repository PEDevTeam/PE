window.wordsCode={
	setFutaPronouns: function() {
		if (State.active.variables.kink.futa) {
			var futa = State.active.variables.futa;
			futa.he_she='she';
			futa.He_She='She';
			futa.him_her='her';
			futa.Him_Her='Her';
			futa.his_her='her';
			futa.His_Her='Her';
			futa.his_hers='hers';
			futa.His_Hers='Hers';
			futa.Boy_Girl='Girl'
			futa.boy_girl='girl'
			futa.Boys_Girls='Girls'
			futa.boys_girls='girls'
			futa.Guy_Girl='Girl'
			futa.guy_girl='girl'
		}
	},
	setFriendPronouns: function() {
		if (!State.active.variables.player.flags.friendIsMale) {
			var friend = State.active.variables.friend;
			friend.he_she='she';
			friend.He_She='She';
			friend.him_her='her';
			friend.Him_Her='Her';
			friend.his_her='her';
			friend.His_Her='Her';
			friend.his_hers='hers';
			friend.His_Hers='Hers';
		}
	}
};