import querystring from 'querystring';

/**
 * PageTransition
 */
export default class PageTransition {
    /**
     * @constructor
     * @param {string} url
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * 遷移する
     * @param {object} params
     */
    transition(params) {
        const query = querystring.stringify(params);

        window.location.assign(`${this.url}${query}`);
    }
}
