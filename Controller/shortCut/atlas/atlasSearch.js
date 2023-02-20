exports.searchAtlas = (
    productTitle,
    page,
    limit,
    returnStoredSource
  ) => {
    let pipeline = [
      {
        $search: {
          compound: {
            should: [
              {
                autocomplete: {
                  path: 'title',
                  query: productTitle,
                  fuzzy: {
                    prefixLength: 1,
                  },
                },
              },
              {
                text: {
                  path: 'title',
                  query: productTitle,
                  score: { boost: { value: 2 } },
                },
              },
            ],
            minimumShouldMatch: 1,
          },
  
          highlight: { path: 'title' },
          returnStoredSource,
        },
      },
  
      { $skip: Number(page) * Number(limit) },
  
      limit ? { $limit: Number(limit) } : null,
  
      { $set: { highlights: { $meta: 'searchHighlights' } } },
    ];
  
    return pipeline.filter((el) => el);
  };

  

  exports.facetSummary = tryCatch(async (query, userCurrency) => {
    let { limit, page } = query;
    limit = Number(limit) || 10;
    page = Number(page) || 0;
  
    if (!query.sort) {
      query.sort = '-rating.value';
    }
  
    // price query
  
    // position of doc
    const curPageFirstDocNumber = Number(page) * Number(limit);
    const curPageLastDocNumber = Number(Number(page) + 1) * Number(limit);
  
    let agg = await Product.aggregate([
      ...this.searchProductAggPipeline(query.q, 0, 0, false),
  
      {
        $facet: {
          // total items count and total pages
          summary: [
            ...formatQueryIntoPipeline(query, false, ['skip', 'limit', 'sort']),
            { $count: 'count' },
            {
              $set: {
                totalPage: { $ceil: { $divide: ['$count', Number(limit)] } },
                docsRange: `${curPageFirstDocNumber}-${curPageLastDocNumber}`,
                searchWord: query.q,
              },
            },
          ],
  
          categoryByScreenHeight: [
            {
              $project: { specs: 1 },
            },
  
            {
              $set: {
                specs: {
                  $first: {
                    $filter: {
                      input: '$specs',
                      as: 'spec',
                      cond: { $eq: ['$$spec.name', 'screen_height'] },
                    },
                  },
                },
              },
            },
  
            { $set: { screenHeight: '$specs.value' } },
  
            {
              $group: {
                _id: null,
                values: {
                  $addToSet: { $substrCP: ['$screenHeight', 0, 8] },
                },
              },
            },
  
            { $set: { key: 'screenHeight' } },
  
            { $unset: ['_id', 'key'] },
          ],
          categoryBySize: [
            { $project: { size: '$curVariant.size' } },
  
            {
              $group: {
                _id: '$null',
                values: { $addToSet: '$size' },
              },
            },
  
            { $unset: ['_id'] },
          ],
          categoryByColor: [
            { $project: { color: '$curVariant.color' } },
  
            {
              $group: {
                _id: '$color.name',
                colorImg: { $first: '$color.color_img' },
              },
            },
  
            { $set: { color: '$_id' } },
  
            { $match: { color: { $ne: null } } },
  
            { $unset: ['_id'] },
          ],
  
          // products
          docs: [
            ...formatQueryIntoPipeline(query, false, []),
  
            {
              $project: {
                thumbnail: '$assets.thumbnail',
  
                title: 1,
                'rating.value': 1,
                'rating.count': 1,
                price: 1,
                color: '$curVariant.color.name',
  
                variantByColors: '$variants.colors',
  
                url: {
                  $concat: [
                    '/',
                    {
                      $substr: [
                        {
                          $reduce: {
                            input: { $split: ['$title', ' '] },
                            initialValue: '',
                            in: { $concat: ['$$value', '-', '$$this'] },
                          },
                        },
                        1,
                        -1,
                      ],
                    },
                    '/',
                    {
                      $toString: '$_id',
                    },
                  ],
                },
  
                convertPrice: userCurrency
                  ? {
                      unit: userCurrency.symbol,
                      value: {
                        $round: [
                          {
                            $multiply: [
                              '$price.value',
                              Number(userCurrency.rate),
                            ],
                          },
                          2,
                        ],
                      },
                    }
                  : '$price',
              },
            },
  
            { $unset: ['variantByColors._id'] },
          ],
        },
      },
    ]);
  
    agg = agg[0];
    if (agg.summary.length === 0) return false;
    agg.summary = agg.summary[0];
    agg.categoryByScreenHeight = agg.categoryByScreenHeight[0].values;
    agg.categoryBySize = agg.categoryBySize[0].values;
    agg.categoryByPrice = {
      symbol: userCurrency ? userCurrency.symbol : '$',
      range: userCurrency
        ? [25, 50, 100, 150, 200].map((el) =>
            Math.floor(el * Number(userCurrency.rate))
          )
        : [25, 50, 100, 150, 200],
    };
  
    return agg;
  });