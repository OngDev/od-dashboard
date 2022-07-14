import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'node-color-log';
import cron from 'cron';
import { getTotalStats, fetchAllStats, getFacebookAccessToken } from './services.js';

dotenv.config();
const { CronJob } = cron;
const job = new CronJob('*/10 * * * *', async () => {
  logger.info('Fetching all stats');
  await fetchAllStats();
});
job.start();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['*'],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'http://unpkg.com/vue@next'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com/css', 'https://use.fontawesome.com/releases/v5.12.0/css/all.css'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));
app.use(express.json());
app.use(express.static('./public'));

app.get('/stats', async (req, res) => {
  const stats = await getTotalStats();
  res.status(200).jsonp(stats);
});

app.get('/fb_token', async (req, res) => {
  try {
    await getFacebookAccessToken(req.query.token);
    await fetchAllStats();
    res.status(200).end();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, logger.info(`Server is listening on port ${PORT}`));
