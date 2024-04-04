type Listener = (message: string) => void;

export class ChatService {
  private listeners: Listener[] = [];
  private ws: WebSocket = new WebSocket(import.meta.env.VITE_WS_URL);

  constructor() {
    this.ws.onopen = () => {
      console.log("connected to websocket");
    };

    this.ws.onmessage = (msg) => {
      console.log(msg.data);
      this.listeners.forEach((listener) => listener(msg.data));
    };
  }

  on(listener: Listener) {
    this.listeners.push(listener);
  }

  send(msg: string) {
    this.ws.send(msg);
  }
}

export const chatService = new ChatService();
