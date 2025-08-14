// Utilitários para manipulação do DOM

export class DOMUtils {
  static createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string,
    textContent?: string
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  static createLink(href: string, text: string, className?: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    if (className) link.className = className;
    return link;
  }

  static appendChildren(parent: HTMLElement, ...children: HTMLElement[]): void {
    children.forEach(child => parent.appendChild(child));
  }

  static setStyles(element: HTMLElement, styles: Record<string, string>): void {
    Object.assign(element.style, styles);
  }
}

