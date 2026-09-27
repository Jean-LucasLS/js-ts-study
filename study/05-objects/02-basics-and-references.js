const person = { name: "Ana", age: 25 };

person.name = "Joao"; // Change a property.
person.city = "Recife"; // Add a property.
console.log(person);

const original = { name: "Ana" };
const alias = original; // Both variables share one object.

alias.name = "Maria"; // Changing one reference changes the object.

console.log(original.name); // Maria
console.log(alias === original); // true
