const apiRouter = require("../routes/apiRoutes")

module.exports = app => {
  app.use("/api", apiRouter)
}
