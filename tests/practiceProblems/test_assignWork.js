// test_assignWork.js
// Dev: Ridwan Durosimi
// Feature: Practice Problems
// Function: assignWork(assignment_Name)

const {assignWork} = require("../../frontend/src/components/Workspace.js");

// TEST //

const readline = require('readline');
const assignments = ["MathHW1", "ScienceLab", "EssayDraft", "ProjectPlan"];
const onlyLetters = /^[A-Za-z]+$/;

let selectedAssignment = "";
const assignResults = [];

function assignWork(assignment) {
    return assignments.includes(assignment);
}

function test_assignWork(input) {
    selectedAssignment = input;

    // Case 1 (Correct)
    if (typeof input === 'string' && assignments.includes(input)) {
        assignResults.push("PASS 1");
        console.log("PASS 1");
    } else {
        assignResults.push("FAIL 1");
        console.log("FAIL 1");
    }

    // Case 2 (Incorrect)
    if (typeof input === 'string' && !assignments.includes(input)) {
        assignResults.push("PASS 2");
        console.log("\nPASS 2");
    } else {
        assignResults.push("FAIL 2");
        console.log("\nFAIL 2");
    }

    // Case 3 (Boundary)
    if (typeof input === 'string' && input.length > 1) {
        assignResults.push("PASS 3");
        console.log("\nPASS 3");
    } else {
        assignResults.push("FAIL 3");
        console.log("\nFAIL 3");
    }

    // Case 4 (Edge)
    if (typeof input === 'string' && (input.length < 0 || !onlyLetters.test(input))) {
        assignResults.push("PASS 4");
        console.log("\nPASS 4");
    } else {
        assignResults.push("FAIL 4");
        console.log("\nFAIL 4");
    }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Enter assignment name to assign: ', (answer) => {
    test_assignWork(answer.trim());
    rl.close();
});

module.exports = { selectedAssignment, assignResults };