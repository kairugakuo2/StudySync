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
