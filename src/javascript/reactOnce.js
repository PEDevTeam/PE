Macro.add('reactOnce', {
    tags: null,
    handler() {
        if (this.payload == null) { return this.error('there is no payload'); }
        let payload = this.payload[0];
	let len = payload.args.length;
	let flags = State.active.variables.flags;
	let noFlag = [], errorStr = '';
        if (len < 2) { return this.error('wrong number of args should be boolean, and flag-names') };
        let argBool = payload.args[0], argFlag = payload.args[1];
        try { argBool = Scripting.evalJavaScript(payload.args[0]); }
        catch (ex) { return this.error('unknown error ' + ex.message); }
	if (State.active.variables.player.debugA) {
	    for (let i = 1; i < len; i++) {
		if (!flags.hasOwnProperty(payload.args[i])) {
		    noFlag.push(payload.args[i]);
		}
	    }
	    if (noFlag.length > 0) {
		errorStr = '@@.debugMsg;No such flags as ' + noFlag.join(', ') + '@@ ';
	    }
	}
        if (argBool && !flags[argFlag]) {
	    for (let i = 1; i < len; i++) {
		flags[payload.args[i]] = true;
	    }
	    jQuery(this.output).wiki(errorStr + payload.contents);
        } else if (errorStr != '') {
	    jQuery(this.output).wiki(errorStr);
	}
    }
});
