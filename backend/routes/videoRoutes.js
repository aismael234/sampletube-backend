const express = require("express");
const router = express.Router();
const { getVideo, updateVideo } = require("../controllers/videoController");

router.get("/", getVideo);

router.put("/:id", updateVideo);

module.exports = router;
