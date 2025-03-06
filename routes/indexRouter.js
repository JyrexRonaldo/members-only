const { Router } = require("express");
const indexRouter = Router()


indexRouter.get("/" , (req,res) => {
    res.json("Hello memebers")
})

module.exports = indexRouter