const express = require('express');
const College = require('../models/College');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// GET ALL
router.get('/', async (req, res) => {
  const { search } = req.query;
  const query = search
    ? { name: { $regex: search, $options: 'i' } }
    : {};
  const colleges = await College.find(query);
  res.json(colleges);
});

//GET BY ID
router.get('/:id', async (req, res) => {
  const college = await College.findById(req.params.id);
  res.json(college);
});

// ADD COLLEGE
router.post('/', verifyToken, async (req, res) => {
  const newCollege = new College(req.body);
  await newCollege.save();
  res.status(201).json(newCollege);
});

// UPDATE COLLEGE
router.put('/:id', verifyToken, async (req, res) => {
  const updated = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE COLLEGE
router.delete('/:id', verifyToken, async (req, res) => {
  await College.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
