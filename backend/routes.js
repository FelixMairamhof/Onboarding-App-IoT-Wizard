import express from 'express';
import { getAllAdmins, insertSensorData, insertAdmin } from './database.js';

const router = express.Router();

// Route to get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.json(admins);
  } catch (err) {
    console.error('Error in /admins route:', err);
    res.status(500).send('Error querying the database');
  }
});

// Route to insert sensor data
router.post('/sensor-data', async (req, res) => {
  try {
    const sensorDataArray = req.body;
    const insertedData = await insertSensorData(sensorDataArray);
    res.status(201).json(insertedData);
  } catch (err) {
    console.error('Error in /sensor-data route:', err);
    res.status(500).send('Error inserting sensor data');
  }
});

// Route to insert a new admin
router.post('/admins', async (req, res) => {
    const { email } = req.body;
    try {
      const newAdmin = await insertAdmin(email);
      res.status(201).json(newAdmin);
    } catch (err) {
      console.error('Error in /admins route:', err);
      res.status(500).send('Error adding new admin');
    }
  });

export default router;
