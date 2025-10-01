const express = require("express");
const connectDB = require("./config/config");
const postRoutes = require("./routes/post");
require("dotenv").config({ path: "./envv/.env" });

const app = express();
app.use(express.json());

connectDB()
  .then(() => {
    console.log("Conectado a MongoDB");

    app.use("/", postRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con MongoDB:", err);
    process.exit(1);
  });
