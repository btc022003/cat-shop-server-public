const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    descriptions: {
      type: String
    },
    url: {
      type: String
    },
    coverImg: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// 获取每一个分类中的书本数量
bookCategorySchema.virtual("bookCount", {
  ref: "Book",
  localField: "_id",
  foreignField: "category",
  count: true
});
bookCategorySchema.set("toJSON", { virtuals: true });
bookCategorySchema.set("toObject", { virtuals: true });
module.exports = mongoose.model("BookCategory", bookCategorySchema);
