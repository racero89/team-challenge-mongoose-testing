const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("../routes/posts");
require("dotenv").config({ path: "./env/.env" });

const app = express();
app.use(express.json());
app.use("/", postRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /create", () => {
  it("Debe crear una publicación", async () => {
    const res = await request(app)
      .post("/create")
      .send({ title: "Test Post", body: "Este es un post de prueba" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Test Post");
    expect(res.body.body).toBe("Este es un post de prueba");
  });

  it("Debe fallar al enviar título vacío", async () => {
    const res = await request(app)
      .post("/create")
      .send({ title: "", body: "Cuerpo" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });
});
