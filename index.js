const isEqual = require('lodash.isequal');

const ops = {
  $eq: (filter, value) => isEqual(value, filter),
  $ne: (filter, value) => !isEqual(value, filter),
  $gt: (filter, value) => value > filter,
  $gte: (filter, value) => value >= filter,
  $lt: (filter, value) => value < filter,
  $lte: (filter, value) => value <= filter,
  $in: (filter, value) => filter.includes(value),
  $nin: (filter, value) => !filter.includes(value),
  $not: (filter, value) => !compileFilter(filter)(value),
  $and: (filter, value) => filter.every(clause => compileFilter(clause)(value)),
  $or: (filter, value) => filter.some(clause => compileFilter(clause)(value)),
  $exists: (filter, value) =>
    filter ? value !== undefined : value === undefined,
  $size: (filter, value) =>
    (Array.isArray(value) || typeof value === 'string') &&
    value.length === filter,
  $all: (filter, value) =>
    (Array.isArray(value) || typeof value === 'string') &&
    Array.from(filter).every(item => value.includes(item)),
  $elemMatch: (filter, value) =>
    Array.isArray(value) && value.some(compileFilter(filter)),
};

function compileFilter(filter, ctx) {
  if (ctx && ops[ctx]) {
    return value => ops[ctx](filter, value);
  }
  if (filter && typeof filter === 'object' && !Array.isArray(filter)) {
    const compiled = Object.keys(filter).reduce((compiledFilter, prop) => {
      compiledFilter[prop] = compileFilter(filter[prop], prop);
      return compiledFilter;
    }, {});
    return value =>
      Object.keys(compiled).every(prop => {
        if (!prop.startsWith('$') && value === undefined) {
          return false;
        }
        return compiled[prop](prop.startsWith('$') ? value : value[prop]);
      });
  }
  return value => isEqual(value, filter);
}

module.exports = compileFilter;
