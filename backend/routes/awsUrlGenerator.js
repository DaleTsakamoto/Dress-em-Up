const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET, 
  region: process.env.BUCKET_REGION 
});

const s3 = new AWS.S3();

const Bucket = process.env.BUCKET_NAME;
const BucketDesignersResume = `${process.env.BUCKET_NAME}/designers/resume`
const BucketNewRequest = `${process.env.BUCKET_NAME}/users/requests`

// GET URL Generator
function generateGetUrl(Key) {
  console.log("THIS IS THE BACKEND KEY", Key)
  return new Promise((resolve, reject) => {
    const params = {
      Bucket,
      Key,
    };
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}

// PUT URL Generator
// function generatePutUrl(Key, ContentType, option) {
//   return new Promise((resolve, reject) => {
//     let params = { Bucket, Key, ContentType };
//     console.log("THESE ARE THE PARAMS!?!?!?!", params)
//     s3.getSignedUrl('putObject', params, function(err, url) {
//       if (err) {
//         reject(err);
//       }
//       resolve(url);
//     });
//   });
// }

function generatePutUrl(Key, ContentType, option) {
  return new Promise((resolve, reject) => {
    let params;
    if (option === 'resume') {
      params = { Bucket: BucketDesignersResume, Key, ContentType };
    } else if (option === 'new-request') {
      params = { Bucket: BucketNewRequest, Key, ContentType };
    } else {
      params = { Bucket, Key, ContentType };
    }
    s3.getSignedUrl('putObject', params, function(err, url) {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
}

module.exports = { generateGetUrl, generatePutUrl };