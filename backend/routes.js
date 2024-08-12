import express from 'express';
import { getAllAdmins, insertSensorData, insertAdmin, insertSensorProfile, getAllSensorProfiles, checkIfNumberExist, deleteAdmin, getAllSensorData, deleteSensorData, deleteSensorProfile , updateSensorProfile, updateSensorData} from './database.js';

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
  
  router.delete('/admins', async (req, res) => {
    const { email } = req.body;
    try {
      await deleteAdmin(email);
      res.status(200).send(`Admin ${email} deleted successfully`);
    } catch (err) {
      console.error('Error in /delete-admin route:', err);
      res.status(500).send('Error deleting the admin');
    }
  });

// Route to insert sensor data
router.post('/sensor-data', async (req, res) => {
  try {
    const sensorDataArray = req.body;
    const insertedData = await insertSensorData(sensorDataArray);
    res.status(200).json(insertedData);
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
  
// Route to update sensor data
router.put('/sensor-data', async (req, res) => {
    const { serialNumber, newSerialNumber, devEui, appEui, appKey } = req.body;
  
    if (!serialNumber || !newSerialNumber) {
      return res.status(400).json({ message: 'Serial number and new serial number are required' });
    }
  
    try {
      const updatedData = await updateSensorData({
        serialNumber,
        newSerialNumber,
        devEui,
        appEui,
        appKey
      });
      
      if (!updatedData) {
        return res.status(404).json({ message: 'Sensor data not found' });
      }
  
      res.status(200).json(updatedData);
    } catch (err) {
      console.error('Error in /sensor-data route:', err);
      res.status(500).json({ message: 'Error updating sensor data' });
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
  router.get('/sensor-data', async (req, res) => {
    try {
      const sensorData = await getAllSensorData();
      res.json(sensorData); // Send JSON response
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      res.status(500).json({ message: 'Error fetching sensor data' }); // Send JSON error response
    }
  });
  
  router.delete('/sensor-data', async (req, res) => {
    const { serial_number } = req.body;
  
    try {
      if (serial_number) {
        await deleteSensorData(serial_number);
        res.status(200).json({ message: 'Sensor data deleted successfully' }); // Send JSON response
      } else {
        res.status(400).json({ message: 'Serial number is required' }); // Send JSON error response
      }
    } catch (error) {
      console.error('Error deleting sensor data:', error);
      res.status(500).json({ message: 'Error deleting sensor data' }); // Send JSON error response
    }
  });
  
  router.post('/sensor-profile', async (req, res) => {
    const { name, guide, qrResult, videoUrl } = req.body;
    
    if (!name || !guide || !qrResult) {
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
      console.log(sensorProfiles)
      res.status(201).json(sensorProfiles);
    } catch (err) {
      console.error('Error in /sensor-profile route:', err);
      res.status(500).send('Error getting all sensor profiles');
    }
  });

  router.delete('/sensor-profile', async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'ID is required' });
    }
  
    try {
      const result = await deleteSensorProfile(name); 
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sensor profile not found' });
      }
      res.status(200).json({ message: 'Sensor profile deleted successfully' });
    } catch (err) {
      console.error('Error in /sensor-profile route:', err);
      res.status(500).json({ message: 'Error deleting sensor profile' });
    }
  });
  // Route to update sensor profile
router.put('/sensor-profile', async (req, res) => {
    const { name, newName, guide, qrResult, videoUrl } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const updatedProfile = await updateSensorProfile({ name, newName, guide, qrResult, videoUrl });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Sensor profile not found' });
        }
        res.status(200).json(updatedProfile);
    } catch (err) {
        console.error('Error in /sensor-profile route:', err);
        res.status(500).json({ message: 'Error updating sensor profile' });
    }
});

  
export default router;
