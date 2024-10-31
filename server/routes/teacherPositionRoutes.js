const express = require("express");
const router = express.Router();
const teacherPositionController = require("../controllers/teacherPositionController.js");


// route cua lay all vi tri gv
router.get("/", teacherPositionController.getTeacherPositions);

// route tao vi tri gv moi
router.post("/", teacherPositionController.createTeacherPosition);


module.exports = router;
