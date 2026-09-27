"use strict";

// Object.freeze prevents adding, removing, or replacing top-level properties.
const settings = Object.freeze({ theme: "light", language: "pt-BR" });

// In strict mode, these operations throw TypeError instead of failing silently.
try {
	settings.theme = "dark";
} catch (error) {
	console.log(error.constructor.name); // TypeError
}

try {
	settings.timezone = "America/Sao_Paulo";
} catch (error) {
	console.log(error.constructor.name); // TypeError
}

console.log(settings.theme); // light
console.log(Object.isFrozen(settings)); // true

// `Object.freeze` is shallow: it freezes the first level only.
const account = Object.freeze({
	owner: "Ana",
	preferences: {
		newsletter: true,
	},
	tags: ["student"],
});

account.preferences.newsletter = false;
account.tags.push("javascript");

console.log(account.preferences.newsletter); // false
console.log(account.tags); // ["student", "javascript"]
console.log(Object.isFrozen(account.preferences)); // false
console.log(Object.isFrozen(account.tags)); // false

// To freeze nested data, every nested object must also be frozen.
const deeplyFrozenAccount = Object.freeze({
	owner: "Ana",
	preferences: Object.freeze({ newsletter: true }),
	tags: Object.freeze(["student"]),
});

try {
	deeplyFrozenAccount.preferences.newsletter = false;
} catch (error) {
	console.log(error.constructor.name); // TypeError
}

try {
	deeplyFrozenAccount.tags.push("javascript");
} catch (error) {
	console.log(error.constructor.name); // TypeError
}

// `structuredClone` creates an independent deep copy for supported values.
const originalProfile = {
	name: "Ana",
	address: { city: "Recife" },
};

const draft = structuredClone(originalProfile);
draft.address.city = "Olinda";

console.log(originalProfile.address.city); // Recife
console.log(draft.address.city); // Olinda
