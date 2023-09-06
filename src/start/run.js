const config = require("../../config");
const {connect}= require("mongoose")

const bootstrap = async (app,bot) =>{
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
}


module.exports = bootstrap;