class Person {
  constructor(name, age) {
    this.name = name; // Store the parameter
    this.age = age; // Store the parameter
  }

  introduce() {
    return `My name is ${this.name}`; // Read instance data
  }
}

class PersonWithoutThis {
  constructor(name, age) {
    name = name; // Assigns the parameter to itself
    age = age; // Does not create properties
  }
}

const person = new Person("Joao", 25); // Create an instance
const emptyPerson = new PersonWithoutThis("Maria", 30);

console.log(person);
console.log(person.introduce());
console.log(person instanceof Person);
console.log(emptyPerson);
console.log(emptyPerson.name);

try {
  Person("Joao", 25);
} catch (error) {
  console.log(error.name); // TypeError: classes must be called with `new`.
}
