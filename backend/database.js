import pg from 'pg';

const client = new pg.Client({
  host: 'localhost', // or the IP address of your PostgreSQL container
  port: 5432,        // default PostgreSQL port
  user: 'postgres',  // default PostgreSQL user
  password: 'admin', // your PostgreSQL password
  database: 'postgres' // name of the database
});

// Connect to the database
client.connect().catch(err => console.error('Error connecting to the database:', err));

export const getAllAdmins = async () => {
  try {
    const res = await client.query('SELECT * FROM admins');
    return res.rows;
  } catch (err) {
    console.error('Error querying the database:', err);
    throw err; // rethrow the error for the route handler to catch
  }
};

// Close the connection when the process exits
process.on('exit', () => {
  client.end().catch(err => console.error('Error closing the database connection:', err));
});
