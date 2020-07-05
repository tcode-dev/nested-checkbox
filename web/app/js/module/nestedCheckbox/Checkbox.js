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
     * checked状態を更新する
     * @param {boolean} checked
     */
    check(checked) {
        this.checkbox.checked = checked;
    }

    /**
     * indeterminate状態を更新する
     * @param {boolean} checked
     */
    indeterminate(indeterminate) {
        this.checkbox.indeterminate = indeterminate;
    }

    /**
     * チェック状態を返す
     * @return {boolean}
     */
    isChecked() {
        return this.checkbox.checked;
    }

    /**
     * indeterminate状態を返す
     * @return {boolean}
     */
    isIndeterminate() {
        return this.checkbox.indeterminate;
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
