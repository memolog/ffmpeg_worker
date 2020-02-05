import { Hello } from "../ts/hello";

describe("Hello World", () => {
  test("Greetings", () => {
    const hello = new Hello();
    expect(hello.greeting.say()).toBe("Hello World");
  });
});
