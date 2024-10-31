const TeacherPosition = require("../models/TeacherPosition.js");

exports.getTeacherPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
};


exports.createTeacherPosition = async (req, res) => {
  const { name, code, des } = req.body;

  try {
    const existingPosition = await TeacherPosition.findOne({ code });
    if (existingPosition)
      return res.status(400).json({ error: "ma code ko dc trung" });

    const newPosition = new TeacherPosition({ name, code, des });
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (err) {
    res.status(400).json({ error: "ko tao dc vi tri moi" });
  }
};
