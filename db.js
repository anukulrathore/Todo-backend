const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const uri = process.env.MONGODB_URI
mongoose.connect(uri)

const toDoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean,
})

const toDo = mongoose.model('todos',toDoSchema);

module.exports = {
    toDo
}