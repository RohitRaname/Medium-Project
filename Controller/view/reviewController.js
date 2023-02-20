const Product = require('../../Model/Product/product_model');
const Review = require('../../Model/review/review_model');
const catchAsync = require('../../utils/catchAsync');
const productController = require('../Product/product_controller');
const AppError = require('../../utils/AppError');
const handleFactory = require('../handleFactoryController');

const send = require('../../utils/sendJSON');

exports.renderCreateReviewPage = catchAsync(async (req, res, next) => {
  const product = await Product.findOne(
    { _id: req.params.productId },
    { title: 1, 'assets.thumbnail': 1, 'model._id': 1, curVariant: 1 }
  ).exec();

  const { user } = req;

  if (!product) return next(new AppError('page not found', 500));

  return res.render('pages/review/createReview/page.pug', {
    page: 'create-review',

    user: req.user,
    userData: req.restrictUserData,
    product,

    reviewSubmitData: {
      modelId: product.model._id,
      author: { _id: user._id, name: user.name, country: user.address.country },
      product: {
        _id: product._id,
        color: product.curVariant.color.name,
        size: product.curVariant.size,
      },
    },
  });
});

exports.renderFilterReviewPage = catchAsync(async (req, res, next) => {
  const product = await productController.getFormatProduct(
    req.params.productId,
    req.user && req.user.currency
  );

  // get product
  const productReviewTotalPage = Math.ceil(
    await handleFactory.getAllDocsCountFunc(Review, {
      modelId: product.modelId,
    }),
    10
  );

  res.render('pages/review/filterReview/page', {
    product,
    page: 'review',
    userData: req.restrictUserData,
    productReviewTotalPage,
  });
});
