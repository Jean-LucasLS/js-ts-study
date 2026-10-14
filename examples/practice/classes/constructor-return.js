class PersonWithThis {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    return { name, age }; // Returning an object replaces the class instance.
  }
}

class PersonWithoutThis {
  constructor(name, age) {
    return { name, age }; // A constructor can return a plain object explicitly.
  }
}

const personWithThis = new PersonWithThis("Joao", 25);
const personWithoutThis = new PersonWithoutThis("Maria", 30);

console.log(personWithThis);
console.log(personWithThis.name);
console.log(personWithoutThis);
console.log(personWithoutThis.name);
console.log(personWithThis instanceof PersonWithThis); // false
console.log(personWithoutThis instanceof PersonWithoutThis); // false