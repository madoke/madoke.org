---
slug: test-input-combinations-jest
title: Multiple test input combinations with jest
summary: A simple method to generate exhaustive input combinations for test cases while maintaining a healthy and readable test codebase
categories: [Engineering, Software Development]
tags:
  [
    Jest,
    Software Testing,
    Javascript,
    Typescript,
    describe.each,
    test.each,
    Test Case,
    Input Combinations,
  ]
date: 2022-11-13T00:00:00+00:00
authors:
  - davidsimao
---

One challenge that I've been facing recently is how to write readable jest tests that exhaustively test my functions with all possible input combinations. On early stages this is usually simple, but as the functions evolve and get more input parameters, the test code starts to get bloated and confusing even to the person that wrote it (yours truly).

## A practical example

Let's imagine that we have the following callback `computeIngredients(cake, vegan): Ingredient[]` which returns the list of ingredients required to make a cake, supporting both vegan and non-vegan recipes. We want to implement a business rule that requires `PeanutButter` to always be in the list of ingredients regardless of the cake or whether its vegan. Given that we only support `ChocolateCake` and `OrangeCake` for now, it would be fairly simple to cover all test cases:

```javascript
describe("Compute Ingredients", () => {
  test.each`
    cake                   | vegan
    ${Cakes.ChocolateCake} | ${true}
    ${Cakes.ChocolateCake} | ${false}
    ${Cakes.OrangeCake}    | ${true}
    ${Cakes.OrangeCake}    | ${false}
  `(
    `Should have peanut butter cake=${cake}, and vegan=${vegan}`,
    ({ cake, vegan }) => {
      const result = computeIngredients(cake, vegan);
      expect(result).toContainEqual(Ingredients.PeanutButter);
    }
  );
});
```

If we add another cake recipe `VanillaCake` and `glutenFree` to the modifiers, the number of entries in our `test.each` table goes to triple, making the test list of test cases much bigger and hard to understand.

```javascript
test.each`
  cake                   | vegan    | glutenFree
  ${Cakes.ChocolateCake} | ${true}  | ${true}
  ${Cakes.ChocolateCake} | ${true}  | ${false}
  ${Cakes.ChocolateCake} | ${false} | ${true}
  ${Cakes.ChocolateCake} | ${false} | ${false}
  ${Cakes.OrangeCake}    | ${true}  | ${true}
  ${Cakes.OrangeCake}    | ${true}  | ${false}
  ${Cakes.OrangeCake}    | ${false} | ${true}
  ${Cakes.OrangeCake}    | ${false} | ${false}
  ${Cakes.MangoCake}     | ${true}  | ${true}
  ${Cakes.MangoCake}     | ${true}  | ${false}
  ${Cakes.MangoCake}     | ${false} | ${true}
  ${Cakes.MangoCake}     | ${false} | ${false}
`;
```

## Exploiting `describe.each`

A simple solution if you really need to generate exhaustive combinations for your test case would be to exploit `describe.each` by using it to loop over each argument value multiple times. Each `describe` creates a new scope, and we can nest as many `describe` blocks as we like. Using `each` in combination with describe allows us to achieve a similar behavior to nested for loops

```javascript
describe("Compute ingredients", () => {
  // Repeats tests for each cake
  describe.each(Object.values(Cakes))("When cake = %s", (cake) => {
    // Repeats tests for vegan/non vegan
    describe.each([true, false])("And vegan = %s", (vegan) => {
      // Repeats tests for gluten free/non gluten free
      describe.each([true, false])("And glutenFree = %s", (glutenFree) => {
        test("Should have peanut butter", () => {
          // Do the actual test
          const result = computeIngredients(cake, vegan, glutenFree);
          expect(result).toContainEqual(Ingredients.PeanutButter);
        });
      });
    });
  });
});
```

Where the results would be something like this

```bash
Compute ingredients
    When cake = OrangeCake
      And vegan = true
        And glutenFree = true
          ✓ Should have peanut butter (3 ms)
        And glutenFree = false
          ✓ Should have peanut butter
      And vegan = false
        And glutenFree = true
          ✓ Should have peanut butter
        And glutenFree = false
          ✓ Should have peanut butter
    When cake = ChocolateCake
      And vegan = true
        And glutenFree = true
          ✓ Should have peanut butter
        And glutenFree = false
          ✓ Should have peanut butter
      And vegan = false
        And glutenFree = true
          ✓ Should have peanut butter (1 ms)
        And glutenFree = false
          ✓ Should have peanut butter (1 ms)
    When cake = MangoCake
      And vegan = true
        And glutenFree = true
          ✓ Should have peanut butter (1 ms)
        And glutenFree = false
          ✓ Should have peanut butter (1 ms)
      And vegan = false
        And glutenFree = true
          ✓ Should have peanut butter
        And glutenFree = false
          ✓ Should have peanut butter (1 ms)
```

## Conclusion

We should always try to keep our tests as simple as possible, easier to read and to maintain. Nesting `describe.each` scopes provides a simple way to generate the highest possible number of argument combinations and test our code against all of them, giving us more confidence to release. On the other hand, abusing this functionality might also mean that our interfaces are too complex or not well-structured and the wisest thing to do could be to rethink them.
