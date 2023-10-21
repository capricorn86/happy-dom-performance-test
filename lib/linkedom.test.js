const HTMLPage = require('./data/HTMLPage');
const { performance } = require('perf_hooks');

function testImport() {
    const time1 = performance.now();
    parseHTML = require('linkedom').parseHTML;
    const time2 = performance.now();
    console.log(`linkedom -> Import: ${time2 - time1}ms`);
}

function parse() {
    const time1 = performance.now();
    parseHTML(HTMLPage);
    const time2 = performance.now();
    console.log(`linkedom -> Parse HTML: ${time2 - time1}ms`);
}

function serializeHTML() {
    const dom = parseHTML(HTMLPage);
    const time1 = performance.now();
    const serialized = dom.document.toString();
    const time2 = performance.now();
    console.log(`linkedom -> Serialize HTML (length = ${serialized.length}): ${time2 - time1}ms`);
}

function querySelectorAllLiElements() {
    const dom = parseHTML(HTMLPage);
    const time1 = performance.now();
    const elements = dom.window.document.querySelectorAll('li');
    const time2 = performance.now();
    console.log(`linkedom -> querySelectorAll('li') found ${elements.length} elements: ${time2 - time1}ms`);
}

function querySelectorAllClassElements() {
    const dom = parseHTML(HTMLPage);
    const time1 = performance.now();
    const elements = dom.window.document.querySelectorAll('.flex-shrink-0');
    const time2 = performance.now();
    console.log(`linkedom -> querySelectorAll('.flex-shrink-0') found ${elements.length} elements: ${time2 - time1}ms`);
}

function querySelectorAllAttributeElements() {
    const dom = parseHTML(HTMLPage);
    const time1 = performance.now();
    const elements = dom.window.document.querySelectorAll('[aria-label]');
    const time2 = performance.now();
    console.log(`linkedom -> querySelectorAll('[aria-label]') found ${elements.length} elements: ${time2 - time1}ms`);
}

function querySelectorAllAttributeContainsElements() {
    const dom = parseHTML(HTMLPage);
    const time1 = performance.now();
    const elements = dom.window.document.querySelectorAll('[class~="flex-shrink-0"]');
    const time2 = performance.now();
    console.log(`linkedom -> querySelectorAll('[class~="flex-shrink-0"]') found ${elements.length} elements: ${time2 - time1}ms`);
}

function querySelectorAllNthChildElements() {
    const dom = parseHTML(HTMLPage);
    const time1 = performance.now();
    const elements = dom.window.document.querySelectorAll(':nth-child(2n+1)');
    const time2 = performance.now();
    console.log(`linkedom -> querySelectorAll(':nth-child(2n+1)') found ${elements.length} elements: ${time2 - time1}ms`);
}

function renderCustomElement() {
    const time1 = performance.now();
    const dom = parseHTML(HTMLPage);
    const window = dom.window;
    global.HTMLElement = window.HTMLElement;
    window.customElements.define('custom-element', require('./data/CustomElement'));
    // window.document.write(HTMLPage);
    const customElement = window.document.querySelector('custom-element');
    customElement.shadowRoot.innerHTML;
    delete global.HTMLElement;
    const time2 = performance.now();
    console.log(`linkedom -> Render custom element': ${time2 - time1}ms`);
}

testImport();
parse();
serializeHTML();
querySelectorAllLiElements();
querySelectorAllClassElements();
querySelectorAllAttributeElements();
querySelectorAllAttributeContainsElements();
querySelectorAllNthChildElements();
renderCustomElement();