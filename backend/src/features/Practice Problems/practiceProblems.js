// Test: assignWork, selectedStudent, sendAssignment
// Dev: Ridwan Durosimi
// Feature: Practice Problems
// Function: assignWork(assignment_Name), selectedStudent(student_Name), sendAssignment()

// const {assignWork} = require("../../frontend/src/components/Workspace.js");

import { createInterface } from 'readline';

const assignments = ["MathHW1", "ScienceLab", "EssayDraft", "ProjectPlan"];
const onlyLetters = /^[A-Za-z]+$/;

const register = ["Alice", "Bob", "Charlie", "Diana"];
const onlyLetters2 = /^[A-Za-z]+$/;

let selectedAssignment = "";
let selectedStudent = "";
const assignResults = [];
const studentResults = [];

// TEST: assignWork
function assignWork(assignment) {
  return assignments.includes(assignment);
}

function test_assignWork(input) {
  selectedAssignment = input;

  console.log("\nAvailable assignments:", assignments.join(", "));

  // Simple spelling / validity check
  if (!assignments.includes(input)) {
    console.log(`Assignment "${input}" is not in the list (possibly misspelled).`);
  }

  // Case 1
  if (typeof input === 'string' && assignments.includes(input)) {
    assignResults.push("PASS 1");
  } else {
    assignResults.push("FAIL 1");
  }

  // Case 2
  if (typeof input === 'string' && !assignments.includes(input)) {
    assignResults.push("PASS 2");
  } else {
    assignResults.push("FAIL 2");
  }

  // Case 3 (you still record it, but we will ignore it in the final check)
  if (typeof input === 'string' && input.length > 1) {
    assignResults.push("PASS 3");
  } else {
    assignResults.push("FAIL 3");
  }

  // Case 4
  if (typeof input === 'string' && (input.length < 0 || !onlyLetters.test(input))) {
    assignResults.push("PASS 4");
  } else {
    assignResults.push("FAIL 4");
  }
}

// TEST: studentSelect
function studentSelect(name) {
  return register.includes(name);
}

function test_studentSelect(input) {
  selectedStudent = input;

  console.log("\nRegistered students:", register.join(", "));

  // Simple spelling / validity check
  if (!register.includes(input)) {
    console.log(`Student name "${input}" is not in the register (possibly misspelled).`);
  }

  // Case 1
  if (typeof input === 'string' && register.includes(input)) {
    studentResults.push("PASS 1");
  } else {
    studentResults.push("FAIL 1");
  }

  // Case 2
  if (typeof input === 'string' && !register.includes(input)) {
    studentResults.push("PASS 2");
  } else {
    studentResults.push("FAIL 2");
  }

  // Case 3
  if (typeof input === 'string' && input.length > 1) {
    studentResults.push("PASS 3");
  } else {
    studentResults.push("FAIL 3");
  }

  // Case 4
  if (typeof input === 'string' && (input.length < 0 || !onlyLetters2.test(input))) {
    studentResults.push("FAIL 4");
  } else {
    studentResults.push("PASS 4");
  }
}

// TEST: sendAssignment
function sendAssignment(student, assignment) {
  const students = ["Alice", "Bob", "Charlie", "Diana"];
  const assignmentsList = ["MathHW1", "ScienceLab", "EssayDraft", "ProjectPlan"];
  return students.includes(student) && assignmentsList.includes(assignment);
}

function cases1_3_4Pass(results) {
  // indices 0, 2, 3 correspond to cases 1, 3, 4
  return (
    Array.isArray(results) &&
    results.length >= 4 &&
    results[0].includes("PASS") &&  // Case 1
    results[2].includes("PASS") &&  // Case 3
    results[3].includes("PASS")     // Case 4
  );
}

function test_sendAssignment() {
  const student = selectedStudent;
  const assignment = selectedAssignment;

  // Case 1
  if (sendAssignment(student, assignment)) {
    console.log("verified student & assignment");
  } else {
    console.log("student/assignment either doesn't exist in register or is spelled incorrectly");
  }

  // Case 2
  if (!sendAssignment(student, assignment)) {
    console.log("double checked: student/assignment name is wrong");
  } else {
    console.log("double checked: verified student & assignment");
  }

  // New combined rule: cases 1, 3, 4 must be PASS in both tests
  const assignOk = cases1_3_4Pass(assignResults);
  const studentOk = cases1_3_4Pass(studentResults);

  if (assignOk && studentOk && sendAssignment(student, assignment)) {
    console.log(`New Practice Problem: -> ${student} is assigned ${assignment}`);
  } else {
    console.log("Please try again");
  }
}

// Questions to Run Tests
const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter assignment name to assign: ', (assignmentAnswer) => {
  test_assignWork(assignmentAnswer.trim());

  rl.question('Enter a student name to test: ', (studentAnswer) => {
    test_studentSelect(studentAnswer.trim());

    // combined test
    test_sendAssignment();

    rl.close();
  });
});
