import TeleBot from 'telebot';
import BotButtons from './src/bot/buttons';
import { GetInfo } from './src/netServce';

const bot = new TeleBot({
  token: 'Enter-Your-TelegramBot-Token',
  usePlugins: ['floodProtection', 'namedButtons'],
  pluginConfig: {
    floodProtection: {
      interval: 2,
      message: 'Too many requests, relax 💢',
    },
    namedButtons: {
      buttons: BotButtons,
    },
  },
});

const replyMarkup = bot.keyboard([[BotButtons.getFullInfo.label, BotButtons.getProfitCalc.label]], {
  resize: true,
});

bot.on(['/start', '/help'], msg =>
  bot.sendMessage(msg.chat.id, '🎛️ Use commands: /fullInfo, /profit???', { replyMarkup }));

bot.on('/fullInfo', async (msg) => {
  const dataInfo = await GetInfo();
  await bot.sendMessage(
    msg.from.id,
    `Last Seen: ${new Date(dataInfo.lastSeen * 1000)} ⏰

Hash: ${(dataInfo.reportedHashrate / 1000000).toFixed(1)} 🌚
Invalid Shares: ${dataInfo.invalidShares} ♿
Unpaid: ${(dataInfo.unpaid / 1000000000000000000).toFixed(6)} 🔰
Coins Min: ${dataInfo.coinsPerMin.toFixed(7)} ⚫
Coins Hour: ${(dataInfo.coinsPerMin * 60).toFixed(7)} 🔴
Coins Day: ${(dataInfo.coinsPerMin * 60 * 24).toFixed(7)} 🔵

USD Min: ${dataInfo.usdPerMin.toFixed(3)} 🔶
USD Hour: ${(dataInfo.usdPerMin * 60).toFixed(3)} 🔷
USD Day: ${(dataInfo.usdPerMin * 60 * 24).toFixed(3)} 💠
    `,
    { replyMarkup },
  );
});

bot.on('/profit???', async (msg) => {
  const dataInfo = await GetInfo();
  await bot.sendMessage(
    msg.from.id,
    `Coins Min: ${dataInfo.coinsPerMin.toFixed(7)} ⚫
Coins Hour: ${(dataInfo.coinsPerMin * 60).toFixed(7)} 🔴
Coins Day: ${(dataInfo.coinsPerMin * 60 * 24).toFixed(7)} 🔵

USD Min: ${dataInfo.usdPerMin.toFixed(3)} 🔶
USD Hour: ${(dataInfo.usdPerMin * 60).toFixed(3)} 🔷
USD Day: ${(dataInfo.usdPerMin * 60 * 24).toFixed(3)} 💠
    `,
    { replyMarkup },
  );
});

bot.start();
