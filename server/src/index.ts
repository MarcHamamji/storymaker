import Knex from 'knex';
import { Model } from 'objection';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimiter from 'express-rate-limit';

import grant from 'grant';
import session from 'express-session';
import { notFound, errorHandler } from './middlewares';
import v1 from './api/v1';
import { setUser } from './api/v1/auth/middlewares';
import config from './utils/config';
import grantConfig from './grant-config';

const knexConfig = require('../knexfile');

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

app.use(session({ secret: config.JWT_SECRET, saveUninitialized: true, resave: false }));
app.use(grant.express(grantConfig));

app.use(setUser);
app.use('/api/v1', v1);

app.use(notFound);
app.use(errorHandler);

app.listen(config.SERVER_PORT, () => {
  console.log(`Listening on ${config.HOST}:${config.SERVER_PORT}/`);
});
