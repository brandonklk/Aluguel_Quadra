const express = require('express');
const cors =  require('cors');
const { errors } = require('celebrate');
const logger = require('./logger/logger');
const pinoHttp = require('pino-http')({ logger });
const router = require('./routes/routes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());
app.use(pinoHttp);
app.use(router);

module.exports = app;