var crypto = require("crypto");
var env = require("../../../../env");
var { getFile } = require("./conversation/getFile");
var { getPhone } = require("./conversation/getPhone");
var { getDateAndTime } = require("../services/dateAndTime");
var { textForFailedAttempt } = require("../../../utils/text");
var { checkOrderStatus } = require("../services/checkOrderStatus");
var { returnOrderToUser } = require("./conversation/returnOrderToUser");

var multiple = async (conversation, ctx) => {
  try {
    var fileData,
      failedFileAttempts = 0;

    while (!fileData) {
      fileData = await getFile(ctx, conversation);

      if (!fileData) {
        failedFileAttempts++;

        if (failedFileAttempts > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    var phone,
      failedPhoneAttempts = 0;

    while (!phone) {
      phone = await getPhone(ctx, conversation);

      if (!phone) {
        failedPhoneAttempts++;

        if (failedPhoneAttempts > 4) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    var type = "multiple";

    var userId = ctx.chat.id + "";

    var file = { path, telegramApiFileUrl };

    var userName = ctx.chat.user_name ?? "";

    var firstName = ctx.chat.first_name ?? "";

    var date = getDateAndTime().fullDateTime();

    var { telegramApiFileUrl, fileId } = fileData;

    var path = env.getFilePath(userId, id, ".xlsx");

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
    };

    await returnOrderToUser(ctx, phone, fileId);
    await checkOrderStatus(ctx, conversation, order, fileId, multiple);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { multiple };
