const layer1 = {
    group: 'j-nestedCheckbox__group--layer1',
    trigger: 'j-nestedCheckbox__trigger--layer1',
    name: 'layer1_cd',
};
const layer2 = {
    group: 'j-nestedCheckbox__group--layer2',
    trigger: 'j-nestedCheckbox__trigger--layer2',
    name: 'layer2_cd',
};
const layer3 = {
    group: 'j-nestedCheckbox__group--layer3',
    trigger: 'j-nestedCheckbox__trigger--layer3',
    name: 'layer3_cd',
};
const layer4 = {
    group: 'j-nestedCheckbox__group--layer4',
    trigger: 'j-nestedCheckbox__trigger--layer4',
    name: 'layer4_cd',
};
const list = [
    {
        layer: layer1,
        value: '1',
        children: [
            {
                layer: layer2,
                value: '1-1',
                children: [],
            },
            {
                layer: layer2,
                value: '1-2',
                children: [
                    {
                        layer: layer3,
                        value: '1-2-1',
                        children: [],
                    },
                    {
                        layer: layer3,
                        value: '1-2-2',
                        children: [],
                    },
                ],
            },
            {
                layer: layer2,
                value: '1-3',
                children: [
                    {
                        layer: layer3,
                        value: '1-3-1',
                        children: [],
                    },
                    {
                        layer: layer3,
                        value: '1-3-2',
                        children: [
                            {
                                layer: layer4,
                                value: '1-3-2-1',
                                children: [],
                            },
                            {
                                layer: layer4,
                                value: '1-3-2-2',
                                children: [],
                            },
                            {
                                layer: layer4,
                                value: '1-3-2-3',
                                children: [],
                            },
                        ],
                    },
                    {
                        layer: layer3,
                        value: '1-3-3',
                        children: [],
                    },
                ],
            },
        ],
    },
];

class List {
    get() {
        return list;
    }
}

module.exports = List;
