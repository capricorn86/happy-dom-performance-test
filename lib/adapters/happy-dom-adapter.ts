import { loadLibrary } from '../utils/loader.ts';
import type { DOMAdapter } from '../types.ts';

export class HappyDOMAdapter implements DOMAdapter {
    private lib: any = null;
    private Window: any = null;

    reload(): void {
        // Already initialized, just return
        // Actual reload would require async which doesn't fit benchmark model
    }

    async initialize(): Promise<void> {
        this.lib = await loadLibrary('happy-dom');
        this.Window = this.lib.Window;
    }

    createDocument(html: string): any {
        const window = new this.Window();
        window.document.write(html);
        return window;
    }

    serializeDocument(doc: any): string {
        const xmlSerializer = new doc.XMLSerializer();
        return xmlSerializer.serializeToString(doc.document);
    }

    querySelector(doc: any, selector: string): any {
        return doc.document.querySelector(selector);
    }

    querySelectorAll(doc: any, selector: string): any {
        return doc.document.querySelectorAll(selector);
    }

    getElementById(doc: any, id: string): any {
        return doc.document.getElementById(id);
    }

    getElementsByClassName(doc: any, className: string): any {
        return doc.document.getElementsByClassName(className);
    }

    getElementsByTagName(doc: any, tagName: string): any {
        return doc.document.getElementsByTagName(tagName);
    }

    getLength(elements: any): number {
        return elements.length;
    }

    createElement(doc: any, tagName: string): any {
        return doc.document.createElement(tagName);
    }

    appendChild(doc: any, element: any): void {
        doc.document.body.appendChild(element);
    }

    setInnerHTML(element: any, html: string): void {
        element.innerHTML = html;
    }

    getInnerHTML(element: any): string {
        return element.innerHTML;
    }

    getBody(doc: any): any {
        return doc.document.body;
    }

    setAttribute(element: any, name: string, value: string): void {
        element.setAttribute(name, value);
    }

    classListAdd(element: any, className: string): void {
        element.classList.add(className);
    }

    classListRemove(element: any, className: string): void {
        element.classList.remove(className);
    }

    classListToggle(element: any, className: string): void {
        element.classList.toggle(className);
    }

    defineCustomElement(doc: any, name: string, elementClass: any): void {
        const originalHTMLElement = (global as any).HTMLElement;
        (global as any).HTMLElement = doc.HTMLElement;
        try {
            doc.customElements.define(name, elementClass);
        } finally {
            (global as any).HTMLElement = originalHTMLElement;
        }
    }
}
