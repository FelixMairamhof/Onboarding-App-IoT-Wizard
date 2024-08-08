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

process.on('exit', () => {
  client.end().catch(err => console.error('Error closing the database connection:', err));
});
