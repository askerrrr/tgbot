var crypto = require("crypto");
var { env } = require("../../../env");
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

    var userId = ctx.chat.id + "";
    var userName = ctx.chat.user_name ?? "";
    var firstName = ctx.chat.first_name ?? "";
    var orderTime = getDateAndTime().fullDateTime();
    var randomKey = crypto.randomInt(10, 100000000000) + "0";
    var { telegramApiFileUrl, fileId } = imageData;
    var path = env.getFilePath(userId, randomKey, ".jpg");

    var order = {
      id: randomKey,
      userId,
      firstName,
      userName,
      phone,
      date: orderTime,
      type: "single",
      orderStatus: { id: 0, value: "not-accepted-for-processing" },
      file: {
        path,
        telegramApiFileUrl,
      },
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
