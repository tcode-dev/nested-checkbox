/**
 * Restorer
 * checkboxのon/offの状態を復元する
 */
export default class Restorer {
    /**
     * @constructor
     * @param {object} root HTMLElement
     * @param {object} parameters
     */
    constructor(root, parameters) {
        this.root = root;
        this.parameters = parameters;
    }

    /**
     * checkboxのon/offの状態を復元する
     */
    restore() {
        const event = new Event('change');

        this.parameters.forEach(([name, value]) => {
            value.forEach((code) => {
                const checkbox = this.root.querySelector(`[name="${name}"][value="${code}"]`);

                checkbox.checked = true;
                checkbox.dispatchEvent(event);
            });
        });
    }
}
