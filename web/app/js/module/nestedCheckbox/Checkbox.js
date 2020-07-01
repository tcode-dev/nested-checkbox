/**
 * Checkbox
 */
export default class Checkbox {
    /**
     * @constructor
     * @param {object} checkbox HTMLElement
     * @param {function} callback
     */
    constructor(checkbox, callback) {
        this.checkbox = checkbox;
        this.callback = callback;

        this._addEventListener();
    }

    /**
     * checkboxのon/offを設定する
     * @param {boolean} checked
     */
    check(checked) {
        this.checkbox.checked = checked;
    }

    /**
     * チェック状態を返す
     * @return {boolean}
     */
    isChecked() {
        return this.checkbox.checked;
    }

    /**
     * 名前を取得する
     * @return {string}
     */
    getName() {
        return this.checkbox.name;
    }

    /**
     * 値を取得する
     * @return {string}
     */
    getValue() {
        return this.checkbox.value;
    }

    /**
     * イベントを登録する
     */
    _addEventListener() {
        this.checkbox.addEventListener('change', (e) => {
            this.callback(e.target.checked);
        });
    }
}
