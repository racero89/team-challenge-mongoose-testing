const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
    },
    body: {
      type: String,
      required: [true, "El contenido es obligatorio"],
      trim: true,
      minlength: [5, "El contenido debe tener al menos 5 caracteres"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
