import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'postgres'
});

client.connect().catch(err => console.error('Error connecting to the database:', err));

export const getAllAdmins = async () => {
  try {
    const res = await client.query('SELECT * FROM admins');
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.error('Error querying the database:', err);
    throw err;
  }
};
export const updateSensorData = async ({ serialNumber, newSerialNumber, devEui, appEui, appKey }) => {
    const query = `
      UPDATE sensor_data
      SET 
        serial_number = COALESCE($2, serial_number),
        dev_eui = COALESCE($3, dev_eui),
        app_eui = COALESCE($4, app_eui),
        app_key = COALESCE($5, app_key),
        created_at = CURRENT_TIMESTAMP
      WHERE serial_number = $1
      RETURNING *;
    `;
    
    const values = [serialNumber, newSerialNumber || null, devEui || null, appEui || null, appKey || null];
  
    try {
      const res = await client.query(query, values);
      if (res.rowCount === 0) {
        return null; // No rows updated
      }
      return res.rows[0]; // Return the updated row
    } catch (err) {
      console.error('Error updating sensor data:', err);
      throw err;
    }
  };
  
// Update Sensor Profile in database.js
export const updateSensorProfile = async (sensorProfile) => {
    const { name, newName, guide, qrResult, videoUrl } = sensorProfile;
    const query = `
        UPDATE sensor_profiles
        SET 
            name = COALESCE($2, name),
            guide = COALESCE($3, guide),
            qr_result = COALESCE($4, qr_result),
            video_url = COALESCE($5, video_url),
            created_at = CURRENT_TIMESTAMP
        WHERE name = $1
        RETURNING *;
    `;
    const values = [name, newName || null, guide || null, qrResult || null, videoUrl || null];

    try {
        const res = await client.query(query, values);
        console.log(res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error updating sensor profile:', err);
        throw err;
    }
};

export const deleteSensorProfile = async (name) => {
    const query = 'DELETE FROM sensor_profiles WHERE name = $1 RETURNING *;';
    const values = [name];
    
    try {
      const res = await client.query(query, values);
      
      if (res.rowCount === 0) {
        // No rows were affected, meaning no profile was found with the given id
        return { message: 'Sensor profile not found' };
      }
      
      return res.rows[0]; // Return the deleted profile
    } catch (err) {
      console.error('Error deleting sensor profile:', err);
      throw err;
    }
  };
  
export const insertSensorData = async (sensorDataArray) => {
    const query = `
      INSERT INTO sensor_data (serial_number, dev_eui, app_eui, app_key, created_at)
      VALUES 
      ${sensorDataArray.map((_, i) => `($${i*4+1}, $${i*4+2}, $${i*4+3}, $${i*4+4}, CURRENT_TIMESTAMP)`).join(', ')}
      ON CONFLICT (serial_number)
      DO UPDATE SET
        dev_eui = EXCLUDED.dev_eui,
        app_eui = EXCLUDED.app_eui,
        app_key = EXCLUDED.app_key,
        created_at = EXCLUDED.created_at
      RETURNING *;
    `;
    
    const values = sensorDataArray.flatMap(data => [data.serialNumber, data.devEui, data.appEui, data.appKey]);
  
    try {
      const res = await client.query(query, values);
      console.log(res.rows);
      return res.rows;
    } catch (err) {
      console.error('Error inserting sensor data:', err);
      throw err;
    }
  };
  export const checkIfNumberExist = async ({ number, whichNumber }) => {
    const query = `SELECT * FROM sensor_data WHERE ${whichNumber} = $1`;
    
    const values = [number];
    try {
      const res = await client.query(query, values);
      console.log(res.rows);
      return res.rows.length > 0;
    } catch (err) {
      console.error('Error checking sensor data:', err);
      throw err;
    }
  };
  

export const insertAdmin = async (email) => {
    const query = 'INSERT INTO admins (email) VALUES ($1) RETURNING *;';
    const values = [email];
    
    try {
      const res = await client.query(query, values);
      console.log(res.rows[0]);
      return res.rows[0];
    } catch (err) {
      console.error('Error inserting admin:', err);
      throw err;
    }
  };

  export const getAllSensorData = async () => {
    try {
      const res = await client.query('SELECT * FROM sensor_data');
      return res.rows;
    } catch (err) {
      console.error('Error querying the database:', err);
      throw err;
    }
  };
  
  export const deleteSensorData = async (serial_number) => {
    const query = 'DELETE FROM sensor_data WHERE serial_number = $1 RETURNING *;';
    const values = [serial_number];
    
    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error('Error deleting sensor data:', err);
      throw err;
    }
  };
  export const deleteAdmin = async (email) => {
    const query = 'DELETE FROM admins WHERE email = $1;';
    const values = [email];
  
    try {
      await client.query(query, values);
      console.log(`Admin with email ${email} deleted successfully`);
    } catch (err) {
      console.error('Error deleting admin:', err);
      throw err;
    }
  };
  
  export const insertSensorProfile = async (sensorProfile) => {
    const { name, guide, qrResult, videoUrl } = sensorProfile;
    const query = `
      INSERT INTO sensor_profiles (name, guide, qr_result, video_url, created_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [name, guide, qrResult, videoUrl];
  
    try {
      const res = await client.query(query, values);
      console.log(res.rows[0]);
      return res.rows[0];
    } catch (err) {
      console.error('Error inserting sensor profile:', err);
      throw err;
    }
};

export const getAllSensorProfiles = async () => {
    try {
        const res = await client.query('SELECT * FROM sensor_profiles');
        console.log(res.rows);
        return res.rows;
      } catch (err) {
        console.error('Error querying the database:', err);
        throw err;
      }
}

process.on('exit', () => {
  client.end().catch(err => console.error('Error closing the database connection:', err));
});
