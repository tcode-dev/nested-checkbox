import SearchParams from './SearchParams';

/**
 * Restorer
 * checkboxのon/offの状態を復元する
 */
export default class Restorer {
    /**
     * @constructor
     * @param {object} root HTMLElement
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * restore
     * @param {string | object} param
     */
    restore(param) {
        if (typeof param === 'string') {
            this._restoreByQueryString(param);
        } else {
            this._restoreByQueryMap(param);
        }
    }

    /**
     * queryStringから復元
     * @param {string} param
     */
    _restoreByQueryString(param) {
        const searchParams = new SearchParams();

        this._restoreByQueryMap(searchParams.parse(param));
    }

    /**
     * objectから復元
     * @param {object} param
     */
    _restoreByQueryMap(param) {
        const searchParams = new SearchParams();

        this._restore(searchParams.parse(param));
    }

    /**
     * checkboxのon/offの状態を復元する
     * @param {object} querySMap
     */
    _restore(querySMap) {
        const event = new Event('change');

        Object.entries(querySMap).forEach(([name, value]) => {
            value.forEach((code) => {
                const checkbox = this.root.querySelector(`[name="${name}"][value="${code}"]`);

                if (!checkbox) return;

                checkbox.checked = true;
                checkbox.dispatchEvent(event);
            });
        });
    }
}
