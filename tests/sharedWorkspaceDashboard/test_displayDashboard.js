// test_displayDashboard.js
// Dev: Gakuo Kairu
// Feature: SharedWorkspaceDashboard
// Function: displayDashboard(userID)

// STRUCTURE OF TEST CASES TO FOLLOW:
// describe() = folder for a group of related tests (here it’s one function).
// test() = an individual test scenario.
// expect() = what we think the result should be.
// Each test covers one of the 4 main categories -> correct, incorrect, boundary, edge



// this imports the function we’re testing from our actual code
import { displayDashboard } from "../../frontend/src/components/Workspace.js";

// describe() groups the 4 tests needed (Equivalent Partitions) for one function or feature
describe("displayDashboard(userID)", () => {

  // 1- Correct case → what should happen when everything's valid
  test("loads dashboard for a valid user", () => {
    // input → passing a real user id
    const result = displayDashboard(101);
    // check → does it show the right thing?
    expect(result).toBe("Dashboard Loaded");
  });

  // 2- Incorrect case → test when something's wrong with the input
  test("shows error for invalid user ID", () => {
    const result = displayDashboard(-1);
    // we expect an error message or failed response
    expect(result).toBe("Error: Invalid user");
  });

  // 3- Boundary case → test the edge of what’s still valid
  test("works fine for the lowest valid user ID (1)", () => {
    const result = displayDashboard(1);
    // still should load normally
    expect(result).toBe("Dashboard Loaded");
  });

  // 4-  Edge case → weird or unexpected inputs
  test("handles null userID gracefully", () => {
    const result = displayDashboard(null);
    // should not crash, should give an error message
    expect(result).toBe("Error: Invalid user");
  });

});
