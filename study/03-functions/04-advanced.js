function compose(first, second) {
  return (value) => second(first(value));
}

const trim = (text) => text.trim();
const uppercase = (text) => text.toUpperCase();
const normalizeLabel = compose(trim, uppercase);

function multiplyBy(factor) {
  return (value) => factor * value;
}

const triple = multiplyBy(3); // Partially apply the factor.

console.log(normalizeLabel("  JavaScript functions  "));
console.log(triple(7));