// models/TeacherPosition.js
const mongoose = require("mongoose");

const TeacherPositionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    des: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeacherPosition", TeacherPositionSchema);
