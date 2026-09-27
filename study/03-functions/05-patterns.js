function assertFiniteNumber(value, name) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

function calculateDiscountedPrice(price, discountRate) {
  assertFiniteNumber(price, "price");
  assertFiniteNumber(discountRate, "discountRate");

  if (price < 0) {
    throw new RangeError("price cannot be negative");
  }

  if (discountRate < 0 || discountRate > 1) {
    throw new RangeError("discountRate must be between 0 and 1");
  }

  return price * (1 - discountRate);
}

function createCurrencyFormatter(locale, currency) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  });

  return (amount) => formatter.format(amount);
}

const formatBRL = createCurrencyFormatter("pt-BR", "BRL");
const discountedPrice = calculateDiscountedPrice(200, 0.15);

console.log(formatBRL(discountedPrice));

try {
  calculateDiscountedPrice(200, 1.5);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}