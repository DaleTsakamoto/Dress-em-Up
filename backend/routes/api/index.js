const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const uploadsRouter = require('./uploads.js')
const requestsRouter = require('./requests.js')
const recommendationsRouter = require('./recommendations.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/uploads', uploadsRouter);
router.use('/requests', requestsRouter);
router.use('/recommendations', recommendationsRouter);

module.exports = router;
