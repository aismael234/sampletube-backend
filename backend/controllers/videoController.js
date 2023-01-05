const asyncHandler = require("express-async-handler");

const Video = require("../models/videoModel");

// @desc Gets a single video object
// @route GET /api/videos
const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.aggregate([{ $sample: { size: 1 } }]);

  console.log(video);
  res.status(200).json(video);
});

// @desc Updates the like/dislike count of a video object
// @route PUT /api/videos:id
const updateVideo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({
    message: `put video: ${req.params.id}`,
  });
});

module.exports = {
  getVideo,
  updateVideo,
};
