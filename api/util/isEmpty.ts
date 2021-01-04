const isEmpty = (object: any): boolean =>
  Object.keys(object).length === 0 && object.constructor === Object

export default isEmpty
