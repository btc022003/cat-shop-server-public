const router = require("express").Router();
const { BookChapter } = require("../../models");
const { loadChapter } = require("../../utils/spider.js");

router.get("/", async (req, res, next) => {
  const per = req.query.per * 1 || 10; // 每一页的数量
  const page = req.query.page || 1; // 页数
  if (page <= 0) {
    page = 1;
  }
  if (per <= 0) {
    per = 10;
  }
  if (req.query.book) {
    let query = {};
    query.book = req.query.book;
    if (req.query.title) {
      query.title = new RegExp(req.query.title, "i");
    }
    const sort = req.query.sort || 1;
    // console.log(req.query.sort);
    // console.log(query);
    const totalCount = await BookChapter.find(query).count();
    const chapters = await BookChapter.find(query)
      .populate("book")
      .sort({ createdAt: sort })
      .limit(per)
      .skip(per * (page - 1));
    res.json({
      totalCount,
      pages: Math.ceil(totalCount / per),
      chapters
    });
  } else {
    res.json({
      code: "error",
      message: "缺少参数book"
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await BookChapter.findById(id).populate("book");
    if (model.content) {
      res.json(model);
    } else {
      loadChapter(model.url).then(content => {
        model.content = content;
        model.save().then(data => {
          res.json(model);
        });
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
