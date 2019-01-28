/* ImagePack Macros by Moonhead */

window.imagePack = {
    config: {
        basePath: 'Images/ImagePacks'
    },

	RandomImageNameFromPack: function(imagePackName) {
		// var imageName = ""
		// imageName = loadImage(imagePackName);
		// return imageName;

		// function loadImage(imagePackName){
			var imagePack = $.grep(window.imagePacks.ImagePacks, function(e) { return e.name === imagePackName})[0];

			var imageFileName = "";

			var imageCount = imagePack.files.length;
			if(imageCount > 0)
			{
				var rndNum = Math.floor(Math.random() * imageCount);
				imageFileName = window.imagePack.config.basePath + '/' + imagePack.path + '/' + imagePack.files[rndNum].fileName;
			}
			return imageFileName;
		// }
    }
};

Macro.add('RandomImageFromPack', {
	handler : function(){
		// if(this.args.length >= 1){
		// 	loadImage(this.args, this.output, this);
        // }
        // else
        // {
        //     return this.error("RandomImageFromPack needs at least one argument");
        // }

        // function loadImage(args, output, _this){
			var imagePackName = '';
			var imageFileName = "";
			var imageHeight = 0;
			var imageWidth = 0;
            var imgDimensionString = "";
            var imageCount = 0;

            if(this.args.length < 1){
                return this.error("RandomImageFromPack needs at least one argument");
            }

            // Argument 1 is the ImagePack Name
            if(this.args.length > 0){
                if(typeof this.args[0] == 'string'){
                    imagePackName = this.args[0]
                }

                // Argument 5 uses name or path
                if(this.args.length > 4){
                    if(this.args[4] == 'PathLoad'){
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
                    return this.error('Could not read ImagePack with name ' + imagePackName);
                }
                else{
                    imageCount = imagePack.files.length;
                }
            }

            // Argument 2 is the Max Height
            if(this.args.length > 1){
                var maxHeight = this.args[1];
                imgDimensionString = 'style="max-height:' + maxHeight + 'px;';
            }

            // Argument 3 is the Max Width
            if(this.args.length > 2){
                var maxWidth = this.args[2];
                imgDimensionString += 'max-width:' + maxWidth + 'px;';
            }

            // Argument 4 is the Alignment
            if(this.args.length > 3){
                switch(this.args[3]){
                    case 'alignRight':
                        $(this.output).css('margin', '10px');
                        $(this.output).css('float', 'right');
                        break;
                    case 'alignLeft':
                        $(this.output).css('margin', '10px');
                        $(this.output).css('float', 'left');
                        break;
                    case 'alignCentre':
                    case 'alignCenter':
                        $(this.output).css('display', 'table');
                        $(this.output).css('margin', '0 auto');
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
			new Wikifier(this.output, imageElementString);
		// }
	}
});


