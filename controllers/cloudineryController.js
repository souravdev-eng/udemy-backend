const cloudinary = require('cloudinary');

const catchAsync = require('../utils/catchAsync');

cloudinary.config({
  cloudinary_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.upload = catchAsync(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto'
  });
  res.status(200).json({
    public_id: result.public_id,
    uri: result.secure_uri
  });
});

exports.remove = (req, res, next) => {
  const imageId = req.body.public_id;
  cloudinary.uploader.destroy(imageId);
  res.status(204).send('Image is deleted successfully');
};
