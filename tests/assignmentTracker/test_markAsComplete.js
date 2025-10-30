// Dev: Will Ehrhart
// Feature: AssignmentTracker
// Function: markAsComplete(list, id)

import { markAsComplete } from "../../backend/src/features/assignmentTracker/assignmentTrackerController.js";

// ---------- TESTS ---------- //

let list = [
  { id: 1, title: "quiz", completed: false },
  { id: 2, title: "essay", completed: false },
];

// 1 - Correct Case
console.log("---- Correct Case ----");
let result = markAsComplete(list, 2);
if (result.find(a => a.id === 2).completed === true) {
  console.log("PASS. Expected: marked complete | Got:", result);
} else {
  console.log("FAIL. Expected: marked complete | Got:", result);
}
console.log("");

// 2 - Incorrect Case
console.log("---- Incorrect Case ----");
try {
  markAsComplete(list, 99);
  console.log("FAIL. Expected: error for invalid id | Got: success");
} catch (e) {
  console.log("PASS. Expected: error for invalid id | Got:", e.message);
}
console.log("");

// 3 - Boundary Case
console.log("---- Boundary Case ----");
result = markAsComplete(list, 1);
if (result.find(a => a.id === 1).completed === true) {
  console.log("PASS. Expected: boundary lowest id handled | Got:", result);
} else {
  console.log("FAIL. Expected: boundary lowest id handled | Got:", result);
}
console.log("");

// 4 - Edge Case
console.log("---- Edge Case ----");
result = markAsComplete(result, 1);
if (result.find(a => a.id === 1).completed === true) {
  console.log("PASS. Expected: re-marking stays complete | Got:", result);
} else {
  console.log("FAIL. Expected: stays complete | Got:", result);
}
console.log("");

console.log("All tests complete.");
