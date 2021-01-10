const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Request, Recommendation } = require('../../db/models');

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
  const requests = await Request.findAll({
    where: {
      userId: userId,
    },
    order: [
      ['createdAt', 'ASC']
    ],
  })
    return res.json({ requests });
}))
  
// /****************** GET USER RECOMMENDATIONS **************************/

router.get('/:id(\\d+)/recommendations', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const recommendations = await Recommendation.findAll({
    where: {
      userId: userId,
    },
    order: [
      ['createdAt', 'ASC']
    ],
  })
    return res.json({ recommendations });
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