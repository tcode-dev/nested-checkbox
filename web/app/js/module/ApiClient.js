import axios from 'axios';

const CancelToken = axios.CancelToken;

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
        this.cancel = this._noop();
    }

    /**
     * get
     * @param {object} params
     */
    async get(params) {
        this.cancel();

        return new Promise((resolve, reject) => {
            axios
                .get(this.url, {
                    params,
                    cancelToken: new CancelToken((c) => {
                        this.cancel = c;
                    }),
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if (axios.isCancel(error)) return;

                    reject(error);
                })
                .finally(() => {
                    this.cancel = this._noop();
                });
        });
    }

    /**
     * _noop
     * @return {function}
     */
    _noop() {
        return () => {};
    }
}
