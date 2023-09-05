const { Keyboard, InlineKeyboard } = require("grammy");

const contactBtn = new Keyboard().requestContact("📞Send phone number📲");
const telBtn = new Keyboard().requestContact("📞Telefon raqamni jo'natish📲");
const keyboardEng = new InlineKeyboard()
  .text(" Send code ", "code")
  .row()
  .text(" Settings ", "settings")
  .row()
  .text("About ", "about")
  .row();
const ok = new InlineKeyboard().text("OK😉",'ok');
const keyboardUz = new InlineKeyboard()
  .text(" Kod jo'natish ", "code")
  .row()
  .text(" Sozlamalar ", "settings")
  .row()
  .text(" Bot haqida ", "about")
  .row();

const keybord = new Keyboard()
  .text("🇺🇿 Uzbek 🇺🇿")
  .row()
  .text("🇺🇸 English 🇺🇸")
  .resized();

const yesNokeyboard = new Keyboard().text("Yes").text("No").resized();
const yesNokeyboarduz = new Keyboard().text("Ha").text("Yo'q").resized();

module.exports = {
  contactBtn,
  telBtn,
  keyboardEng,
  keyboardUz,
  keybord,
  ok,
  yesNokeyboard,
  yesNokeyboarduz,
};
