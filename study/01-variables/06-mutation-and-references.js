"use strict";

// Reassignment changes which value a variable points to.
let count = 1;
count = 2;

// Mutation changes the existing object. `const` protects the reference,
// not the properties inside the object.
const user = { name: "Ana" };
user.name = "Maria";

console.log(count); // 2
console.log(user.name); // Maria

// Assignment creates a second reference, not a copy.
const originalAccount = { owner: "Ana", balance: 100 };
const sameAccount = originalAccount;

sameAccount.balance = 150;

console.log(originalAccount.balance); // 150
console.log(originalAccount === sameAccount); // true

// Spread creates a shallow copy: top-level properties are independent.
const originalProfile = {
	name: "Ana",
	address: { city: "Recife" },
};

const copiedProfile = { ...originalProfile };
copiedProfile.name = "Maria";
copiedProfile.address.city = "Olinda";

console.log(originalProfile.name); // Ana
console.log(copiedProfile.name); // Maria
console.log(originalProfile.address.city); // Olinda: nested object is shared
console.log(originalProfile === copiedProfile); // false
console.log(originalProfile.address === copiedProfile.address); // true

// Copy each changed level when the nested data must also be independent.
const updatedProfile = {
	...originalProfile,
	address: {
		...originalProfile.address,
		city: "Jaboatao",
	},
};

console.log(originalProfile.address.city); // Olinda
console.log(updatedProfile.address.city); // Jaboatao
console.log(originalProfile.address === updatedProfile.address); // false
