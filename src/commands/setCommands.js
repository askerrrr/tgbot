module.exports.setCommands = async (bot) => {
  bot.api.setMyCommands([
    {
      command: "menu",
      description: "Меню",
    },
  ]);
};
