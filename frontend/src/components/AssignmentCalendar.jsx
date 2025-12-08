// dev will ehrhart
// assignment calendar component stores assignments in localstorage

import React, { useMemo, useState, useEffect } from "react";

const e = React.createElement;

// build days for a month
function getMonthDays(year, monthIndex) {
  const last = new Date(year, monthIndex + 1, 0);
  const days = [];
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, monthIndex, d));
  }
  return days;
}

// yyyy-mm-dd
function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate() + 0).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function UpcomingAssignments(props) {
  const assignments = props.assignments || [];
  const onToggleComplete = props.onToggleComplete;
  const onRemove = props.onRemove;

  const sorted = assignments.slice().sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
  );

  if (sorted.length === 0) {
    return e(
      "div",
      { className: "text-sm text-slate-400" },
      "No assignments yet - add one using the form above."
    );
  }

  return e(
    "div",
    { className: "space-y-2 max-h-64 overflow-auto text-sm" },
    sorted.map((a) => {
      const meta =
        (a.course ? a.course + " · " : "") +
        a.dueDate +
        (a.dueTime ? " " + a.dueTime : "");

      return e(
        "div",
        {
          key: a.id,
          className:
            "flex items-center justify-between rounded-xl bg-slate-800 px-3 py-2",
        },
        e(
          "div",
          null,
          e("div", { className: "font-medium text-sm truncate" }, a.title),
          e("div", { className: "text-[11px] text-slate-400" }, meta)
        ),
        e(
          "div",
          { className: "flex items-center gap-2" },
          e(
            "button",
            {
              type: "button",
              onClick: () => onToggleComplete(a.id),
              className:
                "text-[11px] px-2 py-[2px] rounded-full " +
                (a.completed
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-950 text-slate-100"),
            },
            a.completed ? "Done" : "Mark done"
          ),
          a.completed &&
            e(
              "button",
              {
                type: "button",
                onClick: () => onRemove && onRemove(a.id),
                className:
                  "text-[10px] px-2 py-[1px] rounded-full bg-slate-700 text-slate-100",
              },
              "Remove"
            )
        )
      );
    })
  );
}

// render grid cells
function renderCalendarCells(monthDays, assignmentsByDate, handleToggleComplete) {
  const cells = [];
  const firstDayOfWeek = monthDays[0].getDay();

  // blank cells before first day
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(
      e("div", {
        key: "empty-" + i,
        className: "rounded-xl bg-slate-950 border border-slate-900",
      })
    );
  }

  monthDays.forEach((date) => {
    const key = dateKey(date);
    const dailyAssignments = assignmentsByDate[key] || [];

    cells.push(
      e(
        "div",
        {
          key: key,
          className:
            "rounded-xl bg-slate-950 border border-slate-900 flex flex-col p-1 overflow-hidden",
        },
        e(
          "div",
          { className: "flex items-center justify-between mb-1" },
          e("span", { className: "text-[10px] text-slate-400" }, date.getDate()),
          dailyAssignments.length > 0
            ? e(
                "span",
                {
                  className:
                    "text-[9px] px-1 rounded-full bg-indigo-500 text-slate-50",
                },
                String(dailyAssignments.length)
              )
            : null
        ),
        e(
          "div",
          { className: "space-y-1 overflow-auto" },
          dailyAssignments.slice(0, 3).map((a) =>
            e(
              "button",
              {
                key: a.id,
                type: "button",
                onClick: () => handleToggleComplete(a.id),
                className:
                  "truncate rounded-md px-1 py-[1px] text-[9px] w-full " +
                  (a.completed
                    ? "bg-emerald-600 line-through"
                    : "bg-slate-800"),
              },
              a.title
            )
          ),
          dailyAssignments.length > 3
            ? e(
                "div",
                { className: "text-[9px] text-slate-400" },
                "+ " + (dailyAssignments.length - 3) + " more"
              )
            : null
        )
      )
    );
  });

  return cells;
}

