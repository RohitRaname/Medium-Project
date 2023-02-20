exports.resizePhotos = async (req, res, next) => {
    if (!req.files) return next();
  
    const photos = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of req.files) {
      const filename = `review-${req.user._id}-${Date.now()}.jpeg`;
  
      // done after some time
      sharp(file.buffer)
        .resize({ width: 1280 })
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/reviews/${filename}`);
  
      photos.push(filename);
    }
  
    req.body.content_photos = photos;
  
    next();
  };