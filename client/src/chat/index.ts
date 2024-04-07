import { BaseComponent, toFc } from "../components/base-component";
import { Input } from "../components/input";
import { ChatService } from "./services";

export class ChatComponent extends BaseComponent<HTMLDivElement> {
  constructor(private chatService: ChatService) {
    const input = Input({ placeHolder: "send something to the server" });
    const messageP = new BaseComponent({
      tag: "p",
      className: "color-cyan-500",
    });

    super(
      { tag: "div", className: "items-center justify-center flex-col" },
      input,
      messageP,

      new BaseComponent<HTMLButtonElement>({
        onclick: () => chatService.send(input.getValue()),
        txt: "send",
        className: "bg-cyan-500 px-2",
      }),
    );
    this.chatService.on((message) => {
      messageP.setTextContent(message);
    });
  }
}

export const chat = toFc(ChatComponent);
