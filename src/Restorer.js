import SearchParams from './SearchParams';

/**
 * Restorer
 * checkboxのon/offの状態を復元する
 */
export default class Restorer {
    /**
     * checkboxのon/offの状態を復元する
     * @param {object} root HTMLElement
     * @param {object} parameters
     */
    restore(root, queryString) {
        const searchParams = new SearchParams(queryString);
        const params = searchParams.parse();
        const event = new Event('change');

        params.forEach(([name, value]) => {
            value.forEach((code) => {
                const checkbox = root.querySelector(`[name="${name}"][value="${code}"]`);

                if (!checkbox) return;

                checkbox.checked = true;
                checkbox.dispatchEvent(event);
            });
        });
    }
}
