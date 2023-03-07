/* eslint-disable camelcase */
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const tryCatch = require('../utils/tryCatch');

exports.retryUntilFulfillReqDocsLimit = tryCatch(async (reqFunc, query) => {
  const docs = [];

  let page;
  let retryCount = 0;

  while (docs.length <= 10) {
    // update page to get new docs
    if (retryCount > 0) query.page = Number(query.page) + 1;

    retryCount++;

    const getDocs = await reqFunc();
    docs.push(...getDocs);

    
    if (getDocs.length === 0 || getDocs.length < 10) break;
  }


  return docs.slice(0,10);
});
