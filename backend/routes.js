import express from 'express';
import { getAllAdmins, insertSensorData, insertAdmin, insertSensorProfile, getAllSensorProfiles, checkIfNumberExist } from './database.js';

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
router.post('/sensor-data-check', async (req, res) => {
    const { number, whichNumber } = req.body;
    
    try {
      const isNumberInDB = await checkIfNumberExist({ number, whichNumber });
      res.status(200).json({ exists: isNumberInDB });
    } catch (err) {
      console.error('Error in /sensor-data-check route:', err);
      res.status(500).send('Error checking sensor data');
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

  router.post('/sensor-profile', async (req, res) => {
    const { name, guide, qrResult, videoUrl } = req.body;
    
    if (!name || !guide || !qrResult || !videoUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    try {
      const newProfile = await insertSensorProfile({ name, guide, qrResult, videoUrl });
      res.status(201).json(newProfile);
    } catch (err) {
      console.error('Error in /sensor-profile route:', err);
      res.status(500).send('Error inserting sensor profile');
    }
  });
  router.get('/sensor-profile', async (req, res) => {

    try {
      const sensorProfiles = await getAllSensorProfiles();
      res.status(201).json(sensorProfiles);
    } catch (err) {
      console.error('Error in /sensor-profile route:', err);
      res.status(500).send('Error getting all sensor profiles');
    }
  });
export default router;
