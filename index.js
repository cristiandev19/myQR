require('dotenv').config();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: process.env.AWS_S3_REGION});


const url = 'https://myqr.s3.us-east-2.amazonaws.com/archivo1.png';

const QRCode = require('easyqrcodejs-nodejs');

async function generateAndUploadImage() {
  // Options
  var options = {
    text: url
  };
  // New instance with options
  var qrcode = new QRCode(options);
  const data = await qrcode.toDataURL()
  console.log('data', data)

  const bufferObject = await convertBase64ToBuffer(data);
  console.log('bufferObject', bufferObject)



  var uploadParams = {
    Bucket          : process.env.AWS_S3_BUCKET_NAME,
    Key             : `qr_generado2.${bufferObject.type}`,
    Body            : bufferObject.buffer,
    ContentEncoding : 'base64',
    ContentType     : bufferObject.contentType,
    ACL             : 'public-read',                         // para poder ser leido publicamente
    StorageClass    : 'REDUCED_REDUNDANCY'                   // para poder ser leido publicamente
  };

  const uploaded = await S3UploadPromise(uploadParams);
  console.log('uploaded', uploaded)
}

const convertBase64ToBuffer = (base64) => {
  return new Promise((resolve) => {
    try {
      /// Proceso para pasar un base64 a un buffer
      const base64Replaced = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Replaced, 'base64');
      const type = base64.split(';')[0].split('/')[1];
      console.log('type', type)
      console.log('buffer', buffer);
      console.log(`ContentType:`, `image/${type}`);
      return resolve({
        buffer,
        type,
        contentType: `image/${type}`
      })
    } catch (error) {
      return resolve({error})
    }
  })

}

const S3UploadPromise = async (uploadParams) => {
  return new Promise((resolve) => {
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
      }
    });
  })
}

// // Save QRCode image
// qrcode.saveImage({
// 	path: 'q.png' // save path
// });
 // Get standard base64 image data url text: 'data:image/png;base64, ...'


generateAndUploadImage()