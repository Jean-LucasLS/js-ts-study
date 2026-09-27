# Functions

## Suggested Order

1. `01-basics.js` - declarations, expressions, default parameters, rest parameters, and destructured parameters.
2. `02-callbacks.js` - functions as values and higher-order functions.
3. `03-closures.js` - lexical environments, persistent state, and loop bindings.
4. `04-advanced.js` - compose functions and create specialized functions through partial application.
5. `05-patterns.js` - validate inputs, keep calculations reusable, and format output.

Functions are first-class values: they can be stored in variables, passed as arguments, and returned from other functions. A function declaration and a function expression are both useful; declarations are initialized earlier within their scope, while expressions are values assigned during execution.

```js
function addOne(value) {
  return value + 1;
}

const addTwo = function (value) {
  return value + 2;
};
```

JavaScript does not enforce parameter or return types at runtime. Default parameters are evaluated when the function is called and apply when an argument is omitted or `undefined`, but not when it is `null`. This differs from Python's default argument expressions, which are evaluated once when the function is defined.

```js
function label(value = "unknown") {
  return value;
}

label(); // "unknown"
label(undefined); // "unknown"
label(null); // null
```

Use rest parameters (`...values`) to collect extra arguments into an array. Spread syntax (`...array`) does the reverse by expanding an iterable into arguments or another array. The syntax is similar, but the direction depends on where it appears.

## Callbacks and Higher-Order Functions

A higher-order function accepts another function or returns one. Callbacks are a common way to customize an operation:

```js
function apply(operation, value) {
  return operation(value);
}

apply((number) => number * 2, 5); // 10
```

Arrow functions are concise function expressions. They capture `this` from their surrounding scope instead of receiving `this` from the call site; use ordinary methods when dynamic receiver behavior is needed.

## Closures

A closure is a function together with access to its lexical environment. It can retain state after the outer function returns:

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

Each call to `createCounter()` creates an independent binding. Closures created in a `var` loop share one function-scoped variable, while `let` creates a separate binding for each iteration. See `03-closures.js` for the executed comparison.

## Composition and Partial Application

Composition connects small functions into a pipeline. In this example the value is trimmed first, then converted to uppercase:

```js
function compose(first, second) {
  return (value) => second(first(value));
}
```

Partial application fixes one argument now and returns a function that accepts the remaining argument. This uses closures to create reusable specialized functions, such as a multiplier with a fixed factor. See `04-advanced.js` for both patterns.

This is a useful endpoint for the functions module. Memoization, generators, and async functions are better introduced later, alongside collections and the JavaScript event loop.

## Reusable Function Structure

Keep validation, calculation, and presentation as separate steps. A calculation function can validate its inputs and return a value without printing or changing unrelated state. Guard clauses make invalid cases visible early; throw an error when the caller cannot safely continue with invalid input.

`Number.isFinite()` is a reliable check for finite numeric input. `Intl.NumberFormat` handles locale-aware formatting such as decimal separators and currency symbols. Create a formatter once and reuse it instead of constructing one for every value; the returned function closes over that formatter.

See `05-patterns.js` for these patterns together, including `TypeError` for an invalid numeric type and `RangeError` for a number outside the accepted range.