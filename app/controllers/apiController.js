let Task = require("../models/Task")

exports.list = (req, res) => {
  console.log("try tasks", req.params)
  let query = {}

  if (typeof req.params.userId !== "undefined") {
    query = {
      user_id: req.params.userId
    }
  }

  Task.find(query, function(err, task) {
    if (err) res.send(err)

    res.json(task)
  })
}

exports.detail = (req, res) => {
  console.log("try task", req.params.id)

  Task.find({ _id: req.params.id })
    .then(document => {
      if (document) {
        res.json(document)
      } else {
        res.status(404).json({
          code: "not_found",
          message: "task " + req.params.id + " not found."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        code: "internal_server_error",
        message: err.message
      })
    })
}

exports.create = (req, res) => {
  console.log("try create a task", req.body)

  if (typeof req.body.description !== "undefined") {
    let task = new Task(req.body)

    task
      .save()
      .then(task => {
        res.json(task)
      })
      .catch(err => {
        res.status(500).json({
          code: "internal_server_error",
          message: err.message
        })
      })
  }
}

exports.update = (req, res) => {
  console.log("try update tasks")

  if (typeof req.body.description !== "undefined") {
    let query = {
      _id: req.params.id
    }
    let update = {}
    let options = { new: true }

    if (req.body.description) {
      update["description"] = req.body.description
    }
    if (req.body.status) {
      update["status"] = req.body.status
    }
    if (req.body.user_id) {
      update["user_id"] = req.body.user_id
    }

    Task.findOneAndUpdate(query, { $set: update }, options)
      .then(task => {
        res.json(task)
      })
      .catch(err => {
        res.status(500).json({
          code: "internal_server_error",
          message: err.message
        })
      })
  }
}

exports.delete = (req, res) => {
  let query = {
    _id: req.params.id
  }

  Task.deleteOne(query)
    .then(task => {
      res.json(task)
    })
    .catch(err => {
      res.status(500).json({
        code: "internal_server_error",
        message: err.message
      })
    })
}
