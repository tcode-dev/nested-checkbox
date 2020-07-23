/**
 * ParameterBuilder
 * apiに必要なパラメータを取得する
 */
export default class ParameterBuilder {
    constructor(state) {
        this.state = state;
        this.params = {};
    }

    /**
     * 選択されたcheckboxをnameごとに分類して返す
     * @return {object}
     */
    build() {
        this._groupByName(this.state);

        return this.params;
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
