// Dev: Will Ehrhart
// Feature: AssignmentTracker
// Function: getUpcomingAssignments(list, now, days)

import { getUpcomingAssignments } from "../../backend/src/features/assignmentTracker/assignmentTrackerController.js";

// ---------- TESTS ---------- //

let data = [
  { id: 1, title: "today", dueDate: "2025-10-30", completed: false },
  { id: 2, title: "past", dueDate: "2025-10-25", completed: false },
  { id: 3, title: "week", dueDate: "2025-11-04", completed: false },
  { id: 4, title: "done", dueDate: "2025-10-31", completed: true },
];

// 1 - Correct Case
console.log("---- Correct Case ----");
let result = getUpcomingAssignments(data, new Date("2025-10-30"), 7);
if (result.length === 2 && result.every(a => !a.completed)) {
  console.log("PASS. Expected: upcoming incomplete items | Got:", result);
} else {
  console.log("FAIL. Expected: upcoming incomplete items | Got:", result);
}
console.log("");

// 2 - Incorrect Case
console.log("---- Incorrect Case ----");
try {
  getUpcomingAssignments(null);
  console.log("FAIL. Expected: error on invalid input | Got: success");
} catch (e) {
  console.log("PASS. Expected: error on invalid input | Got:", e.message);
}
console.log("");

// 3 - Boundary Case
console.log("---- Boundary Case ----");
result = getUpcomingAssignments(data, new Date("2025-10-30"), 5);
if (result.every(a => new Date(a.dueDate) >= new Date("2025-10-30"))) {
  console.log("PASS. Expected: includes start date, excludes past | Got:", result);
} else {
  console.log("FAIL. Expected: correct boundary filtering | Got:", result);
}
console.log("");

// 4 - Edge Case
console.log("---- Edge Case ----");
result = getUpcomingAssignments(data, new Date("2025-10-30"), 0);
if (result.length === 0) {
  console.log("PASS. Expected: empty when window = 0 days | Got:", result);
} else {
  console.log("FAIL. Expected: empty when window = 0 days | Got:", result);
}
console.log("");

console.log("All tests complete.");
