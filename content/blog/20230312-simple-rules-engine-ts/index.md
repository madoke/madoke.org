---
slug: simple-rules-engine-ts
title: Building a simple rules engine in Typescript
summary: Building a lightweight, general purpose and easy to use rules engine under 30 lines of Typescript. We'll start with an example use case and build the engine around it.
categories: [Engineering, Software Development]
tags:
  [
    Rules Engine,
    Super Mario,
    Generics,
    Arrow Functions,
    Code Readability,
    Overengineering,
    Rules Engine,
    Typescript,
  ]
date: 2023-03-12T00:00:00+00:00
authors:
  - davidsimao
showImage: false
---

In most situations throughout my career, I've implemented business logic in the simplest possible way, using `if` conditions and `while` loops. However, in specific cases, where the business logic is too complex, or changes frequently, it helps to build a flexible system that is easy to read and maintain. A very common solution to this kind of problem is to implement a rules engine. Let's explore how to build one using Typescript.

## Example Problem

Consider the following example problem: We're running a pizza delivery service for the characters of [Super Mario](https://mario.nintendo.com/). They don't choose their pizzas, however, there are some limitations to what each of them prefers.

```typescript
// Mario doesn't like pizza with salami or olives
// Princess Peach only likes pizza with salami or peppers but not both
// Yoshi only likes pizza from domino's with pineapple and banana
// Luigi only likes pizza with either mushrooms, peppers or fluffy dough
```

One way we could represent these preferences is to use some basic functions for checking the ingredients, dough, and food chain, along with logic operators to combine them. Each character would then be linked to one or more rules using a tuple.

```typescript
const rules = [
  ["Mario", None(has("salami"), has("olives"))],
  ["Yoshi", All(has("pineapple"), has("banana"), source("dominos"))],
  ["Luigi", Some(has("mushrooms"), has("peppers"), dough("fluffy"))],
  ["Princess Peach", One(has("salami"), has("peppers"))],
];
```

The idea here is to iterate the rules array, and for each entry (a tuple) execute the rule and mark the character as eligible or not for a given pizza. The functions `has`, `source`, and `dough` are the building blocks for the rules, and they determine if the pizza (the input) matches the condition.

The logical operators are reducer functions that combine the result of multiple rules into a single one:

- `None` returns `true` if none of the inner rules returns `true`;
- `All` returns `true` if all the inner rules return `true`;
- `Some` returns `true` if at least one of the inner rules returns `true`;
- `One` returns `true` if exactly one of the inner rules returns `true`;

And there could be more, but just these 4 operators should be enough to build pretty complex rule validation logic.

## Implementing the rules engine

Now let's see how this could easily be implemented. We'll start by defining what a rule is, and to make it suitable for any input type, we can use [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).

```typescript
type Rule<T> = (input: T) => boolean;
```

Which means _a function that receives any kind of input `T` (the pizza in our case) and returns true or false_. With only this line as our engine, for now, we can already implement the types and building blocks for the pizza use case.

```typescript
// types
type Ingredient =
  | "salami"
  | "olives"
  | "peppers"
  | "mushrooms"
  | "pineapple"
  | "banana";
type Dough = "thin" | "fluffy";
type Source = "dominos" | "pizzahut";
type Pizza = {
  ingredients: Ingredient[];
  dough: Dough;
  source: Source;
};

// building blocks
const has = (ingredient: Ingredient) => (pizza: Pizza) =>
  pizza.ingredients.includes(ingredient);
const dough = (dough: Dough) => (pizza: Pizza) => pizza.dough === dough;
const source = (source: Source) => (pizza: Pizza) => pizza.source === source;
```

We can have these building blocks as complex as we need them to be, the important thing here is to make sure that they hide the complexity of validating a specific rule, and that what they do is perceivable by just looking at the function call. When we call, `has('salami')`, for example, what is expected is that the return value is a function (`Rule<Pizza>`) that receives a pizza as the input and returns true if the pizza contains salami or false otherwise.

To glue the building blocks together we need another bit of framework, the logical operators. There's not much here to do, thanks to the already existing `Array` class methods. We just need to build some wrappers that make more sense in this context and are even easier to use.

