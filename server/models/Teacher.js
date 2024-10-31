const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: { type: String, required: true, unique: true },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    teacherPositionsId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" },
    ],
    degrees: [
      {
        type: { type: String },
        school: { type: String },
        major: { type: String },
        year: { type: Number },
        isGraduated: { type: Boolean },
      },
    ],
  },
  // trỏ tới collection teachers trong mongodb
  { collection: "teachers", timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
