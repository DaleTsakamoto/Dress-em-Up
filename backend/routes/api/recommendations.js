const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Recommendation, Sequelize, sequelize } = require('../../db/models');

const router = express.Router();

const Op = Sequelize.Op;


/****************** REQUESTS ERRORS MIDDLEWARE **************************/

// const validateRequest = [
//   check('image')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide at least one image.'),
//   check('apparelChoice')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 1 })
//     .withMessage('Please include at least one apparel choice.'),
//   check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Please include a description of your request.'),
//   handleValidationErrors,
// ];

/******************** NEW REQUEST **************************/

// router.post(
//   '/:id(\\d+)',
//   validateRequest,
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     let { image, description, designerId, apparelChoice } = req.body;
//     const userId = req.params.id
//     image = image.join(',')
//     apparelChoice = apparelChoice.join(',')
//     const request = await Request.build({ image, description, designerId, apparelChoice, userId });
//     console.log("BACKEND REQUEST", request)
//     await request.save();
//     return res.json({
//       request,
//     });
//   }),
// );

// /****************** USERS PAGE **************************/

// router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
//   const userId = parseInt(req.params.id, 10)
//   const user = await User.findByPk(userId)
//   if (user) {
//     return res.json({
//       user
//     })
//   }
//     return res.json('No User Found!');
//   }))


/****************** GET RECOMMENDATIONS **************************/

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const user = req.params.id
    // const recommendations = await User.findAll({
    //   where: {
    //     id: {
    //       [Op.ne]: user
    //     },
    //     attributes: ['id', 'firstName', 'lastName'],
    //     include: Recommendation
    //   }
    // })
  // console.log("THIS IS SEQUELISE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", sequelize.query)
  let oldRecommendations = await sequelize.query(`SELECT "Recommendations"."id", name, "apparelChoice", description, hyperlinks, "userId", "designerId", "Users"."firstName" AS "userFirstName", "Users"."lastName" AS "userLastName" FROM "Recommendations" JOIN "Users" ON "userId" = "Users".id WHERE NOT "userId"=${user}`);
  // UNION SELECT name, "apparelChoice", description, hyperlinks, "userId", "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName" FROM "Recommendations" JOIN "Users" ON "designerId" = "Users".id
  let recommendations = oldRecommendations[0];
    return res.json({ recommendations });
    }))
  

module.exports = router;