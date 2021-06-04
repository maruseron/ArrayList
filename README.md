# ArrayList

Array-derived class taking advantage of ES6 built-in subclassing designed to provide facilities similar to those of Kotlin or Java's ArrayList. It's by no means as powerful, but has way more than just add, get and remove.

I apologize for the lack of testing and the incomplete readme. I'll update regularly until both of these things are finished.

## Usage

### Adding to your project

To install the package:
```shell
npm install es6-arraylist
```

Since this package is compatible with TypeScript, those using JS will have to require it accessing the export's default property:
```js
//const ArrayList = require("es6-arrayList"); // wrong: { default: [class ArrayList extends Array] }
const ArrayList = require("es6-arraylist").default;

const myList = ArrayList.of(1, 2, 3); // ArrayList (3) [1, 2, 3]
```

### Constructor

The constructor works very similarly to Array's built-in constructor. However, ArrayList's constructor also accepts a size and function or another Array (or ArrayList). Examples below.

```js
const list1 = new ArrayList();              // []
const list2 = new ArrayList(5);             // [ empty x 5 ]
const list3 = new ArrayList(1, 2, 3, 4);    // [1, 2, 3, 4]
const list4 = new ArrayList(4, i => i * 2); // [0, 2, 4, 6]
const list5 = new ArrayList([1, 2, 3]);	    // [1, 2, 3]
```

For clarity purposes, there are also two other ways of creating ArrayLists from static functions available:
```js
// Of creates an ArrayList from a variable amount of arguments.
const list1 = ArrayList.of(10);        // [10]
const list2 = ArrayList.of(1, 2, 3);   // [1, 2, 3]
const list3 = ArrayList.of([1, 2, 3]); // [[1, 2, 3]] beware!

// Iterate does the same as using the constructor with size and a function.
// It's just clearer in intent.
const list4 = ArrayList.iterate(4, i => i * 2); // [0, 2, 4, 6]
```

### Adding and removing elements

There are several functions that serve this purpose with slight differences each.

#### Adding elements:
```js
// Add is mutating. Returns the modified original list.
const list1 = new ArrayList(1, 2);
list1.add(3); // [1, 2, 3]

// Append is non mutating. Returns a modified copy of the original list.
const list2 = new ArrayList(1, 2);
const list2b = list2.append(3);
console.log(list2);  // [1, 2]
console.log(list2b); // [1, 2, 3]

// Insert adds elements at a specific index without overwriting any values. 
// Mutating.
const list3 = new ArrayList(2, 3);
list3.insert(0, 1); // [1, 2, 3]

// Set adds elements at a specific index, overwriting any values. Mutating.
const list4 = new ArrayList(1, 2, 4);
list4.set(2, 3); // [1, 2, 3]
```

#### Removing elements:
```js
// Remove does exactly what you think it does. Mutating.
const list1 = new ArrayList(1, 2, 3, 4);
list1.remove(4); // [1, 2, 3]

// Alternatively, you can use an index to remove an item.
const list2 = new ArrayList(1, 2, 3, 4);
list2.removeFromIndex(3); // [1, 2, 3]
// By default, only 1 element is removed. You can define the amount:
const list3 = new ArrayList(1, 2, 3, 4, 5);
list3.removeFromIndex(3, 2); // [1, 2, 3]

// Difference is a non-mutating equivalent to remove.
// It expects an Array / ArrayList.
const list4 = new ArrayList(1, 2, 3, 4);
const list4b = list4.difference([ 4 ]);
console.log(list4);  // [1, 2, 3, 4]
console.log(list4b); // [1, 2, 3];
```

### Retrieving items
```js
const list = new ArrayList("first", "second", "third", "fourth", "last");

// If given no arguments, first returns the first element of the ArrayList.
list.first(); // "first"

// If, instead, provided a predicate, will return the first element 
// (using Array.find) that fulfills it:
list.first(s => s.length == 6); // "second"

// Similarly, if given no arguments, last will return the last element 
// of the ArrayList.
list.last(); // "last"
// With a predicate, it will return the last element that fulfills it, 
// using ArrayList.findLast():
list.last(s => s.length == 6); // "fourth"

// In case first / find / last / findLast fails finding the argument, 
// a defaultValue function can be specified.
list.first(s => s.length == 10,
           _ => "nothing found."); // "nothing found."

// At is just an implementation of Array.at() which is currently experimental.
// Returns undefined if the index is out of bounds.
list.at(1);  // "second"
list.at(-1); // "last"

// ElementAtOrElse allows for a custom return value in case the index is out of bounds.
list.elementAtOrElse(7, i => `nothing found at index ${i}`); // "nothing found at index 7"

// You can get the maximum and minimum values of an ArrayList using max and min:
const someNumbers = new ArrayList(1, 2, 3, 4, 5);
someNumbers.max(); // 5
someNumbers.min(); // 1
// If you have objects that can't be compared using standard greater or less than operators,
// you can define a default comparator and use maxBy and minBy:
const someObjects = new ArrayList({ name: "peter", age: 20 },
                                  { name: "monica", age: 23},
                                  { name: "marcelo", age: 19});
const ageFilter = person => person.age;
const oldest = someObjects.maxBy(ageFilter);   // { name: "monica", age: 23 }
const youngest = someObjects.minBy(ageFilter); // { name: "marcelo", age: 19 }

// To obtain random values from an ArrayList, you can use random and sample:
// Random returns one random element from the ArrayList.
const randomValue = someList.random();
// If one value is not enough, you can use sample and define a size:
const randomValues = someList.sample(3);
```

