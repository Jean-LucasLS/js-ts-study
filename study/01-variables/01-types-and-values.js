const name = "Ana";
const age = 25;
const active = true;
const noUser = null;
let notAssigned;
const person = { name: "Ana" };
const scores = [10, 9, 8];

// Primitive and object types.
console.log("name:", typeof name);
console.log("age:", typeof age);
console.log("active:", typeof active);
console.log("noUser:", typeof noUser); // Legacy typeof behavior
console.log("notAssigned:", typeof notAssigned);
console.log("person:", typeof person);
console.log("scores:", typeof scores);

console.log(noUser === null); // true
console.log(Array.isArray(scores)); // true

// Explicit type conversion.
const textScore = "42";
const score = Number(textScore);
console.log(score, typeof score);

// Invalid conversion produces NaN.
const invalidScore = Number("hello");
console.log(Number.isNaN(invalidScore)); // true

// Loose equality coerces values; strict equality does not.
console.log("5" == 5); // true: avoid relying on this coercion.
console.log("5" === 5); // false

// NaN is not equal to itself, but Object.is can identify it.
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

// Object.is distinguishes positive and negative zero unlike ===.
console.log(0 === -0); // true
console.log(Object.is(0, -0)); // false
