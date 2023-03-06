import stringify from './stringify';

const check = (value: unknown, expected: string) => {
  expect(stringify(value)).toEqual(expected);
};

test('Test general data types', () => {
  // booleans
  check(false, 'false');
  check(true, 'true');

  // numbers
  check(0, '0');
  check(1, '1');

  // special numbers
  check(
    NaN,
    `{
  "$specialValue": "NaN"
}`
  );
  check(
    -Infinity,
    `{
  "$specialValue": "-Infinity"
}`
  );
  check(
    Infinity,
    `{
  "$specialValue": "Infinity"
}`
  );
  check(
    BigInt(123),
    `{
  "$specialValue": "BigInt(123)"
}`
  );

  // strings
  check('a', '"a"');
  check('bc\nd', '"bc\\nd"');

  // specials
  check(null, 'null');
  check(
    undefined,
    `{
  "$specialValue": "undefined"
}`
  );
  check(
    Symbol('sym'),
    `{
  "$specialValue": "Symbol(sym)"
}`
  );
  check(
    function () {},
    `{
  "$specialValue": "function () { }"
}`
  );
  check(
    function (a: number, b: number) {
      return a + b;
    },
    `{
  "$specialValue": "function (a, b) {\\n        return a + b;\\n    }"
}`
  );
  check(
    (c: number, d: number) => c + d,
    `{
  "$specialValue": "function (c, d) { return c + d; }"
}`
  );

  // errors
  check(
    Error('Error', {cause: Error('Cause')}),
    `{
  "$error": "Error: Error",
  "$causeChain": [
    "Error: Cause"
  ]
}`
  );
  check(
    new Error('Error 2', {cause: new Error('Cause 2', {cause: NaN})}),
    `{
  "$error": "Error: Error 2",
  "$causeChain": [
    "Error: Cause 2",
    {
      "$specialValue": "NaN"
    }
  ]
}`
  );
});

test('Test complex object with special values', () => {
  check(
    {
      booleans: [false, true],
      numbers: [0, 1],
      specialNumbers: [NaN, -Infinity, Infinity, BigInt(123)],
      strings: ['a', ' bc\nd '],
      specials: [
        null,
        undefined,
        Symbol('sym'),
        function () {},
        function (a: number, b: number) {
          return a + b;
        },
        (c: number, d: number) => c + d,
      ],
      errors: [
        Error('Error', {cause: Error('Cause')}),
        new Error('Error 2', {cause: new Error('Cause 2', {cause: NaN})}),
      ],
    },
    `{
  "booleans": [
    false,
    true
  ],
  "numbers": [
    0,
    1
  ],
  "specialNumbers": [
    {
      "$specialValue": "NaN"
    },
    {
      "$specialValue": "-Infinity"
    },
    {
      "$specialValue": "Infinity"
    },
    {
      "$specialValue": "BigInt(123)"
    }
  ],
  "strings": [
    "a",
    " bc\\nd "
  ],
  "specials": [
    null,
    {
      "$specialValue": "undefined"
    },
    {
      "$specialValue": "Symbol(sym)"
    },
    {
      "$specialValue": "function () { }"
    },
    {
      "$specialValue": "function (a, b) {\\n                return a + b;\\n            }"
    },
    {
      "$specialValue": "function (c, d) { return c + d; }"
    }
  ],
  "errors": [
    {
      "$error": "Error: Error",
      "$causeChain": [
        "Error: Cause"
      ]
    },
    {
      "$error": "Error: Error 2",
      "$causeChain": [
        "Error: Cause 2",
        {
          "$specialValue": "NaN"
        }
      ]
    }
  ]
}`
  );
});

type Obj = {
  value: string;
  parent?: Obj;
};

test('Test simple circular reference', () => {
  const obj: Obj = {value: 'obj'};
  obj.parent = obj;
  check(
    obj,
    `{
  "value": "obj",
  "parent": {
    "$ref": "$"
  }
}`
  );
});

test('Test longer circular reference', () => {
  const a: Obj = {value: 'a'};
  const b: Obj = {value: 'b', parent: a};
  const c: Obj = {value: 'c', parent: b};
  a.parent = c;
  check(
    a,
    `{
  "value": "a",
  "parent": {
    "value": "c",
    "parent": {
      "value": "b",
      "parent": {
        "$ref": "$"
      }
    }
  }
}`
  );
  check(
    b,
    `{
  "value": "b",
  "parent": {
    "value": "a",
    "parent": {
      "value": "c",
      "parent": {
        "$ref": "$"
      }
    }
  }
}`
  );
  check(
    c,
    `{
  "value": "c",
  "parent": {
    "value": "b",
    "parent": {
      "value": "a",
      "parent": {
        "$ref": "$"
      }
    }
  }
}`
  );
});

test('Nested circular reference', () => {
  const a: Obj = {value: 'a'};
  const b: Obj = {value: 'b', parent: a};
  const c: Obj = {value: 'c', parent: b};
  a.parent = c;
  check(
    {root: a},
    `{
  "root": {
    "value": "a",
    "parent": {
      "value": "c",
      "parent": {
        "value": "b",
        "parent": {
          "$ref": "$[\\"root\\"]"
        }
      }
    }
  }
}`
  );
});

// TODO inheritance WITHOUT toJSON
// TODO inheritance WITH toJSON
