var setCommands = async (bot) => {
  bot.api.setMyCommands([
    {
      command: "menu",
      description: "Меню",
    },
  ]);
};

module.exports = { setCommands };
