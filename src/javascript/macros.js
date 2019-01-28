//:: Story JavaScript [script]
// Begin Inventory Macros
// Original macros by F2Andy: http://strugglingwithtwine.blogspot.ca/2014/03/handling-inventory.html
//
// Instructions:
//
// 1. In a passage, check if there's an item in the inventory...
// ...if not, give the user the option to link to a passage that adds it to inventory:
// <<if $inventory.indexOf("An Unsigned Note") == -1>>There is a note here. [[Pick up the note.]]<<endif>>
//
// 2. In a passage, check if there's an item in the inventory..
// ...if so, give the user a choice to progress to a new passage:
// <<if $inventory.indexOf("The Golden Key") == -1>>[[Unlock the door.]]<<endif>>
//
// 3. To add an "Inventory" link in your sidebar menu, create a passage named "StoryMenu".
// In it, create a link to your inventory's passage: [[Inventory]] or [[Backpack]], for example.
// Create a passage named "Inventory", and in it, write something like the following:
// <<if $inventory.length == 0>>You are not carrying anything.<<else>>You are carrying:
// <<invWithLinks>> <<endif>>
// <<back>>

// A helper function for the following macros.
window.getInv = function() {
  return state.active.variables.inventory;
}

// Starts your inventory. You need to call this once at the start of your game in order to make the inventory work.
// Usage: Place <<initInv>> in your StoryInit passage. Don't have a StoryInit passage? Make one.
macros.initInv = {
  handler: function(place, macroName, params, parser) {
    state.active.variables.inventory = [];
  }
};

// Add an item to your inventory:
// Usage: <<addToInv rock>> or <<addToInv "a smooth rock">>
macros.addToInv = {
  handler: function(place, macroName, params, parser) {
    if (params.length == 0) {
      throwError(place, "<<" + macroName + ">>: no parameters given");
      return;
    }
	var w=window.itemsC[params[0]];
	var wV=window.itemF.itemTwee(params[0]);
	var type=params[1];
	if (w.surgery) {
		return;
	}
	if (!w) {
		throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
		return;
	}
	if (!wV) {
		throwError(place, "<<" + macroName + ">>: invalid $item2 '" + params[0] + "'");
		return;
	}
	if (w.maxAlt) {
		if (!type) {
			type=0;
		}
		if ((wV.curAlt==0) && (wV.ownAlt.length==0)) {
			wV.curAlt=type;
		}
		wV.ownAlt[type]=true;
	}
    if (state.active.variables.inventory.indexOf(w.id) == -1) {
		state.active.variables.inventory.push(w.id);
		state.active.variables.inventory=state.active.variables.inventory.sort();
    }
	macros.getInventoryList.handler(document.getElementById('inventory'));
  }
};

// Removes an item from your inventory
// Usage: <<removeFromInv rock>> or <<removeFromInv "a smooth rock">>
macros.removeFromInv = {
	handler: function(place, macroName, params, parser) {
		if (params.length == 0) {
			throwError(place, "<<" + macroName + ">>: no parameters given");
			return;
		}
		var index = state.active.variables.inventory.indexOf(params[0]);
		if (index != -1) {
			state.active.variables.inventory.splice(index, 1);
		}
	}
};

// Display the inventory as a list: Rock, Paper, Scissors
// This can go in any passage, but the best spot would be your [[Inventory]] passage.
// Usage: <<inv>>
macros.inv = {
  handler: function(place, macroName, params, parser) {
    if (state.active.variables.inventory.length == 0) {
      new Wikifier(place, 'nothing');
    } else {
      new Wikifier(place, state.active.variables.inventory.join(','));
    }
  }
};

// Display the inventory as a series of links to passages with the same names.
// This can go in any passage, but the best spot would be your [[Inventory]] passage.
// Usage: <<invWithLinks>>
// If those passages don't exist, the links will be broken.
// There is a line break after every item in the inventory.
macros.invWithLinks = { 
  handler: function(place, macroName, params, parser) {
    if (state.active.variables.inventory.length == 0) {
      new Wikifier(place, 'nothing');
    } else {
      new Wikifier(place, '[[' + state.active.variables.inventory.join(']]<br>[[') + ']]');
    }
  }
};

