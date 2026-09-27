"use strict";

// A function creates a local scope for its variables.
function calculateProgress() {
	let progress = 0;
	progress += 25;
	progress += 25;
	return progress;
}

console.log(`Progress: ${calculateProgress()}%`); // Progress: 50%
// console.log(progress); // ReferenceError: progress belongs to the function

// A function can read and change a variable from its outer scope.
let status = "pending";

function approve() {
	status = "approved";
	const approvalDate = "today";
	console.log(approvalDate); // today
}

approve();
console.log(status); // approved
// console.log(approvalDate); // ReferenceError: local to approve

// `var` is function-scoped, so it escapes a plain block.
function demonstrateVarScope() {
	if (true) {
		var legacyTopic = "Old style";
	}

	console.log(legacyTopic); // Old style
}

demonstrateVarScope();
// console.log(legacyTopic); // ReferenceError: it belongs to the function
