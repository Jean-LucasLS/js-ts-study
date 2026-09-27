# Variables

## Suggested Order

1. `01-types-and-values.js` - basic variables, primitive values, objects, and type checking.
2. `02-block-scope.js` - block scope, shadowing, and changing outer variables.
3. `03-function-scope.js` - function scope, outer variables, and `var`.
4. `04-temporal-dead-zone.js` - why `let` and `const` cannot be read before declaration.
5. `05-destructuring-basics.js` - the basic syntax for extracting values from objects and arrays.
6. `06-mutation-and-references.js` - reassignment, object mutation, shared references, and shallow copies.
7. `07-freeze-and-immutability.js` - `Object.freeze()`, nested data, and independent deep copies.

Use `let` when a variable can be reassigned. Use `const` when its binding should not be reassigned.

A variable is a name associated with a value. With `let`, the association can later point to a different value. With `const`, the association is fixed after initialization.

```js
let age = 20;
age = 21;

const name = "Ana";
// name = "Joao"; // Error
```

For objects and arrays, `const` fixes the reference, but their contents can change:

```js
const person = { name: "Ana" };
person.name = "Joao"; // Allowed
```

This distinction is important:

```js
const person = { name: "Ana" };

person.name = "Joao"; // Change the existing object
// person = { name: "Maria" }; // Replace the reference: Error
```

`const` does not make an object immutable. To prevent property changes, use a separate technique such as `Object.freeze()`.

## `Object.freeze()`

`Object.freeze()` prevents adding, removing, or replacing properties on the object itself. It does not freeze nested objects automatically.

```js
"use strict";

const settings = Object.freeze({
	theme: "light",
	notifications: { email: true },
});

// settings.theme = "dark"; // TypeError in strict mode
settings.notifications.email = false; // Allowed: this object is nested

console.log(settings.theme); // light
console.log(settings.notifications.email); // false
```

This is called a **shallow freeze**. The outer object is frozen, but `notifications` is still a normal mutable object. Arrays are objects too, so an array property can still receive `push()`, `pop()`, or index assignments unless the array itself is frozen.

To freeze nested data, freeze each level explicitly:

```js
const account = Object.freeze({
	preferences: Object.freeze({ email: true }),
	tags: Object.freeze(["student"]),
});
```

For larger structures, a recursive `deepFreeze` helper can walk through nested objects. In production code, immutable updates are often easier to reason about: create a new object and copy the levels that change.

```js
const profile = {
	name: "Ana",
	address: { city: "Recife" },
};

const updatedProfile = {
	...profile,
	address: { ...profile.address, city: "Olinda" },
};

console.log(profile.address.city); // Recife
console.log(updatedProfile.address.city); // Olinda
```

The spread syntax is also shallow. Copying only the outer object would make the old and new profiles share the same `address` object, so the nested spread is important here.

## Scope

Scope defines where a variable can be accessed. `let` and `const` are **block-scoped**: they belong to the nearest pair of braces, such as an `if`, loop, or standalone block.

```js
if (true) {
	const message = "Inside the block";
	console.log(message);
}

// console.log(message); // Error: message is out of scope
```

An inner block can declare a variable with the same name. This is called shadowing; the inner variable temporarily hides the outer one without changing it:

```js
const message = "outside";

{
	const message = "inside";
	console.log(message); // inside
}

console.log(message); // outside
```

Functions also create scopes. A variable declared inside a function cannot be read from outside it. `var` is older and is function-scoped, so a `var` declared inside an `if` remains accessible after the block. Prefer `let` and `const`, which respect block boundaries.

`let` and `const` are also unavailable before their declaration. The interval between entering the scope and reaching the declaration is the **temporal dead zone**; reading the variable there throws a `ReferenceError`.

Prefer `const` by default. Choose `let` when reassignment is part of the logic.

## Checking Types

The `typeof` operator returns a string describing the type of a value:

```js
const name = "Ana";
const age = 25;
const active = true;
const emptyValue = null;
const missingValue = undefined;
const person = { name: "Ana" };
const scores = [10, 9, 8];

console.log(typeof name);         // string
console.log(typeof age);          // number
console.log(typeof active);       // boolean
console.log(typeof missingValue); // undefined
console.log(typeof person);       // object
console.log(typeof scores);       // object
```

There is a historical JavaScript behavior where `typeof null` returns `"object"`. To check for `null`, use a strict comparison:

