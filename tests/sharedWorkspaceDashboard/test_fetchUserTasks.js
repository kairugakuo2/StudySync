// test_fetchUserTasks.js
// Dev: Gakuo Kairu
// Feature: SharedWorkspaceDashboard
// Function: fetchUserTasks(userID)

// import your function to test here (change the path to your file)
import { fetchUserTasks } from "../../backend/src/features/shared-workspace-dashboard/sharedWorkspaceController.js";

// ---------------- TESTS ---------------- //

// 1- Correct Case
console.log("---- Correct Case ----");
let res = fetchUserTasks(1);
if (res.message === "Tasks Loaded") {
  console.log("PASS ✅  Expected: 'Tasks Loaded' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Tasks Loaded' | Got:", res.message);
}
console.log("");

// 2- Incorrect Case
console.log("---- Incorrect Case ----");
res = fetchUserTasks(-5);
if (res.message === "Error: Invalid user") {
  console.log("PASS ✅  Expected: 'Error: Invalid user' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Error: Invalid user' | Got:", res.message);
}
console.log("");

// 3 - Boundary Case
console.log("---- Boundary Case ----");
res = fetchUserTasks(2); // existing user with at least one task in mock data
if (res.message === "Tasks Loaded") {
  console.log("PASS ✅  Expected: 'Tasks Loaded' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Tasks Loaded' | Got:", res.message);
}
console.log("");

// 4 - Edge Case
console.log("---- Edge Case ----");
res = fetchUserTasks(null);
if (res.message === "Error: Invalid user") {
  console.log("PASS ✅  Expected: 'Error: Invalid user' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Error: Invalid user' | Got:", res.message);
}
console.log("");

// ---------------- END ---------------- //
console.log("All tests complete ✅");



// ----------HOW TO RUN TEST ----------//
// 1 - Open terminal
// 2 - Move to this test file's folder
//      cd tests/sharedWorkspaceDashboard
// 3 - Run the file with Node:
//      node test_fetchUserTasks.js
// 4 - Check the console for PASS / FAIL results

