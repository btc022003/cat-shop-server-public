const router = require("express").Router();
const { Order, OrderDetail } = require("../../models");
const { getLoginUserFromJWT } = require("../../utils/tools");

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
  const userId = getLoginUserFromJWT(req);
  query.user = userId;
  const totalCount = await Order.find(query).count();
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .limit(per)
    .skip(per * (page - 1));
  res.json({
    totalCount,
    pages: Math.ceil(totalCount / per),
    orders
  });
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    const orderDetail = await OrderDetail.find({ order: order.id }).populate(
      "product"
    );
    res.json({
      order,
      details: orderDetail
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const orderDetails = req.body.orderDetails;
    let sumPrice = 0;
    const userId = getLoginUserFromJWT(req);
    orderDetails.forEach(od => {
      sumPrice += od.price * od.quantity;
    });
    const order = new Order({
      no: "OD" + Date.now(),
      receiver: req.body.receiver,
      regions: req.body.regions,
      address: req.body.address,
      mobile: req.body.mobile,
      user: userId,
      price: sumPrice
    });
    await order.save();
    orderDetails.forEach(async od => {
      // sumPrice = od.price * od.quantity
      const odetail = new OrderDetail({
        order: order.id,
        quantity: od.quantity,
        product: od.product,
        price: od.price
      });
      await odetail.save();
    });
    res.json({
      code: "success",
      message: "订单保存成功",
      info: {
        order
      }
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const delResult = await Order.findByIdAndDelete(id);
    res.json(delResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
