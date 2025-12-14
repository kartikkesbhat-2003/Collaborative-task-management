import { Server } from 'socket.io';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) socket.join(userId);

    socket.on('disconnect', () => {
      if (userId) socket.leave(userId);
    });
  });
};
