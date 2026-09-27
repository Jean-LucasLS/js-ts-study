"use strict";

// A block is a region between braces. `let` and `const` belong to that block.
const course = "JavaScript";

if (true) {
	const topic = "Variables";
	let progress = 50;
	progress += 25;

	console.log(course); // JavaScript: an inner block can read outside
	console.log(topic, progress); // Variables 75
}

// console.log(topic); // ReferenceError: topic exists only inside the if

// Assigning without `let` or `const` changes the outer variable.
let total = 10;
{
	total = 20;
}
console.log(total); // 20

// Declaring the name again creates a different inner variable.
let score = 10;
{
	let score = 100;
	console.log(score); // 100
}
console.log(score); // 10

// An inner variable can shadow an outer variable temporarily.
const message = "outside";
{
	const message = "inside";
	console.log(message); // inside
}
console.log(message); // outside

// A const object has a fixed binding, but its properties can change.
const settings = { theme: "light" };
settings.theme = "dark";
console.log(settings.theme); // dark
