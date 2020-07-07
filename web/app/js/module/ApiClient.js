import axios from 'axios';

/**
 * ApiClient
 */
export default class ApiClient {
    /**
     * @constructor
     * @param {string} url
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * get
     * @param {object} params
     */
    get(params) {
        return new Promise((resolve, reject) => {
            axios
                .get(this.url, { params })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('ERROR!! occurred in Backend.');
                });
        });
    }
}
