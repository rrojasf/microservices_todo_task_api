const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  description: {
    type: String,
    required: "Kindly enter the name of the task"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "to-do"
  },
  user_id: {
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model("Task", TaskSchema)
