const { Schema, model } = require("mongoose");

const { DateTime } = require("luxon");

const BookInstanceSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  imprint: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },

  dueBack: {
    type: Date,
    default: Date.now,
  },
});

BookInstanceSchema.virtual("url").get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("translatedStatus").get(function () {
  return {
    "Available": "Disponível",
    "Maintenance": "Manutenção",
    "Loaned": "Emprestado",
    "Reserved": "Reservado",
  }[this.status];
});

BookInstanceSchema.virtual("dueBackFormatted").get(function () {
  return DateTime.fromJSDate(this.dueBack).toLocaleString(DateTime.DATE_MED);
});

module.exports = model("BookInstance", BookInstanceSchema);