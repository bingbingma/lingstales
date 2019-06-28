const db = require("../models");

module.exports = {
  //FOR THE BOOK
  findAll: function(req, res) {
    db.Book.find(req.query)
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book.find({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book.update({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book.find({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //FOR THE COMMENT SECTIONS
  findAllComments: function(req, res) {
    db.Book.find({ _id: req.params.id })
      .then(dbModel => {
        res.json(dbModel[0].comments);
      })
      .catch(err => res.status(422).json(err));
  },


  createComment: function (req, res) {
    const comment = {
      author: req.body.author,
      text: req.body.text,
      date: req.body.date
    };
    console.log("[DEBUG] POST /api/books/:bid/comments", comment);
    db.Book.update({ _id: req.params.id }, { $push: { comments: comment } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeComment: function(req, res) {
    const comment = {
      author: req.body.author,
      text: req.body.text,
      date: req.body.date
    };
    db.Book.update({ _id: req.params.id }, { $pull: { comment: comment } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findCommentById: function(req, res) {
    db.Book.find(
      { _id: req.params.id },
      { comments: { $elemMatch: { _id: req.params.id } } }
    )
      .then(dbModel => {
        console.log('DB MODEL:  ',dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  updateCommentById: function(req, res) {
    db.Book.update(
      { _id: req.params.id },
      { comments: { $elemMatch: { _id: req.params.id } } }
    )
      .then(dbModel => {
        console.log('DB MODEL:  ',dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
