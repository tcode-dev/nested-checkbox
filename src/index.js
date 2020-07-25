import Nester from './Nester';
import ParameterBuilder from './ParameterBuilder';
import Restorer from './Restorer';

/**
 * Index
 */
export default class Index {
    /**
     * @constructor
     * @param {array} selector
     * @param {object} root HTMLElement
     */
    constructor(selector, root = window.document) {
        this.selector = selector;
        this.root = root;
    }

    /**
     * init
     */
    init() {
        const parent = this.root.querySelector(this.selector[0].GROUP);
        this.rootCheckbox = new Nester(this.selector, parent);
    }

    /**
     * setCallback
     * @param {function} callback
     */
    setCallback(callback = () => {}) {
        this.rootCheckbox.setCallback(() => {
            callback();
        });
    }

    /**
     * チェックされたname属性のパラメータを取得する
     * @return {object}
     */
    getParameter() {
        const parameterBuilder = new ParameterBuilder(this.getState());

        return parameterBuilder.build();
    }

    /**
     * チェック状態を取得する
     * @return {array}
     */
    getState() {
        return [this.rootCheckbox.getState()];
    }

    /**
     * restore
     * @param {string | object} param
     */
    restore(param) {
        const restorer = new Restorer(this.root);

        restorer.restore(param);
    }
}
