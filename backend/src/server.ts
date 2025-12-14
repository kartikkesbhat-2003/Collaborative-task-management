import { config } from './config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { connectDB } from './config/db';
import { setupSocket } from './config/socket';

// Validate environment variables (done in config)
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

setupSocket(io);
app.set('io', io);

connectDB().then(() => {
  server.listen(config.PORT, () => {
    console.log(`🚀 Server running on port ${config.PORT}`);
  });
});


