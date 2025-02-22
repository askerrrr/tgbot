var crypto = require("crypto");
var { getFile } = require("./conversation/getFile");
var { getPhone } = require("./conversation/getPhone");
var { textForFailedAttempt } = require("../../../utils/text");
var { getDateAndTime } = require("../services/dateAndTime");
var { checkOrderStatus } = require("../services/checkOrderStatus");
var { returnOrderToUser } = require("./conversation/returnOrderToUser");

async function multiple(conversation, ctx) {
  try {
    let fileData, phone;

    let failedAttempt = 0;

    while (!fileData) {
      fileData = await getFile(ctx, conversation);

      if (!fileData) {
        failedAttempt++;

        if (failedAttempt > 2) {
          await ctx.reply(textForFailedAttempt);
          failedAttempt = 0;
          return;
        }
      }
    }

    while (!phone) {
      phone = await getPhone(ctx, conversation);

      if (!phone) {
        failedAttempt++;

        if (failedAttempt > 4) {
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
    var [telegramApiFileUrl, fileId] = fileData.split("::");

    var order = {
      id: randomKey,
      userId,
      firstName,
      userName,
      phone,
      date: orderTime,
      orderStatus: "not-accepted-for-processing:0",
      file: {
        path: `/var/www/userFiles/${userId}/docs/${randomKey}.xlsx`,
        telegramApiFileUrl,
      },
    };

    await returnOrderToUser(ctx, phone, fileId);
    await checkOrderStatus(ctx, conversation, order, fileId, multiple);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { multiple };
//экспорт в src\middleware\middleware.js
