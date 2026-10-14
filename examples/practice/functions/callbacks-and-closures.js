function apply(operation, value) {
  return operation(value);
}

function createMultiplier(factor) {
  return (value) => value * factor;
}

function addItem(item, items = []) {
  items.push(item);
  return items;
}

const triple = createMultiplier(3);

console.log(apply(triple, 5));
console.log(addItem("first"));
console.log(addItem("second")); // A fresh default array is created for this call.