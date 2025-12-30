import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: process.env.frontURL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = process.env.PORT || 3000;
const mongoDB = process.env.mongoDB_URI;
// connection to mongo Database

async function startServer() {
  try {
    await mongoose.connect(mongoDB);
    console.log("Connection to Database Sucessfull!");

    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    console.log("Failed connected to Database");
    process.exit(1);
  }
}

startServer();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/todo", todoRoutes);

app.use("/user", userRoutes);
