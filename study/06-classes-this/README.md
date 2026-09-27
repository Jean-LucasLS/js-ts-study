# Classes and `this`

## Suggested Order

1. `01-basic.js` - create an instance and compare it with a class without `this`.
2. `02-methods.js` - use `this`, inspect shared prototype methods, handle errors, and compare binding approaches.
3. `03-advanced.js` - use private fields, static members, and inheritance.
4. `04-factory.js` - compare class instances with objects returned by a factory function.

A class creates objects with data and behavior. `constructor` runs when `new` creates an instance.

The class describes the structure and behavior. The instance is the concrete object created from that description. Several instances can use the same class while keeping different data.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `My name is ${this.name}`;
  }
}
```

`name` is a temporary parameter. `this.name` is a property stored on the instance.

When `new Person("Joao", 25)` runs, JavaScript creates a new object, makes `this` refer to that object, runs the constructor, and returns the initialized instance. The parameter `name` exists only while the constructor is running; `this.name` remains on the object.
Calling a class without `new` throws a `TypeError`:

```js
try {
  Person("Joao", 25);
} catch (error) {
  console.log(error.name); // TypeError
}
```

```js
const person = new Person("Joao", 25);
console.log(person.introduce());
console.log(person instanceof Person); // true
```

Without `this`, `name = name` only assigns the parameter to itself. It does not save a property.
Class bodies run in strict mode. A constructor that only reassigns its parameters does not create instance properties, so reading those properties later returns `undefined`.

Methods also use `this` to find the data belonging to the object that called them:

```js
const joao = new Person("Joao", 25);
const maria = new Person("Maria", 30);

console.log(joao.introduce());  // My name is Joao
console.log(maria.introduce()); // My name is Maria
```

The method is defined once on the class, but `this` makes it read the correct instance data for each call.
Class methods live on the class prototype rather than being copied onto each instance. This means instances of the same class share the method.

The value of `this` depends on how a method is called. Detaching a class method loses its receiver:

```js
const summary = account.summary;
// summary(); // TypeError: `this` is undefined.

const boundSummary = summary.bind(account);
boundSummary(); // Uses account as `this`.
```

Use `.bind()` when a method must keep a particular receiver after it is passed elsewhere. Alternatively, design the function so it does not depend on `this`.

An arrow function used as a class field keeps the instance's `this` when detached:

```js
class Greeter {
  constructor(name) {
    this.name = name;
  }

  greet = () => `Hello, ${this.name}`;
}
```

Unlike a prototype method, this field creates a new function for every instance. Use it when preserving `this` is useful, such as passing a method as a callback; use prototype methods when sharing one method across instances matters.

Constructors can also reject invalid initial data by throwing an error. Use `TypeError` when a value has the wrong type and `RangeError` when it is outside the allowed range. Catch errors at a boundary where the program can recover or show a useful message; do not catch and silently ignore them.

Do not return another object from a normal class constructor. A returned object replaces the instance and loses the class prototype and methods.

If the goal is only to create a plain object, a factory function communicates that intention more directly:

```js
function createPerson(name, age) {
  return {
    name,
    age,
    introduce() {
      return `My name is ${this.name}`;
    }
  };
}
```

Both approaches can return objects with the same behavior. A class instance has class identity and shares class methods through its prototype. A factory returns ordinary objects; methods written in each returned object are own properties, and each call creates a new method function.

Use a class when the objects have a shared identity and behavior. Use a factory function when you want to create plain objects without class identity; factories can also close over private state when that is useful.

## Private Fields, Static Members, and Inheritance

Private fields use a `#` name and can only be accessed inside the class body. They are not ordinary object properties, so they do not appear in `Object.keys()` and cannot be read directly from outside the class. Expose operations or getters when callers need controlled access.

Static fields and methods belong to the class, not to its instances. A static method can be inherited; when called through a subclass, `this` refers to that subclass.

Use `extends` to create a subclass. Its constructor must call `super(...)` before using `this`. An overriding method can call the base implementation with `super.method()`. JavaScript class inheritance follows the prototype chain and supports one base class; composition is often a simpler alternative when a type does not truly specialize another.

Unlike Python, JavaScript does not have a `protected` class-field keyword. Use private fields for enforced privacy, or ordinary public properties when subclass access is part of the design.
