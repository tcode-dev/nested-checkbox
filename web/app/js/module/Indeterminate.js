/**
 * Indeterminate
 */
export default class Indeterminate {
    /**
     * @constructor
     * @param {object} target HTMLElement
     * @param {object} checkbox HTMLElement
     * @param {string} stateClass
     */
    constructor(target, checkbox, stateClass) {
        this.target = target;
        this.checkbox = checkbox;
        this.stateClass = stateClass;

        this._addEventListener();
    }

    /**
     * toggleClass
     */
    toggleClass() {
        this.target.classList.toggle(this.stateClass);
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
