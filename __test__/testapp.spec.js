import { checkForName } from "../src/client/js/app.js";

describe("Testing the URL check functionality good URL", () => {
  test("The checkForName() function good URL returns true", () => {
    let inputData = ["https://www.google.com", true];
    expect(checkForName(inputData)).toBe(true);
  });
});

describe("Testing the URL check functionality bad URL", () => {
  test(" The checkForName() function bad URL returns false", () => {
    let inputData = ["google.com", true];
    expect(checkForName(inputData)).toBe(false);
  });
});
