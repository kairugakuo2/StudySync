// Test endSession
console.log('--- Testing endSession ---');

function assert(condition, message) {
  if (condition) console.log('✅ PASS:', message);
  else console.error('❌ FAIL:', message);
}

const session = createSession({
  title: 'End Test',
  startTime: new Date(Date.now() + 3600000).toISOString(),
  endTime: new Date(Date.now() + 7200000).toISOString(),
  participants: ['Alice', 'ZUN']
}).session;

// Normal case
try {
  const result = endSession(session.id);
  assert(result.session.status === 'completed', 'endSession sets status to completed');
  assert(result.session.endedAt instanceof Date, 'endSession sets endedAt timestamp');
} catch (e) {
  assert(false, 'endSession should not throw on valid session');
}

// Error: already ended
try {
  endSession(session.id);
  assert(false, 'endSession should throw if session already ended');
} catch (e) {
  assert(e.message === 'Session already ended', 'endSession throws on already ended');
}

// Error: non-existent session
try {
  endSession('fake-id');
  assert(false, 'endSession should throw if session not found');
} catch (e) {
  assert(e.message === 'Session not found', 'endSession throws on non-existent session');
}
