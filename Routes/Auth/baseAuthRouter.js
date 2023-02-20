const baseAuthRouter = require('express').Router();
const signupRouter = require('./signupRouter');
const loginRouter = require('./loginRouter');
const forgotPasswordRouter = require('./forgotPasswordRouter')
const commonAuthRouter = require('./commonAuthRouter');
// controller


baseAuthRouter.use('/login', loginRouter);
baseAuthRouter.use('/signup', signupRouter);
baseAuthRouter.use('/forgotPassword', forgotPasswordRouter);

// admin routes are inside this
baseAuthRouter.use('/', commonAuthRouter);

module.exports = baseAuthRouter;


// resend-token

