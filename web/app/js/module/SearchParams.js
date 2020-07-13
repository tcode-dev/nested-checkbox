import querystring from 'querystring';

/**
 * SearchParams
 */
export default class SearchParams {
    /**
     * @constructor
     * @param {string} parameter
     */
    constructor(parameter) {
        this.parameter = parameter;
    }
    /**
     * urlのクエリパラメータを取得する
     * @return {array}
     */
    parse() {
        const params = querystring.parse(this.parameter);

        return Array.from(
            Object.entries(params).map(([key, value]) => {
                // axiosの仕様で配列の場合keyに[]をつけて送るので取り除く
                const name = key.replace('[]', '');

                // querystringの仕様で単一keyは文字列、複数keyは配列が返される
                // データ構造を合わせるため単一keyを配列にして返す
                return [name, Array.isArray(value) ? value : [value]];
            })
        );
    }
}
