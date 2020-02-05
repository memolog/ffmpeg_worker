const hello = require("../hello");

describe("Hello World", () => {
  test("Greetings", () => {
    const greeting = hello.greeting();
    expect(greeting).toBe("Hello World");
  });
});
