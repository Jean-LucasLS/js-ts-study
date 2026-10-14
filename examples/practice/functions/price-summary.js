function assertNonNegativeFiniteNumber(value, name) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }

  if (value < 0) {
    throw new RangeError(`${name} cannot be negative`);
  }
}

function calculateSubtotal(unitPrice, quantity) {
  assertNonNegativeFiniteNumber(unitPrice, "unitPrice");
  assertNonNegativeFiniteNumber(quantity, "quantity");
  return unitPrice * quantity;
}

const formatBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const subtotal = calculateSubtotal(19.9, 3);
console.log(formatBRL.format(subtotal));

try {
  calculateSubtotal(19.9, -1);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}