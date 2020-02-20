const router = require("express").Router();
const { Book, BookChapter } = require("../../models");

router.get("/", async (req, res, next) => {
  const per = req.query.per * 1 || 10; // 每一页的数量
  const page = req.query.page || 1; // 页数
  if (page <= 0) {
    page = 1;
  }
  if (per <= 0) {
    per = 10;
  }
  let query = {};
  if (req.query.title) {
    query.title = new RegExp(req.query.title, "i");
  }
  if (req.query.category) {
    query.category = req.query.category;
  }
  const sort = req.query.sort || 1;
  const totalCount = await Book.find(query).count();
  const books = await Book.find(query)
    .populate("category")
    .sort({ createdAt: sort })
    .limit(per)
    .skip(per * (page - 1));
  res.json({
    totalCount,
    pages: Math.ceil(totalCount / per),
    books
  });
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Book.findById(id).populate("category");
    const chapters = await BookChapter.count({ book: model.id });
    res.json({ ...model.toJSON(), chapters });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
