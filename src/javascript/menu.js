$('#menu-item-settings a').off().ariaClick(function (ev) {
	Dialog.setup("Settings");
	Dialog.wiki(Story.get("Settings").processText());
	Dialog.open();
	/*Dialog.open(Dialog.setup("Available only at bedroom",UI.buildSettings))*/
});