const prices = [12, 3, 25, 8];

const discounted = prices.map((price) => price * 0.9);
const largerDiscountedPrices = discounted.filter((price) => price >= 10);
const total = prices.reduce((sum, price) => sum + price, 0);
const sortedPrices = prices.toSorted((left, right) => left - right);

console.log({ discounted, largerDiscountedPrices, total, sortedPrices });
console.log(prices); // map, filter, reduce, and toSorted leave this array unchanged.

prices.sort((left, right) => left - right); // sort mutates the array.
console.log(prices);