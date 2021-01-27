const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const {generatePutUrl} = require('../awsUrlGenerator')


router.get(
  '/get-url/:image',
  (req, res) => {
    const image = req.params.image
    const getURL = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/requests/${image}` 
    res.send(getURL);
  });

  router.get('/put-url', (req,res)=>{
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    const { Key, ContentType, Option } = req.query;
    let KeyArray = Key.split('.')
    realKey = `${uuidv4()}.${KeyArray[KeyArray.length - 1]}`;
    if (ContentType === 'application/msword' || ContentType === 'application/pdf') {
      option = 'resume'
    }
    if (Option === 'new-request') {
      option='new-request'
    }
    generatePutUrl(realKey, ContentType, option).then(putURL => {
      res.send({putURL, realKey});
    })
    .catch(err => {
      res.send(err);
    });
  });

module.exports = router;