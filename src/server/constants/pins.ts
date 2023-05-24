export const PINS = Array.from({ length: 25 }).map((_, index) => {
    const centerDelta = [0,0];
    // TODO: delta for flag pins
    return {
        id: index,
        centerDelta,
        source: '/pins/pin' + (index + 1) + '.svg'
    }
});

export const PIN_COLORS = [
    '#0074D9',
    '#001f3f',
    '#7FDBFF',
    '#39CCCC',
    '#B10DC9',
    '#F012BE',
    '#85144b',
    '#FF4136',
    '#FF851B',
    '#FFDC00',
    '#3D9970',
    '#2ECC40',
    '#01FF70'
]