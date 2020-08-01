import Nester from './Nester';
import ParamExtractor from './ParamExtractor';
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
     * @example { layer2_cd: ['1-2'], layer3_cd: ['1-2-1', '1-2-2'] }
     */
    getSelectedParams() {
        const paramExtractor = new ParamExtractor(this.getState());

        return paramExtractor.getSelectedParams();
    }

    /**
     * チェックされたname属性のパラメータを取得する
     * 親が選択されている場合、子は含めない
     * @return {object}
     * @example { layer2_cd: ['1-2'] }
     */
    getSelectedParentParams() {
        const paramExtractor = new ParamExtractor(this.getState());

        return paramExtractor.getSelectedParentParams();
    }

    /**
     * チェック状態を取得する
     * @return {array}
     * @example
        [
            {
                name: 'layer1_cd',
                value: '1',
                isChecked: false,
                isIndeterminate: true,
                children: [
                    { name: 'layer2_cd', value: '1-1', isChecked: false, isIndeterminate: false, children: [] },
                    {
                        name: 'layer2_cd',
                        value: '1-2',
                        isChecked: true,
                        isIndeterminate: false,
                        children: [
                            {
                                name: 'layer3_cd',
                                value: '1-2-1',
                                isChecked: true,
                                isIndeterminate: false,
                                children: [],
                            },
                            {
                                name: 'layer3_cd',
                                value: '1-2-2',
                                isChecked: true,
                                isIndeterminate: false,
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ];
     */
    getState() {
        return [this.rootCheckbox.getState()];
    }

    /**
     * restore
     * @param {string | object} param
     * @example 'layer3_cd=1-2-1&layer3_cd=1-3-1&layer4_cd=1-3-2-1'
     * @example 'layer3_cd[]=1-2-2&layer4_cd[]=1-3-2-1&layer4_cd[]=1-3-2-3'
     * @example { layer3_cd: ['1-2-1', '1-3-1'], layer4_cd: ['1-3-2-1'] }
     */
    restore(param) {
        const restorer = new Restorer(this.root);

        restorer.restore(param);
    }

    /**
     * checkAll
     */
    checkAll() {
        this._chagneAll(true);
    }

    /**
     * uncheckAll
     */
    uncheckAll() {
        this._chagneAll(false);
    }

    /**
     * _chagneAll
     * @param {boolean} checked
     */
    _chagneAll(checked) {
        const event = new Event('change');

        this.rootCheckbox.check(checked);
        this.rootCheckbox.checkbox.dispatchEvent(event);
    }
}
