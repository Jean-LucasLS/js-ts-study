const person = { name: "Ana", age: 25, country: "Brazil" };

// Object properties are matched by name; order does not matter.
const { name, age } = person;
const { country, name: userName, age: userAge } = person;

console.log(name, age); // Ana 25
console.log(userName, userAge, country); // Ana 25 Brazil
console.log(person.name); // Ana: the original object remains

// Primitive values are copied. Changing the variable does not change the property.
let currentAge = age;
currentAge = 30;

console.log(currentAge); // 30
console.log(person.age); // 25

// Reassigning the destructured variable also does not update the object.
let currentName = name;
currentName = "Maria";

console.log(currentName); // Maria
console.log(person.name); // Ana

// Nested objects and arrays are references. Mutating one changes the other.
const profile = {
	preferences: { theme: "light" },
	tags: ["student"],
};

const { preferences, tags } = profile;
preferences.theme = "dark";
tags.push("javascript");

console.log(preferences.theme); // dark
console.log(profile.preferences.theme); // dark
console.log(tags); // ["student", "javascript"]
console.log(profile.tags); // ["student", "javascript"]

// To change the original property, use the object explicitly.
person.name = "Maria";
console.log(name); // Ana: destructuring does not create a live binding
console.log(person.name); // Maria

// Defaults apply when a property is missing or undefined.
const account = { owner: "Ana", premium: false, phone: undefined };
const {
	owner = "Guest",
	premium = true,
	phone = "Not provided",
	email = "Not provided",
} = account;

console.log(owner); // Ana
console.log(premium); // false
console.log(phone, email); // Not provided Not provided

// `...rest` collects properties that were not extracted.
const product = {
	name: "Keyboard",
	price: 120,
	category: "Accessories",
	stock: 8,
};

const { name: productName, price, ...productDetails } = product;
console.log(productName, price, productDetails);

// Nested destructuring and renamed properties can be combined.
const customer = {
	name: "Maria",
	address: { city: "Recife", country: "Brazil" },
};

const {
	name: customerName,
	address: { city, country: customerCountry },
} = customer;

console.log(customerName, city, customerCountry);
