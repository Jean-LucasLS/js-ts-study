const useThis = true; // Set to false to compare with a closure.

function createPerson(name, surname, age) {
  return {
    name,
    surname,
    age,

    description() {
      if (useThis) {
        console.log(`(this) Name: ${this.name}, Surname: ${this.surname}, Age: ${this.age}`);
      } else {
        console.log(`(closure) Name: ${name}, Surname: ${surname}, Age: ${age}`);
      }
    }
  };
}

const person = createPerson("Jean", "Silva", 30);

console.log("Before changes:");
person.description();

console.log("\nChanging the object...");
person.name = "Juca";
person.surname = "Oliveira";
person.age = 40;

console.log("\nAfter changes:");
person.description();