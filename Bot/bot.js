import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const BOT_TOKEN = `6976872805:AAFdN0JZ5Ib0ZcsDG4UvEa39yhjUo40gZrA`;

const bot = new Telegraf(BOT_TOKEN);
const web_link = `https://telegram-web3-qrcode.vercel.app/`;

bot.start((ctx) =>
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "web_app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();