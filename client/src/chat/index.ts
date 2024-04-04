import { BaseComponent, toFc } from "../components/base-component";
import { Input } from "../components/input";
import { ChatService } from "./services";

export class ChatComponent extends BaseComponent<HTMLDivElement> {
  constructor(private chatService: ChatService) {
    const input = Input({ placeHolder: "send something to the server" });
    const messageP = new BaseComponent({ tag: "p" });

    super(
      { tag: "div" },
      input,
      messageP,
      new BaseComponent<HTMLButtonElement>({
        onclick: () => chatService.send(input.getValue()),
        txt: "send",
      }),
    );
    this.chatService.on((message) => {
      messageP.setTextContent(message);
    });
  }
}

export const chat = toFc(ChatComponent);
