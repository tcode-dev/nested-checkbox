import API from '../const/API.json';
import ApiClient from '../module/ApiClient';
import NestedCheckbox from '../module/nestedCheckbox';
import Restorer from '../module/Restorer';
import AnimateCounter from '../module/AnimateCounter';
import UrlParameter from '../module/UrlParameter';

const SELECTOR = {
    ROOT: '#j-nestedCheckbox',
    SEARCH_RESULT: '#j-searchResult',
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
    ],
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

        this.nestedCheckbox = new NestedCheckbox(root, SELECTOR.NESTED);
        this.restorer = new Restorer(root, urlParameter.getParameter());
        this.searchApiClient = new ApiClient(API.SEARCH);
        this.animateCounter = new AnimateCounter(SELECTOR.SEARCH_RESULT);
    }

    /**
     * init
     */
    init() {
        this.nestedCheckbox.init();
        this.restorer.restore();
        this.nestedCheckbox.setCallback((params) => {
            this.request(params);
        });
        this.request();
    }

    /**
     * request
     */
    request() {
        this.searchApiClient.get(this.nestedCheckbox.getParameter()).then((result) => {
            this.searchApiCallback(result);
        });
    }

    /**
     * searchApiCallback
     * @param {object} result
     */
    searchApiCallback(result) {
        this.animateCounter.start(result.count);
    }
}

window.TopController = TopController;
