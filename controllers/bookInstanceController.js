const BookInstance = require("../models/bookInstance");
const async = require("async");

exports.list = (req, res, next) => {
  BookInstance.find()
    .populate("book")
    .exec((err, bookInstances) => {
      if (err) return next(err);

      res.render("bookInstanceList", {
        title: "Lista de cópias de livro",
        bookInstances,
      });
    });
};

exports.show = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err, bookInstance) => {
      if (err) return next(err);
      if (bookInstance == null) {
        const err = new Error("Cópia do livro não encontrada.");
        err.status = 404;
        return next(err);
      }

      res.render("bookInstance", {
        title: `Cópia: ${bookInstance.book.title}`,
        bookInstance,
      });
    });
};

exports.showCreateForm = (req, res) => {};

exports.create = (req, res) => {};

exports.showDeleteForm = () => {};
exports.delete = (req, res) => {};

exports.showUpdateForm = () => {};
exports.update = () => {};