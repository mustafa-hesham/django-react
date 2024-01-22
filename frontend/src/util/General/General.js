export function compareTwoObjects(objectOne, objectTwo, excludedKeys = []) {
  return Object
      .keys(objectOne)
      .filter((key) => !excludedKeys.includes(key))
      .every((key) => JSON.stringify(objectOne[key]) === JSON.stringify(objectTwo[key]));
}
