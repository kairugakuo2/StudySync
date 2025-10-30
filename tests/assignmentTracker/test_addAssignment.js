// Dev: Will Ehrhart
// Feature: AssignmentTracker
// Function: addAssignment(list, assignment)

import { addAssignment } from "../../backend/src/features/assignmentTracker/assignmentTrackerController.js";

// ---------- TESTS ---------- //

// 1 - Correct Case
console.log("---- Correct Case ----");
let list = [{ id: 1, title: "hw1", dueDate: "2025-11-01", completed: false }];
let result = addAssignment(list, { id: 2, title: "proj", dueDate: "2025-11-05" });
if (result.length === 2 && result[1].title === "proj") {
  console.log("PASS. Expected: new assignment added | Got:", result);
} else {
  console.log("FAIL. Expected: new assignment added | Got:", result);
}
console.log("");

// 2 - Incorrect Case
console.log("---- Incorrect Case ----");
try {
  addAssignment(list, { title: "bad" });
  console.log("FAIL. Expected: Error thrown | Got: success");
} catch (e) {
  console.log("PASS. Expected: Error thrown | Got:", e.message);
}
console.log("");

// 3 - Boundary Case
console.log("---- Boundary Case ----");
let single = [];
result = addAssignment(single, { id: 1, title: "first", dueDate: "2025-11-01" });
if (result.length === 1 && result[0].id === 1) {
  console.log("PASS. Expected: handles empty list | Got:", result);
} else {
  console.log("FAIL. Expected: handles empty list | Got:", result);
}
console.log("");

// 4 - Edge Case
console.log("---- Edge Case ----");
try {
  addAssignment(list, { id: 1, title: "dup", dueDate: "2025-11-05" });
  console.log("FAIL. Expected: duplicate id error | Got: success");
} catch (e) {
  console.log("PASS. Expected: duplicate id error | Got:", e.message);
}
console.log("");

console.log("All tests complete");
