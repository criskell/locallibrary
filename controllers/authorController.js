const async = require("async");


const Book = require("../models/book");
const Author = require("../models/author");

exports.list = (req, res, next) => {
  Author.find()
    .sort([["familyName", "ascending"]])
    .exec((err, authors) => {
      if (err) return next(err);

      res.render("authorList", {
        title: "Lista de autores",
        authors,
      });
    });
};

exports.show = (req, res, next) => {
  async.parallel({
    author: (cb) => Author.findById(req.params.id).exec(cb),
    authorBooks: (cb) => Book.find({ author: req.params.id }, "title summary").exec(cb),
  }, (err, { author, authorBooks }) => {
    if (err) return next(err);
    if (author) {
      const err = new Error("Autor não encontrado");
      err.status = 404;
      return next(err);
    }
    res.render("author", {
      title: "Autor",
      author,
      authorBooks,
    });
  })
};

exports.showCreateForm = (req, res) => {};

exports.create = (req, res) => {};

exports.showDeleteForm = () => {};
exports.delete = (req, res) => {};

exports.showUpdateForm = () => {};
exports.update = () => {};