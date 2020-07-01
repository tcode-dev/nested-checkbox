import Checkbox from './Checkbox';

/**
 * NestedCheckbox
 * 親と子のcheckboxを関連付ける
 */
export default class NestedCheckbox extends Checkbox {
    /**
     * @constructor
     * @param {object} checkbox HTMLElement
     * @param {array} children NestedCheckboxを継承したclassのインスタンス
     */
    constructor(checkbox, children) {
        super(checkbox, (checked) => this._onChange(checked));

        this.children = children;
        this.notifyParent = () => { };

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
            children: this.children.map(child => child.getState()),
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
     * 子を更新する
     * @param {boolean} checked
     */
    notifyChildren(checked) {
        this.children.forEach(child => {
            child.check(checked)
            child.notifyChildren(checked);
        });
    }

    /**
     * 親を更新する
     * @param {boolean} checked
     * @param {boolean} unnecessary 更新する必要がない場合true
     */
    _notifyParentCallback(checked, unnecessary = false) {
        const needs = this._needsNotifyParent(checked, unnecessary);

        if (needs) {
            this.check(checked);
        }

        this.notifyParent(checked, !needs);
    }

    /**
     * 親を更新する必要があるか判定する
     * @param {boolean} checked
     * @param {boolean} unnecessary 更新する必要がない場合true
     * @return {boolean} 更新する必要がある場合true
     */
    _needsNotifyParent(checked, unnecessary) {
        // 更新する必要がない場合
        if (unnecessary) return false;

        // 親のチェックボックスがonのとき、子のチェックボックスがoffになった場合
        if (!checked && this.isChecked()) return true;

        // すべての子のチェックボックスがonになった場合
        if (checked && this.children.every(child => child.isChecked())) return true;

        return false;
    }

    /**
     * 子の通知を受け取る
     */
    _receiveChildNotice() {
        this.children.forEach(child => {
            child.setCallback((checked, unnecessary) => {
                this._notifyParentCallback(checked, unnecessary);
            });
        })
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
