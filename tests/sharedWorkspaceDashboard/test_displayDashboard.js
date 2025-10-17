// test_displayDashboard_manual.js
// Dev: Gakuo Kairu
// Feature: SharedWorkspaceDashboard
// Function: displayDashboard(userID)

// import your function to test here (change the path to your file)
const { displayDashboard } = require("../../frontend/src/components/Workspace.js");

// ---------------- TESTS ---------------- //

// 1- Correct Case
console.log("---- Correct Case ----");
let result = displayDashboard(101);
if (result === "Dashboard Loaded") {
  console.log("PASS ✅  Expected: 'Dashboard Loaded' | Got:", result);
} else {
  console.log("FAIL ❌  Expected: 'Dashboard Loaded' | Got:", result);
}
console.log(""); // space for readability

// 2- Incorrect Case
console.log("---- Incorrect Case ----");
result = displayDashboard(-1);
if (result === "Error: Invalid user") {
  console.log("PASS ✅  Expected: 'Error: Invalid user' | Got:", result);
} else {
  console.log("FAIL ❌  Expected: 'Error: Invalid user' | Got:", result);
}
console.log("");

// 3 - Boundary Case
console.log("---- Boundary Case ----");
result = displayDashboard(1);
if (result === "Dashboard Loaded") {
  console.log("PASS ✅  Expected: 'Dashboard Loaded' | Got:", result);
} else {
  console.log("FAIL ❌  Expected: 'Dashboard Loaded' | Got:", result);
}
console.log("");

// 4 - Edge Case
console.log("---- Edge Case ----");
result = displayDashboard(null);
if (result === "Error: Invalid user") {
  console.log("PASS ✅  Expected: 'Error: Invalid user' | Got:", result);
} else {
  console.log("FAIL ❌  Expected: 'Error: Invalid user' | Got:", result);
}
console.log("");

// ---------------- END ---------------- //
console.log("All tests complete ✅");



// ----------HOW TO RUN TEST ----------//
// 1 - Open terminal
// 2 - Move to this test file's folder
//      cd tests/sharedWorkspaceDashboard
// 3 - Run the file with Node:
//      node test_displayDashboard.js
// 4 - Check the console for PASS / FAIL results