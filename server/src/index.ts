import Knex from 'knex';
import { Model } from 'objection';
const knexConfig = require('../knexfile');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimiter from 'express-rate-limit';

import './utils/config.ts';

// DB
const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);
Model.knex(knex);

// Express
import { notFound, errorHandler } from './middlewares';
import v1 from './api/v1';
import { setUser } from './api/v1/auth/middlewares';

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
}));
app.use(morgan('dev'));
app.use(helmet());
app.use(rateLimiter({
  windowMs: 60_000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use(express.json());
app.use(setUser);
app.use('/api/v1', v1);

// app.get('/',(req, res) => res.json('hello'));

app.use(notFound);
app.use(errorHandler);

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on ${process.env.HOST}:${port}/`);
});
