import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = 5000;
const DBCONNECT = "";
const DOMAIN = "localhost";

try {
  const app = express();
  app.use(cors({ credentials: true, origin: DOMAIN }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  mongoose.set("strictQuery", true);
  mongoose.connect(DBCONNECT, {}, (error) => {
    if (error) {
      console.log("Соединение с базой данных отсутствует");
      return process.exit();
    }
    console.log("Соединение с базой данных установлено");
    app.listen(PORT, () => {
      console.log("Сервер запущен на порту", PORT);
    });
  });
} catch (e) {
  console.log("Ошибка на сервере", e);
}