macros.getInventoryList = {
  handler: function(place, macroName, params, parser) {
//		new Wikifier(place, 'Aside from your clothing, ');
		var inv=state.active.variables.inventory;
		var f=false;
		var td='';
		for (var i=0; i<inv.length; i++) {
			var o=window.itemsC[inv[i]];
			if (o && o.clothingType == 0 && (!o.surgery) && o.store != 1 && o.store != 2) {
				if (!f) {
					f=true;
//					new Wikifier(place, 'you currently have these items:<br><br><img id="inv_item" class="hidden">');
				}
				td+='<br>';
				td+=window.itemF.nameById(inv[i]);
			}
		}
		if (!f) {
//			td+="You don't have any items.";
		}
		new Wikifier(place, td);
	}
};

// Empty the inventory entirely.
// Note: This is not like "dropping" an object; they are not added to the current room/passage. It just erases them all entirely.
// Usage: <<emptyInv>>
macros.emptyInv = { 
  handler: function(place, macroName, params, parser) {
    state.active.variables.inventory = []
  }
};
// End Inventory Macros

macros ['glitchText'] = {
		handler:function(place, macroName, params){
			var text = params[0].split(" ");
			var str = "";
			for(var i=0;i<text.length;i++){
				var glitch;
				
				switch(Math.floor(Math.random()*3)){
				case 0: 
					glitch="glitch";
					break;
				case 1: 
					glitch="glitch2";
					break;
				case 2: 
					glitch="glitch3";
					break;
				default:
					glitch="glitch";
					break;
				}
				
				
				
			
				str+='<span class="'+glitch+'" data-text="'+text[i]+'">'+text[i]+'</span> '; 
			}
			console.log(str);
			new Wikifier(place, str);	
			
		}
}

macros.wearClothing = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemsC[params[0]];
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid clothing '" + params[0] + "'");
			return;
		}
		var ca=state.active.variables.player.clothes;
		for (var i=ca.length-1; i>=0; i--) {		
			var pc=window.itemsC[ca[i]];
			if ((pc==null) || (((pc.clothingType + pc.cantWearWith) & (w.clothingType + w.cantWearWith)) > 0)) {
				state.active.variables.player.clothes.splice(i, 1);
			}
		}
		state.active.variables.player.clothes.push(w.id);
		if (ca.length > 0) {
			state.active.variables.player.clothes=state.active.variables.player.clothes.sort();
		}
		var type=params[1];
		if (type) {
			var wV=window.itemF.itemTwee(params[0]);
			if (!wV) {
					throwError(place, "<<" + macroName + ">>: invalid $item2 '" + params[0] + "'");
					return;
				}
			wV.curAlt=type;
		}
	}
};

macros.buyItem = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemsC[params[0]];
		var wV=window.itemF.itemTwee(params[0]);
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		if (!wV) {
			throwError(place, "<<" + macroName + ">>: invalid $item '" + params[0] + "'");
			return;
		}

		var cost = w.cost;
		if (wV.cost != null) {
			cost = wV.cost;
		}

		if (!w.surgery) {
			if (state.active.variables.inventory.indexOf(w.id) == -1) {
				state.active.variables.inventory.push(w.id);
				state.active.variables.inventory=state.active.variables.inventory.sort();
			}
			if (w.maxAlt) {
				var type=params[1];
				if (type != null) {
					wV.curAlt=type;
				}
				if (type == null) {
					if (state.active.variables.showimages) {
						if ((wV.curAlt==0) && (wV.ownAlt.length==0)) {
							wV.curAlt=wV.storeCur;
						}
						wV.ownAlt[wV.storeCur]=true;
						state.active.variables.player.money-=Math.floor((wV.storeCur%10)*cost*0.02);
					}
					if (!state.active.variables.showimages) {
						wV.ownAlt[0]=true;
					}
				}
			}
		}
		
		state.active.variables.player.money-=cost;

		if (state.active.variables.player.money < 0) {
			state.active.variables.player.money = 0;
		}
	}
};

macros.payForItem = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemsC[params[0]];
		var wV=window.itemF.itemTwee(params[0]);
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		if (!wV) {
			throwError(place, "<<" + macroName + ">>: invalid $item '" + params[0] + "'");
			return;
		}

		var cost = w.cost;
		if (wV.cost != null) {
			cost = wV.cost;
		}
		
		state.active.variables.player.money-=cost;

		if (state.active.variables.player.money < 0) {
			state.active.variables.player.money = 0;
		}
	}
};

function getItem(id) {
	var ca=window.itemsC;
	
	for (var i=0; i<Object.keys(ca).length; i++) {
		if (ca[Object.keys(ca)[i]].id==id) {
			return ca[Object.keys(ca)[i]];
		}
	}

	return false;
}

