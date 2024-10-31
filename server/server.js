const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const teacherRoutes = require("./routes/teacherRoutes");
const teacherPositionRoutes = require("./routes/teacherPositionRoutes");

const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ket noi voi mongodb, em dùng mongocompass
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
  
// test backend run or not
app.get("/", (req, res) => {
  res.send("Welcome to  API");
});
app.use("/teachers", teacherRoutes);
app.use("/teacher-positions", teacherPositionRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
