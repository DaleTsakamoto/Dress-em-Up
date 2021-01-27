const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Recommendation, Sequelize, sequelize } = require('../../db/models');

const router = express.Router();

const Op = Sequelize.Op;


/****************** REQUESTS ERRORS MIDDLEWARE **************************/

const validateRecommendation = [
  check('hyperlinksArray')
    .exists({ checkFalsy: true })
    .withMessage('Please provide at least one hyperlink.'),
  check('apparelChoice')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please include at least one apparel choice.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please include a description of your recommendation.'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please include a name for your recommendation'),
  handleValidationErrors,
];

/******************** NEW RECOMMENDATION **************************/

router.post(
  '/',
  validateRecommendation,
  requireAuth,
  asyncHandler(async (req, res) => {
    let { userId, designerId, name, apparelChoice, description, hyperlinksArray, requestId } = req.body;
    hyperlinks = hyperlinksArray.join(',')
    apparelChoice = apparelChoice.join(',')
    const recommendationSave = await Recommendation.build({ userId, designerId, name, apparelChoice, description, hyperlinks, requestId });
    await recommendationSave.save();
    oldRecommendation = await sequelize.query(`SELECT "Recommendations".id, name, "Recommendations".description, "apparelChoice", hyperlinks, "Recommendations"."createdAt", "userId", "designerId", "Users"."firstName" AS "userFirstName", "Users"."lastName" AS "userLastName" FROM "Recommendations" JOIN "Users" ON "userId" = "Users".id WHERE "Recommendations".id = ${recommendationSave.dataValues.id}`);
    let recommendation = oldRecommendation[0][0];
    return res.json({
      recommendation,
    });
  }),
);


/****************** GET RECOMMENDATIONS **************************/

router.get('/:id(\\d+)/:userType', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.params.id
  const userType = req.params.userType

  if (userType === "true") {
    oldRecommendations = await sequelize.query(`SELECT "Recommendations"."id", name, "Recommendations".description, "apparelChoice", hyperlinks, "Recommendations"."createdAt", "userId", "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName" FROM "Recommendations" JOIN "Users" ON "designerId" = "Users".id WHERE "userId"=${userId} ORDER BY "createdAt"`);
  } else if (userType === "false") {
    oldRecommendations = await sequelize.query(`SELECT "Recommendations"."id", name, "Recommendations".description, "apparelChoice", hyperlinks, "Recommendations"."createdAt", "userId", "designerId", "Users"."firstName" AS "userFirstName", "Users"."lastName" AS "userLastName" FROM "Recommendations" JOIN "Users" ON "userId" = "Users".id WHERE "designerId"=${userId} ORDER BY "createdAt"`);
  } else {
    oldRecommendations = await sequelize.query(`SELECT "Recommendations"."id", name, "apparelChoice", "Recommendations".description, hyperlinks, "userId", "designerId", "Users"."firstName" AS "userFirstName", "Users"."lastName" AS "userLastName" FROM "Recommendations" JOIN "Users" ON "userId" = "Users".id WHERE NOT "userId"=${userId}`);
  }
  
  // UNION SELECT name, "apparelChoice", description, hyperlinks, "userId", "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName" FROM "Recommendations" JOIN "Users" ON "designerId" = "Users".id
  let recommendations = oldRecommendations[0];
    return res.json({ recommendations });
    }))
  

module.exports = router;