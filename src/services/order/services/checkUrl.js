var origin = [
  "https://item.taobao.com",
  "https://item.taobao.com",
  "http://e.tb.cn",
  "http://detail.m.1688.com",
];

var protocol = ["http:", "https:"];

module.exports.checkUrl = async (url) => {
  try {
    var result = new URL(url);

    return origin.includes(result.origin) && protocol.includes(result.protocol)
      ? result.href
      : null;
  } catch (err) {
    if (err.message === "Invalid URL") {
      url = url
        .split(" ")
        .find((url) => url.startsWith("http:") || url.startsWith("https:"));

      if (!url) return;

      try {
        var result = new URL(url);

        return origin.includes(result.origin) &&
          protocol.includes(result.protocol)
          ? result.href
          : null;
      } catch {
        return;
      }
    }
    return;
  }
};
