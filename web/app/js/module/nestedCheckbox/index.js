import NestedCheckboxFacade from './NestedCheckboxFacade';
import ParameterBuilder from './ParameterBuilder';

/**
 * NestedCheckboxManager
 */
export default class NestedCheckboxManager {
    /**
     * @constructor
     * @param {object} root HTMLElement
     * @param {array} selector
     */
    constructor(root, selector) {
        this.root = root;
        this.selector = selector;
    }

    /**
     * init
     */
    init() {
        const parent = this.root.querySelector(this.selector[0].GROUP);
        this.rootCheckbox = new NestedCheckboxFacade(parent, this.selector);
    }

    /**
     * setCallback
     * @param {function} callback
     */
    setCallback(callback = () => {}) {
        this.rootCheckbox.setCallback(() => {
            callback(this._getParameter());
        });
    }

    /**
     * チェックされたname属性のパラメータを取得する
     * @return {object}
     */
    _getParameter() {
        const builder = new ParameterBuilder(this._getState());

        return builder.build();
    }

    /**
     * チェック状態を取得する
     * @return {array}
     */
    _getState() {
        return [this.rootCheckbox.getState()];
    }
}
