const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    token:{type:String,
    required: true}

})

const blacklistTokenModel = mongoose.model("blacklistedtoken" ,tokenSchema)

module.exports = blacklistTokenModel