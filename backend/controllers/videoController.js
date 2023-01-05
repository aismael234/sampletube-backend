const asyncHandler = require("express-async-handler");

const Video = require("../models/videoModel");

// @desc Gets a single video object
// @route GET /api/videos
const getVideo = asyncHandler(async (req, res) => {
  //console.log(req.query);

  // Change date (string form) format
  // from yyyy-mm-dd to yyyymmdd to match database format
  let date_from;
  let date_to;
  if (req.query.date_from) date_from = req.query.date_from.replaceAll("-", "");
  if (req.query.date_to) date_to = req.query.date_to.replaceAll("-", "");

  console.log(req.query);

  const video = await Video.aggregate([
    {
      $match: {
        $and: [
          {
            $and: [
              {
                $and: [
                  {
                    view_count: { $gte: parseInt(req.query.minimum_views, 10) },
                  },
                  {
                    view_count: { $lte: parseInt(req.query.maximum_views, 10) },
                  },
                ],
              },
              {
                $and: [
                  {
                    upload_date: {
                      $gte: req.query.date_from.replaceAll("-", ""),
                    },
                  },
                  {
                    upload_date: {
                      $lte: req.query.date_to.replaceAll("-", ""),
                    },
                  },
                ],
              },
            ],
          }, //use $in tag for multiple keywords? (would have OR behavior i believe)
          { title: { $regex: "for", $options: "i" } },
        ],
      },
    },
    { $sample: { size: 1 } },
  ]);
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
