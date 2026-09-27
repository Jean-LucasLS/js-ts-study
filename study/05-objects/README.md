# Objects

## Suggested Order

1. `01-destructuring.js` - extract properties, rename variables, use defaults, and handle nested objects.
2. `02-basics-and-references.js` - create objects and understand shared references.
3. `03-nested.js` - compare shallow copies with nested references.
4. `04-methods-and-accessors.js` - use methods, getters, and setters.
5. `05-utilities.js` - inspect keys, values, entries, prototypes, and property descriptors.
6. `06-object-vs-class.js` - compare a plain object with a class instance.
7. `07-patterns.js` - apply safe access patterns, `Map`, and JSON serialization.

An object stores related properties. A variable holds a reference to the object.

```text
person ---> { name: "Ana" }
```

The object itself is stored separately from the variable. The variable stores a way to reach that object. This is why two variables can refer to the same object:

```js
const firstPerson = { name: "Ana" };
const secondPerson = firstPerson;

secondPerson.name = "Joao";
console.log(firstPerson.name); // Joao
```

No copy was created. Both variables reach the same object.

Changing a property changes the object. Assigning a new object changes the variable's reference.

```js
const person = { name: "Ana" };
person.name = "Joao";
// person = {}; // Error with const
```

Objects can contain primitive values, arrays, functions, or other objects:

```js
const person = {
	name: "Ana",
	address: {
		city: "Recife"
	},
	greet() {
		return `Hello, ${this.name}`;
	}
};

console.log(person.address.city);
console.log(person.greet());
```

Use dot notation for known property names and bracket notation for dynamic names:

```js
const property = "name";
console.log(person[property]); // Ana
```

To create a separate shallow copy, use spread syntax:

```js
const copy = { ...person };
copy.name = "Maria";
```

The top-level properties are copied, but nested objects still share references. A deep copy requires a deliberate strategy when nested data must be independent.

For supported data, `structuredClone()` creates a deep copy, including nested objects:

```js
const deepCopy = structuredClone(person);
deepCopy.address.city = "Porto";
```

The original nested object is unchanged. `structuredClone()` does not support every JavaScript value; for example, functions cannot be cloned.

## Functions Inside Objects

An object can store functions as properties. The method shorthand is the usual syntax:

```js
const account = {
	balance: 100,

	deposit(amount) {
		this.balance += amount;
	}
};

account.deposit(50);
```

Inside `account.deposit()`, `this` normally refers to `account` because `account` is the object before the dot. This is the same idea used by methods in classes. The difference is that this method belongs only to this object literal, while a class can define shared behavior for many instances.

Be careful when detaching a method:

```js
const deposit = account.deposit;
// deposit(50); // `this` is no longer the account object.
```

The method call syntax preserves the receiver. Passing methods around may require `.bind(account)` or a different function design.

## Getters and Setters

Getters and setters look like properties but run functions behind the scenes:

```js
const user = {
	firstName: "Ana",
	lastName: "Silva",

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	},

	set fullName(value) {
		[this.firstName, this.lastName] = value.split(" ");
	}
};

console.log(user.fullName);
user.fullName = "Maria Costa";
```

Getters are useful for derived values. Setters are useful when an assignment needs validation or transformation. They can also hide work behind property syntax, so ordinary methods may be clearer for expensive or surprising operations.

## Object Utilities

The standard `Object` methods help inspect and combine data:

```js
const person = { name: "Ana", age: 25 };

Object.keys(person); // ["name", "age"]
Object.values(person); // ["Ana", 25]
Object.entries(person); // [["name", "Ana"], ["age", 25]]
```

`Object.entries()` is especially useful when iterating over dynamic properties. These methods inspect the object's own enumerable properties; they do not automatically list methods inherited from a prototype.

The `in` operator checks both own and inherited properties. Use `Object.hasOwn()` when you need to know whether a property belongs directly to an object:

```js
const prototype = { category: "member" };
const member = Object.create(prototype);
member.name = "Ana";

"category" in member; // true
Object.hasOwn(member, "category"); // false
Object.keys(member); // ["name"]
```

`for...in` iterates over enumerable string properties, including inherited ones. Check ownership inside the loop when you only want the object's own properties:

```js
for (const key in member) {
	if (Object.hasOwn(member, key)) {
		console.log(key);
	}
}
```

Property descriptors define whether a property can be changed, removed, or enumerated. `Object.defineProperty()` can configure these rules:

