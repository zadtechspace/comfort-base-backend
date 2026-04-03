const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    token:{type:String,
    required: true}

})

const blacklistTokenModel = mongoose.model("blacklistedtokens" ,tokenSchema)

module.exports = blacklistTokenModel