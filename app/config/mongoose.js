// Set up mongoose connection
const mongoose = require("mongoose")

exports.connect = () => {
  const mongoDB = process.env.MONGO_DB || "mongodb://mongo/taskManager"
  const debug = process.env.MONGO_DEBUG || true

  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

  mongoose.Promise = global.Promise
  mongoose.set("debug", debug)

  const db = mongoose.connection

  db.on("error", console.error.bind(console, "MongoDB connection error:"))

  db.once("open", () => {
    console.log("Successfully connection to the db")
  })
}
