const { config } = require('../../config/index');
const imagesUtilities = require('../../utilities/images');
const awsUtilities = require('../../utilities/aws');

exports.uploadFile = async (req, res, next) => {
  try {
    const { extension, dataFile, fileName } = req.body;

    const bufferObject = await imagesUtilities.convertBase64ToBuffer(dataFile);

    // call S3 to retrieve upload file to specified bucket
    const uploadParams = {
      Bucket          : config.awsS3BucketName,
      ACL             : 'public-read',                // para poder ser leid3_BUCKET_NAME,
      Key             : `${fileName}.${extension}`,
      Body            : bufferObject.buffer,
      ACL             : 'public-read',                // para poder ser leido publicamente
      StorageClass    : 'REDUCED_REDUNDANCY',         // para poder ser leido publicamente
      ContentType     : bufferObject.contentType,
      ContentEncoding : 'base64',
    };
    const uploaded = await awsUtilities.s3UploadPromise(uploadParams);
    console.log('uploaded', uploaded);

    // const file = '../q.png';

    // // Configure the file stream and obtain the upload parameters
    // var fs = require('fs');
    // var fileStream = fs.createReadStream(file);
    // fileStream.on('error', function(err) {
    //   console.log('File Error', err);
    // });
    // uploadParams.Body = fileStream;
    // var path = require('path');
    // uploadParams.Key = 'qr_prueba.png';

    // // call S3 to retrieve upload file to specified bucket
    // s3.upload(uploadParams, function (err, data) {
    //   if (err) {
    //     console.log("Error", err);
    //   } if (data) {
    //     console.log("Upload Success", data.Location);
    //   }
    // });

    console.log('hola', req.body.extension);
    return res.status(200).send({
      message: 'Funciono'
    })
  } catch (error) {
    next(error);
  }
};

