function apply(operation, value) {
  return operation(value);
}

const double = (number) => number * 2;
const addTen = (value) => value + 10;

console.log(apply(double, 5));
console.log(apply(addTen, 100));
console.log(apply((text) => text.trim().toUpperCase(), "  hello  "));