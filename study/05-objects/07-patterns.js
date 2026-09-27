const defaults = { theme: "light", language: "en" };
const preferences = { language: "pt-BR" };

// Merge objects from left to right.
const settings = Object.assign({}, defaults, preferences);
console.log(settings);

console.log(Object.hasOwn(settings, "theme")); // true
console.log(Object.hasOwn(settings, "missing")); // false

const user = {
  profile: {
    name: "Ana"
  }
};

// Optional chaining avoids an error when a path is missing.
console.log(user.profile?.name); // Ana
console.log(user.contact?.email); // undefined

// Use a fallback only for null or undefined.
const preferredName = user.profile?.name ?? "Guest";
console.log(preferredName);

delete settings.language; // Remove a property.
console.log(settings);

const frozen = Object.freeze({ status: "fixed" });
const sealed = Object.seal({ status: "editable" });

// freeze blocks changes; seal blocks adding/removing properties.
console.log(frozen, sealed);

const cache = new Map();
const request = { id: 1 };

cache.set(request, { result: "cached" });
cache.set("retryCount", 2);

console.log(cache.get(request)); // Map keys can be objects.
console.log(cache.get({ id: 1 })); // undefined: object keys use identity, not matching contents.
console.log(cache.size); // 2

const options = Object.fromEntries([
  ["theme", "dark"],
  ["fontSize", 16]
]);
console.log(options);

const record = {
  name: "Ana",
  score: NaN,
  note: undefined,
  greet() {
    return `Hello, ${this.name}`;
  }
};

const json = JSON.stringify(record);
const parsedRecord = JSON.parse(json);

console.log(json); // Undefined properties and functions are omitted; NaN becomes null.
console.log(parsedRecord);
