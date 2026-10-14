const hour = new Date().getHours();

if (hour >= 5 && hour < 12) {
  console.log("Good morning!");
} else if (hour >= 12 && hour < 18) {
  console.log("Good afternoon!");
} else if (hour >= 18 && hour < 23) {
  console.log("Good evening!");
} else {
  console.log("Good late night!");
}

console.log(`Current hour: ${hour}`);