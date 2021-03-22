// This test requires server to be up. Test will make a live POST to the server /myApiReq node and return a response.
// Response is from a local var and does not call the NLP API. This mimics the retieveData function in formHandler.js

import { retrieveData } from "../src/client/js/formHandler.js";

global.fetch = require('node-fetch').default; 

const one = "https://www.google.com";
const two = "blah blah";
const three = "pickle time";
const meme = { one, two, three };
const postOpts = {
  method: "post",
  body: JSON.stringify(meme),
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
};

describe("testing POST to local server", () => {
  test("Test POST", async () => {
    const res = await fetch("http://localhost:8081/myApiReq", postOpts); // full url required for fetch to work
    const result = await res.json();
    console.log(result);
    expect(result.title).toBe("test json response");
  });
});
