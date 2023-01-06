const asyncHandler = require("express-async-handler");

const Video = require("../models/videoModel");

// @desc Gets a single video object
// @route GET /api/videos
const getVideo = asyncHandler(async (req, res) => {
  //console.log(req.query);

  // Change date (string form) format
  // from yyyy-mm-dd to yyyymmdd to match database format
  const queryData = req.query;

  let andArray = [];

  // if no queries exist. Usually upon intial page load.
  if (queryData != false) {
    const video = await Video.aggregate([{ $sample: { size: 1 } }]);

    res.status(200).json(video);
  } else {
    // adds all non-empty values to an array to be later used into a query
    // "false" condition accounts for "", null, and undefined (kinda lazy/irresponsible, I know.).
    if (queryData.minimum_views != false)
      andArray.push({
        view_count: { $gte: parseInt(req.query.minimum_views, 10) },
      });
    if (queryData.maximum_views != false)
      andArray.push({
        view_count: { $lte: parseInt(req.query.maximum_views, 10) },
      });
    if (queryData.date_from != false)
      andArray.push({
        upload_date: {
          $gte: req.query.date_from.replaceAll("-", ""),
        },
      });
    if (queryData.date_to != false)
      andArray.push({
        upload_date: {
          $lte: req.query.date_to.replaceAll("-", ""),
        },
      });
    if (queryData.title != false)
      andArray.push({
        title: { $regex: req.query.keywords, $options: "i" },
      });

    // takes in the whole andArray and uses all non-empty values to query
    const video = await Video.aggregate([
      {
        $match: {
          $and: andArray,
        },
      },
      { $sample: { size: 1 } },
    ]);

    //console.log(video);

    res.status(200).json(video);
  }
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
