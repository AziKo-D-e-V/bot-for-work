const codeSchema = require("../../models/code.model");

const createCode = async (req, res) => {
  try {
    const { code, product } = req.body;
    console.log(req.body);

    const newCode = await codeSchema.create({ code, product_name:product });
    res.status(201);
    res.redirect("/admin");
} catch (error) {
    console.log(error.message);
    res.redirect("/admin");
  }
};



module.exports = { createCode };
