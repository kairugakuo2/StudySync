// test_renderCollaboratorList.js
// Dev: Gakuo Kairu
// Feature: SharedWorkspaceDashboard
// Function: renderCollaboratorList(workspaceId)

// import your function to test here (change the path to your file)
import { renderCollaboratorList } from "../../backend/src/features/shared-workspace-dashboard/sharedWorkspaceController.js";

// ---------------- TESTS ---------------- //

// 1- Correct Case
console.log("---- Correct Case ----");
let res = renderCollaboratorList("ws_001");
if (res.message === "Collaborators Loaded") {
  console.log("PASS ✅  Expected: 'Collaborators Loaded' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Collaborators Loaded' | Got:", res.message);
}
console.log("");

// 2- Incorrect Case
console.log("---- Incorrect Case ----");
res = renderCollaboratorList("ws_404");
if (res.message === "Error: Workspace Not Found") {
  console.log("PASS ✅  Expected: 'Error: Workspace Not Found' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Error: Workspace Not Found' | Got:", res.message);
}
console.log("");

// 3 - Boundary Case
console.log("---- Boundary Case ----");
res = renderCollaboratorList("ws_empty");
if (res.message === "Collaborators Loaded") {
  console.log("PASS ✅  Expected: 'Collaborators Loaded' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Collaborators Loaded' | Got:", res.message);
}
console.log("");

// 4 - Edge Case
console.log("---- Edge Case ----");
res = renderCollaboratorList(null);
if (res.message === "Error: Invalid workspace") {
  console.log("PASS ✅  Expected: 'Error: Invalid workspace' | Got:", res.message);
} else {
  console.log("FAIL ❌  Expected: 'Error: Invalid workspace' | Got:", res.message);
}
console.log("");

// ---------------- END ---------------- //
console.log("All tests complete ✅");



// ----------HOW TO RUN TEST ----------//
// 1 - Open terminal
// 2 - Move to this test file's folder
//      cd tests/sharedWorkspaceDashboard
// 3 - Run the file with Node:
//      node test_renderCollaboratorList.js
// 4 - Check the console for PASS / FAIL results

