import { retrieveData } from "../src/client/js/support.js";
import { checkForName } from "../src/client/js/app.js";

describe("Testing the submit functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing the handleSubmit() function", () => {
    document.body.innerHTML = `
        <input id="urlName" />
      `;
    require("../src/client/js/support.js");
    const urlName = document.getElementById("urlName");
    urlName.value = "https://www.google.com";
    let inputData = [urlName.value, true];
    let myCheck = checkForName(inputData);
    expect(myCheck).toBe(true);
  });

  // expect(handleSubmit("https://www.google.com")).toBe("https://www.google.com");
  //expect(urlName.value).toBe('https://www.google.com');
});
