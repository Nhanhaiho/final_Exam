const Teacher = require("../models/Teacher.js");
const User = require("../models/User.js");
// const TeacherPosition = require("../models/TeacherPosition");

// e quen cach dung thu vien random so nen tham khảo hàm tạo random code
const generateUniqueCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0");
    exists = await Teacher.findOne({ code });
  }
  return code;
};

exports.getTeachers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const teachers = await Teacher.find()
      .populate({
        path: "userId",
        select: "name email phoneNumber address",
      })
      .populate({
        path: "teacherPositionsId",
        select: "name code des",
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Teacher.countDocuments();

    res.json({
      teachers,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

// tao gv moi
exports.createTeacher = async (req, res) => {
  const { userId, startDate, endDate, teacherPositionsId, degrees } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "ko tim thay user" });
    }

    const emailExists = await Teacher.findOne({ userId });
    if (emailExists)
      return res
        .status(400)
        .json({ error: "da co email nay roi, vui long doi mail" });

    const code = await generateUniqueCode();

    const newTeacher = new Teacher({
      userId,
      startDate,
      endDate,
      code,
      teacherPositionsId,
      degrees,
    });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ error: "ko tao dc giao vien moi" });
  }
};