function getItemObject(id) {
	/*var ca=state.active.variables.items;
	
	for (var i=0; i<Object.keys(ca).length; i++) {
		if (ca[Object.keys(ca)[i]].id==id) {
			return ca[Object.keys(ca)[i]];
		}
	}*/
	if (state.active.variables.items[id] && state.active.variables.items[id].name) {
		return state.active.variables.items[id].name;
	}
		
	return false;
}

function getItemName(id) {
	var ca=state.active.variables.items;
	var w=window.itemsC[id];
	var wV=window.itemF.itemTwee(id);

	if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + id + "'");
			return;
		}
	if (!wV) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + id + "'");
			return;
		}
		
	if ((wV != null) && (wV.name != null)) {
		return wV.name;
	}
	return w.name;
}

macros.notDressed = {
  handler: function(place, macroName, params, parser) {
		var id=params[0].replace(/[ ,']/g, '_');
		var r=params[1] ? params[1] : "You're not dressed appropriately";
		var ex=params[2] ? params[2] : '';
		new Wikifier(place, '<<click "' + params[0] + '">><<replace "#' + id + '">> @@.deny;' + r + '@@<</replace>><</click>> ' + ex + '<span id="' + id + '"></span>');
	}
};

macros.showClothingImage = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.clothingSelectorRender) {
			state.active.variables.clothingSelectorRender=false;
			state.active.variables.worn=[];
			state.active.variables.type=[];
			if (state.active.variables.showimages) {
				setTimeout(function() {
					var cis=document.getElementById('clothing_images');
					var wa=state.active.variables.worn;
					var wt=state.active.variables.type;
					var si=state.active.variables.itemsSize;
					for (var i=0;i<wa.length; i++) {
						if (wt[i]==100) {
							cis.innerHTML+='<img src="images/items/' + wa[i] + '" class="clothing_image_' + si + '">';
							continue;
						}
						if (wt[i]>9) {
							cis.innerHTML+='<img src="images/items/' + wa[i] + wt[i] + '.jpg" class="clothing_image_' + si +'">';
							continue;
						}
						if (wt[i]<10) {
							cis.innerHTML+='<img src="images/items/' + wa[i] + '0' + wt[i] + '.jpg" class="clothing_image_' + si +'">';
							continue;
						}
					}
				}, 1);
			}
		}
		state.active.variables.worn.push(params[0]);
		state.active.variables.type.push(params[1]);
	}
};

macros.showClothingImageSidebar = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.clothingSelectorRender) {
			state.active.variables.clothingSelectorRender=false;
			state.active.variables.worn=[];
			state.active.variables.type=[];
			if (state.active.variables.showimages) {
				setTimeout(function() {
					var cis=document.getElementById('clothing_images_sidebar');
					var wa=state.active.variables.worn;
					var wt=state.active.variables.type;
					for (var i=0;i<wa.length; i++) {
						if (wt[i]==100) {
							cis.innerHTML+='<img src="images/items/' + wa[i] + '" class="clothing_image_sidebar">';
							continue;
						}
						if (wt[i]>9) {
							cis.innerHTML+='<img src="images/items/' + wa[i] + wt[i] + '.jpg" class="clothing_image_sidebar">';
							continue;
						}
						if (wt[i]<10) {
							cis.innerHTML+='<img src="images/items/' + wa[i] + '0' + wt[i] + '.jpg" class="clothing_image_sidebar">';
							continue;
						}
					}
				}, 1);
			}
		}
		state.active.variables.worn.push(params[0]);
		state.active.variables.type.push(params[1]);
	}
};

macros.showImageSidebar = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.showimages) {
			var cl="clothing_image_sidebar_";
			if (params[2]) {
				if (params[2]==1) { cl="clothing_image_small_sidebar_" }
				if (params[2]==2) { cl="clothing_image_small_sidebar_top_" }
			}
			if (params[1]==100) {
				new Wikifier(place, '<img src="images/items/' + params[0] +'" class="'+ cl + params[3] +'">');
			} else {
				if (params[1]>9) {
					new Wikifier(place, '<img src="images/items/' + params[0] + params[1] +'.jpg" class="'+ cl + params[3] + '">');
				} else {
					new Wikifier(place, '<img src="images/items/' + params[0] + '0' + params[1] +'.jpg" class="'+ cl + params[3] +'">');
				}
			}
		}
	}
};

