import { Router } from 'express';
import Store from '../models/store.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit, name, skip } = req.query;
    const maxLimit = 120;
    const safeLimit = Math.min(parseInt(limit) || 12, maxLimit);
    const query =
      name && name.trim() !== ''
        ? Store.find({ name: { $regex: name, $options: 'i' } })
        : Store.find();
    query.limit(safeLimit);
    query.skip(skip);
    res.json(await query.exec());
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  console.log('/stores', req.body);
  try {
    const newStore = new Store(req.body);
    if (!newStore.currentCode?.createdAt && newStore.currentCode?.code) {
      newStore.currentCode.createdAt = new Date();
    }
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

router.patch('/:id/code', async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "The 'code' field is required" });
    }

    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    if (store.currentCode?.code) {
      store.codesHistory.push({
        code: store.currentCode.code,
        createdAt: store.currentCode?.createdAt,
      });
    }

    store.currentCode = { code, createdAt: new Date() };

    await store.save();

    res.json({
      message: 'Code updated successfully!!',
      store,
    });
  } catch (error) {
    console.error('Error updating the code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
