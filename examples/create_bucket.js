require('dotenv').config();


// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region
// AWS.config.update({region: process.env.AWS_S3_REGION});

// // Create S3 service object
// s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

// const {S3} = require('@aws-sdk/client-s3');
// const s3 = new S3({region: process.env.AWS_S3_REGION});
// var bucketParams = {Bucket : 'myqr'};

// function run(){
//   s3.createBucket(bucketParams, function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data.Location);
//     }
//   })
// };
// run();


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: process.env.AWS_S3_REGION});

// Create S3 service object
s3 = new AWS.S3() ;
// s3 = new AWS.S3({apiVersion: '2006-03-01'});



// Create the parameters for calling createBucket
var bucketParams = {
  Bucket : 'pruebacreacion'
};

// call S3 to create the bucket
s3.createBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
  }
});

