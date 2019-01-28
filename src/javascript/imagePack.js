/* ImagePack Macros by Moonhead */

//Empty object to place the JSON into. Needs to exist before the JSON is read in certain TWINE implementations
window.imagePacks = {};

window.imagePack = {
    config: {
        basePath: 'Images/ImagePacks'
    },

	RandomImageNameFromPack: function(imagePackName) {
		var imageName = ""

		if($.isEmptyObject(window.imagePacks)){
			console.log('Setting up image packs');
			$.getJSON(basePath + '/ImagePack.Json', function(data){
				window.imagePacks = data;
				imageName = loadImage(imagePackName);
			});
		}
		else{
			imageName = loadImage(imagePackName);
		}
		return imageName;

		function loadImage(imagePackName){
			var imagePack = $.grep(window.imagePacks.ImagePacks, function(e) { return e.name === imagePackName})[0];

			var imageFileName = "";

			var imageCount = imagePack.files.length;
			if(imageCount > 0)
			{
				var rndNum = Math.floor(Math.random() * imageCount);
				imageFileName = window.imagePack.config.basePath + '/' + imagePack.path + '/' + imagePack.files[rndNum].fileName;
			}
			return imageFileName;
		}
    }
};

Macro.add('RandomImageFromPack', {
	handler : function(){
		if(this.args.length >= 1){
			if($.isEmptyObject(window.imagePacks)){
				console.log('Setting up image packs');
				var _this = this;
				$.getJSON(window.imagePack.config.basePath + '/ImagePack.Json', function(data){
					window.imagePacks = data;
					loadImage(_this.args, _this.output, _this);
				});
			}
			else{
				loadImage(this.args, this.output, this);
			}
        }
        else
        {
            return this.error("RandomImageFromPack needs at least one argument");
        }

        function loadImage(args, output, _this){
			var imagePackName = '';
			var imageFileName = "";
			var imageHeight = 0;
			var imageWidth = 0;
            var imgDimensionString = "";
            var imageCount = 0;

            if(args.length < 1){
                return _this.error("RandomImageFromPack needs at least one argument");
            }

            // Argument 1 is the ImagePack Name
            if(args.length > 0){
                if(typeof args[0] == 'string'){
                    imagePackName = args[0]
                }

                // Argument 5 uses name or path
                if(args.length > 4){
                    if(args[4] == 'PathLoad'){
                        var imagePack = $.grep(window.imagePacks.ImagePacks, function(e) { return e.path === imagePackName})[0];
                    }
                    else{
                        var imagePack = $.grep(window.imagePacks.ImagePacks, function(e) { return e.name === imagePackName})[0];
                    }
                }
                else{
                    var imagePack = $.grep(window.imagePacks.ImagePacks, function(e) { return e.name === imagePackName})[0];
                }

                if(imagePack === undefined || imagePack.length == 0){
                    return _this.error('Could not read ImagePack with name ' + imagePackName);
                }
                else{
                    imageCount = imagePack.files.length;
                }
            }

            // Argument 2 is the Max Height
            if(args.length > 1){
                var maxHeight = args[1];
                imgDimensionString = 'style="max-height:' + maxHeight + 'px;';
            }

            // Argument 3 is the Max Width
            if(args.length > 2){
                var maxWidth = args[2];
                imgDimensionString += 'max-width:' + maxWidth + 'px;';
            }

            // Argument 4 is the Alignment
            if(args.length > 3){
                switch(args[3]){
                    case 'alignRight':
                        $(output).css('margin', '10px');
                        $(output).css('float', 'right');
                        break;
                    case 'alignLeft':
                        $(output).css('margin', '10px');
                        $(output).css('float', 'left');
                        break;
                    case 'alignCentre':
                    case 'alignCenter':
                        $(output).css('display', 'table');
                        $(output).css('margin', '0 auto');
                        break;
                }
            }


			if(imageCount > 0){
				var rndNum = Math.floor(Math.random() * imageCount);
				imageFileName = window.imagePack.config.basePath + '/' + imagePack.path + '/' + imagePack.files[rndNum].fileName;
				imageHeight = imagePack.files[rndNum].height;
				imageWidth = imagePack.files[rndNum].width;
            }
            var imageElementString = '<img src="' + imageFileName + '" class="' + imagePackName.replace(" ", "_") + '_image" ' + imgDimensionString + '" />';
			new Wikifier(output, imageElementString);
		}
	}
});