```js
const profile = {};
Object.defineProperty(profile, "id", {
	value: 7,
	enumerable: false,
	writable: false,
	configurable: false
});

profile.id; // 7
Object.keys(profile); // []
```

`Object.freeze()` prevents adding, removing, or changing top-level properties. `Object.seal()` prevents adding or removing properties, but existing writable values can still change. Neither deeply freezes nested objects.

## Useful Object Patterns

`Object.assign()` merges properties from source objects into a target object. Later sources overwrite earlier values:

```js
const defaults = { theme: "light", language: "en" };
const preferences = { language: "pt-BR" };
const settings = Object.assign({}, defaults, preferences);
```

`Object.hasOwn()` checks whether a property belongs directly to an object:

```js
Object.hasOwn(settings, "theme"); // true
Object.hasOwn(settings, "missing"); // false
```

Optional chaining safely accesses a property that may not exist:

```js
const user = { profile: { name: "Ana" } };

user.profile?.name; // Ana
user.contact?.email; // undefined
```

Nullish coalescing (`??`) provides a fallback only for `null` or `undefined`:

```js
const displayName = user.profile?.name ?? "Guest";
```

This differs from `||`, which also replaces valid falsy values such as `0`, `false`, and an empty string.

Use `delete` to remove a property, but avoid using it as a routine way to manage data shape:

```js
delete settings.language;
```

Use a plain object for records with named fields. Use `Map` for a dynamic key-value collection, especially when keys are not just strings or when you need direct size and iteration APIs:

```js
const cache = new Map();
const request = { id: 1 };

cache.set(request, "cached result");
cache.get(request); // "cached result"
cache.get({ id: 1 }); // undefined: object keys compare by identity.
```

`Object.fromEntries()` converts key-value pairs, such as `Map` entries, into an ordinary object.

### JSON Serialization

`JSON.stringify()` and `JSON.parse()` convert between JSON text and supported data. This is serialization, not a general-purpose deep-copy operation:

```js
const record = { score: NaN, note: undefined };
const json = JSON.stringify(record); // {"score":null}
const restored = JSON.parse(json);
```

Object properties whose values are `undefined` or functions are omitted, and non-finite numbers such as `NaN` become `null`. JSON also cannot preserve prototypes, methods, or object identity. Use `structuredClone()` for supported in-memory data when a deep copy is needed; use JSON when you specifically need a JSON representation.

Neither `Object.freeze()` nor `Object.seal()` deeply affects nested objects automatically.

## Plain Objects versus Classes

A plain object is often the clearest choice for one data record or a small configuration:

```js
const plainPerson = {
	name: "Ana",
	introduce() {
		return `My name is ${this.name}`;
	}
};
```

A class is useful when many objects share the same structure and behavior:

```js
class Person {
	constructor(name) {
		this.name = name;
	}

	introduce() {
		return `My name is ${this.name}`;
	}
}
```

Both can have methods, but only the class-created object is an instance of `Person`. A plain object does not automatically receive class methods, class identity, inheritance, or private class fields.

## Limitations of Plain Objects

Plain objects are flexible, but that flexibility has costs:

- Any property can be added, removed, or replaced unless you define restrictions.
- There is no automatic validation for the shape of the data.
- Repeated methods can be duplicated across object literals.
- A plain object does not provide class identity for `instanceof` checks.
- Nested references can be shared accidentally when using shallow copies.

Use a plain object when flexibility and simplicity are valuable. Consider a class, factory function, or validation layer when the data has rules, repeated behavior, or a meaningful identity.

## Common Mistakes

### Accidentally sharing an object

```js
const original = { count: 1 };
const copy = original;
copy.count = 2;

console.log(original.count); // 2: no copy was made
```

Use spread syntax for a shallow copy when appropriate:

```js
const copy = { ...original };
```

Remember that nested objects are still shared after a shallow copy.

### Losing `this` when passing a method

```js
const person = {
	name: "Ana",
	greet() {
		return this.name;
	}
};

const greet = person.greet;
// greet(); // `this` is no longer person.
```

Call it as `person.greet()` or bind the receiver with `person.greet.bind(person)`.

### Confusing missing properties with `null`

```js
const user = {};

user.email === undefined; // true
user.email === null; // false
```

An absent property is usually `undefined`; `null` is an explicit value that must be assigned.

### Treating `typeof` as an object detector

```js
typeof []; // "object"
typeof null; // "object"
```

Use `Array.isArray(value)` for arrays and strict checks for `null`.
