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
    }

    /**
     * init
     */
    init() {
        this._addEventListener();
    }

    /**
     * _toggleClass
     */
    _toggleClass() {
        this.root.classList.toggle(this.stateClass);
    }

    /**
     * イベントを登録する
     */
    _addEventListener() {
        this.checkbox.addEventListener('change', () => {
            this._toggleClass();
        });
    }
}
