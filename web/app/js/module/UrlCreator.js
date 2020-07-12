import querystring from 'querystring';

/**
 * UrlCreator
 * urlにgetパラメータを付加する
 */
export default class UrlCreator {
    /**
     * @constructor
     * @param {string} base
     * @param {object} params
     */
    constructor(url, params) {
        this.url = url;
        this.query = querystring.stringify(params);
    }

    /**
     * create
     * @return {string}
     */
    create() {
        return `${this.url}${this.getDelimiter()}${this.query}`;
    }

    /**
     * getDelimiter
     * @return {string}
     */
    getDelimiter() {
        const url = new URL(this.url);

        return url.search ? '&' : '?';
    }
}
