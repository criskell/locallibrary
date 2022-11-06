const express = require("express");

const bookController = require("../controllers/bookController");
const authorController = require("../controllers/authorController");
const genreController = require("../controllers/genreController");
const bookInstanceController = require("../controllers/bookInstanceController");


const router = express.Router();

router.get("/", bookController.index);
router.get("/book/create", bookController.showCreateForm);
router.post("/book/create", bookController.create);
router.get("/book/:id/delete", bookController.showDeleteForm);
router.post("/book/:id/delete", bookController.delete);
router.get("/book/:id/update", bookController.showUpdateForm);
router.post("/book/:id/update", bookController.update);
router.get("/book/:id", bookController.show);
router.get("/books", bookController.list);

router.get("/author/create", authorController.showCreateForm);
router.post("/author/create", authorController.create);
router.get("/author/:id/delete", authorController.showDeleteForm);
router.post("/author/:id/delete", authorController.delete);
router.get("/author/:id/update", authorController.showUpdateForm);
router.post("/author/:id/update", authorController.update);
router.get("/author/:id", authorController.show);
router.get("/authors", authorController.list);

router.get("/genre/create", genreController.showCreateForm);
router.post("/genre/create", genreController.create);
router.get("/genre/:id/delete", genreController.showDeleteForm);
router.post("/genre/:id/delete", genreController.delete);
router.get("/genre/:id/update", genreController.showUpdateForm);
router.post("/genre/:id/update", genreController.update);
router.get("/genre/:id", genreController.show);
router.get("/genres", genreController.list);

router.get("/bookinstance/create", bookInstanceController.showCreateForm);
router.post("/bookinstance/create", bookInstanceController.create);
router.get("/bookinstance/:id/delete", bookInstanceController.showDeleteForm);
router.post("/bookinstance/:id/delete", bookInstanceController.delete);
router.get("/bookinstance/:id/update", bookInstanceController.showUpdateForm);
router.post("/bookinstance/:id/update", bookInstanceController.update);
router.get("/bookinstance/:id", bookInstanceController.show);
router.get("/bookinstances", bookInstanceController.list);

module.exports = router;