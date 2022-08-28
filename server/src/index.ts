import Knex from 'knex';
import { Model } from 'objection';
const knexConfig = require('../knexfile');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimiter from 'express-rate-limit';

import { notFound, errorHandler } from './middlewares';
import v1 from './api/v1';
import { setUser } from './api/v1/auth/middlewares';
import config from './utils/config';

const environment = config.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);
Model.knex(knex);

const app = express();
app.use(cors({
  origin: config.CLIENT_URL,
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

app.listen(config.SERVER_PORT, () => {
  console.log(`Listening on ${config.HOST}:${config.SERVER_PORT}/`);
});
