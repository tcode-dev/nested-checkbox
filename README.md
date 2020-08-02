# Nested Checkbox

Module for check/uncheck nested checkboxes.

## Demo

https://nested-checkbox.tkw.tokyo

<img src="https://user-images.githubusercontent.com/42083313/89112796-43c58f80-d4a3-11ea-9803-adf2bc68120b.gif" width="300">

## Installation

```bash
npm install @tkwtokyo/nested-checkbox
```

### Usage
```html
<ul>
    <li class="j-nestedCheckbox__group--layer1">
        <input type="checkbox" name="layer1_cd" value="1" class="j-nestedCheckbox__trigger--layer1">
        <ul>
            <li class="j-nestedCheckbox__group--layer2">
                <input type="checkbox" name="layer2_cd" value="1-1" class="j-nestedCheckbox__trigger--layer2">
            </li>
            <li class="j-nestedCheckbox__group--layer2">
                <input type="checkbox" name="layer2_cd" value="1-2" class="j-nestedCheckbox__trigger--layer2">
                <ul>
                    <li class="j-nestedCheckbox__group--layer3">
                        <input type="checkbox" name="layer3_cd" value="1-2-1" class="j-nestedCheckbox__trigger--layer3">
                    </li>
                    <li class="j-nestedCheckbox__group--layer3">
                        <input type="checkbox" name="layer3_cd" value="1-2-2" class="j-nestedCheckbox__trigger--layer3">
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
```

```js
import NestedCheckbox from '@tkwtokyo/nested-checkbox';

const SELECTOR = {
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
    ],
};

const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED);

nestedCheckbox.addEventListener();
```

## Methods

* init()
* addEventListener()
* removeEventListener()
* setCallback(function)
* pauseCallback()
* startCallback()
* getSelectedParams()
* getSelectedParentParams()
* getState()
* restore(param)
* checkAll()
* uncheckAll()


## License

[MIT](http://b4b4r07.mit-license.org)
