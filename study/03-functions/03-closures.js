function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const firstCounter = createCounter();
const secondCounter = createCounter();

console.log(firstCounter()); // 1
console.log(firstCounter()); // 2
console.log(secondCounter()); // 1: independent closed-over state.

const varCallbacks = [];
for (var index = 0; index < 3; index += 1) {
  varCallbacks.push(() => index);
}

const letCallbacks = [];
for (let index = 0; index < 3; index += 1) {
  letCallbacks.push(() => index);
}

console.log(varCallbacks.map((callback) => callback())); // [3, 3, 3]
console.log(letCallbacks.map((callback) => callback())); // [0, 1, 2]