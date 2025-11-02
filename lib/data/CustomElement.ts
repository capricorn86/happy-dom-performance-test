interface AttributeChange {
	name: string;
	oldValue: string | null;
	newValue: string | null;
}

/**
 * CustomElement test class factory.
 * Must be called with an HTMLElement base class.
 */
export default function createCustomElement(HTMLElement: any) {
	return class CustomElement extends HTMLElement {
		changedAttributes: AttributeChange[] = [];

		/**
		 * Returns a list of observed attributes.
		 *
		 * @return Observered attributes.
		 */
		static get observedAttributes() {
			return ['key1', 'key2'];
		}

		/**
		 * Constructor.
		 */
		constructor() {
			super();
			(this as any).attachShadow({ mode: 'open' });
		}

		/**
		 * @override
		 */
		attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
			this.changedAttributes.push({ name, oldValue, newValue });
		}

		/**
		 * @override
		 */
		connectedCallback() {
			(this as any).shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                div {
                    color: red;
                }
                .class1 {
                    color: blue;
                }
                .class1.class2 span {
                    color: green;
                }
                .class1[attr1="value1"] {
                    color: yellow;
                }
                [attr1="value1"] {
                    color: yellow;
                }
            </style>
            <div>
				<span>
					<div class="class1 class2" id="id">
						<!-- Comment 1 !-->
						<b>Bold</b>
						<!-- Comment 2 !-->
						<span><slot></slot></span>
					</div>
					<article class="class1 class2" id="id">
						<!-- Comment 1 !-->
						<b>Bold</b>
						<!-- Comment 2 !-->
					</article>
                </span>
            </div>
        `;
		}
	};
}