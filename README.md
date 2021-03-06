# Nested Checkbox

Module for check/uncheck nested checkboxes.

## Demo

<img src="https://user-images.githubusercontent.com/42083313/126348576-719536dc-ddb8-436b-bf7b-ffe3a779a208.gif" width="300">

## Installation

```bash
npm install @tcode-dev/nested-checkbox
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
import NestedCheckbox from '@tcode-dev/nested-checkbox';

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

nestedCheckbox.init();
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
