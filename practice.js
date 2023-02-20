const data = {
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  brand: String,
  category: { type: String, required: true },

  variants: {
    colora: [{ name: String, color: String }],
    sizes: [String],
  },

  thumbnail: String,
  product_imgs: [String],
  product_spec_imgs: [String],
  stock: Number,
  specs:[{name:String,value:String}],

  rating: {
    rate: Number,
    count: Number,
    one_star_count: Number,
    two_star_count: Number,
    three_star_count: Number,
    four_star_count: Number,
    five_star_count: Number,
  },
  reviews: [],
};

data.title = document.querySelector('#productTitle').textContent.trim();
data.thumbnail=document.querySelector('#imgTagWrapperId').querySelector('img').src

data.description = [
  ...document.querySelector('#feature-bullets').querySelectorAll('li'),
].map((el) => el.querySelector('span').textContent.trim());

data.price = document
  .querySelector('.a-price-whole')
  .textContent.slice(0, -1)
  .split(',')
  .join('');

data.attrs = [
  ...document
    .querySelector('#productOverview_feature_div')
    .querySelectorAll('tr'),
].map((el) => {
  const two_span = [...el.querySelectorAll('span')];
  const obj = {};
  obj[two_span[0].textContent.toLocaleLowerCase().trim.split(' ').join('_')] =
    two_span[1].textContent;
  return obj;
});

data.variants.colors = [
  ...document.querySelector('#variation_color_name').querySelectorAll('img'),
].map((el) => {
  const obj = {};
  obj.img = el.src;
  obj.color = el.alt;
  return obj;
});
data.variants.sizes = [
  ...document.querySelector('#variation_size_name').querySelectorAll('p'),
].map((el) => el.textContent);

data.product_imgs = [
  ...document.querySelector('#imageBlock').querySelectorAll('img'),
].map((el) => el.src);

data.product_spec_imgs = [...document.querySelectorAll('.content-grid-block')]
  .map((el) => {
    if (el.querySelector('img')) return el.querySelector('img').src;
    else null;
  })
  .filter((el) => el);



