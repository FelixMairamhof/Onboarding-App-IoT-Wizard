import express from 'express';
import { getAllAdmins } from './database.js'; // Use the correct file extension

const router = express.Router();

// Route to get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await getAllAdmins();
    console.log(admins);
    res.json(admins);

  } catch (err) {
    console.error('Error in /admins route:', err);
    res.status(500).send('Error querying the database');
  }
});

export default router; // Use ES module export syntax
