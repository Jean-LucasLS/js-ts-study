const account = {
  owner: "Ana",
  balance: 100,

  deposit(amount) {
    this.balance += amount; // `this` is the object before the dot.
  },

  summary() {
    return `${this.owner}: $${this.balance}`;
  }
};

account.deposit(50);
console.log(account.summary());

const user = {
  firstName: "Ana",
  lastName: "Silva",

  get fullName() {
    return `${this.firstName} ${this.lastName}`; // Read like a property.
  },

  set fullName(value) {
    const [firstName, lastName] = value.split(" "); // Transform on assignment.
    this.firstName = firstName;
    this.lastName = lastName;
  }
};

console.log(user.fullName);
user.fullName = "Maria Costa";
console.log(user.fullName);
