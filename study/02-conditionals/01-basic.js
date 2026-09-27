const hour = 14;

// Choose a branch
if (hour >= 9 && hour < 18) {
  console.log("The store is open");
} else {
  console.log("The store is closed");
}

const score = 84;

// Check the highest threshold first so ranges do not overlap incorrectly.
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: needs improvement");
}

const isHoliday = false;

// Both conditions must be true.
if (hour >= 9 && hour < 18 && !isHoliday) {
  console.log("Customer service is available");
}

const eveningHour = 20;
const isSaturday = true;
const isSunday = false;

// At least one condition must be true.
if (eveningHour >= 18 || isSaturday || isSunday) {
  console.log("The evening schedule is active");
} else {
  console.log("The daytime schedule is active");
}

const status = "pending";

switch (status) {
  case "approved":
    console.log("Request approved");
    break;
  case "pending":
    console.log("Request is being reviewed");
    break;
  case "rejected":
    console.log("Request rejected");
    break;
  default:
    console.log("Unknown request status");
}

const sampleValues = [0, "", "0", [], {}];

for (const value of sampleValues) {
  console.log(value, Boolean(value));
}

const zeroWithOr = 0 || 10;
const zeroWithNullish = 0 ?? 10;
const readyValue = "ready" && { status: "ready" };

console.log(zeroWithOr); // 10: || returns the first truthy operand.
console.log(zeroWithNullish); // 0: ?? only falls back for null or undefined.
console.log(readyValue); // The object: && returns an operand, not a boolean.
