const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Request, Recommendation, sequelize } = require('../../db/models');

const router = express.Router();

/****************** LOGIN ERRORS MIDDLEWARE **************************/

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];


// /****************** GET USER REQUESTS **************************/

router.get('/:id(\\d+)/requests', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  // const requests = await Request.findAll({
  //   where: {
  //     userId: userId,
  //   },
  //   order: [
  //     ['createdAt', 'ASC']
  //   ],
  // })
  let oldRequests = await sequelize.query(`SELECT "Requests"."id", image, "isCompleted", "Requests".description, "apparelChoice", "Requests"."createdAt", "userId", "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName" FROM "Requests" JOIN "Users" ON "designerId" = "Users".id WHERE "userId"=${userId} ORDER BY "createdAt"` );
  let requests = oldRequests[0];
    return res.json({ requests });
}))
  
// /****************** GET USER RECOMMENDATIONS **************************/

router.get('/:id(\\d+)/recommendations', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  let oldRecommendations = await sequelize.query(`SELECT "Recommendations"."id", name, "Recommendations".description, "apparelChoice", hyperlinks, "Recommendations"."createdAt", "userId", "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName" FROM "Recommendations" JOIN "Users" ON "designerId" = "Users".id WHERE "userId"=${userId} ORDER BY "createdAt"`);
  let recommendations = oldRecommendations[0];
    return res.json({ recommendations });
}))
  
// /****************** GET USER DESIGNERS **************************/

router.get('/:id(\\d+)/designers', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  let oldDesigners = await sequelize.query(`SELECT "designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName", "Users"."avatar" AS "designerAvatar", "Users"."bio" AS "designerBio" FROM "Recommendations" JOIN "Users" ON "designerId" = "Users".id WHERE "userId"=${userId}`);
  // let oldDesigners = await sequelize.query(`SELECT "Recommendations"."designerId", "Users"."firstName" AS "designerFirstName", "Users"."lastName" AS "designerLastName", "Users"."avatar" AS "designerAvatar", "Users"."bio" AS "designerBio", AVG("Ratings"."designerRating") AS ratings GROUP BY "Ratings"."designerRating" FROM "Recommendations" JOIN "Users" ON "Recommendations"."designerId" = "Users".id JOIN "Ratings" ON "Ratings"."designerId" = "Recommendations"."designerId" WHERE "Recommendations"."userId"=${userId}`);
  let designers = oldDesigners[0];
  // console.log("DESIGNERS ARE USERS ARE HERE !!?!?!?!?!?!?!?!?!?!??!", designers)
    return res.json({ designers });
  }))


/****************** LOGIN **************************/

router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

/****************** LOGOUT **************************/

router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

/****************** RESTORE USER **************************/

router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;