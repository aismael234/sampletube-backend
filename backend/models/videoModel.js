const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  v: String,
  uploader: {
    type: String,
    required: true,
  },
  uploader_id: {
    type: String,
    required: true,
  },
  upload_date: {
    type: String, // convert yyyymmdd to date?
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  tags: [String],
  duration: Number,
  age_limit: Number,
  view_count: {
    type: Number,
    required: true,
  },
  allow_embed: Boolean,
  is_crawlable: Boolean,
  is_live_content: Boolean,
  is_ads_enabled: Boolean,
  credits: [
    {
      title: String,
      author: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("Video", videoSchema);
