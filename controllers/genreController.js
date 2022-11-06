const async = require("async");

const Genre = require("../models/genre");
const Book = require("../models/book");


exports.list = (req, res, next) => {
  Genre.find()
    .sort([["name", "ascending"]])
    .exec((err, genres) => {
      if (err) return next(err);

      res.render("genreList", {
        title: "Lista de gêneros",
        genres,
      });
    });
};

exports.show = (req, res) => {
  async.parallel({
    genre: (cb) => Genre.findById(req.params.id).exec(cb),
    genreBooks: (cb) => Book.find({ genre: req.params.id }).exec(cb),
  }, (err, { genre, genreBooks }) => {
    if (err) return next(err);
    if (! genre) {
      const err = new Error("Gênero não encontrado");
      err.status = 404;
      return next(err);
    }
    res.render("genre", {
      title: `Gênero ${genre.name}`,
      genre,
      genreBooks,
    });
  });
};

exports.showCreateForm = (req, res) => {};

exports.create = (req, res) => {};

exports.showDeleteForm = () => {};
exports.delete = (req, res) => {};

exports.showUpdateForm = () => {};
exports.update = () => {};