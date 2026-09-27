# Conditionals

## Suggested Order

1. `01-basic.js` - combine conditions, order `else if` branches, use `switch`, and inspect truthy/falsy values.
2. `02-permissions.js` - build and compare a named permission rule across scenarios.
3. `03-shipping.js` - combine business rules and check exact threshold boundaries.

Use `if` to run code when a condition is true. Use `else` for the alternative.

```js
const hour = 14;

if (hour >= 9 && hour < 18) {
  console.log("The store is open");
} else {
  console.log("The store is closed");
}
```

Comparison operators include `===`, `!==`, `>`, `<`, `>=`, and `<=`.

Prefer strict comparisons such as `===` and `!==`. They compare both the value and the type, which avoids unexpected automatic conversions.

## Choosing a Branch

Use `else if` when conditions describe several possible ranges or cases. Order the branches carefully: the first true branch runs, and later branches are skipped.

```js
const score = 84;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("Needs improvement");
}
```

When checking ranges, decide whether each endpoint is included. For example, `score >= 80` includes 80, while `score < 90` excludes 90. Checking higher thresholds first avoids a broad condition hiding a more specific one.

Use `switch` when one value is compared against several discrete alternatives. Each `case` normally needs `break` to prevent execution from continuing into the next case; `default` handles values that did not match.

```js
switch (status) {
  case "approved":
    console.log("Approved");
    break;
  case "pending":
    console.log("Pending");
    break;
  default:
    console.log("Unknown status");
}
```

## Logical Operators

`&&` means **and**: every condition must be true.

```js
const hour = 14;
const isHoliday = false;

if (hour >= 9 && hour < 18 && !isHoliday) {
  console.log("Customer service is available");
}
```

`||` means **or**: at least one condition must be true. `!` reverses a boolean value.

```js
const isAdmin = false;
const isEditor = true;

if (isAdmin || isEditor) {
  console.log("Can edit");
}

if (!isAdmin) {
  console.log("Regular account");
}
```

JavaScript evaluates `&&` from left to right and can stop as soon as the result is known. This is called short-circuit evaluation:

```js
const account = null;

if (account && account.isActive) {
  console.log("Active account");
}
```

Because `account` is `null`, JavaScript does not try to read `isActive`.

Short-circuit operators return one of their operands, not necessarily `true` or `false`. `||` returns the first truthy operand (or the last operand); `&&` returns the first falsy operand (or the last operand). This is useful for fallback expressions, but can surprise code that expects a boolean:

```js
0 || 10; // 10
0 ?? 10; // 0: only null and undefined trigger this fallback.
"ready" && { status: "ready" }; // Returns the object.
```

Use `Boolean(value)` or an explicit comparison when the result must be a boolean. Use `??` rather than `||` when values such as `0` and `""` are valid and should not trigger a fallback.

## Combined Conditions

Use parentheses to make the logic clear:

```js
const hour = 20;
const isSaturday = true;
const isSunday = false;

if (hour >= 18 || isSaturday || isSunday) {
  console.log("The evening schedule is active");
} else {
  console.log("The daytime schedule is active");
}
```

Parentheses make the intended grouping explicit. Without them, remember that `&&` is evaluated before `||`. Complex conditions are easier to maintain when each part has a meaningful variable name.

Conditions also use truthy and falsy values. Values such as `false`, `0`, `""`, `null`, and `undefined` are falsy; most other values are truthy:

```js
const username = "Jean";

if (username) {
  console.log("Username provided");
}
```

Some values that look empty are still truthy: `"0"`, `[]`, and `{}`. A truthiness check also treats numeric `0` and the empty string as missing, so use an explicit comparison when those are valid inputs:

```js
const quantity = 0;

if (quantity) {
  console.log("Quantity provided");
} else {
  console.log("This also runs for a valid quantity of zero");
}

if (quantity !== null && quantity !== undefined) {
  console.log("A quantity was provided, including zero");
}
```

## Testing Rule Boundaries

Try values just below, exactly at, and just above a threshold. This makes inclusive and exclusive comparisons visible and can expose mistakes in business rules. The shipping example tests the minimum order amount and the member/country alternative separately.

For permission rules, test combinations where one required condition fails at a time. A user with an allowed role still must be active and have two-factor authentication when all three conditions are required.

## Guard Clauses

Guard clauses handle invalid or disqualifying cases early, so the main path stays less nested. They are especially useful when a function has several prerequisites:

```js
function canEditDocument(user) {
  if (!user) return false;
  if (!user.isActive) return false;
  if (!user.hasTwoFactorAuth) return false;

  return user.role === "admin" || user.role === "editor";
}
```

For a small pure rule, one combined boolean expression may be clearer. The permissions example compares both forms; choose the one that makes the rule easiest to scan and extend.
