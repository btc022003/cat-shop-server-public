const router = require('express').Router();
const { UserAddress } = require('../../../models');

router.get('/:user_id', async (req, res, next) => {
  try {
    const per = req.query.per * 1 || 10; // 每一页的数量
    const page = req.query.page || 1; // 页数
    if (page <= 0) {
      page = 1;
    }
    if (per <= 0) {
      per = 10;
    }
    let query = {};
    query.user = req.params.user_id
    if (req.query.user) {
      query.user = req.query.user
    }
    const totalCount = await UserAddress.find(query).count();
    const addresses = await UserAddress.find(query).populate('user').sort({ createdAt: -1 })
      .limit(per)
      .skip(per * (page - 1));
    res.json({
      totalCount,
      pages: Math.ceil(totalCount/per),
      addresses
    });
  } catch (err) {
    next(err)
  }
});

module.exports = router;
