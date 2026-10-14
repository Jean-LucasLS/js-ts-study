function compose(first, second) {
  return (value) => second(first(value));
}

const removeWhitespace = (text) => text.trim();
const slugify = (text) => text.toLowerCase().replaceAll(" ", "-");
const createSlug = compose(removeWhitespace, slugify);

function createDiscount(discount) {
  return (price) => price - discount;
}

const studentDiscount = createDiscount(15);

console.log(createSlug("  Functions In JavaScript  "));
console.log(studentDiscount(100));