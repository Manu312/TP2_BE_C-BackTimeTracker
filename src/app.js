const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const PREFIX = '/api/v1';

// Middleware para parsear JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const authRouter = require('./routes/auth.route');

app.use(`${PREFIX}/auth`, authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});