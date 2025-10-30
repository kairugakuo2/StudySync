// test_updateWorkspaceView.js
// Dev: Gakuo Kairu
// Feature: SharedWorkspaceDashboard
// Function: updateWorkspaceView(userID, workspaceId)

// import your function to test here (change the path to your file)
import { updateWorkspaceView } from "../../backend/src/features/shared-workspace-dashboard/sharedWorkspaceController.js";

// ---------------- TESTS ---------------- //

// 1- Correct Case
console.log("---- Correct Case ----");
let res = updateWorkspaceView(1, "ws_001");
if (res.message === "Workspace View Updated") {
  console.log("PASS ✅  Expected: 'Workspace View Updated' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Workspace View Updated' | Got:", res.message);
}
console.log("");

// 2- Incorrect Case
console.log("---- Incorrect Case ----");
res = updateWorkspaceView(4, "ws_001"); // user exists but is not a member of ws_001
if (res.message === "Error: Access Denied") {
  console.log("PASS ✅  Expected: 'Error: Access Denied' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Error: Access Denied' | Got:", res.message);
}
console.log("");

// 3 - Boundary Case
console.log("---- Boundary Case ----");
res = updateWorkspaceView(2, "ws_001"); // another valid member
if (res.message === "Workspace View Updated") {
  console.log("PASS ✅  Expected: 'Workspace View Updated' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Workspace View Updated' | Got:", res.message);
}
console.log("");

// 4 - Edge Case
console.log("---- Edge Case ----");
res = updateWorkspaceView(null, "ws_001");
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
//      node test_updateWorkspaceView.js
// 4 - Check the console for PASS / FAIL results

