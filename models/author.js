const { Schema, model } = require("mongoose");

const { DateTime } = require("luxon");

const AuthorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 100,
  },

  familyName: {
    type: String,
    required: true,
    maxLength: 100,
  },

  dateOfBirth: Date,
  dateOfDeath: Date,
});

AuthorSchema.virtual("name").get(function () {
  return this.firstName && this.familyName ? `${this.familyName}, ${this.firstName}` : "";
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan").get(function () {
  const dateOfBirth = this.dateOfBirth
    ? DateTime.fromJSDate(this.dateOfBirth).toLocaleString(DateTime.DATE_MED)
    : "";

  const dateOfDeath = this.dateOfDeath
    ? DateTime.fromJSDate(this.dateOfDeath).toLocaleString(DateTime.DATE_MED)
    : "";

  return `${dateOfBirth} - ${dateOfDeath}`;
});

module.exports = model("Author", AuthorSchema);