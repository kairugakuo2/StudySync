// test_testAddStudent
// Dev: Ryan King
// Feature: TutorTab
// Funciton: addStudent(name)

const { addStudent, getStudents, resetStudents } = require("../../backend/src/features/tutor-tab/tutorController.js")

beforeEach(() => resetStudents());

describe('addStudent(name)', () => {

    // Correct Cases

    test('Correct: adds a normal name and returns the record', () => {
        const s = addStudnet('Alice Johnson');
        expect(s).toHaveProperty('id');
        expect(s.name).toBe('Alice Johnson');
        expect(getStudent()).toHaveLength(1);
    });

    test('Correct: trims surrounding spaces', () => {
        const s = addStudent('   Bob   ');
        expect(s.name).toBe('Bob');
    });

    //Boundary Cases

    test('Boundary: minimum length (1 char) is accepted', () => {
        const s = addStudent('A');
        expect(s.name).toBe('A');
    });

    test('Boundary: maximum length (100 chars) is accepted', () => {
        const name = 'A'.repeat(100);
        const s = addStudent(name);
        expect(s.name.length).toBe(100);
    });

    test('Boundary: length > 100 is rejected', () => {
        const name = 'A'.repeat(101);
        expect(() => addStudent(name)).toThrow();
    });

    //Edge Cases

    test("Edge: allows hyphens and apostrophes", () => {
        const s = addStudent("Jean-Luc O'Neill");
        expect(s.name).toBe("Jean-Luc O'Neill");
    });

    test("Edge: collapses multiple internal spaces to single spaces", () => {
        const s = addStudent('Ana   Maria   Silva');
        expect(s.name).toBe('Ana Maria Silva');
    });
    test("Edge: duplicate names allowed (if business rules permit)", () => {
        addStudent('Chris Lee');
        addStudent('Chris Lee');
        expect(getStudents().filter(s => s.name === 'Chris Lee')).toHaveLength(2);
    });

    test.each([
        [null, 'name is required'],
        [undefined, 'name is required'],
        [123, 'name must be a string'],
        [true, 'name must be a string'],
        ['', 'name cannot be empty'],
        ['     ', 'name cannot be empty'],
        ['<script>alert(1)</script>', 'name has invalid characters'],
        ['😀😀', 'name has invalid characters'],
    ])('Incorrect: rejects invalid input: %p', (bad) => {
        expect(() => addStudent(bad)).toThrow();
        expect(getStudents()).toHaveLength(0);
    });
});
