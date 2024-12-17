const HTMLPage = require("./data/HTMLPage");
const { performance } = require("perf_hooks");
let Window;

function testImportJSDOM() {
	const time1 = performance.now();
	Window = require("../../happy-dom/packages/happy-dom/cjs/index.cjs").Window;
	const time2 = performance.now();
	console.log(`HappyDOM Local -> Import: ${time2 - time1}ms`);
}

function parseHTML() {
	const time1 = performance.now();
	const window = new Window();
	window.document.write(HTMLPage);
	const time2 = performance.now();
	console.log(`HappyDOM Local -> Parse HTML: ${time2 - time1}ms`);
}

function serializeHTML() {
	const window = new Window();

	window.document.write(HTMLPage);

	const time1 = performance.now();

	const xmlSerializer = new window.XMLSerializer();

	xmlSerializer.serializeToString(window.document);
	const time2 = performance.now();
	console.log(`HappyDOM Local -> Serialize HTML: ${time2 - time1}ms`);
}

function getElementById() {
	const window = new Window();

	window.document.write(HTMLPage);

	const time1 = performance.now();
	window.document.getElementById(
		"limited-availability-truncate-true-compact-true"
	);
	window.document.getElementById(
		"limited-availability-truncate-true-compact-true"
	);
	const element = window.document.getElementById(
		"limited-availability-truncate-true-compact-true"
	);
	const time2 = performance.now();
	console.log(
		`HappyDOM Local -> getElementById('limited-availability-truncate-true-compact-true') found ${
			element ? 1 : 0
		} elements: ${time2 - time1}ms`
	);
}

function querySelectorAllLiElements() {
	const window = new Window();
	window.document.write(HTMLPage);
	const time1 = performance.now();
	window.document.querySelectorAll("li");
	window.document.querySelectorAll("li");
	const elements = window.document.querySelectorAll("li");
	const time2 = performance.now();
	console.log(
		`HappyDOM Local -> querySelectorAll('li') found ${
			elements.length
		} elements: ${time2 - time1}ms`
	);
}

function querySelectorAllClassElements() {
	const window = new Window();
	window.document.write(HTMLPage);
	const time1 = performance.now();
	window.document.querySelectorAll(".flex-shrink-0");
	window.document.querySelectorAll(".flex-shrink-0");
	const elements = window.document.querySelectorAll(".flex-shrink-0");
	const time2 = performance.now();
	console.log(
		`HappyDOM Local -> querySelectorAll('.flex-shrink-0') found ${
			elements.length
		} elements: ${time2 - time1}ms`
	);
}

function querySelectorAllAttributeElements() {
	const window = new Window();
	window.document.write(HTMLPage);
	const time1 = performance.now();
	window.document.querySelectorAll("[aria-label]");
	window.document.querySelectorAll("[aria-label]");
	const elements = window.document.querySelectorAll("[aria-label]");
	const time2 = performance.now();
	console.log(
		`HappyDOM Local -> querySelectorAll('[aria-label]') found ${
			elements.length
		} elements: ${time2 - time1}ms`
	);
}

function querySelectorAllAttributeContainsElements() {
	const window = new Window();
	window.document.write(HTMLPage);
	const time1 = performance.now();
	window.document.querySelectorAll('[class~="flex-shrink-0"]');
	window.document.querySelectorAll('[class~="flex-shrink-0"]');
	const elements = window.document.querySelectorAll(
		'[class~="flex-shrink-0"]'
	);
	const time2 = performance.now();
	console.log(
		`HappyDOM Local -> querySelectorAll('[class~="flex-shrink-0"]') found ${
			elements.length
		} elements: ${time2 - time1}ms`
	);
}

function querySelectorAllNthChildElements() {
	const window = new Window();
	window.document.write(HTMLPage);
	const time1 = performance.now();
	window.document.querySelectorAll(":nth-child(2n+1)");
	window.document.querySelectorAll(":nth-child(2n+1)");
	const elements = window.document.querySelectorAll(":nth-child(2n+1)");
	const time2 = performance.now();
	console.log(
		`HappyDOM Local -> querySelectorAll(':nth-child(2n+1)') found ${
			elements.length
		} elements: ${time2 - time1}ms`
	);
}

function renderCustomElement() {
	const time1 = performance.now();
	const window = new Window();
	global.HTMLElement = window.HTMLElement;
	window.customElements.define(
		"custom-element",
		require("./data/CustomElement")
	);
	window.document.write(`<custom-element attr1="value2" attr2="value2">
      <div>Test slot</div>
    </custom-element>`);
	const customElement = window.document.querySelector("custom-element");
	customElement.shadowRoot.innerHTML;
	delete global.HTMLElement;
	const time2 = performance.now();
	console.log(`HappyDOM Local -> Render custom element': ${time2 - time1}ms`);
}

testImportJSDOM();
parseHTML();
serializeHTML();
getElementById();
querySelectorAllLiElements();
querySelectorAllClassElements();
querySelectorAllAttributeElements();
querySelectorAllAttributeContainsElements();
querySelectorAllNthChildElements();
renderCustomElement();
