// {{{ isNotNullable
const isNotNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null || value !== undefined;
};
// }}}
// {{{ Props Type
type Props<V extends HTMLElement> = Partial<
  Omit<V, "style" | "classList" | "children" | "tagName">
> & {
  tag?: keyof HTMLElementTagNameMap;
  parent?: HTMLElement;
  txt?: string;
  style?: Partial<CSSStyleDeclaration>;
};

type PossibleChild = HTMLElement | BaseComponent<HTMLElement> | null;

type PossibleChildren = Array<PossibleChild>;
// }}}
// {{{ Class
export class BaseComponent<Z extends HTMLElement> {
  public node: Z;
  private children: PossibleChildren = [];

  constructor(p: Props<Z>, ...children: PossibleChildren) {
    p.txt && (p.textContent = p.txt);
    const node = document.createElement(p.tag ?? "div") as Z;
    Object.assign(node, p);
    this.node = node;
    if (p.style) {
      this.applyStyle(p.style);
    }

    if (children.length > 0) {
      this.appendChildren(children);
    }

    p.parent?.append(this.node);
  }
  public append(child: NonNullable<PossibleChild>): void {
    if (child instanceof BaseComponent) {
      this.node.append(child.node);
      this.children.push(child);
    } else {
      this.node.append(child);
    }
  }

  public appendChildren(possibleChildren: PossibleChildren): void {
    const children = possibleChildren.filter(isNotNullable);
    for (const child of children) {
      this.append(child);
    }
  }

  public setTextContent(text: string): void {
    this.node.textContent = text;
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public toggleClass(className: string, force?: boolean): void {
    this.node.classList.toggle(className, force);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public destroy(): void {
    this.node.remove();
  }

  public toString(): string {
    return this.node.outerHTML;
  }

  public appendTo(parent: HTMLElement): void {
    parent.append(this.node);
  }

  public on(event: string, callback: (e: Event) => void): void {
    this.node.addEventListener(event, callback);
  }

  public off(event: string, callback: (e: Event) => void): void {
    this.node.removeEventListener(event, callback);
  }

  public setAttribute(name: string, value: string): void {
    this.node.setAttribute(name, value);
  }

  public removeAttribute(name: string): void {
    this.node.removeAttribute(name);
  }

  protected applyStyle<K extends Partial<CSSStyleDeclaration>>(style: K): void {
    for (const key in style) {
      this.node.style[key] = style[key] || "";
    }
  }
}
// }}}
// {{{ toFc
export const toFc =
  <A extends ReadonlyArray<unknown>, B extends BaseComponent<HTMLElement>>(B: {
    new (...a: A): B;
  }) =>
  (...a: A) =>
    new B(...a);
// }}}
