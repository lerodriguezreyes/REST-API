// ./models/Book.model.js

const { model, Schema } = require("mongoose");


// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortSchema = new Schema(
  {
    // doubt with object id
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    format: String,
    campus: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    programManager: String,
    leadTeacher: String,
    totalHours: Number,
  },
  {
    timestamps: true,
  }
);

// EXPORT THE MODEL
module.exports = model("Cohort", cohortSchema);
