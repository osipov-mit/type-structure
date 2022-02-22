const { getTypeStructure } = require('../lib');
const assert = require('assert');

const types = {
  Action: {
    _enum: {
      AVariant: 'AStruct',
      BVar: 'Option<CustomStructU8>',
      CVariant: 'BTreeMap<Text, u8>',
    },
  },
  AStruct: { id: 'Bytes', online: 'bool' },
  CustomStructU8: { field: 'u8' },
  CustomStructOption: { field: 'Option<(Option<u8>,u128,[u8;3])>' },
};

assert.deepEqual(getTypeStructure('Action', types), {
  type: 'Enum',
  name: 'Action',
  value: {
    AVariant: {
      type: 'Struct',
      name: 'AStruct',
      value: {
        id: { type: 'Primitive', name: 'Bytes', value: 'Bytes' },
        online: { type: 'Primitive', name: 'bool', value: 'bool' },
      },
    },
    BVar: {
      type: 'Option',
      name: 'Option<CustomStructU8>',
      value: {
        type: 'Struct',
        name: 'CustomStructU8',
        value: { field: { type: 'Primitive', name: 'u8', value: 'u8' } },
      },
    },
    CVariant: {
      type: 'BTreeMap',
      name: 'BTreeMap<Text, u8>',
      value: {
        key: { type: 'Primitive', name: 'Text', value: 'Text' },
        value: { type: 'Primitive', name: 'u8', value: 'u8' },
      },
    },
  },
});
assert.deepEqual(getTypeStructure('AStruct', types), {
  type: 'Struct',
  name: 'AStruct',
  value: {
    id: { type: 'Primitive', name: 'Bytes', value: 'Bytes' },
    online: { type: 'Primitive', name: 'bool', value: 'bool' },
  },
});
assert.deepEqual(
  {
    type: 'Struct',
    name: 'CustomStructU8',
    value: { field: { type: 'Primitive', name: 'u8', value: 'u8' } },
  },
  getTypeStructure('CustomStructU8', types),
);
assert.deepEqual(getTypeStructure('CustomStructOption', types), {
  type: 'Struct',
  name: 'CustomStructOption',
  value: {
    field: {
      type: 'Option',
      name: 'Option<(Option<u8>,u128,[u8;3])>',
      value: {
        type: 'Tuple',
        name: '(Option<u8>,u128,[u8;3])',
        value: [
          {
            type: 'Option',
            name: 'Option<u8>',
            value: {
              type: 'Primitive',
              name: 'u8',
              value: 'u8',
            },
          },
          {
            type: 'Primitive',
            name: 'u128',
            value: 'u128',
          },
          {
            type: 'Array',
            name: '[u8;3]',
            value: {
              type: 'Primitive',
              name: 'u8',
              value: 'u8',
            },
            count: 3,
          },
        ],
      },
    },
  },
});
assert.deepEqual(getTypeStructure('Vec<u8>', {}), {
  type: 'Vec',
  name: 'Vec<u8>',
  value: { type: 'Primitive', name: 'u8', value: 'u8' },
});
assert.deepEqual(getTypeStructure('Result<String, i32>', {}), {
  type: 'Result',
  name: 'Result<String, i32>',
  value: {
    ok: { type: 'Primitive', name: 'String', value: 'String' },
    err: { type: 'Primitive', name: 'i32', value: 'i32' },
  },
});
