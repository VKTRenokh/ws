import { BaseComponent, toFc } from "../base-component";

type Props = {
  initialValue?: string;
  placeHolder?: string;
};

export class InputComponent extends BaseComponent<HTMLInputElement> {
  constructor(props: Props) {
    super({
      tag: "input",
      placeholder: props.placeHolder ?? "",
      value: props.initialValue ?? "",
    });
  }

  public getValue(): string {
    return this.node.value;
  }

  public getValueAsNumber() {
    return this.node.valueAsNumber;
  }

  public getValueAsDate() {
    return this.node.valueAsDate;
  }
}

export const Input = toFc(InputComponent);
