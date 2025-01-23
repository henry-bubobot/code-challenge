const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("./index") as {
    sum_to_n_a: (n: number) => number;
    sum_to_n_b: (n: number) => number;
    sum_to_n_c: (n: number) => number;
};

// Helper function to run assertions
function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(`Test failed: ${message}`);
    }
}

// Test cases for all three implementations
function runTests() {
    // Test case 1: n = 5 (should return 15)
    assert(sum_to_n_a(5) === 15, "sum_to_n_a(5) should return 15");
    assert(sum_to_n_b(5) === 15, "sum_to_n_b(5) should return 15");
    assert(sum_to_n_c(5) === 15, "sum_to_n_c(5) should return 15");

    // Test case 2: n = 0 (should return 0)
    assert(sum_to_n_a(0) === 0, "sum_to_n_a(0) should return 0");
    assert(sum_to_n_b(0) === 0, "sum_to_n_b(0) should return 0");
    assert(sum_to_n_c(0) === 0, "sum_to_n_c(0) should return 0");

    // Test case 3: n = 100 (should return 5050)
    assert(sum_to_n_a(100) === 5050, "sum_to_n_a(100) should return 5050");
    assert(sum_to_n_b(100) === 5050, "sum_to_n_b(100) should return 5050");
    assert(sum_to_n_c(100) === 5050, "sum_to_n_c(100) should return 5050");

    // Test case 4: n = 1000 (should return 500500)
    assert(sum_to_n_a(1000) === 500500, "sum_to_n_a(1000) should return 500500");
    assert(sum_to_n_b(1000) === 500500, "sum_to_n_b(1000) should return 500500");
    assert(sum_to_n_c(1000) === 500500, "sum_to_n_c(1000) should return 500500");

    console.log("All tests passed!");
}

// Run the tests
try {
    runTests();
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error('An unknown error occurred');
    }
}
