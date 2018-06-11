import io from 'socket.io-client';

export function subscribeToSensor() {
  const socket = io('wss://ws.smartcitizen.me');
  socket.on('data-received', function(device) {
    socket.close();
  });
}
