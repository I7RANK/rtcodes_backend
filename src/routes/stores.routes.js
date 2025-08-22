import { Router } from 'express';
import Store from '../models/store.js';

const router = Router();

router.post('/', async (req, res) => {
  console.log('/stores', req.body);
  try {
    const newStore = new Store(req.body);
    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
