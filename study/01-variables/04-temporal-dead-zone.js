"use strict";

// `let` and `const` cannot be read before their declaration.
// The time before the declaration is the temporal dead zone (TDZ).
function demonstrateLetTDZ() {
	try {
		console.log(value);
	} catch (error) {
		console.log(error.name); // ReferenceError
	}

	let value = "available after declaration";
	console.log(value); // available after declaration
}

function demonstrateConstTDZ() {
	try {
		console.log(language);
	} catch (error) {
		console.log(error.name); // ReferenceError
	}

	const language = "JavaScript";
	console.log(language); // JavaScript
}

demonstrateLetTDZ();
demonstrateConstTDZ();
