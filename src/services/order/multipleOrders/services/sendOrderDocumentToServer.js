const { env } = require("../../../../../env");
const { getDateAndTime } = require("../../../different/dateAndTime");
const { getFileUrl } = require("../../../different/getFileURL");
async function sendOrderDocumentToServer(ctx, chatId, file, userPhoneNumber) {
  try {
    const orderTime = getDateAndTime().fullTime();
    const fileURL = await getFileUrl(ctx, file);
    const data = {
      url: "",
      tgId: chatId,
      file: fileURL,
      phone: userPhoneNumber,
      description: "Документ",
      date: orderTime,
    };

    console.log(data);

    const response = await fetch(env.orderinfo, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.auth_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Server error : ${response.status} ${response.text}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Unexpected content type: ${contentType}\n${text}`);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sendOrderDocumentToServer };