macros.showRoomImage = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.bedroomRender) {
			state.active.variables.bedroomRender=false;
			state.active.variables.roomIm=[];
			var si=state.active.variables.roomSize;
			if (state.active.variables.showimages) {
				setTimeout(function() {
					if (si==0) { var cis=document.getElementById('room_images_0'); }
					if (si==1) { var cis=document.getElementById('room_images_1'); }
					if (si==2) { var cis=document.getElementById('room_images_2'); }
					if (si==3) { var cis=document.getElementById('room_images_3'); }
					if (si==4) { var cis=document.getElementById('room_images_4'); }
					if (si==5) { var cis=document.getElementById('room_images_5'); }
					if (si==6) { var cis=document.getElementById('room_images_6'); }
					var ri=state.active.variables.roomIm;
						for (var i=0;i<ri.length; i++) {
							if (i==0) {
								cis.innerHTML+='<img src="images/room/' + ri[i] + '" class="room_main_image_' + si + '">';
								continue;
							}
							cis.innerHTML+='<img src="images/room/' + ri[i] + '" class="room_image_' + si + '">';
							continue;
						}
				}, 1);
			}
		}
		state.active.variables.roomIm.push(params[0]);
	}
};

macros.removeClothing = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemsC[params[0]];
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		var i=state.active.variables.player.clothes.indexOf(w.id);
		if (i >= 0) {
			state.active.variables.player.clothes.splice(i, 1);
		}
	}
};

macros.removeClothingType = {
  handler: function(place, macroName, params, parser) {
		if (!params[0]) {
			throwError(place, "<<" + macroName + ">>: invalid item type '" + params[0] + "'");
			return;
		}
		var ca=state.active.variables.player.clothes;
		for (var i=ca.length-1; i>=0; i--) {
			var pc=window.itemsC[ca[i]];
			if ((pc==null) || ((pc.clothingType & params[0]) > 0)) {
				state.active.variables.player.clothes.splice(i, 1);
			}
		}
	}
};

macros.nextClothing = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemF.itemTwee(params[0]);
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		for (var i=0; i<=w.ownAlt.length; i++) {
			w.curAlt++;
			if (w.curAlt > w.ownAlt.length) {
				w.curAlt=0;
			}
			if (w.ownAlt[w.curAlt]) {
				return;
			}
		}
		return;
	}
};

macros.previousClothing = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemF.itemTwee(params[0]);
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		for (var i=0; i<=w.ownAlt.length; i++) {
			w.curAlt--;
			if (w.curAlt < 0) {
				w.curAlt=w.ownAlt.length;
			}
			if (w.ownAlt[w.curAlt]) {
				return;
			}
		}
		return;
	}
};

macros.nextStoreClothing = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemsC[params[0]];
		var wV=window.itemF.itemTwee(params[0]);
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		if (!wV) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		var start=wV.storeCur;
		var cur=wV.storeCur;
		for (var i=0; i<=w.maxAlt+1; i++) {
			cur++;
			if (cur > w.maxAlt) {
				cur=0;
			}
			if (wV.storeAlt[cur] && wV.ownAlt[cur]) {
				wV.storeAlt[cur]=false;
			}
			if (wV.storeAlt[cur]) {
				wV.storeCur=cur;
				return;
			}
		}
		wV.storeCur=start;
		wV.storeAlt=[];
		return;
	}
};

macros.previousStoreClothing = {
  handler: function(place, macroName, params, parser) {
		var w=window.itemsC[params[0]];
		var wV=window.itemF.itemTwee(params[0]);
		if (!w) {
			throwError(place, "<<" + macroName + ">>: invalid item '" + params[0] + "'");
			return;
		}
		var start=wV.storeCur;
		var cur=wV.storeCur;
		for (var i=0; i<=w.maxAlt+1; i++) {
			cur--;
			if (cur < 0) {
				cur=w.maxAlt;
			}
			if (wV.storeAlt[cur] && wV.ownAlt[cur]) {
				wV.storeAlt[cur]=false;
			}
			if (wV.storeAlt[cur]) {
				wV.storeCur=cur;
				return;
			}
		}
		wV.storeCur=start;
		wV.storeAlt=[];
		return;
	}
};


macros.showAvatarImage = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.avatarRender) {
			state.active.variables.avatarRender=false;
			state.active.variables.avatarImageName=[];
			var str = "";
			if (state.active.variables.showimages) {
				setTimeout(function() {
					var strIn = state.active.variables.avatarImageName;
					
					str+='<div id="showBody" class="sideframe_bodyimage_empty" style="background-image: url(./images/avatar/torso.png)"></div>';
					
					for (var i=0;i<strIn.length; i++) {
						str+='<div id="showBody" class="sideframe_bodyimage_empty" style="background-image: url(./images/avatar/'+strIn[i]+')"></div>';
					}
					
					$('#showClothes').empty();
					$('#showClothes').append(str);
					console.log("createAvatar:"+str);
				}, 1);
			}
		}
		state.active.variables.avatarImageName.push(params[0]);
	}
};

