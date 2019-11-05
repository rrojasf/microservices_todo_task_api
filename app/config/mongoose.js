// Set up mongoose connection
const mongoose = require("mongoose")

exports.connect = () => {
  const uri =
    "mongodb://taskManager:2Komcb3xCc2A2U4n@" +
    "testmongo0-shard-00-00-zvbus.mongodb.net:27017," +
    "testmongo0-shard-00-01-zvbus.mongodb.net:27017," +
    "testmongo0-shard-00-02-zvbus.mongodb.net:27017/taskManager?" +
    "ssl=true&replicaSet=testMongo0-shard-0&authSource=admin"
  const mongoDB = process.env.MONGO_DB || uri
  const debug = process.env.MONGO_DEBUG || true

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  mongoose.Promise = global.Promise
  mongoose.set("debug", debug)

  const db = mongoose.connection

  db.on("error", console.error.bind(console, "MongoDB connection error:"))

  db.once("open", () => {
    console.log("Successfully connection to the db")
  })
}
