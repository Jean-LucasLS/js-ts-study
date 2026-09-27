const person = {
  name: "Ana",
  address: { city: "Recife" }
};

const copy = { ...person }; // Copies top-level properties only.
copy.name = "Maria";
copy.address.city = "Olinda"; // The nested object is still shared.

console.log(person);
console.log(copy);

const deepCopy = structuredClone(person);
deepCopy.address.city = "Porto";

console.log(person.address.city); // Olinda: the original is unchanged.
console.log(deepCopy.address.city); // Porto: nested data was copied too.
