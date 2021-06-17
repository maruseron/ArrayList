const ArrayList = require("./ArrayList.js").default;

// TESTS:
// - Static constructors: of, iterate
test("static constructor of should turn arguments into items", () => {
	expect(ArrayList.of(10).toArray()).not.toEqual(Array(10))
	expect(ArrayList.of(10).toArray()).toEqual([10])
})

test("static constructor iterate should transform the index given a size", () => {
	expect(ArrayList.iterate(5, i => i * 2).toArray()).toEqual([0, 2, 4, 6, 8])
})

// - add vs append
test("add should mutate an arraylist", () => {
	const list = ArrayList.of(1, 2, 3)
	list.add(4)

	expect(list.toArray()).toEqual([1, 2, 3, 4])
})

test("append should not mutate an arraylist", () => {
	const list = ArrayList.of(1, 2, 3)
	list.append(4)

	expect(list.append(4).toArray()).toEqual([1, 2, 3, 4])
	expect(list.toArray()).not.toEqual([1, 2, 3, 4])
	expect(list.toArray()).toEqual([1, 2, 3])
})

// - remove vs difference
test("remove should mutate an arraylist", () => {
	const list = ArrayList.of(1, 2, 3, 4)
	list.remove(4)

	expect(list.toArray()).toEqual([1, 2, 3])
})

test("difference should not mutate an arraylist", () => {
	const list = ArrayList.of(1, 2, 3, 4)
	list.difference([4])

	expect(list.difference([4]).toArray()).toEqual([1, 2, 3])
	expect(list.toArray()).not.toEqual([1, 2, 3])
	expect(list.toArray()).toEqual([1, 2, 3, 4])
})

// - any    vs isEmpty
test("with no arguments, any should return true for non-empty arraylists", () => {
	expect(ArrayList.of(1, 2, 3).any()).toBe(true)
	expect(ArrayList.of().any()).toBe(false)
	expect(new ArrayList(5).any()).toBe(false)
})

test("isEmpty should return true for empty arraylists only", () => {
	expect(ArrayList.of(1, 2, 3).isEmpty()).toBe(false)
	expect(ArrayList.of().isEmpty()).toBe(true)
	expect(new ArrayList(5).isEmpty()).toBe(true)
})

// - equals
test("equals should return true for identical primitive arraylists", () => {
	const numbers1 = ArrayList.of(1, 2, 3)
	const numbers2 = ArrayList.of(1, 2, 3)
	const objects1 = ArrayList.of({ a: 1 }, { b: 2 }, { c: 3 })
	const objects2 = ArrayList.of({ a: 1 }, { b: 2 }, { c: 3 })

	expect(numbers1 == numbers2).toBe(false)
	expect(numbers1.equals(numbers2)).toBe(true)
	expect(objects1 == objects2).toBe(false)
	expect(objects1.equals(objects2)).toBe(false)
})

// - drop
test("drop should remove the first n elements when n is positive and take the last n elements when n is negative", () => {
	const list = ArrayList.of(1, 2, 3, 4, 5)
	
	expect(list.drop(1).toArray()).toEqual([2, 3, 4, 5])
	expect(list.drop(3).toArray()).toEqual([4, 5])
	expect(list.drop(-2).toArray()).toEqual([4, 5])
})

// - take
test("take should remove all elements after the first n if positive, and drop the last n elements when negative", () => {
	const list = ArrayList.of(1, 2, 3, 4, 5)

	expect(list.take(1).toArray()).toEqual([1])
	expect(list.take(3).toArray()).toEqual([1, 2, 3])
	expect(list.take(-2).toArray()).toEqual([1, 2, 3])
})

// - eachCount
test("eachCount should return a map that groups values with the amount of times they appear", () => {
	const list = ArrayList.of("a", "a", "a", 2, 2)

	expect(list.eachCount().get("a")).toBe(3)
	expect(list.eachCount().get(2)).toBe(2)
})

// - groupBy
// - associateWith
// - fromPairs
// - maxBy, minBy
// - zip, unzip