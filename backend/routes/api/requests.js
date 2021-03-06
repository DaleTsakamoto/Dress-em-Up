const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Request, sequelize } = require('../../db/models');

const router = express.Router();


/****************** REQUESTS ERRORS MIDDLEWARE **************************/

const validateRequest = [
  check('image')
    .exists({ checkFalsy: true })
    .withMessage('Please provide at least one image.'),
  check('apparelChoice')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please include at least one apparel choice.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please include a description of your request.'),
  handleValidationErrors,
];

/******************** NEW REQUEST **************************/

router.post(
  '/',
  validateRequest,
  requireAuth,
  asyncHandler(async (req, res) => {
    let { image, description, designerId, apparelChoice, isCompleted, userId } = req.body;
    image = image.join(',')
    apparelChoice = apparelChoice.join(',')
    const request = await Request.build({ image, description, designerId, apparelChoice, userId, isCompleted });
    await request.save();
    return res.json({
      request,
    });
  }),
);

/******************** UPDATE REQUEST **************************/

router.put(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    let { requestId } = req.body;
    let isCompleted = true;
    await Request.update({ isCompleted }, {
      where: {
        id: requestId
      },
    });
    let request = {requestId, isCompleted}
    return res.json({
      request,
    });
  }),
);

// /****************** GET USER REQUESTS **************************/

router.get('/:id(\\d+)/:userType', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const userType = req.params.userType
  let oldRequests;
  if (userType === 'true') {
    oldRequests = await sequelize.query(`SELECT "Requests"."id", image, "isCompleted", "Requests".description, "apparelChoice", "Requests"."createdAt", "userId", "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName" FROM "Requests" JOIN "Users" ON "designerId" = "Users".id WHERE "userId"=${userId} ORDER BY "createdAt"` );
  } else {
    oldRequests = await sequelize.query(`SELECT "Requests"."id", image, "isCompleted", "Requests".description, "apparelChoice", "Requests"."createdAt", "userId", "designerId", "Users"."firstName" AS "userFirstName", "Users"."lastName" AS "userLastName" FROM "Requests" JOIN "Users" ON "userId" = "Users".id WHERE "designerId"=${userId} ORDER BY "createdAt"` );
  }
  let requests = oldRequests[0];
  for (let i = 0; i < requests.length; i++) {
    let imageArray;
    if (requests[i].image.includes(',')) {
      imageArray = requests[i].image.split(',')
      requests[i].imageUrl = [];
      imageArray.forEach(img => {
        requests[i].imageUrl.push(`https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/requests/${img}`)
      })
    } else {
      requests[i].imageUrl = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/requests/${requests[i].image}`
    }
  }
    return res.json({ requests });
}))
  


// /****************** GET REQUEST **************************/

router.get('/:image', requireAuth, asyncHandler(async (req, res) => {
  const image = req.params.image
  const request = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/requests/${image}`
    return res.json({ request });
    }))
  

module.exports = router;