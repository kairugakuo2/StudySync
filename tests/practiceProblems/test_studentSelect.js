// test_studentSelect.js
// Dev: Ridwan Durosimi
// Feature: Practice Problems
// Function: studentSelect(name)

// TEST //

const readline = require('readline');
const register = ["Alice", "Bob", "Charlie", "Diana"];
const onlyLetters = /^[A-Za-z]+$/;

let selectedStudent = "";
const studentResults = [];

function studentSelect(name) {
    return register.includes(name);
}

function test_studentSelect(input) {
    selectedStudent = input;

    // Case 1 (Correct)
    if (typeof input === 'string' && register.includes(input)) {
        studentResults.push("PASS 1"); // Name exists in register
        console.log("PASS 1");
    } else {
        studentResults.push("FAIL 1"); // Name doesn't exist in register
        console.log("FAIL 1");
    }

    // Case 2 (Incorrect)
    if (typeof input === 'string' && !register.includes(input)) {
        studentResults.push("PASS 2"); // Input doesn't match any names in register
        console.log("\nPASS 2");
    } else{
        studentResults.push("FAIL 2"); // Input matches a name in register
        console.log("\nFAIL 2");
    }

    // Case 3 (Boundary)
    if (typeof input === 'string' && input.length > 1) {
        studentResults.push("PASS 3"); // Input is longer than 1 character
        console.log("\nPASS 3");
    } else {
        studentResults.push("FAIL 3"); // Input must be longer than 1 character
        console.log("\nFAIL 3");
    }

    // Case 4 (Edge)
    if (typeof input === 'string' && (input.length < 0 || !onlyLetters.test(input))) {
        studentResults.push("FAIL 4"); // Input contains a non-letter or has negative length")
        console.log("\nFAIL 4");
    } else {
        studentResults.push("PASS 4"); // Input contains only letters and has a positive character length
        console.log("\nPASS 4");
    }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Enter a student name to test: ', (answer) => {
    test_studentSelect(answer.trim());
    rl.close();
});

module.exports = { selectedStudent, studentResults };
