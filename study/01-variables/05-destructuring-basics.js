// Destructuring creates variables from existing values.
const person = { name: "Ana", age: 25 };
const { name } = person;
let { age } = person;

const colors = ["red", "blue"];
const [primary, secondary] = colors;

console.log(name, age); // Ana 25
console.log(primary, secondary); // red blue
console.log(person, colors); // The original values remain

// Primitive values are copied. `age` and `person.age` do not share a reference.
// let currentAge = age; // This line is removed as per the patch intent
age = 30;

console.log(age); // 30
console.log(person.age); // 25

person.age = 40;

console.log(person.age); // 40
console.log(age); // 30: changing the property did not change the variable

// Nested objects share a reference, so mutations affect both names.
const user = { preferences: { theme: "light" } };
const { preferences } = user;

console.log(preferences === user.preferences); // true: same object reference
preferences.theme = "dark";

console.log(preferences.theme); // dark
console.log(user.preferences.theme); // dark
