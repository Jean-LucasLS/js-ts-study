const colors = ["red", "blue", "green"];

// Array destructuring uses positions, so order matters.
const [primary, secondary, tertiary] = colors;
console.log(primary, secondary, tertiary); // red blue green

// A comma skips a position; `...rest` collects the remaining values.
const scores = [10, 8, 7, 9];
const [highest, , thirdScore, ...remainingScores] = scores;

console.log(highest); // 10
console.log(thirdScore); // 7
console.log(remainingScores); // [9]

// Defaults apply when a position is missing or undefined.
const [firstColor, secondColor, thirdColor = "black"] = ["red", "blue"];
console.log(firstColor, secondColor, thirdColor); // red blue black

// Destructuring reads values; it does not remove them from the array.
console.log(colors); // ["red", "blue", "green"]

// Primitive elements are copied. Reassigning the variable does not update the array.
let selectedColor = primary;
selectedColor = "yellow";

console.log(selectedColor); // yellow
console.log(colors[0]); // red

// A nested array or object remains a shared reference.
const matrix = [[1, 2], [3, 4]];
const [firstRow] = matrix;

firstRow.push(5);

console.log(firstRow); // [1, 2, 5]
console.log(matrix[0]); // [1, 2, 5]
