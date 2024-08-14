import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";


const bot = new Telegraf(BOT_TOKEN);
const web_link = `https://motional-web-design.vercel.app/`;

bot.start((ctx) =>
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "web_app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
