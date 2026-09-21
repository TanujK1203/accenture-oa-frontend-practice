# Q03 — Traffic Light

## How to Attempt?

You are tasked with completing a Traffic Light simulator. The project is partially complete and contains 1 bug in the JavaScript. Implement the remaining HTML, CSS and JavaScript requirements and fix the bug so the lights cycle correctly.

## Objectives

- Add the missing third light: a `div` with the classes `light` and `green`, placed after the yellow light inside `.traffic-light`.
- Stack the lights vertically (one below the other) with a gap of exactly `12px` between them.
- A light that has the class `on` must be fully visible (`opacity: 1`). Lights without it must stay dim.
- Each click on Next must move the `on` class to the next light: red → yellow → green → red, and so on. Exactly one light must be on at any time.
- Clicking Auto must move to the next light automatically every 2 seconds. It currently does this every 3 seconds.

## Constraints

- Do not remove or rename the existing ids and class names.
- Do not change the order of the lights.
