# Melange WebAPI DOM Examples Documentation

This file contains several examples of using Melange's `Webapi.Dom` module to work with the Document Object Model (DOM) in OCaml. These examples demonstrate how to create and manipulate DOM elements, handle optional values, and add event listeners.

### Overview

The code provided illustrates several DOM manipulation techniques in Melange, leveraging functional utilities like `Option.map`, `unwrapUnsafely`, and `andThen` to work with optional values returned by DOM operations. This document will walk you through each section and provide additional context for understanding the examples.

## Helper Functions

### `map`

```ocaml
let map = (f) =>
  fun
  | Some(v) => Some(f(v))
  | None => None;
```

The `map` function is a utility that applies a given function `f` to the value inside an `option`, if it exists. If the value is `None`, it returns `None`. This is useful for safely handling optional values without writing explicit `match` statements each time.

### `andThen`

```ocaml
let andThen = (f: 'a => option('b)) =>
  fun
  | Some(v) => f(v)
  | None => None;
```

The `andThen` function is similar to `map`, but it is used when the function `f` returns an `option` itself, allowing chaining of operations that may yield optional values.

### `unwrapUnsafely`

```ocaml
let unwrapUnsafely =
  fun
  | Some(v) => v
  | None => raise(Invalid_argument("Passed `None` to unwrapUnsafely"));
```

The `unwrapUnsafely` function extracts the value from an `option`, but it raises an exception if the value is `None`. Use this with caution as it may lead to runtime errors if `None` is passed.

## Example Usage

### Creating and Accessing Elements

#### Getting Class Name

```ocaml
let _className: string =
  document |> Document.createElement("div")
           |> Element.className;
```

In this example, we create a `div` element and immediately access its `className` property. This demonstrates chaining operations using the pipe (`|>`) operator.

#### Using `Option.map` with DOM Elements

```ocaml
let _inner: option(string) =
  document |> Document.createElement("div")
           |> Element.nextElementSibling
           |> map(Element.innerText);
```

Here, we create a `div` and then attempt to access its `nextElementSibling`. Since `nextElementSibling` returns an optional value (`None` if there is no sibling), we use `map` to safely access the `innerText` property if a sibling exists.

### Handling Node and Element Subtyping

#### Before Subtyping

The following code illustrates how to access an element's parent before subtyping support was implemented:

```ocaml
/* Before subtyping:
document |> Document.createElement("div")
         |> Element.asNode
         |> Node.parentElement
         |> map(Element.innerText);
*/
```

`Element.asNode` converts an `Element` to a more generic `Node`. The `parentElement` method is then called, which returns an optional value.

#### After Subtyping

With subtyping support, there's no need for explicit conversion:

```ocaml
let _inner: option(string) =
  document |> Document.createElement("div")
           |> Element.parentElement
           |> map(Element.innerText);
```

This code accesses the parent element directly from the `div`, simplifying the syntax.

### Working with HTML Elements

#### Unwrapping Elements

```ocaml
let el =
  document |> Document.createElement("div")
           |> Element.asHtmlElement
           |> unwrapUnsafely;
```

In this example, we create a `div` and convert it to an `HtmlElement`. We then use `unwrapUnsafely` to obtain the value, assuming it is not `None`.

### Appending Child Elements

```ocaml
let _unit: option(unit) = document |> Document.asHtmlDocument
         |> andThen(HtmlDocument.body)
         |> map(Element.appendChild(el));
```

Here, we convert the `document` to an `HtmlDocument` and access its `body` element. The `appendChild` method is then used to add the previously created element (`el`) to the body.

### Event Handling

#### Adding Event Listeners

```ocaml
/* non-standard event-specific listener API - log screen coordinates of mouse cursor when moved */
document |> Document.createElement("div")
         |> Element.addMouseMoveEventListener(e => (MouseEvent.screenX(e), MouseEvent.screenY(e)) |> Js.log);
```

This example creates a `div` and adds a `mousemove` event listener to it. The event listener logs the screen coordinates of the mouse cursor when it is moved over the `div`.

## Comments on Type Checking

### Type Checking Considerations

#### Code that MAY Fail Type Check

```ocaml
document |> Document.createElement("div")
         |> Element.nextElementSibling
         |> map(Node.innerText);
```

This example may fail type checking because `nextElementSibling` may return a type that does not necessarily have the `innerText` property.

#### Code that SHOULD NOT Type Check

```ocaml
document |> Document.createElement("div")
         |> Element.asNode
         |> Element.parentElement;
```

This code should not type check because `Element.parentElement` is not valid when called on a generic `Node` without proper subtyping.

## Ideal Example with Piped Setters

The following snippet demonstrates an ideal case for creating and setting up a new element before appending it to the document body. However, it requires piped setters to work seamlessly:

```ocaml
switch (document |> body) {
| Some body =>
  document |> createElement("div")
           |> setInnerText("</>")
           |> setClassName("reason_tools_button")
           |> setOnClick(swap)
           |> (body |> appendChild);
| None =>
  ...
}
```

In this hypothetical example, the code creates a `div`, sets its properties (e.g., `innerText`, `className`, `onClick`), and then appends it to the body if it exists.

## Summary

This document walks through various DOM manipulation techniques in Melange using `Webapi.Dom`. The examples provided demonstrate:

- Creating and accessing DOM elements.
- Safely handling optional values with `map`, `andThen`, and `unwrapUnsafely`.
- Differences in handling nodes and elements before and after subtyping support.
- Event handling using custom listeners.

The provided examples should give you a good understanding of how to interact with the DOM in OCaml using Melange and provide a starting point for more advanced DOM manipulation tasks.
