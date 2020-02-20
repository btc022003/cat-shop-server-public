const router = require('express').Router();
const { Product } = require('../../models');

router.get('/', async (req, res, next) => {
  const per = req.query.per * 1 || 10; // 每一页的数量
  const page = req.query.page * 1 || 1; // 页数
  if (page <= 0) {
    page = 1;
  }
  if (per <= 0) {
    per = 10;
  }
  let query = {};
  if (req.query.name) {
    var name = req.query.name; //获取查询条件
    query.name = new RegExp(name, 'i'); // 查询条件 正则
  }
  if (req.query.product_category) {
    query.productCategory = req.query.product_category;
  }
  const totalCount = await Product.find(query).count();
  const products = await Product.find(query)
    .populate('productCategory')
    .sort({ createdAt: -1 })
    .limit(per)
    .skip(per * (page - 1));
  res.json({
    totalCount,
    pages: Math.ceil(totalCount / per),
    products,
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
