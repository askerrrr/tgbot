var checkDescription = (desc) =>
  desc?.size
    ? `Размер: ${desc.size}\nКоличество: ${desc.qty}`
    : `Количество: ${desc.qty}`;

module.exports = { checkDescription };
