import express from 'express';
import { startConnection } from './db-connection.js';
import storesRouter from './routes/stores.routes.js';

async function index() {
  await startConnection();
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use('/stores', storesRouter);
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

index().catch(console.dir);
