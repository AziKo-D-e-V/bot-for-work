const { Router } = require("@grammyjs/router");
const router = new Router((ctx) => ctx.session.step);
const {
  yesNokeyboard,
  yesNokeyboarduz,
  keyboardUz,
  keyboardEng,
} = require("../helpers/contact");
const userSchema = require("../models/User");
const codeSchema = require("../models/code.model");
const { InlineKeyboard, Keyboard } = require("grammy");
const bot = require("./commands");

const Menu = router.route("menu");

Menu.on(":text", async (ctx) => {
  const lang = ctx.session.language;
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    ctx.reply(ctx.t("menu"), {
      reply_markup: keyboardUz,
    });
  } else {
    ctx.reply(ctx.t("menu"), {
      reply_markup: keyboardEng,
    });
  }
});

Menu.callbackQuery("settings", async (ctx) => {
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

Menu.callbackQuery("code", async (ctx) => {
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
    const lang = ctx.session.language;
    const text = ctx.message.text;

    const checkCode = await codeSchema.find({ code: text });
    if (checkCode.length < 1) {
      if (lang === "uz") {
        await ctx.i18n.useLocale("uz");
        ctx.reply(ctx.t("notfound"));
        ctx.session.step = "menu";
      } else {
        ctx.reply(ctx.t("notfound"));
        ctx.session.step = "menu";
      }
    } else if (checkCode[0].product_name === "") {
      if (lang === "uz") {
        await ctx.i18n.useLocale("uz");
        ctx.reply(ctx.t("answercode"));
        ctx.session.step = "menu";
      } else {
        ctx.reply(ctx.t("answercode"));
        ctx.session.step = "menu";
      }
    } else {
      if (lang === "uz") {
        await ctx.i18n.useLocale("uz");
        ctx.reply(ctx.t("answercodeprize"));
        ctx.session.step = "menu";
      } else {
        ctx.reply(ctx.t("answercodeprize"));
        ctx.session.step = "menu";
      }
    }
  } catch (error) {
    ctx.reply("404");
  }
});

code.callbackQuery("ok", async (ctx) => {
  console.log(ctx);
  const lang = ctx.session.language;
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    await ctx.answerCallbackQuery({ text: ctx.t("ok") });
  } else {
    await ctx.answerCallbackQuery({ text: ctx.t("ok") });
  }
});

Menu.callbackQuery("about", async (ctx) => {
  ctx.reply(
    "Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot Bot"
  );
});

module.exports = router;
