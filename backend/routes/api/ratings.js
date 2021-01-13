const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Rating, Recommendation, Sequelize, sequelize } = require('../../db/models');

const router = express.Router();

const Op = Sequelize.Op;

/****************** GET RATINGS **************************/

router.get('/', asyncHandler(async (req, res) => {
  const oldRatings = await Rating.findAll({
    attributes: ['designerId', [sequelize.fn('AVG', sequelize.col('designerRating')), 'avgRating']],
    group: 'designerId'
  })
// console.log("THIS IS SEQUELISE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", sequelize.query)
// let oldRatings = await sequelize.query(`SELECT AVG("designerRating") FROM "Ratings"`);
// UNION SELECT name, "apparelChoice", description, hyperlinks, "userId", "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName" FROM "Recommendations" JOIN "Users" ON "designerId" = "Users".id
  // let ratings = oldRatings[0];
  let ratings;
  ratings = {}
  for (let i = 0; i < oldRatings.length; i++) {
    ratings[oldRatings[i].designerId] = oldRatings[i]
  } 
  return res.json({ ratings });
}))
  
module.exports = router;