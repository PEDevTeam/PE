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
		if (!State.active.variables.flags.friendIsMale) {
			var friendG = State.active.variables.friendG;
			friendG.he_she='she';
			friendG.He_She='She';
			friendG.him_her='her';
			friendG.Him_Her='Her';
			friendG.his_her='her';
			friendG.His_Her='Her';
			friendG.his_hers='hers';
			friendG.His_Hers='Hers';
		}
	},
	setwords: function() {
		var vars=State.active.variables;
		var body=State.active.variables.body;
		vars.ass="ass";
		vars.butt="butt";
		if (body.ass == 1) { vars.ass="heartshaped ass"; vars.butt="shapely butt"; }
		if (body.ass == 2) { vars.ass="curvy ass"; vars.butt="bubble butt"; }
		vars.lips="lips";
		if (body.lips == 1) { vars.lips="plump lips"; }
		if (body.lips == 2) { vars.lips="puffy lips"; }
		vars.penis="penis";
		if (window.playerCode.isWearingOn(itemTypes.Chastity)) { vars.penis="caged penis"; }
		if (body.penisShrink == 1) { 
			vars.penis="small penis"; 
			if (window.playerCode.isWearingOn(itemTypes.Chastity)) { vars.penis="tiny caged penis"; }
			}
		vars.skirt="dress";
		if (window.playerCode.isWearing(itemsC.skirtTop) || window.playerCode.isWearing(itemsC.sluttyschoolFemale)) { vars.skirt="skirt"; }
		vars.chest="flat chest";
		if (body.boobs == 1) { vars.chest="tiny breasts"; }
		if (body.boobs == 2) { vars.chest="breasts"; }
		if (body.boobs == 3) { vars.chest="big breasts"; }
		if (body.boobs == 4) { vars.chest="huge breasts"; }
	},
};