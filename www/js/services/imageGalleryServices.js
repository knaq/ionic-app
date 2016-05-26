angular.module('knaq.imageGalleryServices', [])

    .factory('ImageGallery', function ($cordovaImagePicker) {
        return {
            getPicture: function () {
                var options = {
                    maximumImagesCount: 1,
                    width: 800,
                    height: 800,
                    quality: 80
                };

                return $cordovaImagePicker.getPictures(options);
            }
        }
    });