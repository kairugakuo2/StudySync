// test_createSession.test.js
let createSession;

beforeEach(() => {
  jest.resetModules();
  ({ createSession } = await import("../sessionManagerController.js"));
});

describe("createSession", () => {
  test("creates a valid session", async () => {
    const data = {
      title: "Math Study Group",
      startTime: new Date(Date.now() + 3600000).toISOString(),
      endTime: new Date(Date.now() + 7200000).toISOString(),
      participants: ["Alice", "Bob"]
    };

    const result = createSession(data);

    expect(result.session).toHaveProperty("id");
    expect(result.session.title).toBe("Math Study Group");
    expect(result.session.status).toBe("scheduled");
    expect(result.session.participants.length).toBe(2);
  });

  test("throws error if title missing", async () => {
    const badData = {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      participants: ["Alice"]
    };
    expect(() => createSession(badData)).toThrow("Session title is required");
  });

  test("throws error if participants missing", async () => {
    const badData = {
      title: "History Review",
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      participants: []
    };
    expect(() => createSession(badData)).toThrow("At least one participant required");
  });
});

