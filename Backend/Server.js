const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");  //connect 2 different origin ie.fontend to server
require("./db");  //connect DB
const User = require("./models/User");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());  //connect fontend /backend
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//Register user (Temporary API)
app.post("/register", async (req, res) => {
  try{
    const user = new User(req.body);
    await user.save();
    res.json({success: true, message: "User registered" });
  } catch (err) {
    res.json({ success: false, message: "User alredy exits"});
  }
});

// Login API (Database based)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;   // ✅ DEFINE VARIABLES

  if (!username || !password) {
    return res.json({
      success: false,
      message: "Username and password required"
    });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      success: false,
      message: "Invalid credentials"
    });
  }

  res.json({
    success: true,
    role: user.role,
    message: "Login successful"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// TEMPORARY: Run only ONCE
app.post("/setup-admin", async (req, res) => {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    return res.json({
      success: false,
      message: "Admin already exists"
    });
  }

  const hashedPassword = await bcrypt.hash("1234", 10);
  const admin = new User({
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();

  res.json({
    success: true,
    message: "Admin created successfully"
  });
});

// Login API (temporary)
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username === "admin" && password === "1234") {
//     res.json({ success: true, message: "Login successful" });
//   } else {
//     res.json({ success: false, message: "Invalid credentials" });
//   }
// });

// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
