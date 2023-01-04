const asyncHandler = require("express-async-handler");

// @desc Gets a single video object
// @route GET /api/videos
const getVideo = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get video",
  });
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
