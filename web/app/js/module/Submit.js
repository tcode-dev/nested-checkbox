import querystring from 'querystring';

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
     *
     */
    init() {
        this._addEventListener();
    }

    /**
     * urlのクエリパラメータを取得する
     * @return {array}
     */
    _addEventListener() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const query = querystring.stringify(this.callback());
            const url = new URL(this.form.action);
            const href = url.origin + (url.search ? `${url.search}&${query}` : `?${query}`);

            location.assign(href);
        });
    }
}
