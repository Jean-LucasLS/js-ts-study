class BankAccount {
  constructor(owner, balance) {
    if (typeof balance !== "number" || !Number.isFinite(balance)) {
      throw new TypeError("Balance must be a finite number");
    }

    if (balance < 0) {
      throw new RangeError("Balance must be a non-negative finite number");
    }

    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    if (typeof amount !== "number" || !Number.isFinite(amount)) {
      throw new TypeError("Deposit must be a finite number");
    }

    if (amount <= 0) {
      throw new RangeError("Deposit must be a positive finite number");
    }

    this.balance += amount;
  }

  summary() {
    return `${this.owner}: $${this.balance}`;
  }
}

const account = new BankAccount("Ana", 100);
account.deposit(50);
console.log(account.summary());

const secondAccount = new BankAccount("Joao", 200);
console.log(account.summary === secondAccount.summary); // true: both use the prototype method.
console.log(Object.hasOwn(account, "summary")); // false: summary is not stored on the instance.

const detachedSummary = account.summary;
try {
  detachedSummary();
} catch (error) {
  console.log(error.name); // TypeError: `this` is undefined in a detached class method.
}

const boundSummary = detachedSummary.bind(account);
console.log(boundSummary()); // Binding restores the intended receiver.

try {
  account.deposit(-10);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

try {
  new BankAccount("Ana", -1);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

class ArrowAccount {
  constructor(owner) {
    this.owner = owner;
  }

  summary = () => `${this.owner}`;
}

const arrowAccount = new ArrowAccount("Ana");
const secondArrowAccount = new ArrowAccount("Joao");
const detachedArrowSummary = arrowAccount.summary;

console.log(detachedArrowSummary()); // Arrow functions keep the instance's `this`.
console.log(arrowAccount.summary === secondArrowAccount.summary); // false: each instance gets a function.
console.log(Object.hasOwn(arrowAccount, "summary")); // true: the field belongs to the instance.
