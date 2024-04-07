type Listener = (message: string) => void;

export class ChatService {
  private listeners: Listener[] = [];
  private ws: WebSocket = new WebSocket(import.meta.env.VITE_WS_URL);
  private isOpened = false;

  constructor() {
    this.ws.onopen = () => {
      this.isOpened = true;
      console.log("connected to websocket");
    };

    this.ws.onmessage = (msg) => {
      console.log(msg);
      this.listeners.forEach((listener) => listener(msg.data));
    };

    this.ws.onclose = () => {
      this.isOpened = false;
    };
  }

  on(listener: Listener) {
    this.listeners.push(listener);
  }

  send(msg: string) {
    if (!this.isOpened) {
      return;
    }

    this.ws.send(msg);
  }
}

export const chatService = new ChatService();
