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
        this.isCallbackAvailable = false;
    }

    /**
     * init
     */
    init() {
        this.addEventListener();
    }

    /**
     * addEventListener
     */
    addEventListener() {
        const parent = this.root.querySelector(this.selector[0].GROUP);
        this.rootCheckbox = new Nester(this.selector, parent);
    }

    /**
     * removeEventListener
     */
    removeEventListener() {
        this.rootCheckbox.removeEventListener();
    }

    /**
     * checkboxの連動処理が終わったあとに呼ばれるcallbackを登録
     * @param {function} callback
     */
    setCallback(callback) {
        this.isCallbackAvailable = true;

        this.rootCheckbox.setCallback(() => {
            if (this.isCallbackAvailable) {
                callback();
            }
        });
    }

    /**
     * callbackを一時停止
     */
    pauseCallback() {
        this.isCallbackAvailable = false;
    }

    /**
     * callbackの一時停止を解除
     */
    startCallback() {
        this.isCallbackAvailable = true;
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

    /**
     * checkAll
     */
    checkAll() {
        this.chagneAll(true);
    }

    /**
     * uncheckAll
     */
    uncheckAll() {
        this.chagneAll(false);
    }

    /**
     * chagneAll
     * @param {boolean} checked
     */
    chagneAll(checked) {
        const event = new Event('change');

        this.rootCheckbox.check(checked);
        this.rootCheckbox.checkbox.dispatchEvent(event);
    }
}
