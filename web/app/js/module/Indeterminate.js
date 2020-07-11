/**
 * Indeterminate
 */
export default class Indeterminate {
    /**
     * @constructor
     * @param {object} root HTMLElement
     * @param {object} checkbox HTMLElement
     * @param {string} stateClass
     */
    constructor(root, checkbox, stateClass) {
        this.root = root;
        this.checkbox = checkbox;
        this.stateClass = stateClass;

        this._addEventListener();
    }

    /**
     * toggleClass
     */
    toggleClass() {
        this.root.classList.toggle(this.stateClass);
    }

    /**
     * イベントを登録する
     */
    _addEventListener() {
        this.checkbox.addEventListener('change', () => {
            this.toggleClass();
        });
    }
}
