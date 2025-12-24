require("./db");
const bcrypt = require("bcrypt");
const User = require("./models/User");

async function setupAdmin() {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    console.log("❌ Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("1234", 10);

  const admin = new User({
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("✅ Admin created successfully");
  process.exit();
}

setupAdmin();
