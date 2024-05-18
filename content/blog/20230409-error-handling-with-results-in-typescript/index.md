---
slug: error-handling-with-results-in-typescript
title: Error handling with results in Typescript
summary: What are the main takeaways of error handling with result objects and how does it compare to the try-catch idiom? Looking into different approaches and some examples.
categories: [Engineering, Software Development]
tags:
  [
    Error Handling,
    Result Object,
    Typescript,
    Exceptions,
    Control Flow,
    Golang,
    Rust,
    Java,
    C#,
  ]
date: 2023-04-09T00:00:00+00:00
authors:
  - davidsimao
---

The `try-catch` idiom is the most common approach to error handling and one of the first things you're taught when learning how to code. The idea is simple: There's a safe scope where errors can happen, and when they do, the runtime ensures that the program jumps (remember `goto` ?) into a contingency scope where those errors can be handled. While this is a pretty simple concept, it can get messy pretty quick. The alternative we discuss, treating errors as return values, is not a new idea, but it's recently getting more attention due to modern languages like Golang and Rust partially abolishing exceptions.

```golang
file, err := os.Open("/hello.txt")
if err != nil {
  fmt.Println(err)
  return
}
```

_The simplest example of error handling [in Golang](https://go.dev/blog/error-handling-and-go)_

```rust
let file_result = File::open("hello.txt");
let file = match file_result {
  Ok(file) => file,
  Err(error) => panic!("Problem opening the file: {:?}", error),
};
```

_The equivalent [in Rust](https://doc.rust-lang.org/book/ch09-00-error-handling.html)_

## Exceptions in Typescript

Typescript on the other hand has really poor support for error handling. Pretty much anything can be thrown (including numbers, strings, etc ...), and because of that, there is no type safety. The error parameter in the `catch` block can either be [`any` or `unknown`](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables), so you have to check for each different error type that can be thrown.

```typescript
try {
  // ...
} catch (err) {
  if (err instanceof CustomerNotFoundError) {
    console.log("Could not find customer", err.customerId);
  }
  if (err instanceof Error) {
    console.log(err.message);
  }
}
```

Which is not the end of the world when compared to Java or C#'s [multiple exceptions or catch blocks](https://docs.oracle.com/javase/8/docs/technotes/guides/language/catch-multiple.html). What's more uncomfortable though, is that there aren't [checked exceptions](https://www.baeldung.com/java-checked-unchecked-exceptions) too, so there is no way to enforce an exhaustive error handling in compile time. We can either use broader catch-all or simply trust that we'll always remember to handle every possible case.

## Are exceptions bad practice?

Not at all, if used with moderation. The problem usually lies in the abuse of exceptions and the complexity of the codebase, which we're not made aware of by that `try-catch` example in the slides back in Programming 101, where the `catch` block is almost immediately after the line that may produce an error. In bigger projects, things can get a bit messier, and we're often confronted with functions where an error is handled several lines away from where it was thrown, or to avoid that, a stupid amount of smaller try-catch blocks that make the code unreadable.

On top of that, if the language doesn't offer any support for checked exceptions, or if we're throwing runtime exceptions, it becomes very easy to miss a `try-catch` block or special condition for error sub-types.

## The thing with result objects

The result object is a simple idea that allows you to treat [errors as values](https://go.dev/blog/errors-are-values). Unlike `try-catch` blocks, result objects alone don't do much, you have to change your programming style to use them. Some languages have mechanisms to ensure the error case is handled, but in JavaScript/TypeScript since there's no native support for results, it cannot be enforced, so It's really about how defensive is your programming style. Personally, when writing code, I find it easier to handle all failure cases before moving to the next context. Once all cases are handled, It means a particular step is done, which closes a metaphorical box in my head, making room for more thinking. In addition, whoever reads that code next, gets to do it from top to bottom, without the need of jumping in the call stack to understand what happens in case of errors. The main idea is to return an error result instead of throwing it and then handle the returned error immediately after the function was called, before proceeding to the next context.

```typescript
const readFile = () => {
  if (!fs.existsSync(file)) {
    return Err("File not found");
  } else {
    return Ok(fs.readFileSync(file, "utf-8"));
  }
}
...
const fileResult = readFile();
if(fileResult.isError) {
  console.log(fileResult.error);
  return;
}
const file = fileResult.value;
...
```

Libraries like [ts-results](https://github.com/vultix/ts-results), [practica](https://github.com/rametta/pratica), and [true-myth](https://true-myth.js.org/) add support for result objects, but there are also several articles like [this one](https://journal.plain.com/posts/2022-10-04-error-handling-in-typescript-like-a-pro/) or [this one](https://imhoff.blog/posts/using-results-in-typescript) with implementations as simple as declaring a type.

## Remarks

Result objects are just a code style that, in my opinion, makes the code easier to read (top to bottom), and help to create good habits of handling error cases before continuing the happy path. They don't fully replace the idea of exceptions, even in Golang and Rust there are `panic` macros that will force the program to halt and can be used for non-recoverable errors.

Recoverable errors on the other hand can benefit from this approach but in cases where the underlying code might throw an exception (i.e. using a library or legacy code - excluding Golang and Rust here), the `try-catch` block should still exist, even if only in the boundaries of our system, to make sure the application doesn't enter a corrupted state.

Having that said, even for languages that don't natively support them, I believe result objects are a good thing to have, especially in complex code bases. Not only do I find that functions become easier to read (top to bottom, no jumps), but also easier to write (dealing with one context at a time). Exceptions can still happen, so `try-catch` blocks should also be used whenever we don't want a failure to interrupt the program, and also at system's boundaries to ensure graceful failures otherwise.
