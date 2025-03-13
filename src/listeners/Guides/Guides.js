var { guideFor1688 } = require("./1688");
var { guideForTaobao } = require("./Taobao");
var { guideForPoizon } = require("./Poizon");
var { guideForPinduoduo } = require("./Pinduoduo");

var guides = async (bot) => {
  guideFor1688(bot);
  guideForTaobao(bot);
  guideForPoizon(bot);
  guideForPinduoduo(bot);
};

module.exports = { guides };
