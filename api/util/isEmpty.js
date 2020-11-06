const isEmpty = object =>
  Object.keys(object).length === 0 && object.constructor === Object

module.exports = isEmpty
