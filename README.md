# monjo

mongoDB inspired JSON filters for JS

## Usage

```js
const compileFilter = require('monjo');
const query = {
  name: 'Foo Bar',
  age: {
    $gt: 5,
  },
  hobbies: {
    $elemMatch: {
      $not: {
        name: {
          $eq: 'music',
        },
      },
    },
  },
};
const filter = compileFilter(query);
const users = getUsers;
for (let validUser of users.filter(filter)) {
  // do stuff
}
```

## Supported Operators

- `$eq` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/eq/).
- `$ne` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/ne/).
- `$gt` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/gt/).
- `$gte` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/gte/).
- `$lt` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/lt/).
- `$lte` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/lte/).
- `$in` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/in/).
- `$nin` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/nin/).
- `$not` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/not/).
- `$and` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/and/).
- `$or` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/or/).
- `$exists` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/exists/).
- `$size` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/size/).
- `$all` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/all/).
- `$elemMatch` - See mongoDB's [documentation](https://docs.mongodb.com/manual/reference/operator/query/elemMatch/).
- `$startsWith` - wraps over `String.prototype.startsWith`.
- `$endsWith` - wraps over `String.prototype.endsWith`.