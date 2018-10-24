window.gameCode={
	version: 0.7903
}

Config.history.maxStates=1;
Config.history.controls = false;

window.sidebarTabs=[
	{
		name: "Clothes",
		tableId: "clothes"
	},
	{
		name: "Inventory",
		tableId: "inventory"
	},
	{
		name: "Stats",
		tableId: "stats"
	},
	{
		name: "Debug",
		tableId: "debug"
	}
];

window.sidebar={
	className: function(id) {
		return (State.active.variables.sidebarTab == id) ? "" : "hidden";
	},
	tabClassName: function(id) {
		return (State.active.variables.sidebarTab == id) ? "sidebar_tab_active" : "";
	},
	refresh: function() {
		for (var i=0; i < window.sidebarTabs.length; i++) {
			var o=document.getElementById(window.sidebarTabs[i].tableId);
			if (o) {
				o.className = window.sidebar.className(i);
				document.getElementById('sidebar_control').children[0].children[i+1].className=sidebar.tabClassName(i);
			}
		}
	},
	activate: function(id) {
		State.active.variables.sidebarTab=id;
		this.refresh();
	}
},