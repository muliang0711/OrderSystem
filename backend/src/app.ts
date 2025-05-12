
import express from 'express';
import { placeOrderHandler } from './ServiceA/serviceA';

const app = express();

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to the API');
});

app.post('/place-order', (req, res, next) => {
  placeOrderHandler(req, res).catch(next);
});

export default app;