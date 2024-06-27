require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const PREFIX = "/api/v1";
const sequelize = require("./config/db");
const defineAssociations = require("./config/associations");
const authRouter = require("./routes/auth.route");
const projectRouter = require("./routes/project.routes");
const jornadaRouter = require("./routes/jornada.routes");

// Middleware para parsear JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Reemplaza con el puerto donde corre el front-end
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

defineAssociations();

app.get("/test", (req, res) => {
  console.log("test ok");
  res.status(200).send("Hello World!");
});
app.use(`${PREFIX}/auth`, authRouter);
app.use(`${PREFIX}/project`, projectRouter);
app.use(`${PREFIX}/jornada`, jornadaRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
