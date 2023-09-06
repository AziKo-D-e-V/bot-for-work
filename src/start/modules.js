const cors = require("cors");
const routes = require("../api/routes");
const commandsModule = require("./../modules/commands");
const RegisterRouter = require("./../modules/register.module");
const PrizeRouter = require("./../modules/prize.module");
const { I18n } = require("@grammyjs/i18n");
const cookie = require("cookie-parser");


const express = require("express");
const { session } = require("grammy");

const modules = (app, bot) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookie());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(process.cwd() + "/src/api/public"));

  app.set("view engine", "ejs");
  app.set("views", "src/api/views");

  app.use(routes);

  const i18n = new I18n({
    defaultLocale: "en", // see below for more information
    directory: "locales", // Load all translation files from locales/.
  });
  bot.use(i18n);
  bot.use(
    session({
      initial: () => ({
        step: "zero",
      }),
    })
  );
    
  bot.command("menu", async(ctx)=>{
    ctx.session.step = "menu";
  })
  
  bot.use(commandsModule);
  bot.use(RegisterRouter);
  bot.use(PrizeRouter);
};

module.exports = modules;

