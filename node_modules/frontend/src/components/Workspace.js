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

// test_studentSelect.js
// Dev: Ridwan Durosimi
// Feature: Practice Problems
// Function: studentSelect(name)

const {studentSelect} = require("../../frontend/src/components/Workspace.js");

// TEST //

const readline = require('readline');
const register = ["Alice", "Bob", "Charlie", "Diana"];
const onlyLetters2 = /^[A-Za-z]+$/;

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
    if (typeof input === 'string' && (input.length < 0 || !onlyLetters2.test(input))) {
        studentResults.push("FAIL 4"); // Input contains a non-letter or has negative length")
        console.log("\nFAIL 4");
    } else {
        studentResults.push("PASS 4"); // Input contains only letters and has a positive character length
        console.log("\nPASS 4");
    }
}

const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
rl2.question('Enter a student name to test: ', (answer) => {
    test_studentSelect(answer.trim());
    rl2.close();
});

module.exports = { selectedStudent, studentResults };

// test_sendAssignment.js
// Dev: Ridwan Durosimi
// Feature: Practice Problems
// Function: sendAssignment()

const {sendAssignment} = require("../../frontend/src/components/Workspace.js");

// TEST //

const { selectedStudent, studentResults } = require('./test_studentSelect.js');
const { selectedAssignment, assignResults } = require('./test_assignWork.js');

function sendAssignment(student, assignment) {
    const students = ["Alice", "Bob", "Charlie", "Diana"];
    const assignments = ["MathHW1", "ScienceLab", "EssayDraft", "ProjectPlan"];
    return students.includes(student) && assignments.includes(assignment);
}

function test_sendAssignment({student, assignment, studentResults, assignResults}) {

    // Case 1 (Correct)
    if (sendAssignment(student, assignment)) {
        console.log("PASS 1");
    } else {
        console.log("FAIL 1");
    }

    // Case 2 (Incorrect)
    if (!sendAssignment(student, assignment)) {
        console.log("\nPASS 2");
    } else {
        console.log("\nFAIL 2");
    }

    // Case 3 (Boundary)
    function casesPass(results) {
        return results[0].includes("PASS") && results[2].includes("PASS") && results[3].includes("PASS");
    }
    if (casesPass(studentResults) && casesPass(assignResults)) {
        console.log("\nPASS 3");
    } else {
        console.log("\nFAIL 3");
    }
    
    // Case 4 (Edge)
    if (
        studentResults[1].includes("FAIL 2") &&
        assignResults[1].includes("FAIL 2")
    ) {
        console.log("\nPASS 4");
    } else {
        console.log("\nFAIL 4");
    }
}

test_sendAssignment({
    student: selectedStudent,
    assignment: selectedAssignment,
    studentResults: studentResults,
    assignResults: assignResults
});

module.exports = { selectedAssignment, assignResults }; 
