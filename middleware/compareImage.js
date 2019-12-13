var imageDiff = require('image-diff');


function compareImage(actual, imageExpected){
    console.log('comparaison des images')
    let areTheSame;
    return imageDiff({
        actualImage: actual,
        expectedImage: imageExpected,
        diffImage: './public/image/error/difference.jpg',
      }, function (err, imagesAreSame) {
        console.log(imagesAreSame)
            areTheSame = imagesAreSame
        return imagesAreSame;
        // error will be any errors that occurred
        // imagesAreSame is a boolean whether the images were the same or not
        // diffImage will have an image which highlights differences
      });
      return areTheSame
}

module.exports = {compareImage}