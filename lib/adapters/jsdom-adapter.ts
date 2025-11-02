import { loadLibrary } from '../utils/loader.ts';
import type { DOMAdapter } from '../types.ts';

export class JSDOMAdapter implements DOMAdapter {
    private lib: any = null;
    private JSDOM: any = null;

    reload(): void {
        // Already initialized, just return
        // Actual reload would require async which doesn't fit benchmark model
    }

    async initialize(): Promise<void> {
        this.lib = await loadLibrary('jsdom');
        this.JSDOM = this.lib.JSDOM;
    }

    createDocument(html: string): any {
        return new this.JSDOM(html);
    }

    serializeDocument(doc: any): string {
        const xmlSerializer = new doc.window.XMLSerializer();
        return xmlSerializer.serializeToString(doc.window.document);
    }

    querySelector(doc: any, selector: string): any {
        return doc.window.document.querySelector(selector);
    }

    querySelectorAll(doc: any, selector: string): any {
        return doc.window.document.querySelectorAll(selector);
    }

    getElementById(doc: any, id: string): any {
        return doc.window.document.getElementById(id);
    }

    getElementsByClassName(doc: any, className: string): any {
        return doc.window.document.getElementsByClassName(className);
    }

    getElementsByTagName(doc: any, tagName: string): any {
        return doc.window.document.getElementsByTagName(tagName);
    }

    getLength(elements: any): number {
        return elements.length;
    }

    createElement(doc: any, tagName: string): any {
        return doc.window.document.createElement(tagName);
    }

    appendChild(doc: any, element: any): void {
        doc.window.document.body.appendChild(element);
    }

    setInnerHTML(element: any, html: string): void {
        element.innerHTML = html;
    }

    getInnerHTML(element: any): string {
        return element.innerHTML;
    }

    getBody(doc: any): any {
        return doc.window.document.body;
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
        (global as any).HTMLElement = doc.window.HTMLElement;
        try {
            doc.window.customElements.define(name, elementClass);
        } finally {
            (global as any).HTMLElement = originalHTMLElement;
        }
    }
}
