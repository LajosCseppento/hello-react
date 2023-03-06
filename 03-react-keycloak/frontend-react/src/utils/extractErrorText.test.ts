import extractErrorText from './extractErrorText';

const check = (error: unknown, expected: string) => {
  expect(extractErrorText(error)).toEqual(expected);
};

test('Test general data types', () => {
  // check(undefined, '<undefined>');
  // check(null, '<null>');
  // check(false, 'false');
  // check(true, 'true');
  // check(0, '0');
  // check(1, '1');
  // check(NaN, 'NaN');
  // check(-Infinity, '-Infinity');
  // check(Infinity, 'Infinity');
  // check(BigInt(123), '123');
  // check('String', 'String');
  // check(Symbol('sym'), 'Symbol(sym)');
});

// test('Test array', () => {
//   check([], '[]');
//   check(['a', 2, Symbol('three')], '[a, 2, Symbol()]');
// });

// test('Test object', () => {
//   check({}, '[object Object]');
//   // expect(extractErrorText(false)).toEqual('false');
//   // expect(extractErrorText(true)).toEqual('true');
//   // expect(extractErrorText(0)).toEqual('0');
//   // expect(extractErrorText(1)).toEqual('1');
//   // expect(extractErrorText(BigInt(123))).toEqual('123');
//   // expect(extractErrorText(NaN)).toEqual('NaN');
//   // expect(extractErrorText('String')).toEqual('String');
//   // expect(extractErrorText({})).toEqual('[object Object]');
//   // expect(extractErrorText(undefined)).toEqual('<undefined>');
// });
