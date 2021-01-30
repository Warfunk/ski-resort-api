import express, { response } from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";

import signIn from "./controllers/signin.js";
import register from "./controllers/register.js";
import getForecast from "./controllers/getForecast.js";
import save from "./controllers/save.js";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("it is working...");
});

app.post("/signin", (req, res) => {
  signIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register(req, res, db, bcrypt);
});

app.post("/getForecast", (req, res) => {
  getForecast(req, res);
});

app.put("/save", (req, res) => {
  save(req, res, db);
});

app.listen(process.env.PORT || 3002, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
