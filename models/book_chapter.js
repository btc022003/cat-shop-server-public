const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookChapterSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    views: {
      type: Number,
      dafault: 0
    },
    url: {
      type: String
    },
    book: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Book",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("BookChapter", bookChapterSchema);
