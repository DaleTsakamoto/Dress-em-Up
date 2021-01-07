const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const uploadsRouter = require('./uploads.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/uploads', uploadsRouter);

module.exports = router;
