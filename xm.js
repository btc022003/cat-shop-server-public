const axios = require("axios").default;
const mongoose = require("mongoose");
const { Product, ProductCategory } = require("./models/index");
const product = require("./models/product");

async function loadData() {
  const categories = [
    {
      name: "手机",
      tag: "xiaomi",
      coverImg:
        "https://img.youpin.mi-img.com/800_pic/f305d25148f48c199534e95b1ee36b91.png@base@tag=imgScale&F=webp",
      query: {
        url: "https://www.xiaomiyoupin.com/mtop/market/search/v2/queryIdSearch",
        params: [
          {},
          {
            baseParam: { imei: "", clientVersion: "", ypClient: 3 },
            queryId: "4940443f695c12a06d9b9de0e1827e2a",
            sortBy: 0,
            pageIdx: 0,
            source: "searchPage",
            filter: null,
            requestId: "8461388088121984",
            clientPageId: "9464176618452977",
            queryString: "手机"
          }
        ]
      }
    },
    {
      name: "智能手表",
      tag: "xiaomi",
      coverImg:
        "https://img.youpin.mi-img.com/shopmain/73d070a95c0c42826ac475f61870e11d.png@base@tag=imgScale&F=webp&h=800&w=800?w=800&h=800",
      query: {
        url: "https://www.xiaomiyoupin.com/mtop/market/search/v2/queryIdSearch",
        params: [
          {},
          {
            baseParam: { imei: "", clientVersion: "", ypClient: 3 },
            queryId: "64ffcf980f87f53b0e4214d869bf325e",
            sortBy: 0,
            pageIdx: 0,
            source: "searchPage",
            filter: null,
            requestId: "17723762946870592",
            clientPageId: "5862388579547952",
            queryString: "智能手表"
          }
        ]
      }
    },
    {
      name: "耳机",
      tag: "xiaomi",
      coverImg:
        "https://img.youpin.mi-img.com/800_pic/27a789a428038214a8dda98f97d5fe4c.png@base@tag=imgScale&F=webp",
      query: {
        url: "https://www.xiaomiyoupin.com/mtop/market/search/v2/queryIdSearch",
        params: [
          {},
          {
            baseParam: { imei: "", clientVersion: "", ypClient: 3 },
            queryId: "77c6698377265381bfbdd04460f96ab0",
            sortBy: 0,
            pageIdx: 0,
            source: "searchPage",
            filter: null,
            requestId: "8965449498975169",
            clientPageId: "4058766326778982",
            queryString: "耳机"
          }
        ]
      }
    },
    {
      name: "电视",
      tag: "xiaomi",
      coverImg:
        "https://img.youpin.mi-img.com/shopmain/12c3c0e719081df8d8bcfa6f057d5fa4.png@base@tag=imgScale&F=webp&h=800&w=800?w=800&h=800",
      query: {
        url: "https://www.xiaomiyoupin.com/mtop/market/search/v2/queryIdSearch",
        params: [
          {},
          {
            baseParam: { imei: "", clientVersion: "", ypClient: 3 },
            queryId: "9559d059262af3b4b6e7daaebbd9a5e1",
            sortBy: 0,
            pageIdx: 0,
            source: "searchPage",
            filter: null,
            requestId: "2148423807513229",
            clientPageId: "5251821428303087",
            queryString: "电视机"
          }
        ]
      }
    },
    {
      name: "灯具",
      tag: "xiaomi",
      coverImg:
        "https://img.youpin.mi-img.com/shopmain/7b2fc77802db73d40214ea32725df488.png@base@tag=imgScale&F=webp&h=800&w=800?w=800&h=800",
      query: {
        url: "https://www.xiaomiyoupin.com/mtop/market/search/v2/queryIdSearch",
        params: [
          {},
          {
            baseParam: { imei: "", clientVersion: "", ypClient: 3 },
            queryId: "afd7f02065e9fa5bed73edff8c2d7eae",
            sortBy: 0,
            pageIdx: 0,
            source: "searchPage",
            filter: null,
            requestId: "11532472785051207",
            clientPageId: "5372479659816001",
            queryString: "灯具"
          }
        ]
      }
    },
    {
      name: "口红",
      tag: "xiaomi",
      coverImg:
        "https://img.youpin.mi-img.com/shopmain/2613c3c105ac21b4d2044538045def1a.png@base@tag=imgScale&F=webp&h=800&w=800?w=800&h=800",
      query: {
        url: "https://www.xiaomiyoupin.com/mtop/market/search/v2/queryIdSearch",
        params: [
          {},
          {
            baseParam: { imei: "", clientVersion: "", ypClient: 3 },
            queryId: "45784ae82f07bba59e168d84f9c6e155",
            sortBy: 0,
            pageIdx: 0,
            source: "searchPage",
            filter: null,
            requestId: "9841103155816271",
            clientPageId: "08376212618139056",
            queryString: "口红"
          }
        ]
      }
    }
  ];
  await ProductCategory.deleteMany({ tag: "xiaomi" }); // 删除小米已有的数据
  await Product.deleteMany({}); // 删除商品
  const savedCategories = await ProductCategory.insertMany(categories);
  const allGoods = [];
  for (var i = 0; i < savedCategories.length; i++) {
    // 分类的原始数据
    const c = categories.find((item) => item.name == savedCategories[i].name);
    const goods = await axios.post(c.query.url, c.query.params); // 发起请求获取数据

    const detailAll = [];
    goods.data.data.data.goods.forEach(async (item) => {
      detailAll.push(
        axios.post("https://www.xiaomiyoupin.com/api/gateway/detail", {
          groupName: "details",
          groupParams: [[item.data.goodsInfo.gid]]
        })
      );
    });
    const detailData = await Promise.all(detailAll);
    // console.log(detailData);
    // return;
    //  每一个商品
    // console.log(goods.data);
    goods.data.data.data.goods.forEach((item, index) => {
      const p = {};
      let strContent = "";
      // console.log(detailData[index].data.data.goods.goodsInfo.introExt);
      // console.log(goods.data.data.data.goods[index].data.goodsInfo.gid);
      if (detailData[index].data.data.goods.goodsInfo.introExt) {
        detailData[
          index
        ].data.data.goods.goodsInfo.introExt[0].imagesArray.forEach((pimg) => {
          strContent += `<p><img src="${pimg}"/></p>`;
        });
      }

      console.log("获取详情" + strContent);
      p.name = item.data.goodsInfo.name;
      p.content = strContent;
      p.productCategory = savedCategories[i].id;
      p.descriptions = item.data.goodsInfo.name.summary;
      p.price = item.data.goodsInfo.priceMin;
      p.coverImg = item.data.goodsInfo.imgSquare;
      allGoods.push(p);
    });
  }
  // console.log(allGoods);
  await Product.insertMany(allGoods);
  console.log("插入数据成功");
}

mongoose
  .connect("mongodb://localhost:27017/cat-shop", {
    useNewUrlParser: true
  })
  .then((res) => {
    console.log("数据库连接成功");
    loadData();
  })
  .catch((err) => {
    console.log(err);
  });
