import cloneDeep from 'lodash/cloneDeep';
import CheckboxGroup from './CheckboxGroup';

/**
 * Nester
 * ネストされたcheckboxを再帰的に関連付ける
 */
export default class Nester extends CheckboxGroup {
    /**
     * @constructor
     * @param {array} selector
     * @param {object} parent HTMLElement
     */
    constructor(selector, parent) {
        const cloneSelector = cloneDeep(selector);
        const targetSelector = cloneSelector.shift();
        const checkbox = parent.querySelector(targetSelector.TRIGGER);
        const groupList = cloneSelector.length ? parent.querySelectorAll(cloneSelector[0].GROUP) : [];
        const children = Array.from(groupList).map((element) => {
            return new Nester(cloneSelector, element);
        });

        super(checkbox, children);
    }
}
