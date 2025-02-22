module.exports.descCheck = (desc) =>
  desc?.size
    ? `Размер: ${desc.size}\nКоличество: ${desc.qty}`
    : `Количество: ${desc.qty}`;
