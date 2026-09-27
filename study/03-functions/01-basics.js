function addOne(value) {
  return value + 1;
}

const addTwo = function (value) {
  return value + 2;
};

function label(value = "unknown") {
  return value;
}

function collect(first, ...rest) {
  return [first, ...rest];
}

function describeUser({ name, age = 18 }) {
  return `${name} is ${age} years old`;
}

console.log(addOne(4));
console.log(addTwo(4));
console.log(label());
console.log(label(undefined));
console.log(label(null));
console.log(collect("start", 1, 2, 3));
console.log(describeUser({ name: "Lia" }));