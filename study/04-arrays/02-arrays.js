const values = [2, 10, 3, 4];

const doubled = values.map((value) => value * 2);
const evenValues = doubled.filter((value) => value % 2 === 0);
const firstAboveTen = doubled.find((value) => value > 10);
const total = values.reduce((sum, value) => sum + value, 0);

console.log(doubled);
console.log(evenValues);
console.log(firstAboveTen);
console.log(total);
console.log(values.toSorted((left, right) => left - right));
console.log(values); // Non-mutating sort leaves the original unchanged.

const firstArray = [1, 2];
const secondArray = [1, 2];
console.log(firstArray === secondArray); // false: array identity, not contents.

const mutableValues = [1, 2, 3];
mutableValues.push(4);
console.log(mutableValues); // push mutates the existing array.