import API from '../const/API.json';
import ApiClient from '../module/ApiClient';

/**
 * Search
 */
export default class Search extends ApiClient {
    /**
     * @constructor
     */
    constructor() {
        super(API.SEARCH);
    }
}
