const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require("node-fetch");
//var bodyParser = require("body-parser");
//var cors = require("cors");

var json = {
  title: "test json response",
  message: "this is a message",
  time: "now",
};

const app = express();



app.use(express.static("dist"));

app.use(express.static("src/client/styles"));

//app.use(cors());

//to use json
app.use(express.json()); //Used to parse JSON bodies
//app.use(bodyParser.json())
// to use url encoded values
//app.use(bodyParser.urlencoded({
// extended: true
//}));

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

console.log(JSON.stringify(mockAPIResponse));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.json(mockAPIResponse);
});

app.post("/myApiReq", async (request, response) => {
  console.log(request.body.one);
  console.log(request.body.two);
  console.log(request.body.three);
  const myKey = process.env.API_KEY;
  const myTestUrl = request.body.one;
  if (myTestUrl === "https://www.google.com") {
    response.json(mockAPIResponse);
  } else {
    //const myTestUrl = 'https://www.bbc.com/future/article/20210309-why-some-people-can-deal-with-the-cold?utm_source=pocket-newtab'
    //console.log(myUrlIn);
    console.log(`api key = ${myKey}`);
    //const myurl = `https://api.meaningcloud.com/sentiment-2.1?key=f450e24343025f4e5ce1aa0c97f6cd1d&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`;
    //const myurl = `https://api.meaningcloud.com/sentiment-2.1?key=${myKey}&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`;
    const myurl = `https://api.meaningcloud.com/sentiment-2.1?key=${myKey}&of=json&url=${myTestUrl}&model=general&lang=en`;
    const myResp = await fetch(myurl);
    const json = await myResp.json();
    response.json(json);
  }
});

console.log(`Your API key is ${process.env.API_KEY}`);
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
