import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }
  
  connect() {
    if (this.socket?.connected) return;
    
    this.socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"]
    });
    
    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
    });
    
    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    
    this.socket.on("connected", (data) => {
      console.log("Server message:", data.message);
    });
    
    return this.socket;
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  
  on(event, callback) {
    if (!this.socket) this.connect();
    this.socket.on(event, callback);
    
    // Track listeners for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }
  
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
  
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export const socketService = new SocketService();
export default socketService;