```typescript
const All =
  <T>(...rules: Rule<T>[]) =>
  (input: T) =>
    rules.every((r) => r(input));

const Some =
  <T>(...rules: Rule<T>[]) =>
  (input: T) =>
    rules.some((r) => r(input));

const One =
  <T>(...rules: Rule<T>[]) =>
  (input: T) =>
    rules.filter((r) => r(input)).length === 1;

const None =
  <T>(...rules: Rule<T>[]) =>
  (input: T) =>
    rules.filter((r) => r(input)).length === 0;
```

A good example that functional syntax and code readability are not the best friends, so let's dissect one of them:

- `<T>() =>` A [generic arrow function](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions) of type `T`
- `<T>(...rules: Rule<T>) =>` A generic arrow function that receives a [variable number of arguments](https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters) of type `Rule<T>`
- `<T>(...rules: Rule<T>) => (input: T) => rules.some((r) => r(input));` A generic arrow function that receives a variable number of rules and returns another function that receives an input of generic type `T` and returns true if at least one (`Array.some`) of the rules passed to the enclosing function also returns true, given the input `T`.

Finally, we need something to execute the rules for a given pizza, and because we're keeping it as small as possible, we'll again make use of generics and arrow functions.

```typescript
const ruleRunner =
  <T, R>(rules: [R, Rule<T>][]) =>
  (input: T) =>
    rules.filter(([_, rule]) => rule(input)).map(([output, _]) => output);
```

Here we're declaring a generic arrow function of types `<T, R>` (the pizza and the character) that receives an array of [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) of type `[R, Rule<T>]` (the character and the pizza preference rules), and returns another function that receives an input of type `T` (pizza), runs all the rules against it and returns the objects of type `R` (character) belonging to the tuples with rules that trigger.

## Running the example case

With everything together, we can create a new rule runner with the rules we imagined above, and execute it against any set of pizzas.

```typescript
const getEligibleForPizza = ruleRunner(rules);

const pizzas: Pizza[] = [
  { ingredients: ["salami"], dough: "thin", source: "dominos" },
  { ingredients: ["salami"], dough: "fluffy", source: "dominos" },
  { ingredients: ["mushrooms"], dough: "thin", source: "pizzahut" },
  { ingredients: ["pineapple"], dough: "thin", source: "pizzahut" },
  { ingredients: ["pineapple", "banana"], dough: "fluffy", source: "dominos" },
  { ingredients: ["salami", "peppers"], dough: "fluffy", source: "pizzahut" },
];

for (const pizza of pizzas) {
  console.log(getEligibleForPizza(pizza));
}

// [ 'Princess Peach' ]
// [ 'Luigi', 'Princess Peach' ]
// [ 'Mario', 'Luigi' ]
// [ 'Mario' ]
// [ 'Mario', 'Yoshi', 'Luigi' ]
// [ 'Luigi' ]
```

Checkout the [full code](https://gist.github.com/madoke/d8d8a78ddd2702b755fecca05be3ac93) for this blog post. All feedback welcome.

## Final Remarks

Although the usage looks nice, the readability of the engine completely sucks. Coming from a Java background I've always struggled a bit with functional syntax and the abuses that js/ts allow in the name of simplicity. Combine it with generics, and it may or may not look like pure spaghetti. That's for you to decide, I reckon that this is purely a personal opinion and many folks think the opposite.

[![Over Engineering](./img/the_general_problem.png)](https://xkcd.com/974/)

The other consideration is whether something like this would be needed or not. On several occasions, I've had other engineers advising me to [keep it simple, stupid](https://en.wikipedia.org/wiki/KISS_principle), especially if the project is in the early stages, or under tight delivery schedules. I've also given the same advice to teammates in similar circumstances. But I like to overengineer stuff if I can afford it. Not because I don't believe in simple solutions (which I do), but because it's an enriching exercise. It forces you to think more about the problem domain and the solution you're building, it also enables you to experiment more, and in the next iterations, you'll be ready to make more appropriate decisions. It comes at the expense of time, so you should probably avoid overengineering if you're tasked with a time-sensitive deliverable, and in some cases, the problem might not justify the solution, so also be ready to drop it if, in the end, it doesn't make sense. The knowledge and experience, however, don't go anywhere, and for me, that's already profitable.
