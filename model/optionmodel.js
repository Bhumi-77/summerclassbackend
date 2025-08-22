const {default: mongoose} = require ("mongoose")

const optionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    }
})

const Option = mongoose.model("option", optionSchema);
module.exports = Option;