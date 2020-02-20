const router = require('express').Router();
const { ProductCategory } = require('../../../models/index');

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
  if (req.query.name) {
    var name = req.query.name; //获取查询条件
		query.name = new RegExp(name,"i"); // 查询条件 正则
  }
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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await ProductCategory.findById(id);
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const category = new ProductCategory(req.body);
    const categorySave = await category.save();
    res.json(categorySave);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateResult = await ProductCategory.findByIdAndUpdate(id, req.body);
    res.json(updateResult);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delResult = await ProductCategory.findByIdAndDelete(id);
    res.json(delResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