macros.showImage = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.showimages) {
			if (params[2]) {
				setTimeout(function() {
					var i=document.getElementById(params[2]);
					i.setAttribute('src', 'images/' + params[0] + '/' + params[1]);
					i.className=params[0]+'_image';
				}, 1);
			} else {
				new Wikifier(place, '<img src="images/' + params[0] + '/' + params[1] + '" class="' + params[0] + '_image">');
			}
		}
	}
};

macros.showImageSpecial = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.showimages) {
			new Wikifier(place, '<img src="images/' + params[0] + '/' + params[1] + '" class="' + params[2] + '">');
		}
	}
};

macros.showBanner = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.showimages) {
			new Wikifier(place, '<img src="images/general/PE_Banner.png" class="banner_image">');
		}
	}
};

macros.showMultiImage = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.showimages) {
			if (params[2]) {
				new Wikifier(place, '<img src="images/' + params[2] + '/' + params[1] + '" class="' + params[0] + '">');
			} else {
				new Wikifier(place, '<img src="images/avatar/' + params[1] + '" class="' + params[0] + '">');
			}
		}
	}
};

macros.showVideo = {
  handler: function(place, macroName, params, parser) {
		if (state.active.variables.showimages) {
			if (params[2]) {
				setTimeout(function() {
					var i=document.getElementById(params[2]);
					i.setAttribute('src', 'images/' + params[0] + '/' + params[1]);
					i.className=params[0]+'_video';
					i.setAttribute('autoplay', true);
				}, 1);
			} else {
				new Wikifier(place, '<video src="images/' + params[0] + '/' + params[1] + '" class="' + params[0] + '_video" autoplay="true" loop="true"></video>');
			}
		}
	}
};

