const mongoose = require("mongoose");
require("dotenv").config({ path: "./envv/.env" });
const connectDB = async () => {
  try {
    console.log("🔍 URI leída:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB conectado correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
