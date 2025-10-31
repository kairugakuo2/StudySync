// Test createSession
import createSession from '../../../backend/src/features/sessionManager/sessionManager.js'
console.log('Testing createSession');

function assert(condition, message) {
  if (condition) console.log('PASS:', message);
  else console.error('FAIL:', message);
}

const validSession = {
  title: 'Study Math',
  startTime: new Date(Date.now() + 3600000).toISOString(),
  endTime: new Date(Date.now() + 7200000).toISOString(),
  participants: ['Dasu', 'Camellia']
};
 
// Normal case
try {
  const result = createSession(validSession);
  assert(result.session.title === 'Study Math', 'createSession sets correct title');
  assert(result.session.status === 'scheduled', 'createSession sets status');
} catch (e) {
  assert(false, 'createSession should not throw for valid data');
}

// Validation: empty title
try {
  createSession(validSession.title);
  assert(false, 'createSession should throw if title empty');
} catch (e) {
  assert(e.message === 'Session title is required', 'createSession throws on empty title');
}

// Validation: no participants
try {
  const invalidSession = Object.assign({}, validSession); // clone object
  invalidSession.participants = [];
  createSession(invalidSession);
  assert(false, 'createSession should throw if no participants');
} catch (e) {
  assert(e.message === 'At least one participant required', 'createSession throws on empty participants');
}
