import {check} from './toJson.test';

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

type Superclass = {
  field1: string;
};

type Subclass = Superclass & {
  field2: number;
};

class ToJSONSuperclass {
  private field1: string;

  constructor(field1: string) {
    this.field1 = field1;
  }

  public toJSON(): {} {
    return {
      type: 'super',
      class: this.constructor.name,
      field1: this.field1,
    };
  }
}

class ToJSONSubclass extends ToJSONSuperclass {
  field2: number;

  constructor(field1: string, field2: number) {
    super(field1);
    this.field2 = field2;
  }

  public override toJSON(): {} {
    return {...super.toJSON(), type: 'sub', field2: this.field2};
  }
}

class ToJSONSubclassWithoutOverride extends ToJSONSuperclass {
  field2: number;

  constructor(field1: string, field2: number) {
    super(field1);
    this.field2 = field2;
  }
}

test('Test inheritance', () => {
  const obj1: Superclass = {field1: 'Object 1'};
  const obj2: Subclass = {field1: 'Object 2', field2: 42};

  check(
    obj1,
    `{
  "field1": "Object 1"
}`
  );
  check(
    obj2,
    `{
  "field1": "Object 2",
  "field2": 42
}`
  );
});

test('Test inheritance of classes implementing toJSON()', () => {
  const obj1: ToJSONSuperclass = new ToJSONSuperclass('Object 1');
  const obj2: ToJSONSubclass = new ToJSONSubclass('Object 2', 42);
  const obj3: ToJSONSubclassWithoutOverride = new ToJSONSubclassWithoutOverride(
    'Object 3',
    777
  );

  check(
    obj1,
    `{
  "type": "super",
  "class": "ToJSONSuperclass",
  "field1": "Object 1"
}`
  );
  check(
    obj2,
    `{
  "type": "sub",
  "class": "ToJSONSubclass",
  "field1": "Object 2",
  "field2": 42
}`
  );
  check(
    obj3,
    `{
  "type": "super",
  "class": "ToJSONSubclassWithoutOverride",
  "field1": "Object 3"
}`
  );
});
