const express = require("express");
const router = express.Router();
const {uploads, images} = require("../../db/models");
const sharp = require("sharp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");
const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: 'us-west-1'
});

const S3_BUCKET = "dress-em-up-requests"

async function uploadToS3(key, buffer, mimetype) {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: S3_BUCKET,
        ContentType: mimetype,
        Key: key,
        Body: buffer
      },
      () => resolve()
    );
  });
}

function getSignedUrl(bucket, key, expires = 3600) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "getObject",
      {
        Bucket: bucket,
        Key: key,
        Expires: expires
      },
      function (err, url) {
        if (err) throw new Error(err);

        resolve(url);
      }
    );
  });
}

router.get("/", async (req, res) => {
  let uploadList = await uploads.findAll({
    include: [
      {
        model: images,
        as: "image"
      },
      {
        model: images,
        as: "thumbnail"
      }
    ]
  });

  uploadList = await Promise.all(
    uploadList.map(async upload => {
      const [imageUrl, thumbnailUrl] = await Promise.all([
        getSignedUrl(upload.image.bucket, upload.image.key),
        getSignedUrl(upload.thumbnail.bucket, upload.thumbnail.key),
      ])
      return {
        ...upload.toJSON(),
        imageUrl,
        thumbnailUrl
      }
    })
  );

  res.send(uploadList);
});

router.post("/", upload.single('image'), async (req, res) => {
  const id = uuidv4();
  const thumbnailId = uuidv4()
  const thumbnail = await sharp(req.file.buffer)
    .resize(200)
    .toBuffer();

  await Promise.all([
    uploadToS3(`images/${id}`, req.file.buffer, req.file.mimetype),
    uploadToS3(`thumbnails/${thumbnailId}`, thumbnail, req.file.mimetype),
  ]);

  await Promise.all([
    images.create({
      id,
      bucket: S3_BUCKET,
      key: `images/${id}`
    }),
    images.create({
      id: thumbnailId,
      bucket: S3_BUCKET,
      key: `thumbnails/${thumbnailId}`
    }),
  ]);

  await uploads.create({
    file_name: req.file.originalname,
    image_id: id,
    thumbnail_id: thumbnailId
  });

  res.sendStatus(201);
});

module.exports = router;