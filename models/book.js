const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String
    },
    descriptions: {
      type: String
    },
    coverImg: {
      type: String
    },
    url: {
      type: String
    },
    views: {
      type: Number,
      dafault: 0
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "BookCategory",
      required: true
    }
  },
  {
    timestamps: true
  }
);

// 获取每一个分类中的书本数量
bookSchema.virtual("bookChapterCount", {
  ref: "BookChapter",
  localField: "_id",
  foreignField: "book",
  count: true
});
bookSchema.set("toJSON", { virtuals: true });
bookSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Book", bookSchema);
