import HTMLPage from '../data/HTMLPage.ts';
import createCustomElement from '../data/CustomElement.ts';
import type { Benchmark, DOMAdapter, BenchmarkMetadata } from '../types.ts';

export function getBenchmarks(): Benchmark[] {
    return [
        { name: 'Import Library', fn: benchImport },
        { name: 'Parse HTML', fn: benchParseHTML },
        { name: 'Serialize HTML', fn: benchSerializeHTML },
        { name: 'querySelector (simple)', fn: (lib) => benchQuerySelector(lib, 'div') },
        { name: 'querySelectorAll (tag)', fn: (lib) => benchQuerySelectorAll(lib, 'li') },
        { name: 'querySelectorAll (class)', fn: (lib) => benchQuerySelectorAll(lib, '.flex-shrink-0') },
        { name: 'querySelectorAll (attribute)', fn: (lib) => benchQuerySelectorAll(lib, '[aria-label]') },
        { name: 'querySelectorAll (attribute contains)', fn: (lib) => benchQuerySelectorAll(lib, '[class~="flex-shrink-0"]') },
        { name: 'querySelectorAll (nth-child)', fn: (lib) => benchQuerySelectorAll(lib, ':nth-child(2n+1)') },
        { name: 'getElementById', fn: benchGetElementById },
        { name: 'getElementsByClassName', fn: benchGetElementsByClassName },
        { name: 'getElementsByTagName', fn: benchGetElementsByTagName },
        { name: 'createElement + append', fn: benchCreateElement },
        { name: 'innerHTML (set)', fn: benchSetInnerHTML },
        { name: 'innerHTML (get)', fn: benchGetInnerHTML },
        { name: 'setAttribute', fn: benchSetAttribute },
        { name: 'classList operations', fn: benchClassList },
        { name: 'Custom Element', fn: benchCustomElement },
    ];
}

function benchImport(lib: DOMAdapter): void {
    lib.reload();
}

function benchParseHTML(lib: DOMAdapter): void {
    lib.createDocument(HTMLPage);
}

function benchSerializeHTML(lib: DOMAdapter): void {
    const doc = lib.createDocument(HTMLPage);
    lib.serializeDocument(doc);
}

function benchQuerySelector(lib: DOMAdapter, selector: string): void {
    const doc = lib.createDocument(HTMLPage);
    lib.querySelector(doc, selector);
}

function benchQuerySelectorAll(lib: DOMAdapter, selector: string): BenchmarkMetadata {
    const doc = lib.createDocument(HTMLPage);
    const elements = lib.querySelectorAll(doc, selector);
    return { count: lib.getLength(elements) };
}

function benchGetElementById(lib: DOMAdapter): BenchmarkMetadata {
    const doc = lib.createDocument(HTMLPage);
    for (let i = 0; i < 100; i++) {
        lib.getElementById(doc, 'some-id');
    }
    return { count: 100 };
}

function benchGetElementsByClassName(lib: DOMAdapter): BenchmarkMetadata {
    const doc = lib.createDocument(HTMLPage);
    const elements = lib.getElementsByClassName(doc, 'flex-shrink-0');
    return { count: lib.getLength(elements) };
}

function benchGetElementsByTagName(lib: DOMAdapter): BenchmarkMetadata {
    const doc = lib.createDocument(HTMLPage);
    const elements = lib.getElementsByTagName(doc, 'li');
    return { count: lib.getLength(elements) };
}

function benchCreateElement(lib: DOMAdapter): BenchmarkMetadata {
    const doc = lib.createDocument('<html><body></body></html>');
    for (let i = 0; i < 1000; i++) {
        const div = lib.createElement(doc, 'div');
        lib.appendChild(doc, div);
    }
    return { count: 1000 };
}

function benchSetInnerHTML(lib: DOMAdapter): void {
    const doc = lib.createDocument('<html><body><div id="target"></div></body></html>');
    const target = lib.getElementById(doc, 'target');
    const html = '<p>Test</p>'.repeat(100);
    lib.setInnerHTML(target, html);
}

function benchGetInnerHTML(lib: DOMAdapter): void {
    const doc = lib.createDocument(HTMLPage);
    lib.getInnerHTML(lib.getBody(doc));
}

function benchSetAttribute(lib: DOMAdapter): BenchmarkMetadata {
    const doc = lib.createDocument('<html><body><div id="target"></div></body></html>');
    const target = lib.getElementById(doc, 'target');
    for (let i = 0; i < 1000; i++) {
        lib.setAttribute(target, 'data-test', `value-${i}`);
    }
    return { count: 1000 };
}

function benchClassList(lib: DOMAdapter): BenchmarkMetadata {
    const doc = lib.createDocument('<html><body><div id="target" class="foo"></div></body></html>');
    const target = lib.getElementById(doc, 'target');
    for (let i = 0; i < 1000; i++) {
        lib.classListAdd(target, 'bar');
        lib.classListRemove(target, 'bar');
        lib.classListToggle(target, 'baz');
    }
    return { count: 3000 };
}

function benchCustomElement(lib: DOMAdapter): void {
    try {
        const doc = lib.createDocument(HTMLPage);
        const CustomElement = createCustomElement((doc as any).HTMLElement || (doc as any).window.HTMLElement);
        lib.defineCustomElement(doc, 'custom-element', CustomElement);
        const customElement = lib.querySelector(doc, 'custom-element');
        if (customElement && customElement.shadowRoot) {
            const html = customElement.shadowRoot.innerHTML;
        }
    } catch (error) {
        // Some libraries may not fully support custom elements
    }
}
