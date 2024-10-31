const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController.js");

//lay ra giao vien
router.get("/", teacherController.getTeachers);

// tao gv moi
router.post("/", teacherController.createTeacher);

module.exports = router;
