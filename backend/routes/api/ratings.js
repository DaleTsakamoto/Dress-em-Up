const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Rating, Sequelize, sequelize } = require('../../db/models');

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

  const oldRatings = await sequelize.query(`SELECT "Ratings".id, comment, "designerId", "designerRating", "userId", "Users"."firstName" AS "userFirstName", "Users".avatar AS "userAvatar", "Users"."lastName" AS "userLastName" FROM "Ratings" JOIN "Users" ON "userId" = "Users".id WHERE "Ratings"."designerId" = ${id} ORDER BY "Ratings"."updatedAt"`);
  let ratings = oldRatings[0];
  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i].userAvatar) {
      ratings[i].userAvatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/profile-pics/${ratings[i].userAvatar}`
    }
  }
  if (!rating) {
    return res.json('No ratings found')
  }
  return res.json({ rating, ratings });
}))


/****************** POST RATINGS **************************/

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { designerId, userId, designerRating, comment } = req.body
  // const oldRating = await Rating.findOne({
  //   where: {
  //     [Op.and]: [{userId: userId}, {designerId: designerId}]
  //   }
  // })
  // let ratingAvg;
  // if (oldRating) {
    await Rating.destroy({
      where: {
        [Op.and]: [{userId: userId}, {designerId: designerId}]
      }
    })
  // }
    let rate = Rating.build({
      userId: userId,
      designerId: designerId,
      designerRating: designerRating,
      comment: comment
    });
    await rate.save();
    ratingAvg = await Rating.findOne({
      where: {
        designerId: designerId
      },
      attributes: ['designerId', [sequelize.fn('AVG', sequelize.col('designerRating')), 'avgRating']],
      group: 'designerId'
    })
  
  let oldRating = await sequelize.query(`SELECT "Ratings".id, comment, "designerId", "designerRating", "userId", "Users"."firstName" AS "userFirstName", "Users".avatar AS "userAvatar", "Users"."lastName" AS "userLastName" FROM "Ratings" JOIN "Users" ON "userId" = "Users".id WHERE "Ratings"."userId" = ${userId} AND "Ratings"."designerId" = ${designerId}`);
  let rating = oldRating[0][0]
  if (rating.userAvatar) {
    rating.userAvatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/profile-pics/${rating.userAvatar}`
  }
  return res.json({ ratingAvg, rating });
}))
  
module.exports = router;