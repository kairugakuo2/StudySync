// test_studentSelect.js
// Dev: Ridwan Durosimi
// Feature: Practice Problems
// Function: studentSelect(name)

const {studentSelect} = require("../../frontend/src/components/Workspace.js");

// TEST //

const readline = require('readline');

function studentSelect(name) { // Checks if inputed name is in the register
    const register = ["Alice", "Bob", "Charlie", "Diana"]; // Example register of names
    return register.includes(name);
}

function test_studentSelect(input) { // Main Test Function
    const register = ["Alice", "Bob", "Charlie", "Diana"];

    // Test Cases //

    // Case 1 (Correct):
    if (typeof input === 'string' && register.includes(input)) {
        console.log("PASS 1 - Name exists in register");
    } else {
        console.log("FAIL 1 - Name doesn't exist in register");
    }

    // Case 2 (Incorrect):
    if (typeof input === 'string' && !register.includes(input)) {
        console.log("\nPASS 2 - Input doesn't match any names in register");
    } else {
        console.log("\nFAIL 2 - Input matches a name in register");
    }

    // Case 3 (Boundary):
    if (typeof input === 'string' && input.length > 1) {
        console.log("\nPASS 3 - Input is longer than 1 character");
    } else {
        console.log("\nFAIL 3 - Input must be longer than 1 character");
    }

    // Case 4 (Edge):
    const onlyLetters = /^[A-Za-z]+$/;
    if (typeof input === 'string' && (input.length < 0 || !onlyLetters.test(input))) {
        console.log("\nFAIL 4 - Input either conatins a non-letter character or has negative length, and must be fixed");
    } else {
        console.log("\nPASS 4 - Input contains only letters and has a positive character length" );
    }
}

const rl = readline.createInterface({ // Connects Node's input & ouput, stores result in r1
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a student name to test: ', (answer) => { // Initial Text
    test_studentSelect(answer.trim()); // Removes extra spaces before/after input
    rl.close();
});
