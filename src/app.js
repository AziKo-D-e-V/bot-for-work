const config = require("../config");
const express = require("express");
const app = express();
const { Bot, session, Keyboard } = require("grammy");
const bot = new Bot(config.TOKEN);

require("./start/modules")(app, bot);
require("./start/run")(app, bot); ;