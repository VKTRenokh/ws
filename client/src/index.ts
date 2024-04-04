import { chat } from "./chat";
import { chatService } from "./chat/services";
import { BaseComponent } from "./components/base-component";

class Application extends BaseComponent<HTMLDivElement> {
  constructor(parent: HTMLElement) {
    super({ parent, tag: "div" });
    chat(chatService).appendTo(this.node);
  }
}

new Application(document.getElementById("app")!);

console.log(import.meta.env.VITE_API_URL);
