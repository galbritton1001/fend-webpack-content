const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require("node-fetch");
//var bodyParser = require("body-parser");
//var cors = require("cors");

var mySave = [];

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

app.post("/getPics", async (req, res) => {
  const myCity = req.body.one;
  const myKey = process.env.pixaBay_API_KEY;
  const myurl =`https://pixabay.com/api/?key=${myKey}&q=${myCity}&image_type=photo`;
  try{
    const myResp = await fetch(myurl);
    const myPics = await myResp.json(); 
    console.log(myPics);
    res.json(myPics);
  }catch {console.log("error ",error);}
});

app.post("/getWeatherCurrent", async (req, res) => {
  console.log(req.body);
  const myLatLon = req.body.two.split(":");
  const myKey = process.env.weatherBit_API_KEY;
  const myurl =`https://api.weatherbit.io/v2.0/current?lat=${myLatLon[0]}&lon=${myLatLon[1]}&key=${myKey}&units=i`;
  console.log(myurl);
  try{
    const myResp = await fetch(myurl);
    const weatherRec = await myResp.json();
    console.log(weatherRec)
    res.json(weatherRec);
  }catch  {console.log("Error",error);}
});

app.post("/getWeather3day", async (req, res) => {
  console.log(req.body);
  const myLatLon = req.body.two.split(":");
  const myKey = process.env.weatherBit_API_KEY;
  const myurl =`https://api.weatherbit.io/v2.0/forecast/daily?lat=${myLatLon[0]}&lon=${myLatLon[1]}&key=${myKey}&hours=72&units=i`;
  console.log(myurl);
  try{
    const myResp = await fetch(myurl);
    const weatherRec = await myResp.json();
    console.log(weatherRec)
    res.json(weatherRec);
  }catch  {console.log("Error",error);}
});

app.post("/getWeatherHist", async (req, res) => {
  console.log(req.body);
  const myLatLon = req.body.two.split(":");
  const myDate = req.body.three.split(":");
  const myKey = process.env.weatherBit_API_KEY;
  const myurl =`https://api.weatherbit.io/v2.0/history/daily?lat=${myLatLon[0]}&lon=${myLatLon[1]}&start_date=${myDate[0]}&end_date=${myDate[1]}&key=${myKey}&units=i`;
  console.log(myurl);
  try{
    const myResp = await fetch(myurl);
    const weatherRec = await myResp.json();
    console.log(weatherRec)
    res.json(weatherRec);
  }catch  {console.log("Error",error);}
});

app.post("/getGeo", async (req, res) => {
  const myKey = process.env.geoName_API_KEY;
  const myCity = req.body.one;
  const myurl = `http://api.geonames.org/searchJSON?q=${myCity}&maxRows=10&username=${myKey}`;
  try {
    const myResp = await fetch(myurl);
    const myGeoname = await myResp.json();
    console.log(myGeoname);
    res.json(myGeoname);
  }catch{console.log("@@@@ error @@@@ ",error);}

});

app.post("/postSave", function (req, res) { // Save dest record
  try{
    console.log(" i'm here");
    console.log(req.body);
    mySave.push(req.body);
    res.json("Save ok");
    console.log(mySave);
  }
  catch {
    console.log("@@@@@@@@@@@@@@@@@ Error @@@@@@@@@@@@@@@@@@@@@",error); 
    res.json(" Save failed "+error); }
  
});

app.post("/postGetDest", function (req, res) { // get dest record
  try{
    res.json(mySave[req.body]);
  }
  catch { res.json(" Get Dest Failed "+error); }
});

app.post("/postGetList", function (req, res) { // get dest list
  try{
    let myList =[];
    for (let a=0; a > mySave.length; a++) {
      myList.push(mySave[a].destx);
    }
    res.json(myList);
  }
  catch { res.json("Get List failed "+error); }
  
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
