function mutate({ data, mutation, parent = [] }) {
  return Object.entries(mutation).reduce((operations, [key, items]) => {
    return items.reduce((result, { _id, _delete = false, ...item }) => {
      if (!_id) {
        result.$add = { [parent.concat(key).join('.')]: [item] }
        return result
      }

      // find current index for concating in path
      const index = [key, data[key].findIndex(item => item._id === _id)]
      const path = parent.concat(index)

      // if property delete is found whatsoever
      // prepare delete statement
      if (_delete) {
        result.$remove = { [path.join('.')]: true }
        return result
      }

      const [ entries ] = Object.entries(item)
      const [ itemKey, itemValue ] = entries

      // if any array is found, you
      // must follow the white rabbit
      // down the recursion hole
      if (Array.isArray(itemValue)) {
        const tail = path[path.length - 1]
        return mutate({ data: data[key][tail], mutation: item, parent: path })
      }

      path.push(itemKey)
      result.$update = { [path.join('.')]: itemValue }

      return result
    }, {})
  }, {})
}

module.exports = {
  mutate
}
