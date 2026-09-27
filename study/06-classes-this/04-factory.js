function createPerson(name, age) {
  return {
    name,
    age,
    introduce() {
      return `My name is ${this.name}`;
    }
  };
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `My name is ${this.name}`;
  }
}

const classPerson = new Person("Joao", 25);
const secondClassPerson = new Person("Maria", 30);
const factoryPerson = createPerson("Joao", 25);
const secondFactoryPerson = createPerson("Maria", 30);

console.log(classPerson.introduce());
console.log(factoryPerson.introduce());
console.log(classPerson instanceof Person); // true
console.log(factoryPerson instanceof Person); // false
console.log(classPerson.introduce === secondClassPerson.introduce); // true: shared prototype method.
console.log(factoryPerson.introduce === secondFactoryPerson.introduce); // false: each object has its own method.
