const { InlineKeyboard, Keyboard } = require("grammy");
const { Router } = require("@grammyjs/router");
const router = new Router((ctx) => ctx.session.step);
const { contactBtn, telBtn, keyboardUz, keyboardEng, keybord } = require("../helpers/contact");
const userSchema = require("../models/User");
const bot = require("./commands");

const zero = router.route("zero");
zero.on(":text", async (ctx) => {
  const id = ctx.from.id;
  const findUser = await userSchema.find({ user_id: id });
  const language = findUser[0]?.language ?? null;

  ctx.session.language = language;

  const lang = ctx.session.language;

  if (findUser.length < 1) {
    if (!lang) {
      

      await ctx.reply(ctx.t("lang"), {
        reply_markup: keybord,
      });
      ctx.session.step = "first";
    }
  } else {
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
    ctx.session.step = "menu";
  }
});

const first = router.route("first");
first.on(":text", async (ctx) => {
  const text = ctx.message.text;

  if (text === "🇺🇿 Uzbek 🇺🇿") {
    ctx.session.language = null;
    ctx.session.language = "uz";
  } else {
    ctx.session.language = null;
    ctx.session.language = "en";
  }
  const lang = ctx.session.language;
  const name = ctx.from.first_name;
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    await ctx.reply(ctx.t("fullname"), {
      reply_markup: { remove_keyboard: true },
    });
    ctx.session.step = "second";
  } else {
    await ctx.reply(ctx.t("fullname"), {
      reply_markup: { remove_keyboard: true },
    });
    ctx.session.step = "second";
  }
});

const second = router.route("second");
second.on(":text", async (ctx) => {
  const lang = ctx.session.language;

  ctx.session.fullName = ctx.message.text;

  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    await ctx.reply(ctx.t("phone"), {
      reply_markup: {
        ...telBtn,
        resize_keyboard: true,
      },
    });
  } else {
    await ctx.reply(ctx.t("phone"), {
      reply_markup: {
        ...contactBtn,
        resize_keyboard: true,
      },
    });
  }
  ctx.session.step = "third";
});

const third = router.route("third");
third.on(":contact", async (ctx) => {
  ctx.session.phoneNumber = ctx.message.contact.phone_number;
  const id = ctx.from.id;
  const { fullName, phoneNumber } = ctx.session;
  const lang = ctx.session.language;
  const username = ctx.from.username;
  const newUser = await userSchema.create({
    user_id: id,
    full_name: fullName,
    username,
    phone_number: phoneNumber,
    language: lang,
  });

  
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    ctx.reply(ctx.t("success"), {
      reply_markup: { remove_keyboard: true },
    });
    ctx.reply(ctx.t("menu"), {
      reply_markup: keyboardUz,
    });
  } else {
    ctx.reply(ctx.t("success"), {
      reply_markup: { remove_keyboard: true },
    });
    ctx.reply(ctx.t("menu"), {
      reply_markup: keyboardEng,
    });
  }
  ctx.session.step = "menu";
});

const settingUpd = router.route("settingUpd");
settingUpd.on(":text", async (ctx) => {
  const lang = ctx.session.language;
  const text = ctx.message.text;
  if (text === "Yes" || text === "Ha") {
    if (lang === "uz") {
      await ctx.i18n.useLocale("uz");
      await ctx.reply(ctx.t("fullname"), {
        reply_markup: { remove_keyboard: true },
      });
      ctx.session.step = "update";
    } else {
      await ctx.reply(ctx.t("fullname"), {
        reply_markup: { remove_keyboard: true },
      });
      ctx.session.step = "update";
    }
  } else {
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
    ctx.session.step = "menu";
  }

});

const update = router.route("update");
update.on(":text", async (ctx) => {
  const user_id = ctx.session.user_id;
  const lang = ctx.session.language;
  await userSchema.findByIdAndUpdate(user_id, {
    full_name: ctx.message.text,
  });
  if (lang === "uz") {
    await ctx.i18n.useLocale("uz");
    ctx.reply(ctx.t("upd"));
    ctx.reply(ctx.t("menu"), {
      reply_markup: keyboardUz,
    });
    ctx.session.step = "menu";

  } else {
    ctx.reply(ctx.t("upd"));
    ctx.reply(ctx.t("menu"), {
      reply_markup: keyboardEng,
    });
    ctx.session.step = "menu";
  }
});

module.exports = router;
