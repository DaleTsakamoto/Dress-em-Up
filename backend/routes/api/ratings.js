const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Rating, Recommendation, Sequelize, sequelize } = require('../../db/models');

const router = express.Router();

const Op = Sequelize.Op;

/****************** GET RATINGS **************************/

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const oldRatings = await Rating.findAll({
    attributes: ['designerId', [sequelize.fn('AVG', sequelize.col('designerRating')), 'avgRating']],
    group: 'designerId'
  })
  let ratings;
  ratings = {}
  for (let i = 0; i < oldRatings.length; i++) {
    ratings[oldRatings[i].designerId] = oldRatings[i]
  } 
  return res.json({ ratings });
}))

/****************** POST RATINGS **************************/

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { designerId, userId, designerRating } = req.body
  const oldRating = await Rating.findOne({
    where: {
      [Op.and]: [{userId: userId}, {designerId: designerId}]
    }
  })
  let rating = null;
  if (oldRating) {
    console.log(oldRating)
    return rating
  } else {
    rating = Rating.build({
      userId: userId,
      designerId: designerId,
      designerRating: designerRating
    });
    await rating.save();
    const oldRatings = await Rating.findOne({
      where: {
        designerId: designerId
      },
      attributes: ['designerId', [sequelize.fn('AVG', sequelize.col('designerRating')), 'avgRating']],
      group: 'designerId'
    })
    // console.log("BACKEND RATINGS!?!?!?", oldRatings)
    // console.log("BACKEND RATINGS 000000!?!?!?", oldRatings.dataValues)
    ratingUpdate = { [designerId]: oldRatings.dataValues }
    console.log("BACKEND RATINGS SENT TO FRONTEND", ratingUpdate)
  }
  return res.json({ ratingUpdate });
}))
  
module.exports = router;