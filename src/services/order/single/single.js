var crypto = require("crypto");
var { getUrl } = require("./conversation/getUrl");
var { getImage } = require("./conversation/getImage");
var { getPhone } = require("./conversation/getPhone");
var { getDateAndTime } = require("../services/dateAndTime");
var { textForFailedAttempt } = require("../../../utils/text");
var { getDescriprion } = require("./conversation/getDescription");
var { checkOrderStatus } = require("../services/checkOrderStatus");
var { returnOrderToUser } = require("./conversation/returnOrderToUser");

async function single(conversation, ctx) {
  try {
    let itemUrl, imageData, description, phone;

    let countForPhone = 0;
    let countForItemUrl = 0;
    let countForImageData = 0;
    let countForDescription = 0;

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

    var userId = `${ctx.chat.id}`;
    var userName = ctx.chat.user_name || "";
    var firstName = ctx.chat.first_name || "";
    var orderTime = getDateAndTime().fullDateTime();
    var randomKey = crypto.randomInt(10, 100000000000) + "0";
    var [telegramApiFileUrl, imageId] = imageData.split("::");

    var order = {
      id: randomKey,
      userId,
      firstName,
      userName,
      phone,
      itemUrl,
      date: orderTime,
      description,
      orderStatus: "not-accepted-for-processing:0",
      type: "single",
      file: {
        path: `/var/www/userFiles/${userId}/images/${randomKey}.jpg`,
        telegramApiFileUrl,
      },
    };

    await returnOrderToUser(ctx, itemUrl, phone, imageId, description);
    await checkOrderStatus(ctx, conversation, order, imageId, single);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { single };
