const express = require("express"),
  routesConfig = require("./config/routes"),
  mongoseeConfig = require("./config/mongoose"),
  bodyParser = require("body-parser")

const app = express()
const port = process.env.PORT || 3000

corsConfig = require("./config/cors")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

corsConfig(app)
routesConfig(app)
mongoseeConfig.connect()

app.get("/", function(req, res) {
  res.send("Started (task) service!!!")
})

app.listen(port, () => {
  console.log("El servicio (task) está inicializado en el puerto " + port)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send("404 Not Found")
})

module.exports = app
