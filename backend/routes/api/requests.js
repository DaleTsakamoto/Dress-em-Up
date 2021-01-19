const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Request } = require('../../db/models');

const router = express.Router();


/****************** REQUESTS ERRORS MIDDLEWARE **************************/

const validateRequest = [
  check('image')
    .exists({ checkFalsy: true })
    .withMessage('Please provide at least one image.'),
  check('apparelChoice')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please include at least one apparel choice.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please include a description of your request.'),
  handleValidationErrors,
];

/******************** NEW REQUEST **************************/

router.post(
  '/:id(\\d+)',
  validateRequest,
  requireAuth,
  asyncHandler(async (req, res) => {
    let { image, description, designerId, apparelChoice, isCompleted } = req.body;
    const userId = req.params.id
    image = image.join(',')
    apparelChoice = apparelChoice.join(',')
    const request = await Request.build({ image, description, designerId, apparelChoice, userId, isCompleted });
    await request.save();
    return res.json({
      request,
    });
  }),
);

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


// /****************** GET REQUESTS **************************/

//   router.get('/', requireAuth, asyncHandler(async (req, res) => {
//     const designers = await User.findAll({
//       where: {
//         userType: false,
//       }
//     })
//     return res.json({ designers });
//     }))
  

module.exports = router;