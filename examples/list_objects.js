require('dotenv').config();


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: process.env.AWS_S3_REGION});

// Create S3 service object
s3 = new AWS.S3() ;
// s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var bucketParams = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
};

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

