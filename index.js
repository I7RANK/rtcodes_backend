import express from 'express';
import { startConnection } from './db-connection.js';

async function index() {
  await startConnection();
  const app = express();
  const port = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

index().catch(console.dir);
