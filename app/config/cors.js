const cors = require("cors")

const whitelist = [
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:3001"
]

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(
        new Error(
          "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at " +
            origin
        )
      )
    }
  }
}

const setCorsHeaders = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Total-Count"
  )
  res.setHeader("Access-Control-Expose-Headers", "X-Total-Count")
  next()
}

module.exports = app => {
  const corsInstance = cors(corsOptions)

  app.options("*", corsInstance)
  app.use(setCorsHeaders)
  app.use(corsInstance)
}
