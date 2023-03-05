const sharp = require('sharp');

// Utils
const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');
const {
  formatQueryIntoPipeline,
} = require('../../utils/mongodbQueryConverter');

// Model
const Blog = require('../../Model/blog/blogModel');

// Controller

const topLevelBucketController = require('../userBucketController/topLevelList');
const Factory = require('../handleFactoryController');

exports.resizePhotos = async (req, res, next) => {
  if (!req.files) return next();

  const { thumbnail, photos } = req.files;

  const promises = [];
  if (thumbnail) {
    const filename = `blog-thumbnail-${req.user._id}-${Date.now()}.png`;
    req.body['thumbnail'] = filename;

    promises.push(
      sharp(thumbnail.file.buffer)
        .resize(600, 600)
        .toFormat('png')
        .jpeg({ quality: 90 })
        .toFile(`public/img/blogs/thumbnail/${filename}`)
    );
  }
  if (photos) {
    photos.map((photo) => {
      const filename = `blog-photo-${req.user._id}-${Date.now()}.png`;
      req.body['photos'].push(filename);

      promises.push(
        sharp(photo.file.buffer)
          .resize(1200, 1080)
          .toFormat('png')
          .jpeg({ quality: 90 })
          .toFile(`public/img/blogs/photos/${filename}`)
      );
    });
  }

  await Promise.all(promises);

  next();
};

exports.getBlog = tryCatch(async (id) => await Factory.getOneFunc(Blog, id));

exports.createBlog = tryCatch(async (blog) => {
  await Blog.create(blog);
});

exports.removeBlog = tryCatch(
  async (blogId) =>
    await Factory.updateOneFunc(Blog, blogId, { $set: { active: false } })
);

// get blog by limit
exports.getBlogs = tryCatch(async (genre, page, limit) => {
  const blogs = await Blog.find({ genre })
    .sort({ ts: 1 })
    .skip(Number(page) * Number(limit))
    .limit(Number(limit));

  return blogs;
});

exports.searchBlog = tryCatch(async (q, query) => {
  const pipeline = [
    {
      $search: {
        compound: {
          should: [
            {
              autocomplete: {
                path: 'content.title',
                query: q,
                score: { boost: { value: 2 } },
                fuzzy: {
                  prefixLength: 1,
                },
              },
            },
            {
              text: {
                path: 'content.text',
                query: q,
              },
            },
          ],
          minimumShouldMatch: 1,
        },

        returnStoredSource: true,
      },
    },

    ...formatQueryIntoPipeline(query, [], ['match']),

    { $project: { title: '$content.title' } },
  ];

  return await Blog.aggregate(pipeline);
});

// like,comment,views , value = 1,-1
exports.updateBlogCountField = tryCatch(async (blogId, countField, value) => {
  await Blog.findOneAndUpdate(
    { _id: blogId },
    { $inc: { [`count.${countField}`]: value } }
  );
});

// get blogs that are not in genre which i ignore, have bookmark and author muted property according to me
exports.getFilterBlogs = tryCatch(
  async (userId, getBlogsAfterTs, blogRelatedToGenre) => {
    const ts = new Date(getBlogsAfterTs) || new Date();
    const userActivity = await topLevelBucketController.getUserAllActivityDocs(
      userId,
      ['genreIgnore', 'mutedUsers', 'bookmarkBlogs', 'readingLists']
    );

    //  did i bookmark the blog

    const blogs = [];

    const getRightBlogs = async (queryTs, genreIgnore) => {
      const docs = await Blog.find(
        {
          ts: { $lt: queryTs },
          genre: blogRelatedToGenre
            ? blogRelatedToGenre
            : { $nin: genreIgnore },
        },
        { count: 0, active: 0 }
      )
        .sort({
          'count.views': -1,
          'count.like': -1,
          'count.comment': -1,
          'count.bookmark': -1,
        })
        .limit(10)
        .exec();

      // if(!docs.length===0) return new Error('no more docs')
      return docs;
    };

    // itemId can be userId or blogId
    const checkDocExistInUserActivity = (activityField, itemId) =>
      userActivity[activityField].some(
        (el) => el._id.toString() === itemId.toString()
      );

    while (blogs.length < 10) {
      const getDocs = await getRightBlogs(ts, userActivity.genreIgnore);

      if (getDocs.length === 0 || blogs.length > 10) break;

      blogs.push(...getDocs);

      if (getDocs.length <= 10) break;
    }

    console.log('blog-authoe-id', userActivity['mutedUsers']);

    blogs.forEach((blog) => {
      // I need readingList
      blog.addedToReadingList = userActivity['readingLists'].some((list) =>
        list.items.find((item) => item._id.toString() === blog._id.toString())
      );

      blog.authorMuted = checkDocExistInUserActivity(
        'mutedUsers',
        blog.author._id
      );

      // check and set if i muted the blog author
    });

    return blogs;
  }
);

exports.apiCreateBlog = catchAsync(async (req, res) => {
  const blog = await this.createBlog(req.user, req.body);
  return send(res, 200, 'blog created', blog);
});
exports.apiGetFilterBlogs = catchAsync(async (req, res) => {
  const blogs = await this.getFilterBlogs(req.user._id, req.query.lastBlogTs,req.query.genre);
  return send(res, 200, 'filter blogs', {
    total: blogs.length,
    lastBlogTs: blogs.length > 0 && blogs.slice(-1)[0].ts,
    docs: blogs,
  });
});

exports.apiGetBlog = Factory.getOne(Blog);
exports.apiGetBlogs = Factory.getAll(Blog);

exports.apiSearchBlogs = catchAsync(async (req, res) => {
  const blogs = await this.searchBlog(req.query.q, req.query);
  return send(res, 200, 'search blogs', { docs: blogs });
});
