const Book = require("../models/book");
const BookInstance = require("../models/bookInstance");
const Author = require("../models/author");
const Genre = require("../models/genre");

const async = require("async");

exports.index = (req, res) => {
  const counts = {
    book: (cb) => Book.countDocuments({}, cb),
    bookInstanceAvailable: (cb) => BookInstance.countDocuments({ status: "Available" }, cb),
    bookInstance: (cb) => BookInstance.countDocuments({}, cb),
    author: (cb) => Author.countDocuments({}, cb),
    genre: (cb) => Genre.countDocuments({}, cb),
  };

  async.parallel(counts, (err, counts) => res.render("index", {
    title: "LocalLibrary - Página inicial",
    error: err,
    counts,
  }));
};

exports.list = (req, res, next) => {
  Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec((err, books) => {
      if (err) return next(err);

      res.render("bookList", {
        title: "Lista de livros",
        books,
      });
    })
};

exports.show = (req, res) => {
  async.parallel({
    book: (cb) => Book.findById(req.params.id).populate("author").populate("genre").exec(cb),
    bookInstances: (cb) => BookInstance.find({ book: req.params.id }).exec(cb),
  }, (err, { book, bookInstances }) => {
    if (err) return next(err);
    if (! book) {
      const err = new Error("Livro não encontrado");
      err.status = 404;
      return next(err);
    }
    res.render("book", {
      title: book.title,
      book,
      bookInstances,
    });
  });
};

exports.showCreateForm = (req, res) => {};

exports.create = (req, res) => {};

exports.showDeleteForm = () => {};
exports.delete = (req, res) => {};

exports.showUpdateForm = () => {};
exports.update = () => {};