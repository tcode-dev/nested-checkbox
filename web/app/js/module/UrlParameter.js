import querystring from 'querystring';

/**
 * UrlParameter
 */
export default class UrlParameter {
    /**
     * urlのクエリパラメータを取得する
     * @return {array}
     */
    getParameter() {
        const string = window.location.search.substring(1);
        const object = querystring.parse(string);

        return Array.from(
            Object.entries(object).map(([key, value]) => {
                // axiosの仕様で配列の場合keyに[]をつけて送るので取り除く
                const name = key.replace('[]', '');

                // querystringの仕様で単一keyは文字列、複数keyは配列が返される
                // データ構造を合わせるため単一keyを配列にして返す
                return [name, Array.isArray(value) ? value : [value]];
            })
        );
    }
}
