const router = require('express').Router();
const { UserAddress} = require('../../models');
const { getLoginUserFromJWT } = require('../../utils/tools');

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
  const userId = getLoginUserFromJWT(req)
  query.user = userId
  const totalCount = await UserAddress.find(query).count();
  const addresses = await UserAddress.find(query).sort({ createdAt: -1 })
    .limit(per)
    .skip(per * (page - 1));
  res.json({
    totalCount,
    pages: Math.ceil(totalCount/per),
    addresses
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await UserAddress.findById(id);
    res.json(address);
  } catch (err) {
    next(err);
  }
})

router.post('/', async(req, res, next) => {
  try {
    const userId = getLoginUserFromJWT(req)
    const address = new UserAddress({
      user: userId,
      isDefault: req.body.isDefault,
      regions: req.body.regions,
      address: req.body.address,
      receiver: req.body.receiver,
      mobile: req.body.mobile
    })
    await address.save()
    res.json({
      code: 'success',
      message: '收货地址保存成功',
      info: address
    })
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateResult = await UserAddress.findByIdAndUpdate(id, req.body);
    res.json(updateResult);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delResult = await UserAddress.findByIdAndDelete(id);
    res.json(delResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
