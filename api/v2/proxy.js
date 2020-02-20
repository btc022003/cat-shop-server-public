const router = require("express").Router();
const axios = require("axios").default;
const https = require("https");
const qs = require("qs");

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

router.post("/", async (req, res) => {
  const method = req.body.method || "GET";
  let result = {};
  try {
    if (method == "GET") {
      result = await instance.get(req.body.url);
    } else if (method == "POST") {
      let headers = {};
      if (req.body.headers) {
        headers = req.body.headers;
      }
      let data = req.body.data;
      if (
        headers["content-type"] &&
        headers["content-type"].indexOf("urlencoded") > -1
      ) {
        data = qs.stringify(data);
      }
      result = await instance.post(req.body.url, data, {
        headers
      });
    } else {
      result.data = "暂无数据";
    }
  } catch (err) {
    result = err.response;
  }
  res.send(result.data);
});

module.exports = router;
