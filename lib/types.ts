export interface BenchmarkResult {
    name: string;
    time: number;
    count?: number;
}

export interface BenchmarkOptions {
    library: string | null;
    useLocal: boolean;
    compare: boolean;
    help?: boolean;
}

export interface BenchmarkMetadata {
    count?: number;
}

export interface DOMAdapter {
    reload(): void;
    createDocument(html: string): any;
    serializeDocument(doc: any): string;
    querySelector(doc: any, selector: string): any;
    querySelectorAll(doc: any, selector: string): any;
    getElementById(doc: any, id: string): any;
    getElementsByClassName(doc: any, className: string): any;
    getElementsByTagName(doc: any, tagName: string): any;
    getLength(elements: any): number;
    createElement(doc: any, tagName: string): any;
    appendChild(doc: any, element: any): void;
    setInnerHTML(element: any, html: string): void;
    getInnerHTML(element: any): string;
    getBody(doc: any): any;
    setAttribute(element: any, name: string, value: string): void;
    classListAdd(element: any, className: string): void;
    classListRemove(element: any, className: string): void;
    classListToggle(element: any, className: string): void;
    defineCustomElement(doc: any, name: string, elementClass: any): void;
}

export interface Benchmark {
    name: string;
    fn: (lib: DOMAdapter) => BenchmarkMetadata | void | Promise<BenchmarkMetadata | void>;
}
