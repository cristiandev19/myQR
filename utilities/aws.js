const AWS = require('aws-sdk');
const { config } = require('../config/index');

exports.s3UploadPromise = async (uploadParams) => {
  return new Promise((resolve) => {
    // Set the region
    AWS.config.update({region: config.awsS3Region });

    const s3 = new AWS.S3() ;
    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
        return resolve({ error : err })
      } if (data) {
        console.log("Upload Success", data);
        // console.log("Upload Success", data.Location);
        return resolve({ ...data })
        /***
        Resultado para generar el QR
        {
          ETag: '"51b3ca5a617effc353e9a8a84ef95d1c"',
          ServerSideEncryption: 'AES256',
          Location: 'https://myqr.s3.us-east-2.amazonaws.com/eeewqewe.png',
          key: 'eeewqewe.png',
          Key: 'eeewqewe.png',
          Bucket: 'myqr'
        }
         */
      }
    });
  })
}