import NestedCheckboxManager from '../module/nestedCheckbox';
import querystring from 'querystring';
import UrlParameter from '../module/UrlParameter';
import Restorer from '../module/Restorer';

const SELECTOR = {
    ROOT: '#j-nestedCheckbox',
    // 上の階層から定義する
    NESTED: [
        {
            GROUP: '.j-nestedCheckbox__group--layer1',
            TRIGGER: '.j-nestedCheckbox__trigger--layer1',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer2',
            TRIGGER: '.j-nestedCheckbox__trigger--layer2',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer3',
            TRIGGER: '.j-nestedCheckbox__trigger--layer3',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer4',
            TRIGGER: '.j-nestedCheckbox__trigger--layer4',
        },
    ]
};

/**
 * TopController
 */
class TopController {
    /**
     * @constructor
     */
    constructor() {
        const root = document.querySelector(SELECTOR.ROOT);
        const urlParameter = new UrlParameter();

        this.nestedCheckboxManager = new NestedCheckboxManager(root, SELECTOR.NESTED);
        this.restorer = new Restorer(root, urlParameter.getParameter());
    }

    /**
     * init
     */
    init() {
        this.nestedCheckboxManager.init();
        this.restorer.restore();
        this.nestedCheckboxManager.setCallback((params) => {
            this.callback(params);
        });
    }

    /**
     * callback
     * @param {object} params
     */
    callback(params) {
        console.log(params);
        console.log(querystring.stringify(params));
    }
}

window.TopController = TopController;
