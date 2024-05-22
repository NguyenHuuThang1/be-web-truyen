import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app, server, io } from './app.js';

io.on('connection', (socket) => {
  console.log('Start chat');
});

// set environment variable
dotenv.config({ path: './src/config.env' });

// connect database
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error('Connect fail:', err);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Listening on port ' + PORT + ' ❤️');
  }
});
