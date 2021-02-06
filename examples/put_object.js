require('dotenv').config();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: process.env.AWS_S3_REGION});

// Create S3 service object
s3 = new AWS.S3() ;

// Create params for S3.deleteBucket
var bucketParams = {
  Bucket : process.env.AWS_S3_BUCKET_NAME
};

var uploadParams = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: '',
  Body: '',
  ACL          : 'public-read', // para poder ser leido publicamente
  StorageClass : 'REDUCED_REDUNDANCY' // para poder ser leido publicamente
};
var file = './utilities/prueba.png';
// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = 'archivo1.png';
// console.log('uploadParams.Key', uploadParams.Key)


s3.putObject(uploadParams, function(err, data) {
  console.log('111111111')
  console.log('err', err)
  console.log('data', data)

  // const url = `${global.__S3_PATH}${bucket}/${key}`;
  // console.log('url', url)
});
