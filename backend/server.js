import express from 'express';
import cors from 'cors';
import adminRoutes from './routes.js'; // Adjust path as necessary

const app = express();
const PORT = 3000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api', adminRoutes); // Prefix all routes with '/api'

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
