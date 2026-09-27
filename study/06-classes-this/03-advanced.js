class BankAccount {
  #balance;

  static currency = "BRL";
  static category = "bank account";

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  describe() {
    return `${this.owner}: ${this.balance} ${BankAccount.currency}`;
  }

  static describeCategory() {
    return this.category;
  }
}

class SavingsAccount extends BankAccount {
  static category = "savings account";

  constructor(owner, balance, interestRate) {
    super(owner, balance);
    this.interestRate = interestRate;
  }

  describe() {
    return `${super.describe()} (interest: ${this.interestRate}%)`;
  }
}

const account = new BankAccount("Ana", 100);
account.deposit(25);

const savings = new SavingsAccount("Joao", 500, 3);

console.log(account.describe());
console.log(account.balance); // Public getter exposes a controlled view.
console.log(Object.keys(account)); // Private fields are not ordinary enumerable properties.
console.log(savings.describe()); // Calls the base method through super.
console.log(savings instanceof BankAccount); // true
console.log(BankAccount.describeCategory()); // Static method called on the class.
console.log(SavingsAccount.describeCategory()); // Inherited static method uses the subclass as this.
console.log(typeof account.describeCategory); // undefined: static methods are not instance methods.