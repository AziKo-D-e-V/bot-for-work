const { Router } = require("@grammyjs/router");
const router = new Router((ctx) => ctx.session.step);
const {
  yesNokeyboard,
  yesNokeyboarduz,
  ok,
} = require("../helpers/contact");
const userSchema = require("../models/User");
const { InlineKeyboard, Keyboard } = require("grammy");
const bot = require("./commands");

const menu = router.route("menu");
menu.callbackQuery("settings", async (ctx) => {
  const lang = ctx.session.language;

  const user_id = ctx.callbackQuery.from.id;
  const user = await userSchema.find({ user_id });
  ctx.session.user_id = user[0]._id;
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    ctx.reply(
      `Ism-familya: ${user[0].full_name}\nTelefon raqami: ${user[0].phone_number}`
    );
    ctx.reply(ctx.t("setcheck"), {
      reply_markup: yesNokeyboarduz,
    });
    const text = ctx.reply_markup;
    ctx.session.step = "settingUpd";
  } else {
    ctx.reply(
      `Full Name: ${user[0].full_name}\nPhone Number: ${user[0].phone_number}`
    );
    ctx.reply(ctx.t("setcheck"), {
      reply_markup: yesNokeyboard,
    });
    ctx.session.step = "settingUpd";
  }
});

menu.callbackQuery("code", async (ctx) => {
  const lang = ctx.session.language;
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    ctx.reply(ctx.t("prize-about"));
    ctx.session.step = "code";
  } else {
    ctx.reply(ctx.t("prize-about"));
    ctx.session.step = "code";
  }
});

const code = router.route("code");
code.on(":text", async (ctx) => {
  try {
    const text = ctx.message.text;
    const lang = ctx.session.language;
    if (lang === "uz") {
      await ctx.i18n.useLocale("uz");
      ctx.reply(ctx.t("answercode"), {
        reply_markup: ok,
      });

      ctx.session.step = "menu";
    } else {
      ctx.reply(ctx.t("answercode"), {
        reply_markup: ok,
      });

      ctx.session.step = "menu";
    }
  } catch (error) {
    ctx.reply("404");
  }
});

code.callbackQuery('ok', async (ctx) => {
  console.log(ctx);
  const lang = ctx.session.language;
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    await ctx.answerCallbackQuery({ text: ctx.t("ok") });
  } else {
    await ctx.answerCallbackQuery({ text: ctx.t("ok") });
  }
});

menu.callbackQuery("about", async (ctx) => {
  ctx.reply(
    "Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot"
  );
});

module.exports = router;
