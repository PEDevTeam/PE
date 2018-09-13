Macro.add('reactOnce', {
    tags: null,
    handler() {
        if (this.payload == null) { return this.error('there is no payload'); }
        let payload = this.payload[0];
	let len = payload.args.length;
	let flags = State.active.variables.flags;
        if (len < 2) { return this.error('wrong number of args should be boolean, and flag-names') };
        let argBool = payload.args[0], argFlag = payload.args[1];
        try { argBool = Scripting.evalJavaScript(payload.args[0]); }
        catch (ex) { return this.error('unknown error ' + ex.message); }
        if (argBool && !flags[argFlag]) {
	    for (let i = 1; i < len; i++) {
		flags[payload.args[i]] = true;
	    }
	    jQuery(this.output).wiki(payload.contents);
        }
    }
});
