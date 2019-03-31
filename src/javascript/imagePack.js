/* ImagePack Macros by Moonhead */

window.imagePack = {
    config: {
        basePath: 'Images/ImagePacks'
    },

	RandomImageNameFromPack: function(imagePackName) {
		var imageName = "";

        if(typeof window.imagePacks === "undefined"){
            importScripts("./Images/ImagePacks/imagePacks.js").then(
                function(){
                    imageName = loadImage(imagePackName);
                }
            )
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

        if(typeof window.imagePacks === "undefined"){
            importScripts("./Images/ImagePacks/imagePacks.js").then(
                function(){
                    loadImage(this.args, this.output, this);
                }.bind(this)
            );
        }
        else{
            loadImage(this.args, this.output, this);
        }

        function loadImage(args, output, _this){
            var _imagePacks = window.imagePacks.ImagePacks;
			var imagePackName = '';
			var imageFileName = "";
			var imageHeight = 0;
			var imageWidth = 0;
            var imgDimensionString = "";
            var imageCount = 0;

            if(_this.args.length < 1){
                return _this.error("RandomImageFromPack needs at least one argument");
            }

            // Argument 1 is the ImagePack Name
            if(_this.args.length > 0){
                if(typeof _this.args[0] == 'string'){
                    imagePackName = _this.args[0]
                }

                // Argument 5 uses name or path
                if(_this.args.length > 4){
                    if(_this.args[4] == 'PathLoad'){
                        var imagePack = $.grep(_imagePacks, function(e) { return e.path === imagePackName})[0];
                    }
                    else{
                        var imagePack = $.grep(_imagePacks, function(e) { return e.name === imagePackName})[0];
                    }
                }
                else{
                    var imagePack = $.grep(_imagePacks, function(e) { return e.name === imagePackName})[0];
                }

                if(imagePack === undefined || imagePack.length == 0){
                    return _this.error('Could not read ImagePack with name ' + imagePackName);
                }
                else{
                    imageCount = imagePack.files.length;
                }
            }

            // Argument 2 is the Max Height
            if(_this.args.length > 1){
                var maxHeight = _this.args[1];
                imgDimensionString = 'style="max-height:' + maxHeight + 'px;';
            }

            // Argument 3 is the Max Width
            if(_this.args.length > 2){
                var maxWidth = _this.args[2];
                imgDimensionString += 'max-width:' + maxWidth + 'px;';
            }

            // Argument 4 is the Alignment
            if(_this.args.length > 3){
                switch(_this.args[3]){
                    case 'alignRight':
                        //$(this.output).css('margin', '10px');
                        //$(this.output).css('float', 'right');
                        imgDimensionString += 'margin: 10px;float: right;'
                        break;
                    case 'alignLeft':
                        //$(this.output).css('margin', '10px');
                        //$(this.output).css('float', 'left');
                        imgDimensionString += 'margin: 10px;float: left;'
                        break;
                    case 'alignCentre':
                    case 'alignCenter':
                        //$(this.output).css('display', 'table');
                        //$(this.output).css('margin', '0 auto');
                        imgDimensionString += 'margin: 0 auto;display: table;'
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
			new Wikifier(_this.output, imageElementString);
		}
	}
});


