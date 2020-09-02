const express = require('express');
const cors =  require('cors');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const { errors } = require('celebrate');
const router = require('./routes/routes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());
app.use(router);

module.exports = app;