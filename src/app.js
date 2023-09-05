const express = require("express");
const config = require("../config");
const commandsModule = require("./modules/commands");
const { Bot, session, Keyboard } = require("grammy");
const RegisterRouter = require("./modules/register.module");
const PrizeRouter = require("./modules/prize.module");
const { connect } = require("mongoose");
const { I18n } = require("@grammyjs/i18n");
const bot = new Bot(config.TOKEN);
const router = require("./api/routes");
const cookie = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use(express.static(process.cwd() + "/src/api/public"));

app.set("view engine", "ejs");
app.set("views", "src/api/views");

app.use(router);

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

const bootsrapt = () => {
  try {
    const connetParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    connect(config.DB_URL, connetParams);
    console.log("Database connection");
    bot.start(console.log("bot started"));

    app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
bootsrapt();
