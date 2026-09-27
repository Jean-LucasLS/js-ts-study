# Arrays

## Suggested Order

1. `01-destructuring.js` - extract values by position, skip positions, and collect the remaining values.
2. `02-arrays.js` - array identity, iteration, transformation, and mutation.

Arrays are ordered objects with zero-based numeric indices. Unlike Python lists, JavaScript arrays compare by identity rather than by contents:

```js
[1, 2] === [1, 2]; // false: these are different array objects.
```

Read an element with its index, and use `length` to get the number of elements. The last valid index is `length - 1`; reading outside the array returns `undefined`.

```js
const colors = ["red", "green", "blue"];

colors[0]; // "red"
colors[colors.length - 1]; // "blue"
colors[3]; // undefined
```

Use `for...of` for direct iteration, `map()` to transform each element, `filter()` to keep matching elements, and `find()` to return the first match. These methods make intent clear and can be chained, but `map()` and `filter()` create new arrays rather than mutating the original.

```js
const values = [1, 2, 3, 4];
const doubled = values.map((value) => value * 2);
const even = doubled.filter((value) => value % 2 === 0);
```

Methods such as `push()`, `pop()`, `splice()`, `sort()`, and `reverse()` mutate the array. `toSorted()` and `toReversed()` return copies. The default `sort()` compares values as strings, so provide a comparator for numeric order:

```js
[2, 10, 3].sort(); // [10, 2, 3]
[2, 10, 3].toSorted((left, right) => left - right); // [2, 3, 10]
```

When an operation should not change the original array, use a non-mutating method or copy it first:

```js
const numbers = [3, 1, 2];
const sortedNumbers = [...numbers].sort((left, right) => left - right);

console.log(numbers); // [3, 1, 2]
console.log(sortedNumbers); // [1, 2, 3]
```

Use `reduce()` when several elements must become one result, such as a sum or a grouped object. Use `some()` to test whether at least one element matches and `every()` to test whether all elements match:

```js
const scores = [8, 10, 7];

const total = scores.reduce((sum, score) => sum + score, 0);
const hasPerfectScore = scores.some((score) => score === 10);
const allPassed = scores.every((score) => score >= 6);
```

`forEach()` is useful for side effects but cannot be stopped with `break` or `continue`; use `for...of` when early exit is required. Array methods such as `map()` skip empty slots in sparse arrays, which can make sparse arrays behave differently from arrays containing explicit `undefined`.

Prefer `find()` when you need the element, `findIndex()` when you need its position, and `includes()` when you only need to know whether a value exists. Avoid changing an array while iterating over it unless that behavior is deliberate, because removing elements can shift later indices.