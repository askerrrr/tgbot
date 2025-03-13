var { link1688 } = require("./1688");
var { linkTaobao } = require("./Taobao");
var { linkPoizon } = require("./Poizon");
var { linkPinduoduo } = require("./Pinduoduo");

var downloadApp = async (bot) => {
  link1688(bot);
  linkTaobao(bot);
  linkPoizon(bot);
  linkPinduoduo(bot);
};

module.exports = { downloadApp };
