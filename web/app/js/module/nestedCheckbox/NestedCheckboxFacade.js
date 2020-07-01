import cloneDeep from 'lodash/cloneDeep';
import NestedCheckbox from './NestedCheckbox';

/**
 * NestedCheckboxFacade
 * ネストされたcheckboxを再帰的に関連付ける
 */
export default class NestedCheckboxFacade extends NestedCheckbox {
    /**
     * @constructor
     * @param {object} parent HTMLElement
     * @param {array} selector
     */
    constructor(parent, selector) {
        const cloneSelector = cloneDeep(selector);
        const targetSelector = cloneSelector.shift();
        const checkbox = parent.querySelector(targetSelector.TRIGGER);
        const groupList = cloneSelector.length ? parent.querySelectorAll(cloneSelector[0].GROUP) : [];
        const children = Array.from(groupList).map(element => {
            return new NestedCheckboxFacade(element, cloneSelector);
        });

        super(checkbox, children);
    }
}
