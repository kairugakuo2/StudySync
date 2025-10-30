
let students = [];
let sessions = [];
let notes = [];

const NAME_MAX = 100;
function normalizeName(raw) {
    if (raw == null) throw new Error('name is required');
    if (typeof raw != 'string') throw new Error('name must be a string');
    let name = raw.trim();
    if (name.length === 0) throw new Error('name cannot be empty');
    if (name.length > NAME_MAX) throw new Error('name too long');
    if (!/^[A-Za-z' -]+$/.test(name)) throw new Error('name has invalid characters');
    name = name.replace(/\s+/g, ' ');
    return name
}
function addStudentLogic(rawName){
    const name = normalizeName(rawName);
    const student = { id: Date.now().toString(), name };
    students.push(student);
    return student;  
}
function listStudentsLogic(){
    return [...students];
}
function addSessionLogic(studentId, { date, duration = 60, topic = ' '}){
    if (!studentId) throw new Error('studentId required');
    const session = {
        id: Date.now().toString(),
        studentId,
        date,
        duration,
        topic
    };
    sessions.push(session);
    return session;
}
function listSessionsLogic(studentId){
    return sessions.filter(s => s.studentId === studentId);
}
function addNoteLogic(studnetId, { text, tags = []}) {
    if (!studentId) throw new Error('studentId required');
    if (!text || typeof text !== 'string' || !text.trim()) {
        throw new Error('text is required');
    }
    const note = { id: Date.now().toString(), studentId, text: text.trim(), tags };
    notes.push(note);
    return note;
}
function listNotesLogic(studentId) {
    return notes.filter(n => n.studentId === studentId);
}
exports.createStudent = (req, res) =>{
    const s = addStudentLogic(req.body?.name);
    res.status(201).json(s);
};

exports.listStudents = (_req, res) => {
    res.json(listStudentsLogic())
};

exports.createSession = (req, res) => {
    const session = addSessionLogic(req.params.studentId, req.body || {});
    res.status(201).json(session);
};
exports.listSessions = (req, res) => {
    res.json(listSessionsLogic(req.params.studentId));
};
exports.createNote = (req, res) => {
    const note = addNoteLogic(req.params.studentId, req.body || {});
    res.status(201).json(note);
};
exports.listNotes = (req, res) => {
    res.json(listNotesLogic(req.params.studentId));
};

exports.__test = {
    reset: () => { students = []; sessions = []; notes = []; },
    addStudentLogic,
    listStudentsLogic,
};