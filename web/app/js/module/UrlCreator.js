import querystring from 'querystring';

/**
 * UrlCreator
 */
export default class UrlCreator {
    /**
     * @constructor
     * @param {string} base
     * @param {object} params
     */
    constructor(base, params) {
        this.base = base;
        this.params = params;
    }

    /**
     * create
     * @return {string}
     */
    create() {
        const url = new URL(this.base);
        const query = querystring.stringify(this.params);

        return url.origin + (url.search ? `${url.search}&${query}` : `?${query}`);
    }
}
