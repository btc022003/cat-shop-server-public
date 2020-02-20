const cheerio = require("cheerio");
const axios = require("axios").default;
const mongoose = require("mongoose");
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
function fetchData(url) {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0",
    "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0",
    "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)"
  ];
  return new Promise((reslove, reject) => {
    setTimeout(function() {
      axios
        .get(url, {
          timeout: 500000,
          headers: {
            "user-agent":
              userAgents[Math.floor(Math.random() * userAgents.length)],
            "X-FORWARDED-FOR":
              Math.floor(Math.random() * 255) +
              "." +
              Math.floor(Math.random() * 255) +
              "." +
              Math.floor(Math.random() * 255) +
              "." +
              Math.floor(Math.random() * 255),
            "CLIENT-IP":
              Math.floor(Math.random() * 255) +
              "." +
              Math.floor(Math.random() * 255) +
              "." +
              Math.floor(Math.random() * 255) +
              "." +
              Math.floor(Math.random() * 255)
          }
        })
        .then(res => reslove(res))
        .catch(e => reject(e));
    }, 2);
  });
}

function loadChapter(url) {
  return fetchData(url).then(res => {
    const $ = cheerio.load(res.data.toString());
    $("#content p")
      .eq(-1)
      .remove();
    const content = $("#content").html();
    return entities.decode(content);
  });
}

module.exports = {
  loadChapter
};