macros.delayedLink = {
  handler: function(place, macroName, params, parser) {
		var id=params[1].replace(/[ ,']/g, '_');
		new Wikifier(place, '<span id="'+id+'" class="hidden">[[' + params[1] + ']]</span>');
		setTimeout(function() {
				if (id) {
				var i=document.getElementById(id);
					if (i) {
					i.className='delayed_link';
					}
				}
			}, 
			parseInt(params[0]) * 1000
		);
	}
};

macros.toggleStats = {
  handler: function(place, macroName, params, parser) {
		var cn='hidden';
		var ct='Show';
		if (state.active.variables.showStats) {
			cn='';
			ct='Hide';
		}
		var oc='var ao=document.getElementById(\'toggle_stats\');var so=document.getElementById(\'stats\');var ns=!SugarCube.State.variables.showStats;SugarCube.State.variables.showStats=ns;ao.innerHTML=(ns ? \'Hide\' : \'Show\')+\' Stats\';so.className=(ns ? \'\' : \'hidden\');';
		new Wikifier(place, '<a id="toggle_stats" onclick="'+oc+'">'+ct+' Stats</a>');
	}
};

String.prototype.toProperCase = function () {
	return this.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
};

Config.history.controls = true;

Macro.add('selectScene', {
	tags	: ['scene', 'restIsRandom'],
	handler() {
		if (this.args.length != 2) {
			return this.error('takes two arguments, <id> and <strategy>');
		}
		var id = this.args[0], strategy = this.args[1];
		if (strategy != 'SEQ' && strategy != 'SEQ2RND' && strategy != 'RND' && strategy != 'RND2RND') {
			return this.error('strategy "' + strategy + '" is not correct');
		}
		if (this.payload.length < 2) {
			return this.error('requires at least one <<scene>>');
		}
		
		// How to handle export/import in Perverted Education?
		var topObj = State.active.variables.selectScene;
		
		// Arrow syntax only in ES2015 and newer
		// var rand = (limit) => Math.floor(Math.random() * limit);
		var rand = function (limit) {
			return Math.floor(Math.random() * limit);
		}

		if (! (id in topObj)) { // No state for this id, so create it
			var scenesObj = {
				strategy: strategy,	origStrat: strategy,
				payloadLength: this.payload.length,
				scenes: [], perm: [], restIsRnd: [],
				last: -1,
			};
			
			// Iterate over this.payload and store in scenesObj
			var restIsRnd = false;
			var pushTarget = 'scenes';
			for (var i = 1; i < this.payload.length; ++i) {
				var chance = 10;	// Default chance for <<scene>>
				if (this.payload[i].name == 'restIsRandom') {
					if (strategy != 'SEQ') {
						return this.error('<<restIsRandom>> can only be used with strategy SEQ');
					} else if (restIsRnd) {
						return this.error('<<restIsRandom>> can only be called once');
					} else if (i + 2 > this.payload.length) {
						return this.error('<<restIsRandom>> must have at least one <<scene>> after it');
					}
					restIsRnd = true;
					pushTarget = 'restIsRnd';
					continue;
				} else {		// must be <<scene>>
					if (this.payload[i].args.length > 1) {
						 return this.error('<<scene>> only takes one arg, chance');
					} else if (this.payload[i].args.length == 1) {
						if (strategy == 'SEQ' && !restIsRnd) {
							return this.error('<<scene>> with strategy SEQ can only thake chance arg after <<restIsRandom>>');
						}
						var arg0 = this.payload[i].args[0];
						if (!Number.isInteger(arg0)) {
							return this.error('chance must be an integer');
						} else if (arg0 < 0) {
							return this.error('chance can not be negative');
						}
						chance = arg0;
					}
				}
				scenesObj[pushTarget].push({scene: this.payload[i].contents,
														 				chance: chance});
				
				// Build permutation for SEQ,SEQ2RND, and RND2RND
				if ((strategy == 'SEQ2RND' || strategy == 'SEQ')
						&& !restIsRnd) {
					// 'Permutation' is in sequential order
					scenesObj.perm.unshift(i - 1);
				} else if (strategy == 'RND2RND') {
					var j = rand(scenesObj.perm.length + 1);
		   		scenesObj.perm.splice(j, 0, i - 1);
				}
			}
			// For strategy SEQ, if no <<restIsRandom>>, get 'stuck' on last scene
			if (strategy == 'SEQ' && scenesObj.restIsRnd.length == 0) {
				scenesObj.restIsRnd.push(scenesObj.scenes[scenesObj.scenes.length - 1]);
			}
			
			// Sanity check on chance, sums of chance for scenes and
			//  restIsRnd must not be zero
			var acc = function (acc, curr) { return acc + curr.chance; }
			if (strategy == 'SEQ' &&
					scenesObj.restIsRnd.reduce(acc, 0) == 0) {
				return this.error('not all chance can be zero');
			} else if (scenesObj.scenes.reduce(acc, 0) == 0) {
				return this.error('not all chance can be zero');
			}
			topObj[id] = scenesObj;		// Store state for id
		} // End of adding new selectScene
		
		// Find state for id
		var obj = topObj[id];
		
		// Sanity check on state versus data in <<selectScene>>
		if (obj.origStrat != strategy ||
				obj.payloadLength != this.payload.length) {
			return this.error('id "' + id + '" is not unique');
		}
		
		// Find scene depending on strategy
		var len = obj.scenes.length, index = 0;
		switch(obj.strategy) {
			case 'SEQ':				// 'Permutation' is actually in sequential order
			case 'SEQ2RND':		// 'Permutation' is actually in sequential order
			case 'RND2RND':
				if (obj.perm.length > 0) {
					index = obj.perm.pop();
					break;
				} else if (strategy == 'SEQ') {
					obj.strategy = 'RND';
					obj.scenes = obj.restIsRnd;
					len = obj.scenes.length;
					obj.last = -1;
				}
				// If no more permutations, fall through to RND
			case 'RND':
				// Sum up all chances (except for last scene selected)
				var chanceTot = 0;
				for (var i = 0; i < len; ++i) {
					if (len < 3 || i != obj.last) {
						chanceTot += obj.scenes[i].chance;
					}
				}
				// Find a random scene (except last scene selected)
				//  weighted by chance
				var chance = rand(chanceTot);
				//var chancesave = chance;
				for (var i = 0; i < len; ++i) {
					if (len < 3 || i != obj.last) {
						chance -= obj.scenes[i].chance;
						if (chance < 0) {
							index = i;
							break;
						}
					}
				}
				break;
			default:
				return this.error('strategy "' + obj.strategy + '" is not implemented');
		}
		obj.last = index;		// Store index to selected scene
		jQuery(this.output).wiki(obj.scenes[index].scene);
		//return this.error('len=' + len + ' ,chanceTot=' + chanceTot + ' ,chance=' + chancesave + ' ,index=' + index + ' ,last scene=' + obj.last);
	}
});

macros.openQuote = {
  handler: function(place, macroName, params, parser) {
		var td='"';
		if (state.active.variables.openQuote && (!state.active.variables.closeQuote)) {
		td='<br><br>"';
		}
		new Wikifier(place, td);
		state.active.variables.openQuote=true;
		state.active.variables.closeQuote=false;
	}
};

macros.closeQuote = {
  handler: function(place, macroName, params, parser) {
		var td='"';
		if (state.active.variables.openQuote) {
		td='"<br><br>';
		}
		if (state.active.variables.closeQuote) {
		td='';
		}
		new Wikifier(place, td);
		state.active.variables.closeQuote=true;
		state.active.variables.openQuote=false;
	}
};

//Chat App Macros by Moonhead __Testing

Macro.add('SetupChat', {
    handler : function(){
		var divMain = document.createElement('div');
		var header = document.createElement('div');
		var leftHeading = document.createElement('span');
		var rightHeading = document.createElement('span');
		var appHeading = document.createElement('h2');
		var chatAppWrapper = document.createElement('div');

		jQuery(leftHeading)
			.text('Back')
			.addClass('chatApp')
			.addClass('chatLeft')
			.appendTo(header)

		jQuery(rightHeading)
			.text('...')
			.addClass('chatApp')
			.addClass('chatRight')
			.appendTo(header)

		jQuery(appHeading)
			.text('Messages')
			.addClass('chatApp')
			.appendTo(header)

		jQuery(header)
			.addClass('chatApp')
			.addClass('chatHeader')
			.appendTo(divMain)

		jQuery(chatAppWrapper)
			.addClass('chatApp')
			.addClass('chatApp-wrapper')
			.appendTo(divMain)

        jQuery(divMain)
            .attr({
                id : 'chatAppDiv',
                name : 'chatAppDiv'
            })
            .addClass('chatAppDiv')
            .appendTo(this.output);
    }
});

Macro.add('SetupPhone', {
    handler : function(){
		var divMain = document.createElement('div');
		var header = document.createElement('div');
		var leftHeading = document.createElement('span');
		var rightHeading = document.createElement('span');
		var appHeading = document.createElement('h2');
		var chatAppWrapper = document.createElement('div');

		jQuery(leftHeading)
			.text('Back')
			.addClass('chatApp')
			.addClass('chatLeft')
			.appendTo(header)

		jQuery(rightHeading)
			.text('...')
			.addClass('chatApp')
			.addClass('chatRight')
			.appendTo(header)

		jQuery(appHeading)
			.text('Tasks')
			.addClass('chatApp')
			.appendTo(header)

		jQuery(header)
			.addClass('chatApp')
			.addClass('chatHeader')
			.appendTo(divMain)

		jQuery(chatAppWrapper)
			.addClass('chatApp')
			.addClass('chatApp-wrapper')
			.appendTo(divMain)

        jQuery(divMain)
            .attr({
                id : 'chatAppDiv',
                name : 'chatAppDiv'
            })
            .addClass('chatAppDiv')
            .appendTo(this.output);
    }
});

Macro.add('ChatPCResponse', {
	tags : null,
    handler : function(){
        if(this.args.length == 0){
            var pcText = '';
            if(typeof this.payload[0].contents == 'string'){
                pcText = this.payload[0].contents
			}
			if(typeof state.active.variables.chatTextId == 'undefined')
			{
				state.active.variables.chatTextId = 0;
			}
			state.active.variables.chatTextId++;
			var chatMessageDiv = document.createElement('div');
            var chatBubble = document.createElement('div');
			var spanText = document.createElement('span');
			var pcNameDiv = document.createElement('div');
			var spanName = document.createElement('span');
			
			jQuery(spanName)
				.text('Me')
				.appendTo(pcNameDiv);

			jQuery(pcNameDiv)
				.addClass('chatAppPCName')
				.appendTo(chatMessageDiv);

            jQuery(spanText)
				.wiki(pcText)
				.addClass('chatAppNPCText')
                .appendTo(chatBubble);
            
            jQuery(chatBubble)
				.addClass('chatAppTextPC')
				.addClass('chatAppText')
				.appendTo(chatMessageDiv);

			jQuery(chatMessageDiv)
                .attr({
                    id: 'chatBubble_' + state.active.variables.chatTextId,
                    name: 'chatBubble_' + state.active.variables.chatTextId
				})
				.addClass('chatBubble')
				.appendTo(jQuery('.chatApp-wrapper'));
			
			var chatAppWrapper = jQuery('.chatApp-wrapper');
			chatAppWrapper[0].scrollTop = chatAppWrapper[0].scrollHeight;
        }
    }
});


Macro.add('ChatNPCResponse', {
	tags : null,
    handler : function(){
        if(this.args.length == 1){
            var npcName = '';
            var npcText = '';
            if(typeof this.args[0] == 'string'){
                npcName = this.args[0]
            }
            if(typeof this.payload[0].contents == 'string'){
                npcText = this.payload[0].contents
			}
            if(typeof state.active.variables.chatTextId == 'undefined')
			{
				state.active.variables.chatTextId = 0;
			}
			state.active.variables.chatTextId++;
			var chatMessageDiv = document.createElement('div');
            var chatBubble = document.createElement('div');
			var spanText = document.createElement('span');
			var spanName = document.createElement('span');

			jQuery(spanName)
				.wiki(npcName)
				.addClass('chatAppNPCName')
				.appendTo(chatMessageDiv);

            jQuery(spanText)
				.wiki(npcText)
				.addClass('chatAppNPCText')
                .appendTo(chatBubble);
            
			jQuery(chatBubble)
				.addClass('chatAppTextNPC')
				.addClass('chatAppText')
				.appendTo(chatMessageDiv);
			
			jQuery(chatMessageDiv)
                .attr({
                    id: 'chatBubble_' + state.active.variables.chatTextId,
                    name: 'chatBubble_' + state.active.variables.chatTextId
				})
				.appendTo(jQuery('.chatApp-wrapper'));

			var chatAppWrapper = jQuery('.chatApp-wrapper');
			chatAppWrapper[0].scrollTop = chatAppWrapper[0].scrollHeight;
        }
    }
});

// ordinal macro as requested by Saoirsa, by Andrew Svedby
var ordinals = {
    fifth: ['zeroth', 'first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eight', 'ninth', 'tenth'],
	fi5th: ['0th', '1st', '2nd', '3rd'],
	
    ordFun: (macro, arr, casify) => {
		if (macro.args.lenght  < 1) {
			return macro.error('takes at least one argument');
		}

		var num;

		try { 
			num = Scripting.evalJavaScript(macro.args.full); 
		}
		catch (ex) { 
			return macro.error('error in argument evaluation ' + ex.message); 
		}

		if (!Number.isInteger(num) || num < 0) {
			return macro.error('takes non negative integer as argument');
		} 
		else if (num >= arr.length) {
			num += 'th';
		} 
		else {
			num = arr[num];
		}
		
		if (casify) { 
			num = num.toUpperFirst(); 
		}
		
		return jQuery(macro.output).wiki(num);
    }
};
Macro.add('ordinal', {
    handler() {
	return ordinals.ordFun(this, ordinals.fifth, false);
	//return "";
    }
});
Macro.add('Ordinal', {
    handler() {
	return ordinals.ordFun(this, ordinals.fifth, true);
	//return "";
    }
});
Macro.add('ord1nal', {
    handler() {
	return ordinals.ordFun(this, ordinals.fi5th, false);
	//return "";
    }
});

/* macro reactOnce, (c) 2018 Andrew Svedby, same license as Perverted Education */
 
Macro.add('reactOnce', {
    tags: ['reactOnceMore', 'reactElse'],
    handler() {
	let i;
	let noReaction = true;
	let flags = State.active.variables.once;
	const len = this.payload.length;
	for (i=0; i<len; i++) {
	    switch (this.payload[i].name) {
	    case 'else':
		if (this.payload[i].args.length > 0) {
		    return this.error('<<else>> takes no arguments');
		} else if (i + 1 != len) {
		    return this.error('<<else>> must be final clause');
		}
		break;
	    default:
		if (this.payload[i].args.length < 2) {
		    return this.error('<<reactOnce>> and <<reactOnceMore>> takes a boolean and flags');
		}
		break;
	    }
	}
	try {
	    for (i=0; i<len; i++) {
		switch (this.payload[i].name) {
		case 'else':
		    if (noReaction) {
			new Wikifier(this.output, this.payload[i].contents)
		    }
		    break;
		default:
		    let argBool = Scripting.evalJavaScript(this.payload[i].args[0]), argFlag = this.payload[i].args[1];
		    if (argBool && !flags[argFlag]) {
			noReaction = false;
			for (let j = 1; j < this.payload[i].args.length; j++) {
			    flags[this.payload[i].args[j]] = true;
			}
			new Wikifier(this.output, this.payload[i].contents);
		    }
		}
	    }
	}
        catch (ex) { return this.error('unknown error ' + ex.message); }
    }
});
