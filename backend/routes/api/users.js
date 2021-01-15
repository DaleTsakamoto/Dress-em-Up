const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Sequelize } = require('../../db/models');

const router = express.Router();

const Op = Sequelize.Op


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
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a last name'),
  handleValidationErrors,
];

const validateEdit = [
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
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('You must have an address'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('You must have a city'),
  check('state')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 2 })
    .withMessage('You must have a valid state code'),
  check('zipCode')
    .exists({ checkFalsy: true })
    .isNumeric()
    .isLength({ min: 5 })
    .withMessage('You must have a valid zip code'),
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

/****************** UPDATE USER **************************/

router.put(
  '/:id(\\d+)',
  requireAuth,
  validateEdit,
  asyncHandler(async (req, res) => {
    const id = req.params.id
    const { email, username, firstName, lastName, address, city, state, zipCode } = req.body;
    const oldUser = await User.update({ email, username, firstName, lastName, address, city, state, zipCode }, {
      where: {
        id: id
      },
    });
    let user = await User.scope('currentUser').findByPk(id);
    return res.json({
      user,
    });
  }),
);

/****************** USERS PAGE **************************/

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  console.log("THIS IS NOT THE RIGHT ROUTE AHHHHHHH!!!!!!!")
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
  // console.log("THIS IS THE LENGTH!!!!!!!", req.params)
  // console.log("BUT THIS IS THE QUERY", req.query)
  let designers;
  if (!req.query['q0']) {
    const oldDesigners = await User.findAll({
      where: {
        userType: false,
      }
    })
    designers = {}
    for (let i = 0; i < oldDesigners.length; i++) {
      designers[oldDesigners[i].id] = oldDesigners[i]
    } 
  } 
  else if (!req.query['q1']) {
    console.log("FIRST CONSTRUCTION!!!!")
    let keywordSearch = req.query['q0']
    designers = await User.findAll({
      where: {
        userType: false,
        [Op.or]: [{firstName: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}, {lastName: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}, {email: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}, {username: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}]
      }
    })
    // console.log("THIS IS THE DESIGNER", res.json(designers))
  } 
  // else {
  //   console.log("UNDER CONSTRUCTION!!!!!!!")
    // let keywordSearches = req.query;
    // designers = [];
    // designers = Object.keys(keywordSearches).map((keywordSearch) => {
    //   designers = await User.findAll({
    //     where: {
    //       userType: false,
    //       [Op.or]: [{firstName: {
    //         [Op.iLike]: '%'+keywordSearch+'%'
    //       }}, {lastName: {
    //         [Op.iLike]: '%'+keywordSearch+'%'
    //       }}, {email: {
    //         [Op.iLike]: '%'+keywordSearch+'%'
    //       }}]
    //     }
    //   })
    // })
  // }
    return res.json({ designers });
    }))
  

module.exports = router;