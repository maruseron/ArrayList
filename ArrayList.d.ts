declare type None = null | undefined;
declare type Falsy = false | '' | 0 | None;
declare type Class<T> = new (...args: any[]) => T;
declare type NonNullArrayList<T> = T extends None ? never : ArrayList<T>;
declare type NonFalsyArrayList<T> = T extends Falsy ? never : ArrayList<T>;
/**
 * This class is just a mere array with a bunch of utility methods I miss from languages like Kotlin,
 * that have very powerful collection manipulation functions.
 * @extends {Array}
 */
export default class ArrayList<T> extends Array<T> {
    constructor(...args: any[]);
    /**
     * Mutates the ArrayList by adding an element at the end.
     * @param {Array} elements the element(s) to add to the array.
     * @returns {ArrayList} the original ArrayList.
     */
    add(...elements: T[]): ArrayList<T>;
    /**
     * Mutates the ArrayList by removing the elements from it.
     * @param {Array} elements the element(s) to remove from the array.
     * @returns {ArrayList} the original ArrayList.
     */
    remove(...elements: T[]): ArrayList<T>;
    /**
     * See ArrayList#add, but append is non-mutating.
     * @param elements the element(s) to add to the array.
     * @returns {ArrayList} a copy of the original ArrayList plus the new elements.
     */
    append(...elements: T[]): ArrayList<T>;
    /**
     * Removes those elements that are common to both arrays.
     * @param {Array} elements the elements to remove from the array.
     * @returns {ArrayList} a copy of the original ArrayList minus the common elements.
     */
    difference(elements: T[]): ArrayList<T>;
    /**
     * If no arguments are given, it checks if there is at least one item in the ArrayList.
     * With arguments, identical to [Array.some()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param {Function} [predicate] the condition to be checked for each item.
     * @returns {boolean} `true` if any element fulfills the condition or if there is at least one element in the array.
     */
    any(predicate?: (x: T) => boolean): boolean;
    /**
     * Returns a map that holds the values of this ArrayList as key and their respective
     * selected properties as value.
     * @param prop the property to associate the value with.
     */
    associateWith(prop: string): Map<T, unknown>;
    /**
     * If elements are addable, returns the sum of them divided by their length.
     * Otherwise, returns NaN.
     */
    average(): number;
    /**
     * Splits an ArrayList into chunks of a custom size. Non-mutating.
     * @param {number} size must be a positive, non-zero number.
     * @returns {ArrayList} the new chunked ArrayList.
     */
    chunked(size: number): ArrayList<ArrayList<T>>;
    /**
     * Returns true if the element is found in the array. Alias for Array.prototype.includes if it were to be
     * used with one argument only.
     * @param {*} value the element to look for.
     * @returns {boolean} `true if the element is found, `false` if not.
     */
    contains(value: T): boolean;
    /**
     * Checks if all elements in the specified Array or ArrayList are contained in this ArrayList.
     * @param {Array} array the Array / ArrayList to compare against.
     * @returns {boolean} `true` if all elements exist, `false` instead.
     */
    containsAll(array: T[] | ArrayList<T>): boolean;
    /**
     * Returns a copy of the original ArrayList.
     */
    copyOf(): ArrayList<T>;
    /**
     * Returns a copy of a range of the original ArrayList.
     * @param {number} start inclusive.
     * @param {number} [end] non-inclusive.
     */
    copyOfRange(start: number, end?: number): ArrayList<T>;
    /**
     * If no predicate is provided, it returns the real amount of elements in the ArrayList, as opposed to length.
     * If a predicate is provided, it returns the amount of elements that fulfill it.
     * @param {Function} [predicate] the condition to be checked for each item.
     */
    count(predicate?: (x: T) => boolean): number;
    /**
     * If n is positive, returns a new ArrayList where the first n elements have been removed.
     * If n is negative, returns a new ArrayList where the all items except the last n have been removed.
     * @param {number} n the amount of elements to drop.
     */
    drop(n: number): ArrayList<T>;
    /**
     * Returns a copy of the original ArrayList where the first n elements that fulfilled the
     * predicate have been removed.
     * @param {Function} predicate the condition to be checked for each item.
     */
    dropWhile(predicate: (x: T) => boolean): ArrayList<T>;
    /**
     * Groups elements of this ArrayList by key and counts elements in each group.
     * @returns {Map} Map containing the elements as key and the count as value.
     */
    eachCount(): Map<T, number>;
    /**
     * Returns the element at the given index or the result of calling defaultValue
     * if the index is out of bounds for this array.
     * @param {number} index the index to look for.
     * @param {Function} defaultValue a function that will return a default value in case the index is out of bounds. Receives index as a parameter.
     */
    elementAtOrElse<U>(index: number, defaultValue: (x: number) => U): T | U;
    /**
     * Compares the elements of two arrays by order, returning true if all elements are in
     * the same place and are equal.
     * @param {Array} array the list of which each item will be compared against this ArrayList.
     * @returns {boolean} `true` if all elements are equal and are in the same place, `false` instead.
     */
    equals(array: T[] | ArrayList<T>): boolean;
    /**
     * Returns a copy of the original ArrayList where all elements that are not instances of
     * the specified class have been removed.
     * @param {Class} klass the class to compare each item against.
     */
    filterInstance<U>(klass: Class<U>): ArrayList<T>;
    /**
     * Returns a copy of the original ArrayList where all elements that evaluate as falsy have been removed.
     */
    filterNotFalsy(): NonFalsyArrayList<T>;
    /**
     * Returns a copy of the original ArrayList containing all elements that are not null or undefined.
     */
    filterNotNull(): NonNullArrayList<T>;
    /**
     * Finds the last item of this ArrayList that fulfills a predicate, as opposed to
     * [Array.find()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * @param {Function} predicate the condition to be checked for each item.
     * @returns {*} the last item fulfilling the predicate.
     */
    findLast(predicate: (x: T) => boolean): T;
    /**
     * Finds the index of the last item of this ArrayList that fulfills a predicate, as opposed to
     * [Array.findIndex()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).
     * @param {Function} predicate the condition to be checked for each item.
     * @returns {number} the index of the last item fulfilling the predicate.
     */
    findLastIndex(predicate: (x: T) => boolean): number;
    /**
     * If a predicate is given, returns the first element that fulfills it.
     * Otherwise, returns the first element of the ArrayList, if it exists.
     * Aditionally, a defaultValue function can be specified.
     * @param {Function} [predicate] the condition to check for each item.
     * @param {Function} [defaultValue] a function that returns a default value, in case no element is found.
     */
    first<U>(predicate?: (x: T) => boolean, defaultValue?: (...args: any[]) => U): T | U | undefined;
    /**
     * Creates an object from an array of pairs, where the first element of each
     * pair is the key and the second is the value.
     */
    fromPairs(): {
        [index in string | number]: T;
    };
    /**
     * Creates an object that relates a group of objects
     * @param propOrSelector
     * @returns
     */
    groupBy(propOrSelector: string | ((element: T) => string | number)): {
        [index in string]: ArrayList<T>;
    };
    /**
     * Inserts an element or group of elements at an specific index of the ArrayList. Mutating.
     * @param {number} index the index where the element(s) will be added.
     * @param {Array} elements the element(s) to add.
     * @returns {ArrayList} the modified ArrayList.
     */
    insert(index: number, ...elements: T[]): ArrayList<T>;
    /**
     * Filters out empty elements and then checks if the array length is zero. Since JS arrays are sparse,
     * `Array(5)` will create an array of length 5, but no items.
     * Frameworks like underscore check for the length of the array without doing any kind of filtering,
     * and so `Array(5)`, which logs as `[ empty x 5 ]` in most JS runtimes, will appear as not empty there.
     * @returns `true` if there are no elements, `false` instead.
     */
    isEmpty(): boolean;
    /**
     * Uses isEmpty to check if the array has any items. If not, will return the result of calling defaultValue.
     * @param {Function} defaultValue function providing the default value in case the array is empty.
     */
    ifEmpty<U>(defaultValue: () => U): U | void;
    /**
     * If a predicate is given, returns the last element that fulfills it.
     * Otherwise, returns the last element of the ArrayList, if it exists.
     * Aditionally, a defaultValue function can be specified.
     * @param {Function} [predicate] the condition to check for each item.
     * @param {Function} [defaultValue] a function that returns a default value, in case no element is found.
     */
    last<U>(predicate?: (x: T) => boolean, defaultValue?: (...args: any[]) => U): T | U | undefined;
    /**
     * Returns a copy of the original ArrayList after applying a transformator function on each of the elements.
     * It filters out falsy values.
     * @param {Function} transform the transformator function.
     * @param {*} thisArg the context, in case of needing one.
     */
    mapNotFalsy<U>(transform: (value: T, index: number, array: Array<T>) => U | Falsy, thisArg?: any): ArrayList<U>;
    /**
     * Returns a copy of the original ArrayList after applying the transformator function on each of the elements.
     * It filters out null values.
     * @param {Function} transform the transformator function.
     * @param {*} thisArg the context, in case of needing one.
     */
    mapNotNull<U>(transform: (value: T, index: number, array: Array<T>) => U | None, thisArg?: any): ArrayList<U>;
    /**
     * Returns the maximum value using the standard greater than operator.
     */
    max(): T;
    /**
     * Returns the maximum value using a custom comparator.
     * @param selector custom comparator. Returns a number.
     */
    maxBy(selector: (x: T) => number): T;
    /**
     * Returns the minimum value using the standard less than operator.
     */
    min(): T;
    /**
     * Returns the minimum value using a custom comparator.
     * @param selector custom comparator. Returns a number.
     * @returns
     */
    minBy(selector: (x: T) => number): T;
    /**
     * Returns a random element from the array.
     */
    random(): T;
    /**
     * Returns a reversed copy of the original ArrayList.
     */
    reversed(): ArrayList<T>;
    /**
     * Returns a custom-sized sample of random elements from an ArrayList.
     * @param  {Number}  size the size of the sample.
     * @return {ArrayList}
     */
    sample(size: number): ArrayList<T>;
    /**
     * Inserts an element or group of elements at some index of the ArrayList, replacing those values
     * that were in any of the modified indexes.
     * @param {number} index the index the element(s) will be added.
     * @param {Array} elements the element(s) to add.
     * @returns {ArrayList} the modified ArrayList.
     */
    set(index: number, ...elements: T[]): ArrayList<T>;
    /**
     * Algorithm taken from [this SO question](https://stackoverflow.com/a/2450976/15920951).
     * It's an implementation of the Fisher-Yates algorithm.
     * Shuffles the ArrayList and returns it.
     */
    shuffle(): ArrayList<T>;
    /**
     * Just like shuffle, the algorithm was taken from [this SO question](https://stackoverflow.com/a/2450976/15920951).
     * Unlike shuffle, however, shuffled returns a shuffled copy of the original ArrayList, leaving
     * it untouched.
     */
    shuffled(): ArrayList<T>;
    /**
     * Unlike Array.prototype.sort, sorted returns a sorted copy of the original ArrayList.
     * Optionally, a selector function can be specified.
     * @param {Function} selector sorting function. If not specified, will use default.
     */
    sorted(selector?: (a: T, b: T) => number): ArrayList<T>;
    /**
     * Returns the sum of all numbers of the array. If elements are not addable, returns NaN.
     * @return {number} the sum of all elements in the ArrayList.
     */
    sum(): number;
    /**
     * If n is positive, returns a copy of the ArrayList that only contains the initial n elements of it.
     * If n is negative, returns a copy of the ArrayList that only contains the last n elements of it.
     * @param {number} n the amount of elements.
     * @returns {ArrayList} a modified copy of the ArrayList.
     */
    take(n: number): ArrayList<T>;
    /**
     * Returns a new ArrayList containing the first n elements that fulfill the predicate.
     * @param {Function} predicate the condition to be checked for each item.
     */
    takeWhile(predicate: (x: T) => boolean): ArrayList<T>;
    /**
     * Returns a Generator object that yields items based on the predicate. Breaks once an item doesn't fulfill it.
     * @param {Function} predicate the condition to be checked for each item.
     */
    takeWhileLazy(predicate: (x: T) => boolean): Generator<T>;
    /**
     * Returns an array containing the elements of this ArrayList.
     */
    toArray(): Array<T>;
    /**
     * Returns a set containing the elements of this ArrayList.
     */
    toSet(): Set<T>;
    /**
     * Returns a copy of the original ArrayList that only contains unique elements.
     */
    unique(): ArrayList<T>;
    /**
     * Returns the result of separating the pairs of an ArrayList into two different ArrayLists.
     */
    unzip<U>(): [ArrayList<T>, ArrayList<U>];
    /**
     * Returns an ArrayList of pairs result of calling the transformator function on each
     * of the elements of this ArrayList and another at a given index.
     * @param {Array} other the Array or ArrayList to be zipped with this ArrayList.
     * @param {Function} transform the transformator function to be applied on each pair of items.
     */
    zip<U>(other: U[], transform?: (a: T, b: U) => [T, U]): ArrayList<[T, U]>;
    /**
     * Returns an ArrayList of pairs result of calling the transformator function on each
     * of the elements of this ArrayList and the element at the index that follows it.
     * @param transform
     * @returns
     */
    zipWithNext(transform?: (a: T, b: T) => [T, T]): ArrayList<[T, T]>;
    at(index: number): T;
    concat(...items: ArrayList<T>[]): ArrayList<T>;
    filter(predicate: (value: T, index: number, array: ArrayList<T>) => boolean, thisArg?: any): ArrayList<T>;
    flatMap<U, This = undefined>(transform: (this: This, value: T, index: number, array: ArrayList<T>) => ArrayList<U>): ArrayList<U>;
    from<T>(iterable: Iterable<T> | ArrayLike<T>): ArrayList<T>;
    map<U>(transform: (value: T, index: number, array: ArrayList<T>) => U, thisArg?: any): ArrayList<U>;
    reverse(): ArrayList<T>;
    slice(start?: number, end?: number): ArrayList<T>;
}
export {};
