const express = require("express");
const router = express.Router();
const {Request} = require("../../db/models");
const sharp = require("sharp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");

const {generateGetUrl, generatePutUrl} = require('../awsUrlGenerator')


router.get(
  '/get-url',
  (req, res) => {
    const { Key } = req.query;
    generateGetUrl(Key)
      .then(getURL => {      
        res.send(getURL);
      })
      .catch(err => {
        res.send(err);
      });
  });

  router.get('/put-url', (req,res)=>{
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    const { Key, ContentType } = req.query;
    let KeyArray = Key.split('.')
    realKey = `${uuidv4()}.${KeyArray[KeyArray.length - 1]}`;
    generatePutUrl(realKey, ContentType).then(putURL => {
      res.send({putURL, realKey});
    })
    .catch(err => {
      res.send(err);
    });
  });

module.exports = router;


















// const s3 = new aws.S3({
//   signatureVersion: 'v4',
//   region: 'us-west-1'
// });

// const S3_BUCKET = "dress-em-up-requests"

// async function uploadToS3(key, buffer, mimetype) {
//   return new Promise((resolve, reject) => {
//     s3.putObject(
//       {
//         Bucket: S3_BUCKET,
//         ContentType: mimetype,
//         Key: key,
//         Body: buffer
//       },
//       () => resolve()
//     );
//   });
// }

// function getSignedUrl(bucket, key, expires = 3600) {
//   return new Promise((resolve, reject) => {
//     s3.getSignedUrl(
//       "getObject",
//       {
//         Bucket: bucket,
//         Key: key,
//         Expires: expires
//       },
//       function (err, url) {
//         if (err) throw new Error(err);

//         resolve(url);
//       }
//     );
//   });
// }

// router.get("/", async (req, res) => {
//   let list = await Promise.all(
//     uploadList.map(async upload => {
//       const [imageUrl, thumbnailUrl] = await Promise.all([
//         getSignedUrl(process.env.AWS_BUCKET, process.env.AWS_SECRET_ACCESS_KEY),
//         getSignedUrl(process.env.AWS_BUCKET, process.env.AWS_SECRET_ACCESS_KEY),
//       ])
//       return {
//         ...upload.toJSON(),
//         imageUrl,
//         thumbnailUrl
//       }
//     })
//   );

//   res.send(list);
// });

// router.post("/", upload.single('image'), async (req, res) => {
//   const id = uuidv4();
//   const thumbnailId = uuidv4()
//   const thumbnail = await sharp(req.file.buffer)
//     .resize(200)
//     .toBuffer();

//   await Promise.all([
//     uploadToS3(`requests/images/${id}`, req.file.buffer, req.file.mimetype),
//     uploadToS3(`requests/thumbnails/${thumbnailId}`, thumbnail, req.file.mimetype),
//   ]);

//   // let newImage = await Promise.all([
//   //   Image.create({
//   //     id,
//   //     bucket: S3_BUCKET,
//   //     key: `images/${id}`
//   //   }),
//   //   Image.create({
//   //     id: thumbnailId,
//   //     bucket: S3_BUCKET,
//   //     key: `thumbnails/${thumbnailId}`
//   //   }),
//   // ]);

//   // console.log(newImage)

//   // await Upload.create({
//   //   file_name: req.file.originalname,
//   //   image_id: id,
//   //   thumbnail_id: thumbnailId
//   // });

//   res.sendStatus(201);
// });

// module.exports = router;