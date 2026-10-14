# JavaScript and TypeScript Study Workspace

This folder contains small exercises and examples for learning JavaScript and TypeScript.

## Suggested Study Order

1. `study/` - short guided lessons
2. `examples/practice/` - runnable examples organized by the study modules
3. `examples/browser/` - HTML and browser exercises
4. `examples/notebooks/` - interactive notebook practice

## Study Material

- [Short study modules](study/README.md)

The short modules are the recommended path. The practical examples are grouped in the same topic order for follow-up practice.

## Folder Guide

### Practical examples

The files in `examples/practice/` are grouped to match `study/` and can be run with Node.js:

```powershell
node examples/practice/basic/variables/string-operations.js
node examples/practice/basic/conditionals/time-of-day.js
node examples/practice/functions/callbacks-and-closures.js
node examples/practice/arrays/transform-and-sort.js
node examples/practice/objects/factory-and-this.js
node examples/practice/classes/constructor-return.js
```

See the [practical examples index](examples/practice/README.md) for the topic map.

### Browser examples

The folders in `examples/browser/` contain examples intended to be opened in a browser:

- `strings/` contains a strings example and its stylesheet.
- `people_class/` contains a people example, its stylesheet, and its HTML page.
- `math.html` contains a standalone HTML example.

### Notebook

`examples/notebooks/notebook_js.ipynb` contains interactive notebook exercises and should be opened in Jupyter or VS Code with the Jupyter extension.

## Current Learning Priority: Functions and Arrays

Functions and arrays now come before objects and classes in the study sequence. Start with the [functions module](study/03-functions/README.md) and [arrays module](study/04-arrays/README.md), then practice with [callbacks and closures](examples/practice/functions/callbacks-and-closures.js) and [array transformations](examples/practice/arrays/transform-and-sort.js).

The earlier class counterexample remains available in [constructor-return.js](examples/practice/classes/constructor-return.js), with the guided material in [Classes and `this`](study/06-classes-this/README.md).
