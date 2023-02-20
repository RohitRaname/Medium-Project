// SIGNUP _--------------------------------------------
exports.renderCreateAccountPage = (req, res) => {
  res.render('pages/auth/signup/createAccount');
};
exports.renderVerifyAccountPage = (req, res) => {
  const { email } = req.query;
  res.render('pages/auth/signup/verifyAccount', { email });
};

// LOGIN _--------------------------------------------
exports.renderEnterEmail = (req, res) => {
  res.render('pages/auth/login/0.enterEmail.pug');
};
exports.renderEnterPassword = (req, res) => {
  const { email } = req.query;
  res.render('pages/auth/login/1.enterPassword.pug', { email });
};

// FORGOTPASSWORD _--------------------------------------------
exports.renderForgotPasswordFindAccount = (req, res) => {
  res.render('pages/auth/forgotPassword/0.findAccount.pug');
};
exports.renderForgotPasswordEnterOTP = (req, res) => {
  const { email } = req.query;
  res.render('pages/auth/forgotPassword/1.enterOTP.pug', { email });
};

exports.renderSetNewPassword = (req, res) => {
  const { email } = req.query;
  res.render('pages/auth/forgotPassword/2.setNewPassword.pug', { email });
};


