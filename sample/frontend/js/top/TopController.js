import AnimateCounter from '../module/AnimateCounter';
import API from '../const/API.json';
import ApiClient from '../module/ApiClient';
import Indeterminate from '../module/Indeterminate';
import NestedCheckbox from '@tcode-dev/nested-checkbox';
import PageTransition from '../module/PageTransition';
import Submit from '../module/Submit';

const SELECTOR = {
    ROOT: '#j-form',
    NESTED_CHECKBOX: '#j-nestedCheckbox',
    SEARCH_RESULT: '#j-searchResult',
    INDETERMINATE: '#j-indeterminate',
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
        this.root = window.document.querySelector(SELECTOR.ROOT);
        this.indeterminate = new Indeterminate(
            this.root,
            this.root.querySelector(SELECTOR.INDETERMINATE),
            SELECTOR.STATE.INDETERMINATE
        );
        this.nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, this.root.querySelector(SELECTOR.NESTED_CHECKBOX));
        this.searchApi = new ApiClient(API.SEARCH);
        this.animateCounter = new AnimateCounter(this.root.querySelector(SELECTOR.SEARCH_RESULT));
        this.submit = new Submit(this.root, () => this.onSubmitCallback());
        this.pageTransition = new PageTransition(`${this.root.action}?`);
    }

    /**
     * init
     */
    init() {
        this.nestedCheckbox.init();
        this.nestedCheckbox.restore(window.location.search.substring(1));
        this.request();
        this.submit.init();
        this.indeterminate.init();
        this.nestedCheckbox.setCallback(() => this.onChangeCallback());
    }

    /**
     * request
     */
    request() {
        this.searchApi
            .get(this.nestedCheckbox.getSelectedParentParams())
            .then((result) => this.searchApiCallback(result))
            .catch(() => this.searchApiCallback({ count: 0 }));
    }

    /**
     * searchApiCallback
     * @param {object} result
     */
    searchApiCallback(result) {
        this.animateCounter.start(result.count);
    }

    /**
     * onChangeCallback
     */
    onChangeCallback() {
        this.request();
    }

    /**
     * onSubmitCallback
     */
    onSubmitCallback() {
        this.pageTransition.transition(this.nestedCheckbox.getSelectedParentParams());
    }
}

window.TopController = TopController;
