const router = require('express').Router();
const { Order } = require('../../../models');

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
  if (req.query.no) {
    var no = req.query.no; //获取查询条件
		query.no = new RegExp(no,"i"); // 查询条件 正则
  }
  if (req.query.user) {
    query.user = req.query.user
  }
  const totalCount = await Order.find(query).count();
  const orders = await Order.find(query).populate('user').sort({ createdAt: -1 })
    .limit(per)
    .skip(per * (page - 1));
  res.json({
    totalCount,
    pages: Math.ceil(totalCount/per),
    orders
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderInfo = await Order.findById(id);
    res.json(orderInfo);
  } catch (err) {
    next(err);
  }
});

// 修改订单信息
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateResult = await Order.findByIdAndUpdate(id, {
      isPayed: req.body.isPayed
    });
    res.json(updateResult);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delResult = await Order.findByIdAndDelete(id);
    res.json(delResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
