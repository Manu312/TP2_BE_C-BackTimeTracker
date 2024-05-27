require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const PREFIX = '/api/v1';
const sequelize = require('./config/db');
const defineAssociations = require('./config/associations');

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

defineAssociations();

const authRouter = require('./routes/auth.route');
const projectRouter = require('./routes/project.routes');

app.use(`${PREFIX}/auth`, authRouter);
app.use(`${PREFIX}/project`, projectRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});