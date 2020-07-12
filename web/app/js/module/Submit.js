/**
 * Submit
 */
export default class Submit {
    /**
     * @constructor
     * @param {object} form HTMLElement
     * @param {function} callback
     */
    constructor(form, callback) {
        this.form = form;
        this.callback = callback;
    }

    /**
     * init
     */
    init() {
        this._addEventListener();
    }

    /**
     * イベントを登録する
     */
    _addEventListener() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.callback();
        });
    }
}
