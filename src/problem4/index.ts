/*
 Solution A: Using the mathematical formula for the sum of the first n natural numbers
 Formula: Sum = (n * (n + 1)) / 2
 Time Complexity: O(1) -> Only performs a few arithmetic operations.
 Space Complexity: O(1) -> Uses only a single integer, no extra memory.
 Why use this?
 ✅ Best for performance - Runs in constant time.
 ✅ Memory-efficient.
 ✅ Scalable for very large numbers.
*/
export type SumFunction = (n: number) => number;

function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

/*
Solution B: Using a for loop to iterate through the numbers from 1 to n and sum them up.
Complexity Analysis:
- Time Complexity: O(n) -> Iterates from 1 to n, performing `n` additions.
- Space Complexity: O(1) -> Only a single accumulator variable is used.

Why use this?
✅ Easy to understand and debug.
✅ Useful when additional logic (like logging, conditional sums) needs to be added.
🚫 Slower than the formula-based approach, especially for large `n`.
*/
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/*
Solution C: Using JavaScript's Array.from() method to generate an array of numbers from 1 to n and then summing them up.
Complexity Analysis:
- Time Complexity: O(n) -> Generates an array and applies the reduce function.
- Space Complexity: O(n) -> Stores an array of `n` elements before reducing.

Why use this?
✅ Readable and follows a functional programming paradigm.
✅ Useful when working with functional programming languages or frameworks.
🚫 Not memory efficient due to the array creation.
🚫 Avoid for very large `n` as it may cause memory overflow.
*/
function sum_to_n_c(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  );
}

// Export both the types and the implementation
export { sum_to_n_a, sum_to_n_b, sum_to_n_c };

// Also export as CommonJS for compatibility
module.exports = {
    sum_to_n_a,
    sum_to_n_b,
    sum_to_n_c
};
