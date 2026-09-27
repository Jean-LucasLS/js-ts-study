const plainPerson = {
  name: "Ana",
  introduce() {
    return `My name is ${this.name}`;
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}`;
  }
}

const classPerson = new Person("Maria");

// Both objects can expose the same behavior.
console.log(plainPerson.introduce());
console.log(classPerson.introduce());

// Only the class-created object has Person's identity.
console.log(plainPerson instanceof Person); // false
console.log(classPerson instanceof Person); // true
