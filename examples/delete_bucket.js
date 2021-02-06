require('dotenv').config();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: process.env.AWS_S3_REGION});

// Create S3 service object
s3 = new AWS.S3() ;

// Create params for S3.deleteBucket
var bucketParams = {
  Bucket : 'pruebacreacion'
};

// Call S3 to delete the bucket
s3.deleteBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});