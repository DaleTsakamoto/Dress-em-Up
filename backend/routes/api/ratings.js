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

/****************** GET RATING/DESIGNER RATINGS **************************/

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  let id = req.params.id
  const rating = await Rating.findAll({
    where: {
      designerId: id,
    },
    attributes: ['designerId', [sequelize.fn('AVG', sequelize.col('designerRating')), 'avgRating']],
    group: 'designerId',
  })

  const oldRatings = await sequelize.query(`SELECT "Ratings".id, comment, "Users"."firstName" AS "userFirstName", "Users"."lastName" AS "userLastName" FROM "Ratings" JOIN "Users" ON "userId" = "Users".id WHERE "Ratings"."designerId" = ${id} ORDER BY "Ratings"."updatedAt"`);
  let ratings = oldRatings[0];
  console.log("THIS IS THE RATING OBJECT", ratings)
  if (!rating) {
    return res.json('No ratings found')
  }
  return res.json({ rating, ratings });
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
    ratingUpdate = { [designerId]: oldRatings.dataValues }
  }
  return res.json({ ratingUpdate });
}))
  
module.exports = router;