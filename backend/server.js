const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/students"); 

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));


app.use("/students", studentRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running...");
});


const PORT = 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