function AssignmentCalendar() {
  console.log("AssignmentCalendar RENDERED");

  const today = new Date();

  // single state object for month and year so navigation is reliable
  const [currentDate, setCurrentDate] = useState(() => ({
    month: today.getMonth(), // 0 based
    year: today.getFullYear(),
  }));

  const [assignments, setAssignments] = useState([]);

  const [formTitle, setFormTitle] = useState("");
  const [formCourse, setFormCourse] = useState("");
  const [formDueDate, setFormDueDate] = useState("");
  const [formDueTime, setFormDueTime] = useState("");

  // load assignments
  useEffect(() => {
    try {
      const saved = localStorage.getItem("studysync_assignments");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setAssignments(parsed);
      }
    } catch (err) {
      // ignore localstorage read issues
    }
  }, []);

  // save assignments
  useEffect(() => {
    try {
      localStorage.setItem(
        "studysync_assignments",
        JSON.stringify(assignments)
      );
    } catch (err) {
      // ignore localstorage write issues
    }
  }, [assignments]);

  // map by date
  const assignmentsByDate = useMemo(() => {
    const map = {};
    assignments.forEach((a) => {
      if (!map[a.dueDate]) map[a.dueDate] = [];
      map[a.dueDate].push(a);
    });
    return map;
  }, [assignments]);

  const monthDays = useMemo(
    () => getMonthDays(currentDate.year, currentDate.month),
    [currentDate]
  );

  function handleAddAssignment(event) {
    event.preventDefault();
    if (!formTitle.trim() || !formDueDate) return;

    const newAssignment = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      title: formTitle.trim(),
      course: formCourse.trim(),
      dueDate: formDueDate,
      dueTime: formDueTime,
      completed: false,
    };

    setAssignments((prev) => prev.concat(newAssignment));
    setFormTitle("");
    setFormCourse("");
    setFormDueDate("");
    setFormDueTime("");
  }

  function handleToggleComplete(id) {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  }

  function handleRemoveAssignment(id) {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  }

  // month navigation uses real Date to handle year rollovers correctly
  function goToNextMonth() {
    setCurrentDate((prev) => {
      const d = new Date(prev.year, prev.month, 1);
      d.setMonth(d.getMonth() + 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  function goToPrevMonth() {
    setCurrentDate((prev) => {
      const d = new Date(prev.year, prev.month, 1);
      d.setMonth(d.getMonth() - 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const monthLabel = new Date(
    currentDate.year,
    currentDate.month,
    1
  ).toLocaleString("default", { month: "long", year: "numeric" });

  return e(
    "div",
    {
      className: "w-full h-full flex flex-col gap-6 px-4 py-6",
      style: { maxWidth: "1100px", margin: "0 auto" },
    },
    e(
      "div",
      null,
      e("h1", { className: "text-2xl font-semibold mb-1" }, "Assignment Calendar"),
      e(
        "p",
        { className: "text-sm text-slate-400" },
        "Add assignments with due dates and see them on the calendar."
      )
    ),
    e(
      "div",
      { className: "grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-6" },
      // left: calendar
      e(
        "div",
        { className: "bg-slate-900 rounded-2xl p-4 shadow-lg" },
        e(
          "div",
          { className: "flex items-center justify-between mb-3" },
          e(
            "button",
            {
              type: "button",
              onClick: goToPrevMonth,
              className: "px-3 py-1 rounded-xl bg-slate-800 text-sm",
            },
            "Prev"
          ),
          e("span", { className: "font-medium text-lg" }, monthLabel),
          e(
            "button",
            {
              type: "button",
              onClick: goToNextMonth,
              className: "px-3 py-1 rounded-xl bg-slate-800 text-sm",
            },
            "Next"
          )
        ),
        // weekday header grid
        e(
          "div",
          {
            className: "text-xs text-slate-400 mb-1",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              columnGap: "4px",
              textAlign: "center",
            },
          },
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) =>
            e("div", { key: d }, d)
          )
        ),
        // calendar grid
        e(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gridAutoRows: "80px",
              gap: "4px",
              fontSize: "0.75rem",
            },
          },
          renderCalendarCells(
            monthDays,
            assignmentsByDate,
            handleToggleComplete
          )
        )
      ),
      // right: form + list
      e(
        "div",
        {
          className:
            "bg-slate-900 rounded-2xl p-4 shadow-lg flex flex-col gap-5",
        },
        e(
          "div",
          null,
          e("h2", { className: "text-lg font-semibold mb-2" }, "Add Assignment"),
          e(
            "form",
            { className: "flex flex-col gap-2", onSubmit: handleAddAssignment },
            e("input", {
              type: "text",
              className:
                "rounded-xl bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500",
              placeholder: "Assignment title",
              value: formTitle,
              onChange: (event) => setFormTitle(event.target.value),
            }),
            e("input", {
              type: "text",
              className:
                "rounded-xl bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500",
              placeholder: "Course optional",
              value: formCourse,
              onChange: (event) => setFormCourse(event.target.value),
            }),
            e("input", {
              type: "time",
              className:
                "rounded-xl bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500",
              value: formDueTime,
              onChange: (event) => setFormDueTime(event.target.value),
            }),
            e("input", {
              type: "date",
              className:
                "rounded-xl bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500",
              value: formDueDate,
              onChange: (event) => setFormDueDate(event.target.value),
            }),
            e(
              "button",
              {
                type: "submit",
                className:
                  "mt-1 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium px-3 py-2",
              },
              "Add to calendar"
            )
          )
        ),
        e(
          "div",
          { className: "border-t border-slate-800 pt-3" },
          e(
            "h2",
            { className: "text-lg font-semibold mb-2" },
            "Upcoming Assignments"
          ),
          e(UpcomingAssignments, {
            assignments: assignments,
            onToggleComplete: handleToggleComplete,
            onRemove: handleRemoveAssignment,
          })
        )
      )
    )
  );
}

export default AssignmentCalendar;
