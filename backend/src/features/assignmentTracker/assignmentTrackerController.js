// Dev: Will Ehrhart
// Feature: AssignmentTracker Controller
// Description: core logic for assignment tracker tests

// addAssignment(list, newAssignment)
export function addAssignment(list, newAssignment) {
  if (!newAssignment || !newAssignment.id || !newAssignment.title || !newAssignment.dueDate) {
    throw new Error("Missing required fields");
  }
  if (list.some(a => a.id === newAssignment.id)) {
    throw new Error("Duplicate ID");
  }
  const completed = newAssignment.completed ?? false;
  return [...list, { ...newAssignment, completed }];
}

// markAsComplete(list, id)
export function markAsComplete(list, id) {
  const exists = list.find(a => a.id === id);
  if (!exists) throw new Error("Invalid assignment ID");

  return list.map(a =>
    a.id === id ? { ...a, completed: true, completedAt: new Date() } : a
  );
}

// getUpcomingAssignments(list, now = new Date(), days = 7)
export function getUpcomingAssignments(list, now = new Date(), days = 7) {
  if (!Array.isArray(list)) throw new Error("Input must be an array");

  const end = new Date(now);
  end.setDate(end.getDate() + days);

  return list
    .filter(a => !a.completed)
    .filter(a => {
      const due = new Date(a.dueDate);
      return due >= now && due < end;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}
