/**
 * SearchResultsUpdater
 */
export default class SearchResultsUpdater {
    /**
     * @constructor
     * @param {string} selector
     */
    constructor(selector) {
        this.target = document.querySelector(selector);
    }

    /**
     * update
     * @param {object} result
     */
    update(result) {
        this.target.textContent = result.count;
    }
}
