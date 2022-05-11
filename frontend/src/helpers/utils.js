export const deepEqual = (a, b) => {
  if (
    a === b &&
    (
      a !== 0 ||
      b !== 0 ||
      1 / a === 1 / b
    ) ||
    a !== a && b !== b
  ) {
    return true
  }

  if (
    typeof a !== 'object' || a === null ||
    typeof b !== 'object' || b === null ||
    Object.keys(a).length !== Object.keys(b).length
  ) {
    return false
  }

  for (const prop in a) {
    if (
      !b.hasOwnProperty(prop) ||
      !deepEqual(a[prop], b[prop])
    ) {
      return false
    }
  }

  return true
}
