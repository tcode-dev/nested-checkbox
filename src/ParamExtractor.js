/**
 * ParamExtractor
 * ネストされたobjectからname属性とvalue属性を抽出する
 */
export default class ParamExtractor {
    /**
     * @constructor
     * @param {object} state
     */
    constructor(state) {
        this.state = state;
    }

    /**
     * 選択されたcheckboxをnameごとに分類して返す
     * @return {object}
     */
    getSelectedParams() {
        this.params = {};

        this._groupAllByName(this.state);

        return this.params;
    }

    /**
     * 選択されたcheckboxをnameごとに分類して返す
     * 親が選択されている場合、子は含めない
     * @return {object}
     */
    getSelectedParentParams() {
        this.params = {};
        this._groupByName(this.state);

        return this.params;
    }

    /**
     * ネストされたobjectの値をnameごとに分類する
     * @param {object} state
     */
    _groupAllByName(state) {
        state.forEach((checkbox) => {
            const { name, value, isChecked, children } = checkbox;

            if (isChecked) {
                if (!(name in this.params)) {
                    this.params[name] = [];
                }
                this.params[name].push(value);
            }

            this._groupAllByName(children);
        });
    }

    /**
     * ネストされたobjectの値をnameごとに分類する
     * @param {object} state
     */
    _groupByName(state) {
        state.forEach((checkbox) => {
            const { name, value, isChecked, children } = checkbox;

            if (isChecked) {
                if (!(name in this.params)) {
                    this.params[name] = [];
                }
                this.params[name].push(value);
            } else {
                this._groupByName(children);
            }
        });
    }
}
