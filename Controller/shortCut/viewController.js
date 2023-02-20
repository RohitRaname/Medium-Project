const catchAsync = require('../../utils/catchAsync');
const productController = require('../Product/product_controller');

exports.renderProductMenuPage = catchAsync(async (req, res, next) => {
  req.query.limit = 10;
  req.query.page = 0;

  const result = await productController.getProductMenu(
    req.query,
    req.user && req.user.currency
  );
    
  



  return res.render('pages/productMenu/page', {
    page: 'productMenu',

 
    searchWord: req.query.q,
    userData: req.restrictUserData,
  });
});
