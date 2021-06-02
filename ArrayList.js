"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidPair(value) { return value.length == 2; }
function isValidObjectPair(value) {
    return value.length == 2 && (typeof value[0] === "string" || typeof value[0] === "number");
}
function buildWithTransform(size, transform) {
    return new ArrayList(size).fill(0).map((_, index) => transform(index));
}
/**
 * This class is just a mere array with a bunch of utility methods I miss from languages like Kotlin,
 * that have very powerful collection manipulation functions.
 * @extends {Array}
 */
class ArrayList extends Array {
    constructor(...args) {
        // new ArrayList(5, i => i * 2) == [0, 2, 4, 6, 8]
        if (args.length === 2 && typeof args[0] === "number" && typeof args[1] === "function")
            super(...buildWithTransform(args[0], args[1]));
        // new ArrayList([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
        else if (args.length === 1 && Array.isArray(args[0]))
            super(...args[0]);
        else
            super(...args);
    }
    /**
     * Mutates the ArrayList by adding an element at the end.
     * @param {Array} elements the element(s) to add to the array.
     * @returns {ArrayList} the original ArrayList.
     */
    add(...elements) {
        this.push(...elements);
        return this;
    }
    /**
     * Mutates the ArrayList by removing the elements from it.
     * @param {Array} elements the element(s) to remove from the array.
     * @returns {ArrayList} the original ArrayList.
     */
    remove(...elements) {
        this.forEach((value, index) => {
            if (elements.includes(value)) {
                this.splice(index, 1);
                elements.splice(elements.indexOf(value), 1);
            }
            ;
        });
        return this;
    }
    /**
     * See ArrayList#add, but append is non-mutating.
     * @param elements the element(s) to add to the array.
     * @returns {ArrayList} a copy of the original ArrayList plus the new elements.
     */
    append(...elements) {
        const _this = this.copyOf();
        _this.push(...elements);
        return _this;
    }
    /**
     * Removes those elements that are common to both arrays.
     * @param {Array} elements the elements to remove from the array.
     * @returns {ArrayList} a copy of the original ArrayList minus the common elements.
     */
    difference(elements) {
        const copy = this.copyOf();
        copy.forEach((value, index) => {
            if (elements.includes(value)) {
                copy.splice(index, 1);
                elements.splice(elements.indexOf(value), 1);
            }
            ;
        });
        return copy;
    }
    /**
     * If no arguments are given, it checks if there is at least one item in the ArrayList.
     * With arguments, identical to [Array.some()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param {Function} [predicate] the condition to be checked for each item.
     * @returns {boolean} `true` if any element fulfills the condition or if there is at least one element in the array.
     */
    any(predicate = _ => true) {
        return this.some(predicate);
    }
    /**
     * Returns a map that holds the values of this ArrayList as key and their respective
     * selected properties as value.
     * @param prop the property to associate the value with.
     */
    associateWith(prop) {
        if (typeof prop != "string")
            throw new SyntaxError(`Prop is not a string`);
        const _this = new Set(this);
        const map = new Map();
        for (const x of _this) {
            const aux = x;
            if (aux[prop])
                map.set(x, aux[prop]);
            else
                throw new SyntaxError(`Not all elements in array have the ${prop} property`);
        }
        return map;
    }
    /**
     * If elements are addable, returns the sum of them divided by their length.
     * Otherwise, returns NaN.
     */
    average() {
        return this.sum() / this.length;
    }
    /**
     * Splits an ArrayList into chunks of a custom size. Non-mutating.
     * @param {number} size must be a positive, non-zero number.
     * @returns {ArrayList} the new chunked ArrayList.
     */
    chunked(size) {
        if (size == null || size < 1)
            return new ArrayList();
        const arr = new ArrayList();
        for (let i = 0; i < this.length; i += size)
            arr.push(this.slice(i, i + size));
        return arr;
    }
    /**
     * Returns true if the element is found in the array. Alias for Array.prototype.includes if it were to be
     * used with one argument only.
     * @param {*} value the element to look for.
     * @returns {boolean} `true if the element is found, `false` if not.
     */
    contains(value) {
        return this.includes(value);
    }
    /**
     * Checks if all elements in the specified Array or ArrayList are contained in this ArrayList.
     * @param {Array} array the Array / ArrayList to compare against.
     * @returns {boolean} `true` if all elements exist, `false` instead.
     */
    containsAll(array) {
        return array.every(i => this.includes(i));
    }
    /**
     * Returns a copy of the original ArrayList.
     */
    copyOf() {
        return new ArrayList(this);
    }
    /**
     * Returns a copy of a range of the original ArrayList.
     * @param {number} start inclusive.
     * @param {number} [end] non-inclusive.
     */
    copyOfRange(start, end = this.length - 1) {
        return this.slice(start, end);
    }
    /**
     * If no predicate is provided, it returns the real amount of elements in the ArrayList, as opposed to length.
     * If a predicate is provided, it returns the amount of elements that fulfill it.
     * @param {Function} [predicate] the condition to be checked for each item.
     */
    count(predicate = _ => true) {
        return this.filter(predicate).length;
    }
    /**
     * If n is positive, returns a new ArrayList where the first n elements have been removed.
     * If n is negative, returns a new ArrayList where the all items except the last n have been removed.
     * @param {number} n the amount of elements to drop.
     */
    drop(n) {
        return this.slice(n);
    }
    /**
     * Returns a copy of the original ArrayList where the first n elements that fulfilled the
     * predicate have been removed.
     * @param {Function} predicate the condition to be checked for each item.
     */
    dropWhile(predicate) {
        for (const [index, value] of this.entries())
            if (!predicate(value))
                return this.slice(index);
        return this;
    }
    /**
     * Groups elements of this ArrayList by key and counts elements in each group.
     * @returns {Map} Map containing the elements as key and the count as value.
     */
    eachCount() {
        const count = new Map();
        this.forEach(value => {
            if (!count.has(value))
                count.set(value, 1);
            else
                count.set(value, count.get(value) + 1);
        });
        return count;
    }
    /**
     * Returns the element at the given index or the result of calling defaultValue
     * if the index is out of bounds for this array.
     * @param {number} index the index to look for.
     * @param {Function} defaultValue a function that will return a default value in case the index is out of bounds. Receives index as a parameter.
     */
    elementAtOrElse(index, defaultValue) {
        if (index < -this.length || index >= this.length)
            return defaultValue(index);
        else
            return this.at(index);
    }
    /**
     * Compares the elements of two arrays by order, returning true if all elements are in
     * the same place and are equal.
     * @param {Array} array the list of which each item will be compared against this ArrayList.
     * @returns {boolean} `true` if all elements are equal and are in the same place, `false` instead.
     */
    equals(array) {
        this.forEach((_, index) => {
            if (this.length !== array.length)
                return false;
            if (this[index] != array[index])
                return false;
        });
        return true;
    }
    /**
     * Returns a copy of the original ArrayList where all elements that are not instances of
     * the specified class have been removed.
     * @param {Class} klass the class to compare each item against.
     */
    filterInstance(klass) {
        return this.filter(i => i instanceof klass);
    }
    /**
     * Returns a copy of the original ArrayList where all elements that evaluate as falsy have been removed.
     */
    filterNotFalsy() {
        return this.filter(i => !!i);
    }
    /**
     * Returns a copy of the original ArrayList containing all elements that are not null or undefined.
     */
    filterNotNull() {
        return this.filter(i => i != null);
    }
    /**
     * Finds the last item of this ArrayList that fulfills a predicate, as opposed to
     * [Array.find()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * @param {Function} predicate the condition to be checked for each item.
     * @returns {*} the last item fulfilling the predicate.
     */
    findLast(predicate) {
        return this.reduce((acc, val) => predicate(val) ? val : acc);
    }
    /**
     * Finds the index of the last item of this ArrayList that fulfills a predicate, as opposed to
     * [Array.findIndex()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).
     * @param {Function} predicate the condition to be checked for each item.
     * @returns {number} the index of the last item fulfilling the predicate.
     */
    findLastIndex(predicate) {
        return this.reduce((acc, val, index) => predicate(val) ? index : acc, 0);
    }
    /**
     * If a predicate is given, returns the first element that fulfills it.
     * Otherwise, returns the first element of the ArrayList, if it exists.
     * Aditionally, a defaultValue function can be specified.
     * @param {Function} [predicate] the condition to check for each item.
     * @param {Function} [defaultValue] a function that returns a default value, in case no element is found.
     */
    first(predicate, defaultValue) {
        return predicate ? this.find(predicate) : this[0] ? this[0] : defaultValue ? defaultValue() : undefined;
    }
    /**
     * Creates an object from an array of pairs, where the first element of each
     * pair is the key and the second is the value.
     */
    fromPairs() {
        return this.reduce((acc, val) => {
            if (!isValidObjectPair(val))
                throw new TypeError("Array must be exclusively made of Pairs");
            acc[val[0]] = val[1];
            return acc;
        }, {});
    }
    /**
     * Creates an object that relates a group of objects
     * @param propOrSelector
     * @returns
     */
    /*groupBy(propOrSelector: string | ((element: T) => boolean)): Map<T, ArrayList<T>>{
        const map = new Map<T, ArrayList<T>>()
        if (typeof propOrSelector === "string" && this.every((i: any) => propOrSelector in i))
            this.forEach((i: any) => map.has(i) ? map.set(i, map.get(i).add()) : map.set(i, i[propOrSelector]))
        else if (typeof propOrSelector === "function" && this.every((i: any) => propOrSelector(i)))
            this.forEach((i: any) => map.set(i, propOrSelector(i)))
        return map;
    }*/
    groupBy(propOrSelector) {
        if (typeof propOrSelector === "string" && this.every((i) => propOrSelector in i))
            return this.reduce((acc, val) => {
                var _a;
                acc[propOrSelector] = (_a = acc[propOrSelector]) !== null && _a !== void 0 ? _a : new ArrayList();
                acc[propOrSelector].push(val);
                return acc;
            }, {});
        else if (typeof propOrSelector === "function" && this.every((i) => propOrSelector(i) in i))
            return this.reduce((acc, val) => {
                var _a;
                acc[propOrSelector(val)] = (_a = acc[propOrSelector(val)]) !== null && _a !== void 0 ? _a : new ArrayList();
                acc[propOrSelector(val)].push(val);
                return acc;
            }, {});
        else
            throw new TypeError("Not all objects in ArrayList share the same property");
    }
    /**
     * Inserts an element or group of elements at an specific index of the ArrayList. Mutating.
     * @param {number} index the index where the element(s) will be added.
     * @param {Array} elements the element(s) to add.
     * @returns {ArrayList} the modified ArrayList.
     */
    insert(index, ...elements) {
        this.splice(index, 0, ...elements);
        return this;
    }
    /**
     * Filters out empty elements and then checks if the array length is zero. Since JS arrays are sparse,
     * `Array(5)` will create an array of length 5, but no items.
     * Frameworks like underscore check for the length of the array without doing any kind of filtering,
     * and so `Array(5)`, which logs as `[ empty x 5 ]` in most JS runtimes, will appear as not empty there.
     * @returns `true` if there are no elements, `false` instead.
     */
    isEmpty() {
        return this.filter(_ => true).length === 0;
    }
    /**
     * Uses isEmpty to check if the array has any items. If not, will return the result of calling defaultValue.
     * @param {Function} defaultValue function providing the default value in case the array is empty.
     */
    ifEmpty(defaultValue) {
        if (this.isEmpty())
            return defaultValue();
    }
    /**
     * If a predicate is given, returns the last element that fulfills it.
     * Otherwise, returns the last element of the ArrayList, if it exists.
     * Aditionally, a defaultValue function can be specified.
     * @param {Function} [predicate] the condition to check for each item.
     * @param {Function} [defaultValue] a function that returns a default value, in case no element is found.
     */
    last(predicate, defaultValue) {
        return predicate ? this.findLast(predicate) : this[this.length - 1] ? this[this.length - 1] : defaultValue ? defaultValue() : undefined;
    }
    /**
     * Returns a copy of the original ArrayList after applying a transformator function on each of the elements.
     * It filters out falsy values.
     * @param {Function} transform the transformator function.
     * @param {*} thisArg the context, in case of needing one.
     */
    mapNotFalsy(transform, thisArg) {
        return this.map(transform, thisArg).filterNotFalsy();
    }
    /**
     * Returns a copy of the original ArrayList after applying the transformator function on each of the elements.
     * It filters out null values.
     * @param {Function} transform the transformator function.
     * @param {*} thisArg the context, in case of needing one.
     */
    mapNotNull(transform, thisArg) {
        return this.map(transform, thisArg).filterNotNull();
    }
    /**
     * Returns the maximum value using the standard greater than operator.
     */
    max() {
        return this.reduce((acc, val) => val > acc ? val : acc);
    }
    /**
     * Returns the maximum value using a custom comparator.
     * @param selector custom comparator. Returns a number.
     */
    maxBy(selector) {
        return this.reduce((acc, val) => selector(val) > selector(acc) ? val : acc);
    }
    /**
     * Returns the minimum value using the standard less than operator.
     */
    min() {
        return this.reduce((acc, val) => val < acc ? val : acc);
    }
    /**
     * Returns the minimum value using a custom comparator.
     * @param selector custom comparator. Returns a number.
     * @returns
     */
    minBy(selector) {
        return this.reduce((acc, val) => selector(val) < selector(acc) ? val : acc);
    }
    /**
     * Returns a random element from the array.
     */
    random() {
        return this[Math.floor(Math.random() * this.length)];
    }
    /**
     * Returns a reversed copy of the original ArrayList.
     */
    reversed() {
        return new ArrayList(this).reverse();
    }
    /**
     * Returns a custom-sized sample of random elements from an ArrayList.
     * @param  {Number}  size the size of the sample.
     * @return {ArrayList}
     */
    sample(size) {
        const copy = this.copyOf();
        const sample = new ArrayList();
        for (let i = 0; i < size; i++) {
            const randomElement = copy.random();
            sample.add(randomElement);
            copy.remove(randomElement);
        }
        return sample;
    }
    /**
     * Inserts an element or group of elements at some index of the ArrayList, replacing those values
     * that were in any of the modified indexes.
     * @param {number} index the index the element(s) will be added.
     * @param {Array} elements the element(s) to add.
     * @returns {ArrayList} the modified ArrayList.
     */
    set(index, ...elements) {
        this.splice(index, elements.length, ...elements);
        return this;
    }
    /**
     * Algorithm taken from [this SO question](https://stackoverflow.com/a/2450976/15920951).
     * It's an implementation of the Fisher-Yates algorithm.
     * Shuffles the ArrayList and returns it.
     */
    shuffle() {
        var currentIndex = this.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this[currentIndex];
            this[currentIndex] = this[randomIndex];
            this[randomIndex] = temporaryValue;
        }
        return this;
    }
    /**
     * Just like shuffle, the algorithm was taken from [this SO question](https://stackoverflow.com/a/2450976/15920951).
     * Unlike shuffle, however, shuffled returns a shuffled copy of the original ArrayList, leaving
     * it untouched.
     */
    shuffled() {
        const array = new ArrayList(this);
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    /**
     * Unlike Array.prototype.sort, sorted returns a sorted copy of the original ArrayList.
     * Optionally, a selector function can be specified.
     * @param {Function} selector sorting function. If not specified, will use default.
     */
    sorted(selector) {
        return new ArrayList(this).sort(selector);
    }
    /**
     * Returns the sum of all numbers of the array. If elements are not addable, returns NaN.
     * @return {number} the sum of all elements in the ArrayList.
     */
    sum() {
        return this.reduce((acc, val) => acc + Number(val), 0);
    }
    /**
     * If n is positive, returns a copy of the ArrayList that only contains the initial n elements of it.
     * If n is negative, returns a copy of the ArrayList that only contains the last n elements of it.
     * @param {number} n the amount of elements.
     * @returns {ArrayList} a modified copy of the ArrayList.
     */
    take(n) {
        return this.slice(0, n);
    }
    /**
     * Returns a new ArrayList containing the first n elements that fulfill the predicate.
     * @param {Function} predicate the condition to be checked for each item.
     */
    takeWhile(predicate) {
        for (const [i, v] of this.entries())
            if (!predicate(v))
                return this.slice(0, i);
        return this;
    }
    /**
     * Returns a Generator object that yields items based on the predicate. Breaks once an item doesn't fulfill it.
     * @param {Function} predicate the condition to be checked for each item.
     */
    *takeWhileLazy(predicate) {
        for (let i of this) {
            if (predicate(i))
                yield i;
            else
                break;
        }
    }
    /**
     * Returns an array containing the elements of this ArrayList.
     */
    toArray() {
        return Array.from(this);
    }
    /**
     * Returns a set containing the elements of this ArrayList.
     */
    toSet() {
        return new Set(this);
    }
    /**
     * Returns a copy of the original ArrayList that only contains unique elements.
     */
    unique() {
        return new ArrayList(...new Set(this));
    }
    /**
     * Returns the result of separating the pairs of an ArrayList into two different ArrayLists.
     */
    unzip() {
        return this.reduce((acc, val) => {
            if (!isValidPair(val))
                throw new TypeError("Array must be exclusively made of Pairs");
            acc[0].push(val[0]);
            acc[1].push(val[1]);
            return acc;
        }, [new ArrayList(), new ArrayList()]);
    }
    /**
     * Returns an ArrayList of pairs result of calling the transformator function on each
     * of the elements of this ArrayList and another at a given index.
     * @param {Array} other the Array or ArrayList to be zipped with this ArrayList.
     * @param {Function} transform the transformator function to be applied on each pair of items.
     */
    zip(other, transform = (a, b) => [a, b]) {
        return this.map((item, index) => transform(item, other[index]));
    }
    /**
     * Returns an ArrayList of pairs result of calling the transformator function on each
     * of the elements of this ArrayList and the element at the index that follows it.
     * @param transform
     * @returns
     */
    zipWithNext(transform = (a, b) => [a, b]) {
        const list = new ArrayList();
        for (let i = 0; i < this.length; i += 2)
            list.push(transform(this[i], this[i + 1]));
        return list;
    }
    /*
     * Re-implementations of Array's prototype's functions that return another Array.
     * This solves a problem for TypeScript. It's not important at all for JS.
     */
    // Array.prototype.at()
    at(index) {
        if (index >= 0)
            return this[index];
        else
            return this[this.length + index];
    }
    // Array.prototype.concat()
    concat(...items) {
        const res = new ArrayList(this);
        for (const item of items) {
            for (const i of item) {
                res.push(i);
            }
        }
        return res;
        //return [...this].concat(...items) as ArrayList<T>;
    }
    // Array.prototype.filter()
    filter(predicate, thisArg) {
        if (typeof thisArg !== "undefined")
            predicate = predicate.bind(thisArg);
        const res = new ArrayList();
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i, this))
                res.push(this[i]);
        }
        return res;
    }
    // Array.prototype.flatMap()
    flatMap(transform) {
        return new ArrayList().concat(...this.map(transform));
    }
    // Array.from()
    from(iterable) {
        return Array.from(iterable);
    }
    // Array.prototype.map()
    map(transform, thisArg) {
        if (typeof thisArg !== "undefined")
            transform = transform.bind(thisArg);
        const res = new ArrayList();
        for (let i = 0; i < this.length; i++)
            res.push(transform(this[i], i, this));
        return res;
    }
    // Array.prototype.reverse()
    reverse() {
        const length = this.length;
        for (let first = 0, last = length - 1; first < length / 2; first++, last--) {
            let tmp = this[first];
            this[first] = this[last];
            this[last] = tmp;
        }
        return this;
    }
    // Array.prototype.slice()
    slice(start, end) {
        const res = new ArrayList();
        if (typeof start === "undefined")
            return new ArrayList(this);
        if (typeof end === "undefined")
            end = this.length;
        if (start < 0)
            start += this.length;
        for (let i = start; i <= end - 1; i++) // non inclusive
            if (this[i])
                res.push(this[i]);
        return res;
    }
}
exports.default = ArrayList;
