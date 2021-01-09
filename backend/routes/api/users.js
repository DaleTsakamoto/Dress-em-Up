const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


/****************** SIGNUP ERRORS MIDDLEWARE **************************/

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('userType')
    .exists({ checkFalsy: true })
    .withMessage('Choose either user or developer'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a last name'),
  handleValidationErrors,
];

/****************** SIGNUP **************************/

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { username, email, password, firstName, lastName, userType } = req.body;
    const user = await User.signup({ username, firstName, lastName, email, password, userType });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

/****************** USERS PAGE **************************/

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const user = await User.findByPk(userId)
  if (user) {
    return res.json({
      user
    })
  }
    return res.json('No User Found!');
  }))


/****************** GET DESIGNERS **************************/

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const oldDesigners = await User.findAll({
    where: {
      userType: false,
    }
  })
  let designers = {}
  for (let i = 0; i < oldDesigners.length; i++) {
    designers[oldDesigners[i].id] = oldDesigners[i]
  }
    return res.json({ designers });
    }))
  

module.exports = router;