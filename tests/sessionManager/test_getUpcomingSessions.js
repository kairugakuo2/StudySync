// Test getUpcomingSessions
console.log('Testing getUpcomingSessions');

function assert(condition, message) {
  if (condition) console.log('PASS:', message);
  else console.error('FAIL:', message);
}

// Add a session for testing
createSession({
  title: 'Upcoming Session',
  startTime: new Date(Date.now() + 3600000).toISOString(),
  endTime: new Date(Date.now() + 7200000).toISOString(),
  participants: ['hya']
});

// Normal case
try {
  const upcoming = getUpcomingSessions();
  assert(upcoming.count >= 1, 'getUpcomingSessions returns upcoming sessions');
} catch (e) {
  assert(false, 'getUpcomingSessions should not throw for valid input');
}

// Error: invalid days
try {
  getUpcomingSessions(-5);
  assert(false, 'getUpcomingSessions should throw for negative days');
} catch (e) {
  assert(e.message === 'Days must be a positive number', 'getUpcomingSessions throws on negative days');
}
