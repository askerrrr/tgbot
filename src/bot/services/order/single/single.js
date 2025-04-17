var crypto = require("crypto");
var env = require("../../../../env");
var { getUrl } = require("./conversation/getUrl");
var { getImage } = require("./conversation/getImage");
var { getPhone } = require("./conversation/getPhone");
var { getDateAndTime } = require("../services/dateAndTime");
var { textForFailedAttempt } = require("../../../utils/text");
var { getDescriprion } = require("./conversation/getDescription");
var { checkOrderStatus } = require("../services/checkOrderStatus");
var { returnOrderToUser } = require("./conversation/returnOrderToUser");

var single = async (conversation, ctx) => {
  try {
    var itemUrl,
      countForItemUrl = 0;

    while (!itemUrl) {
      itemUrl = await getUrl(ctx, conversation);

      if (!itemUrl) {
        countForItemUrl++;

        if (countForItemUrl > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    var imageData,
      countForImageData = 0;

    while (!imageData) {
      imageData = await getImage(ctx, conversation);

      if (!imageData) {
        countForImageData++;

        if (countForImageData > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    var description,
      countForDescription = 0;

    while (!description) {
      description = await getDescriprion(ctx, conversation);

      if (!description) {
        countForDescription++;

        if (countForDescription > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    var phone,
      countForPhone = 0;

    while (!phone) {
      phone = await getPhone(ctx, conversation);

      if (!phone) {
        countForPhone++;

        if (countForPhone > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    var type = "single";

    var userId = ctx.chat.id + "";

    var userName = ctx.chat.user_name ?? "";

    var file = { path, telegramApiFileUrl };

    var firstName = ctx.chat.first_name ?? "";

    var date = getDateAndTime().fullDateTime();

    var { telegramApiFileUrl, fileId } = imageData;

    var path = env.getFilePath(userId, id, ".jpg");

    var id = crypto.randomInt(10, 100000000000) + "0";

    var orderStatus = { id: 0, value: "not-accepted-for-processing" };

    var order = {
      id,
      userId,
      firstName,
      userName,
      phone,
      date,
      type,
      orderStatus,
      file,
      itemUrl,
      description,
    };

    await returnOrderToUser(ctx, itemUrl, phone, fileId, description);
    await checkOrderStatus(ctx, conversation, order, fileId, single);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { single };
