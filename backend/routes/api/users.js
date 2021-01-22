const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Sequelize, sequelize } = require('../../db/models');

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
    const { username, email, password, firstName, lastName, userType, active, description, resume } = req.body;
    const user = await User.signup({ username, firstName, lastName, email, password, userType, active, description, resume });

    await setTokenCookie(res, user);

    // user.profileBackground = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/profile-pics/05e08f55-bb29-4002-a865-47bd55f96075.jpg`
    user.avatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${user.userType ? 'users' : 'designers'}/profile-pics/${user.avatar}`
    return res.json({
      user,
    });
  }),
);

// /****************** GET PROFILE RECOMMENDATIONS **************************/

router.get('/:id(\\d+)/recommendations', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  console.log("BACKEND IS WORKING AND THIS IS USERID", userId)
  let oldRecommendations = await sequelize.query(`SELECT "Recommendations"."id", name, "Recommendations".description, "apparelChoice", hyperlinks, "Recommendations"."createdAt", "userId", "designerId", "Users"."firstName" AS "userFirstName", "Users"."lastName" AS "userLastName" FROM "Recommendations" JOIN "Users" ON "userId" = "Users".id WHERE "userId"=${userId} ORDER BY "createdAt"`);
  let recommendations = oldRecommendations[0];
    return res.json({ recommendations });
}))

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
    user.avatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${user.userType ? 'users' : 'designers'}/profile-pics/${user.avatar}`
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
    user.avatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/users/profile-pics/${user.avatar}`
    return res.json({
      user
    })
  }
    return res.json('No User Found!');
}))
  

/****************** GET DESIGNERS **************************/

router.get('/', requireAuth, asyncHandler(async (req, res) => {
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
      oldDesigners[i].avatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/designers/profile-pics/${oldDesigners[i].avatar}`
    } 
  } 
  else if (!req.query['q1']) {
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
    for (let i = 0; i < designers.length; i++) {
      designers[i].avatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/designers/profile-pics/${designers[i].avatar}`
    }
  } 
  else {
    let keywordSearches = req.query;
    let queries = Object.values(keywordSearches).map((keywordSearch) => {
      return `%${keywordSearch}%`
    })
    designers = await User.findAll({
      where: {
        userType: false,
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: { [Op.any]: queries }
            }
          },
          {
            lastName: {
              [Op.iLike]: { [Op.any]: queries }
            }
          },
          {
            email: {
              [Op.iLike]: { [Op.any]: queries }
            }
          },
          {
            username: {
              [Op.iLike]: { [Op.any]: queries }
            }
          }
        ]
      }
    })
    for (let i = 0; i < designers.length; i++) {
      designers[i].avatar = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/designers/profile-pics/${designers[i].avatar}`
    }
  }

  console.log("THESE ARE THE DESIGNERS BACKEND!?!?!?!", designers)


    return res.json({ designers });
    }))
  

module.exports = router;