### Checking for conditions
```js
// Without arguments, any will check if there is at least one element
// in an ArrayList:
new ArrayList().any();        // false
new ArrayList(5).any();       // false, the Array has no keys
const list1 = new ArrayList(1, 2, 3).any(); // true

// If, instead, given a predicate, any will behave just like Array.some():
list1.any(n => n == 2); // true

// Contains and containsAll check if there is a particular item in
// an ArrayList. Uses the == operator.
const list4 = new ArrayList("wagner", "at", "the", "opera");
list4.contains("opera"); // true
list4.containsAll(["wagner", "opera"]); // true

// Equals uses the == operator to compare items on both arrays.
const list5 = new ArrayList("some", "strings");
const list6 = new ArrayList("some", "strings");
list5 === list6;     // false
list5 == list6;      // false
list5.equals(list6); // true

// IsEmpty checks if the array is empty. Duh.
new ArrayList().isEmpty(); // true
```

### List operations
```js
// MapNotFalsy and mapNotNull apply a transformator function on
// each item of the ArrayList, filtering out falsy and null values
// respectively:
const list1 = new ArrayList(2, 4, "c", "d", 10);
list1.map(n => n / 2);         // [1, 2, NaN, NaN, 5]
list1.mapNotFalsy(n => n / 2); // [1, 2, 5]

list1.map(n => typeof n === "number" ? n / 2); // [1, 2, undefined, undefined, 5]
list1.mapNotNull(n => typeof n === "number" ? n / 2); // [1, 2, 5]

// Zip returns an ArrayList of pairs created from elements of two arrays
// at the same index:
const list2 = new ArrayList("a", "b", 6, 8, "e");
list1.zip(list2); // [[2, "a"], [4, "b"], ["c", 6], ["d", 8], [10, "e"]]
// Note: Zip can also get a transformator function as a second argument.
// It should return a pair.

// If, instead, all elements are in the same array, you can use zipWithNext:
const list3 = new ArrayList(1, "a", 2, "b", 3, "c");
list3.zipWithNext(); // [[1, "a"], [2, "b"], [3, "c"]]

// Unzip allows us to turn a zipped ArrayList (list of pairs) into a pair of
// lists:
zipped.unzip(); // [[2, 4, "c", "d", 10], ["a", "b", 6, 8, "e"]]
```

### Altering the list
I'm still writing this. University is awful. Sorry.
```js
// Chunked splits an array into smaller chunks of custom size.
const list1 = new ArrayList(1, 2, 3, 4, 5);
list1.chunked(2); // [[1, 2], [3, 4], [5]]
list1.chunked(3); // [[1, 2, 3], [4, 5]]

// Drop and dropWhile remove the first n elements of an ArrayList.
// They're non mutating.
const list2 = new ArrayList("yadda", "yadda", "(", "inside", "parentheses", ")");
list2.drop(2);                  // ["(", "inside", "parentheses", ")"]
list2.dropWhile(s => s != "("); // ["(", "inside", "parentheses", ")"]

// Take, takeWhile and takeWhileLazy take the first n elements of an ArrayList.
// They're non mutating.
list2.take(2);                      // ["yadda", "yadda"]
list2.takeWhile(s => s != "(");     // ["yadda", "yadda"]
list2.takeWhileLazy(s => s != "("); // Generator

// FilterInstance, filterNotFalsy and filterNotNull filter out values:
class Person {
    constructor(name, age) {
        this.name = name;
    }
}
const people = new ArrayList(1, new Person("eren"),
                             2, new Person("mikasa"),
                             3, new Person("armin"));
// FilterInstance uses the instanceof operator, so it won't work on primitives.
people.filterInstance(Person); // [ { name: "eren" },
                               //   { name: "mikasa" },
                               //   { name: "armin"} ]

const list3 = new ArrayList(1, false, null, "hello", undefined);
list3.filterNotFalsy(); // [1, "hello"]
list3.filterNotNull();  // [1, false, "hello"]

// Reversed is a non-mutating alternative to Array.reverse:
list3.reversed(); // [undefined, "hello", null, false, 1]

// Shuffled shuffles. Go figure. Non mutating, by the way.
// For a mutating alternative, ArrayList.shuffle()
list3.shuffle();
list3.shuffled();

// Sorted is a non-mutating alternative to Array.sort():
const list4 = new ArrayList(1, 3, 5, 4, 2)
console.log(list4.sorted()); // [1, 2, 3, 4, 5]
console.log(list4);          // [1, 3, 5, 4, 2]

// Unique removes all repeated elements that are sanely comparable with standard
// algorithms. That means no objects. Sorry. Non mutating.
new ArrayList(1, 2, 3, 2, 4, 4, 5).unique(); // [1, 2, 3, 4, 5]
```

### Converting to other data types
```js
// associateWith, eachCount, fromPairs, groupBy, toArray, toSet
```