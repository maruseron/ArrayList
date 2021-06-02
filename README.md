# ArrayList

Array-derived class taking advantage of ES6 built-in subclassing designed to provide facilities similar to those of Kotlin or Java's ArrayList. It's by no means as powerful, but has way more than just add, get and remove.

# Usage

## Constructor

The constructor works very similarly to Array's built-in constructor. However, ArrayList's constructor also accepts a size and function or another Array (or ArrayList). Examples below.

```js
const list1 = new ArrayList(); // []
const list2 = new ArrayList(5); // [ empty x 5 ]
const list3 = new ArrayList(1, 2, 3, 4); // [1, 2, 3, 4]
const list4 = new ArrayList(4, i => i * 2); // [0, 2, 4, 6]
const list5 = new ArrayList([1, 2, 3]); // [1, 2, 3]
```

## Adding and removing elements

There are several functions that serve this purpose with slight differences each.

### Adding elements:
```js
// Add is mutating. Returns the modified original list.
const list1 = new ArrayList(1, 2);
list1.add(3);
console.log(list1); // [1, 2, 3]

// Append is non mutating. Returns a modified copy of the original list.
const list2 = new ArrayList(1, 2);
const list2b = list2.append(3);
console.log(list2); // [1, 2]
console.log(list2b); // [1, 2, 3]

// Insert adds elements at a specific index without overwriting any values. Mutating.
const list3 = new ArrayList(2, 3);
list3.insert(0, 1);
console.log(list3); // [1, 2, 3]

// Set adds elements at a specific index, overwriting any values. Mutating.
const list4 = new ArrayList(1, 2, 4);
list4.set(2, 3);
console.log(list4); // [1, 2, 3]
```

### Removing elements:
```js
// Remove does exactly what you think it does. Mutating.
const list1 = new ArrayList(1, 2, 3, 4);
list1.remove(4);
console.log(list1); // [1, 2, 3]

// Difference is a non-mutating equivalent to remove. It expects an Array / ArrayList.
const list2 = new ArrayList(1, 2, 3, 4);
const list2b = list2.difference([ 4 ]);
console.log(list2); // [1, 2, 3, 4]
console.log(list2b); // [1, 2, 3];
```

## Retrieving items
```js
// first/find and last/findLast
// at and elementAtOrElse
// max/maxBy and min/minBy
// random and sample
```

## Checking for conditions
```js
// any
// contains and containsAll
// equals
// isEmpty
```