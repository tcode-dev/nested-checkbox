import Checkbox from './Checkbox';

/**
 * CheckboxGroup
 * 親と子のcheckboxを関連付ける
 */
export default class CheckboxGroup extends Checkbox {
    /**
     * @constructor
     * @param {object} checkbox HTMLElement
     * @param {array} children このclassを継承したclassのインスタンス
     */
    constructor(checkbox, children) {
        super(checkbox, (checked) => this._onChange(checked));

        this.children = children;
        this.notifyParent = () => {};

        this._receiveChildNotice();
    }

    /**
     * チェック状態を取得する
     * @return {object}
     */
    getState() {
        return {
            name: this.getName(),
            value: this.getValue(),
            isChecked: this.isChecked(),
            isIndeterminate: this.isIndeterminate(),
            children: this.children.map((child) => child.getState()),
        };
    }

    /**
     * 親に通知するcallbackを設定する
     * @param {function} callback
     */
    setCallback(callback) {
        this.notifyParent = callback;
    }

    /**
     * イベントを解除する
     */
    removeEventListener() {
        super.removeEventListener();
        this.children.forEach((child) => {
            child.removeEventListener();
        });
    }

    /**
     * 子を更新する
     * @param {boolean} checked
     */
    notifyChildren(checked) {
        this.children.forEach((child) => {
            child.indeterminate(false);
            child.check(checked);
            child.notifyChildren(checked);
        });
    }

    /**
     * 親を更新する
     * @param {boolean} checked
     */
    _notifyParentCallback(checked) {
        this._updateChecked(checked);
        this._updateIndeterminate();
        this.notifyParent(checked);
    }

    /**
     * checked状態を更新する
     * @param {boolean} checked
     */
    _updateChecked(checked) {
        const needsChecked = this._needsChecked(checked);

        if (!needsChecked) return;

        this.check(checked);
    }

    /**
     * indeterminate状態を更新する
     */
    _updateIndeterminate() {
        const indeterminate = this._isIndeterminate();

        this.indeterminate(indeterminate);
    }

    /**
     * checked状態を更新する必要があるか判定する
     * @param {boolean} checked
     * @return {boolean} 更新する必要がある場合true
     */
    _needsChecked(checked) {
        // 親のチェックボックスがonのとき、子のチェックボックスがoffになった場合
        if (!checked && this.isChecked()) return true;

        // すべての子のチェックボックスがonになった場合
        if (checked && this.children.every((child) => child.isChecked())) return true;

        return false;
    }

    /**
     * checked状態からindeterminate状態を取得する
     * @return {boolean}
     */
    _isIndeterminate() {
        // 子のチェックボックスが一つ以上on、一つ以上offの場合
        if (this.children.some((child) => child.isChecked()) && this.children.some((child) => !child.isChecked())) {
            return true;
        }

        // 子のindeterminateが一つ以上trueの場合
        if (this.children.some((child) => child.isIndeterminate())) return true;

        return false;
    }

    /**
     * 子の通知を受け取る
     */
    _receiveChildNotice() {
        this.children.forEach((child) => {
            child.setCallback((checked) => {
                this._notifyParentCallback(checked);
            });
        });
    }

    /**
     * checkboxが更新されたときの処理
     * @param {boolean} checked
     */
    _onChange(checked) {
        this.notifyChildren(checked);
        this.notifyParent(checked);
    }
}
