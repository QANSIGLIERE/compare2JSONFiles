var { compare2JSONs } = require('../index.js');

test('Compare string and number values', () => {
    expect(compare2JSONs('hello', 2)).toBeFalsy();
});

test('Compare json and undefined values', () => {
    expect(compare2JSONs({}, undefined)).toBeFalsy();
});

test('Compare two undefined values', () => {
    expect(compare2JSONs(undefined, undefined)).toBeTruthy();
});

test('Compare the same number values', () => {
    expect(compare2JSONs(2, 2)).toBeTruthy();
});

test('Compare integer and float number values', () => {
    expect(compare2JSONs(2, 2.0)).toBeTruthy();
});

test('Compare two different number values', () => {
    expect(compare2JSONs(2, 3)).toBeFalsy();
});

test('Compare empty sring and non-empty string values', () => {
    expect(compare2JSONs('', 'text')).toBeFalsy();
});

test('Compare two empty string values', () => {
    expect(compare2JSONs('', '')).toBeTruthy();
});

test('Compare two the same string values', () => {
    expect(compare2JSONs('text', 'text')).toBeTruthy();
});

test('Compare two different string values', () => {
    expect(compare2JSONs('text', 'text ')).toBeFalsy();
});

test('Compare two the same boolean (true) values', () => {
    expect(compare2JSONs(true, true)).toBeTruthy();
});

test('Compare two the same boolean (false) values', () => {
    expect(compare2JSONs(false, false)).toBeTruthy();
});

test('Compare two different boolean values', () => {
    expect(compare2JSONs(false, true)).toBeFalsy();
});

test('Compare two the same object (null) values', () => {
    expect(compare2JSONs(null, null)).toBeTruthy();
});

test('Compare two empty arrays', () => {
    expect(compare2JSONs([], [])).toBeTruthy();
});

test('Compare array and json', () => {
    expect(compare2JSONs([], {})).toBeFalsy();
});

test('Compare json and array', () => {
    expect(compare2JSONs({}, [])).toBeFalsy();
});

test('Compare two different arrays', () => {
    expect(compare2JSONs([1], [1, 2])).toBeFalsy();
});

test('Compare two same arrays', () => {
    expect(compare2JSONs([2, 1], [1, 2])).toBeTruthy();
});

test('Compare two different arrays', () => {
    expect(compare2JSONs(['text', { a: 1 }], ['text', { a: 1, b: 2 }])).toBeFalsy();
});
