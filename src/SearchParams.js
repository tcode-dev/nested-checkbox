import querystring from 'querystring';

/**
 * SearchParams
 */
export default class SearchParams {
    /**
     * urlのクエリパラメータを取得する
     * @param {string | object} param
     * @return {object}
     */
    parse(param) {
        if (typeof param === 'string') {
            return this._parseByQueryString(param);
        }

        return this._parseByQueryMap(param);
    }

    /**
     * _parseByQueryMap
     * @param {string} param
     * @return {object}
     */
    _parseByQueryString(param) {
        return this._parseByQueryMap(querystring.parse(param));
    }

    /**
     * _parseByQueryMap
     * @param {object} params
     * @return {object}
     */
    _parseByQueryMap(params) {
        return Array.from(Object.entries(params)).reduce((accumulator, [key, value]) => {
            // 配列の場合[]を取り除く
            const name = key.replace('[]', '');

            // querystringの仕様で単一keyは文字列、複数keyは配列が返される
            // データ構造を合わせるため単一keyを配列にして返す
            const map = {
                [name]: Array.isArray(value) ? value : [value],
            };

            return Object.assign({}, accumulator, map);
        }, {});
    }
}
