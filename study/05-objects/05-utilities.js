const person = {
  name: "Ana",
  age: 25,
  city: "Recife"
};

console.log(Object.keys(person)); // Property names.
console.log(Object.values(person)); // Property values.
console.log(Object.entries(person)); // [key, value] pairs.

for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}

const personPrototype = {
  category: "member",
  introduce() {
    return `My name is ${this.name}`;
  }
};

const member = Object.create(personPrototype);
member.name = "Ana";

console.log(member.introduce()); // The inherited method uses the member as `this`.
console.log(Object.keys(member)); // Own enumerable properties only.
console.log("category" in member); // true: includes inherited properties.
console.log(Object.hasOwn(member, "category")); // false: not an own property.

for (const key in member) {
  console.log(key); // Includes enumerable inherited properties such as category.
}

for (const key in member) {
  if (Object.hasOwn(member, key)) {
    console.log(key); // Only own enumerable properties.
  }
}

const profile = { name: "Ana" };
Object.defineProperty(profile, "id", {
  value: 7,
  enumerable: false,
  writable: false,
  configurable: false
});

console.log(profile.id); // 7
console.log(Object.keys(profile)); // id is not enumerable.
console.log(Object.getOwnPropertyDescriptor(profile, "id"));

const frozen = Object.freeze({ status: "fixed" });
const sealed = Object.seal({ status: "editable" });
sealed.status = "updated"; // Sealing allows changes to existing properties.

console.log(Object.isFrozen(frozen)); // true
console.log(Object.isSealed(sealed)); // true
console.log(sealed.status); // updated
