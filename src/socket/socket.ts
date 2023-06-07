import { io } from 'socket.io-client';

export const socket = io((process.env.REACT_APP_SOCKETIO_URL || 'http://localhost:8001'));