import AnimateCounter from '../module/AnimateCounter';
import API from '../const/API.json';
import ApiClient from '../module/ApiClient';
import Indeterminate from '../module/Indeterminate';
import NestedCheckbox from '../module/nestedCheckbox';
import querystring from 'querystring';
import Restorer from '../module/Restorer';
import SearchParams from '../module/SearchParams';
import Submit from '../module/Submit';

const SELECTOR = {
    ROOT: '#j-form',
    NESTED_CHECKBOX: '#j-nestedCheckbox',
    SEARCH_RESULT: '#j-searchResult',
    INDETERMINATE: '#j-indeterminate',
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
    STATE: {
        INDETERMINATE: 'is-indeterminateEnabled',
    },
};

/**
 * TopController
 */
class TopController {
    /**
     * @constructor
     */
    constructor() {
        const searchParams = new SearchParams(location.search.substring(1));

        this.root = document.querySelector(SELECTOR.ROOT);
        this.indeterminate = new Indeterminate(
            this.root,
            this.root.querySelector(SELECTOR.INDETERMINATE),
            SELECTOR.STATE.INDETERMINATE
        );
        this.nestedCheckbox = new NestedCheckbox(this.root.querySelector(SELECTOR.NESTED_CHECKBOX), SELECTOR.NESTED);
        this.restorer = new Restorer(this.root, searchParams.parse());
        this.searchApi = new ApiClient(API.SEARCH);
        this.animateCounter = new AnimateCounter(this.root.querySelector(SELECTOR.SEARCH_RESULT));
        this.submit = new Submit(this.root, () => {
            return this.submitCallback();
        });
    }

    /**
     * init
     */
    init() {
        this.nestedCheckbox.init();
        this.restorer.restore();
        this.request();
        this.submit.init();
        this.indeterminate.init();
        this.nestedCheckbox.setCallback(() => {
            this.request();
        });
    }

    /**
     * request
     */
    request() {
        this.searchApi
            .get(this.nestedCheckbox.getParameter())
            .then((result) => {
                this.searchApiCallback(result);
            })
            .catch(() => {
                this.searchApiCallback({ count: 0 });
            });
    }

    /**
     * searchApiCallback
     * @param {object} result
     */
    searchApiCallback(result) {
        this.animateCounter.start(result.count);
    }

    /**
     * submitCallback
     * @return object
     */
    submitCallback() {
        const object = this.nestedCheckbox.getParameter();
        const string = querystring.stringify(object);

        location.assign(`${this.root.action}?${string}`);
    }
}

window.TopController = TopController;
