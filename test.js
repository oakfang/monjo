const test = require('nefarious');
const compileFilter = require('.');

test.beforeEach(t => {
  t.context.items = [
    { type: 'Person', name: 'foo', age: 20 },
    { type: 'Person', name: 'bar', age: 5 },
    {
      name: 'cat',
      nested: {
        meow: true,
      },
    },
    { name: 'Home' },
    {
      name: 'Petah Tikva',
      tags: ['Horrible'],
    },
  ];
});

const testQueryLength = (title, query, length) =>
  test(title, t =>
    t.is(t.context.items.filter(compileFilter(query)).length, length)
  );

testQueryLength(
  'advanced json filtering ($eq)',
  {
    age: {
      $eq: 20,
    },
  },
  1
);

testQueryLength(
  'advanced json filtering ($ne)',
  {
    age: {
      $ne: 25,
    },
  },
  5
);

testQueryLength(
  'advanced json filtering ($gt)',
  {
    age: {
      $gt: 15,
    },
  },
  1
);

testQueryLength(
  'advanced json filtering ($gte)',
  {
    age: {
      $gte: 5,
    },
  },
  2
);

testQueryLength(
  'advanced json filtering ($lt)',
  {
    age: {
      $lt: 15,
    },
  },
  1
);

testQueryLength(
  'advanced json filtering ($lte)',
  {
    age: {
      $lte: 20,
    },
  },
  2
);

testQueryLength(
  'advanced json filtering ($in)',
  {
    age: {
      $in: [20, 34, 2],
    },
  },
  1
);

testQueryLength(
  'advanced json filtering ($nin)',
  {
    type: 'Person',
    age: {
      $nin: [20, 34, 5],
    },
  },
  0
);

testQueryLength(
  'advanced json filtering ($not)',
  {
    name: {
      $not: {
        $eq: 'foo',
      },
    },
  },
  4
);

testQueryLength(
  'advanced json filtering ($and)',
  {
    age: {
      $and: [
        {
          $gte: 5,
        },
        {
          $lt: 23,
        },
      ],
    },
  },
  2
);

testQueryLength(
  'advanced json filtering ($or)',
  {
    age: {
      $or: [
        {
          $gt: 5,
        },
        {
          $lt: 18,
        },
      ],
    },
  },
  2
);

testQueryLength(
  'advanced json filtering ($exists)',
  {
    age: {
      $exists: true,
    },
  },
  2
);

testQueryLength(
  'advanced json filtering ($exists)',
  {
    age: {
      $exists: false,
    },
  },
  3
);

testQueryLength(
  'advanced json filtering ($size, with array)',
  {
    tags: {
      $size: 1,
    },
  },
  1
);

testQueryLength(
  'advanced json filtering ($size, with string)',
  {
    name: {
      $size: 3,
    },
  },
  3
);

testQueryLength(
  'advanced json filtering ($all, with array)',
  {
    tags: {
      $all: ['Horrible'],
    },
  },
  1
);

testQueryLength(
  'advanced json filtering ($all, with string)',
  {
    name: {
      $all: 'o',
    },
  },
  2
);

testQueryLength(
  'advanced json filtering ($elemMatch)',
  {
    tags: {
      $elemMatch: {
        $size: 8,
      },
    },
  },
  1
);

testQueryLength(
  'advanced json filtering (nested)',
  {
    nested: {
      meow: true,
    },
  },
  1
);
