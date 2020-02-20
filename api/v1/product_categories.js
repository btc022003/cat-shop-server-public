const router = require('express').Router();
const { ProductCategory } = require('../../models');

router.get('/', async (req, res, next) => {
  const per = req.query.per * 1 || 10; // 每一页的数量
  const page = req.query.page || 1; // 页数
  if (page <= 0) {
    page = 1;
  }
  if (per <= 0) {
    per = 10;
  }
  let query = {};
  const totalCount = await ProductCategory.find(query).count();
  const categories = await ProductCategory.find(query).sort({ createdAt: -1 })
    .limit(per)
    .skip(per * (page - 1));
  res.json({
    totalCount,
    pages: Math.ceil(totalCount/per),
    categories
  });
});

module.exports = router;