```js
if (emptyValue === null) {
	console.log("The value is null");
}
```

Arrays also return `"object"` with `typeof`. Use `Array.isArray()` when you need to distinguish an array from a regular object:

```js
console.log(Array.isArray(scores)); // true
console.log(Array.isArray(person)); // false
```

## `undefined` and `null`

`undefined` usually means that no value has been assigned or that a property does not exist. `null` is an intentional empty value chosen by the programmer.

```js
let notAssigned;
const noUser = null;
const person = {};

console.log(notAssigned); // undefined
console.log(noUser); // null
console.log(person.name); // undefined
```

Use strict comparisons when checking these values:

```js
if (noUser === null) {
	console.log("There is no user");
}

if (notAssigned === undefined) {
	console.log("The value was not assigned");
}
```

## Type Conversion

JavaScript can convert values explicitly. Explicit conversion is easier to understand than relying on automatic coercion.

```js
const textScore = "42";
const score = Number(textScore);
const label = String(score);
const hasAccess = Boolean(score);

console.log(score, typeof score); // 42 number
console.log(label, typeof label); // 42 string
console.log(hasAccess, typeof hasAccess); // true boolean
```

Be careful with invalid conversions:

```js
const invalidScore = Number("not a number");
console.log(Number.isNaN(invalidScore)); // true
```

## `NaN`

`NaN` means **Not a Number**, but its type is still `number`. It represents a failed numeric operation.

```js
const result = Number("hello");

console.log(result); // NaN
console.log(typeof result); // number
console.log(Number.isNaN(result)); // true
```

Use `Number.isNaN()` to test for `NaN`. Do not compare it with `=== NaN`, because `NaN` is not equal to itself.

## Reassignment and Mutation

Reassignment replaces the value associated with a variable. Mutation changes the contents of an existing object.

```js
let count = 1;
count = 2; // Reassignment

const user = { name: "Ana" };
user.name = "Maria"; // Mutation
```

These are different operations even though both change what you observe in the program.

## Destructuring

Destructuring extracts values into new variables:

```js
const person = { name: "Ana", age: 25 };
const { name, age } = person;

console.log(name); // Ana
console.log(age); // 25
```

Destructuring does not create a connection that keeps variables synchronized with the original value. For primitives, the value is copied:

```js
const person = { age: 25 };
let { age } = person;

age = 30;

console.log(age); // 30
console.log(person.age); // 25
```

Reassigning the destructured variable does not change the property. To change the object, use `person.age = 30` explicitly. Nested objects and arrays are different: the extracted variable points to the same reference, so mutations are visible through both names:

```js
const user = { preferences: { theme: "light" } };
const { preferences } = user;

preferences.theme = "dark";

console.log(user.preferences.theme); // dark
```

The same syntax works with arrays by position:

```js
const colors = ["red", "blue"];
const [primary, secondary] = colors;

console.log(primary); // red
console.log(secondary); // blue
```

## Default Values

Destructuring and function parameters can provide fallback values when a value is `undefined`:

```js
function greet(name = "Guest") {
	return `Hello, ${name}`;
}

console.log(greet()); // Hello, Guest
console.log(greet("Ana")); // Hello, Ana
```

## Scope Recap and the Temporal Dead Zone

An inner block can read variables from an outer scope, but the outer scope cannot read variables created inside the block. Assigning to an outer `let` from inside changes the outer variable; declaring another `let` or `const` with the same name creates a new inner variable.

`const` prevents reassigning the binding, while `let` allows it. Both are block-scoped. `var` is function-scoped and can escape a plain block, which is why modern code usually prefers `let` and `const`.

`let` and `const` also cannot be accessed before their declaration. This period is called the temporal dead zone:

```js
// console.log(topic); // ReferenceError
const topic = "Variables";
```

Declare variables before using them. This keeps the code predictable and avoids relying on hoisting behavior.

## Equality and Coercion

`==` may convert values before comparing them; prefer `===` unless coercion is deliberate. `NaN` is unequal to every value, including itself. `Object.is()` treats `NaN` as equal to itself and distinguishes `0` from `-0`, unlike `===`:

```js
"5" == 5; // true
"5" === 5; // false
NaN === NaN; // false
Object.is(NaN, NaN); // true
0 === -0; // true
Object.is(0, -0); // false
```
