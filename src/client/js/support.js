import { createToDo, setMenu, setMidLower } from "./app.js";

let slideIndex = 1;

let destRecords = [];

let destNumber = 0;

let mainImgList = [];

let defaultImgList = ["./images/img1.jpg","./images/img2.jpg","./images/img3.jpg","./images/img5.jpg","./images/img6.jpg","./images/img7.jpg"];

AddSlides(defaultImgList);

showSlides(slideIndex);

//Load from saved destinations
function loadSaveDest(idx){
  Client.setMenu(0);
  console.log("@@@@@ Load save Destination into Planner @@@@@@@@"); 
  // Load upper right display
  console.log(destRecords[idx]);    
  document.getElementById("recordIdNumb").innerHTML = destRecords[idx].recId;  
  document.getElementById("travelCity").innerHTML = destRecords[idx].destx;
  document.getElementById("travelAdmin").innerHTML = destRecords[idx].adminx;
  document.getElementById("travelCountry").innerHTML = destRecords[idx].countryx;
  document.getElementById("travelDatex").innerHTML = destRecords[idx].datex;
  document.getElementById("travelLat").innerHTML = destRecords[idx].latx;
  document.getElementById("travelLon").innerHTML = destRecords[idx].lonx;
  document.getElementById("recordStatus").value = destRecords[idx].recStatus;
  mainImgList=destRecords[idx].picx;
  console.log("finished memu page starting Todo");
  console.log(destRecords[idx].toDoCheckx.length);
  // load ToDo List
  Client.setMidLower(true,"off");
  if (destRecords[idx].toDoCheckx.length < 1) {
    Client.rotateBtn("newToDo");
    console.log("no todo list");
  }
  else {
    console.log("starting create todo list");
    Client.newList();
    let xList = document.getElementById("inputToDo");
    xList.name = "";
    console.log("starting todo loop");
    for (let a = 0; a < destRecords[idx].toDoCheckx.length; a++) {
      xList.value = destRecords[idx].toDoLabelx[a];
      console.log(xList.value);
      Client.createToDo(event);
      if (destRecords[idx].toDoCheckx[a] === "true") {
        let y = document.getElementById(`check${a}`);
        y.checked = true;
        y.value = true;
      }
    }
  }
  // load image slideshow
  console.log("todo loop done adding image list");
  if (mainImgList.length < 1) {
    console.log("adding default image");
    AddSlides(defaultImgList);
  }
  else {
    AddSlides(mainImgList);
  }
  // need to add get weather info here
  let myLat = document.getElementById("travelLat").innerHTML.split(":");
  let myLon = document.getElementById("travelLon").innerHTML.split(":");
  let one ="";
  let two = `${myLat[1]}:${myLon[1]}`;
  let three = Client.getToday("long");
  let meme = { one, two, three };
  let postOpts = {
    method: "post",
    body: JSON.stringify(meme),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  };
  GetWeatherData(postOpts);
  // display pages
  console.log("setting active menu pages");
  Client.setMenu(6);
  let x=document.getElementById("recordStatus");
  x.style.display="block";
  if (destRecords[idx].toDoCheckx.length > 0) {
    Client.setMenu(1);
  }
}

function loadSaveDestList() {
  console.log("Made it to destination save list");
  let x = document.getElementById("SavedDestList");
  while (x.firstChild) {
    x.removeChild(x.firstChild);
  } 
  console.log("making list");
  for (let a=0; a < destNumber; a++) {
    console.log("record "+a);
    console.log(destRecords[a].recStatus);
    let myStatus = document.getElementById("listRecordStatus").value;  
    console.log(" list status is "+myStatus);
    if (destRecords[a].recStatus === myStatus) {  
      let y = document.createElement("li");
      let idx = destRecords[a].recId;
      y.classList.add("travelDest");
      y.id = "travelLi"+idx;
      y.innerHTML = destRecords[a].recId+" "+destRecords[a].destx+" "+destRecords[a].adminx+" "+destRecords[a].countryx;
      console.log("adding event listner");
      y.addEventListener("click", function () {loadSaveDest(destRecords[a].recId);});
      console.log(" saving record to list");
      x.appendChild(y);
    }
  }
}

async function getDestList() {
let postOpts = {
  method: "post",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  }
};
let myResponse = await fetch("/postGetList", postOpts); 
let json = await myResponse.json();
console.log(json);
destRecords = json;
destNumber = destRecords.length;
loadSaveDestList();
}

// post dest save to server
async function saveTrip() {
  document.getElementById("recordIdNumb").innerHTML = destNumber;
  let recId = destNumber;
  let recStatus="Active";
  let toDoLabelx = [];
  let toDoCheckx =[]
  let picx = [];
  let destx = document.getElementById("travelCity").innerHTML;
  let adminx = document.getElementById("travelAdmin").innerHTML;
  let countryx = document.getElementById("travelCountry").innerHTML;
  let datex = document.getElementById("travelDatex").innerHTML;
  let latx = document.getElementById("travelLat").innerHTML;
  let lonx = document.getElementById("travelLon").innerHTML;
  if (mainImgList===[]) {
   picx = defaultImgList;
  }
  else{
   picx = mainImgList; 
  }
  let myTripRec = {recId,recStatus,destx,adminx,countryx,datex,latx,lonx,toDoCheckx,toDoLabelx,picx};
  let postOpts = {
    method: "post",
    body: JSON.stringify(myTripRec),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let myResponse = await fetch("/postSave", postOpts); 
    let json = await myResponse.json();
    destRecords = json;
    destNumber = destRecords.length;
    loadSaveDestList();
  } 
  catch { console.log("Error saveing travel destination ",error);}  
}

// post toDo list to server
async function saveToDoList(toDoRec) {
  let postOpts = {
    method: "post",
    body: JSON.stringify(toDoRec),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  };
  let myResponse = await fetch("/postSaveToDo", postOpts); 
  let json = await myResponse.json();
  console.log(json);
  destRecords = json;
}

// post status to server
async function saveStatus(sts,destRec) {
  if (document.getElementById("listRecordStatus").display === "none") {
    console.log("element is invisible don't change");
    return;
  }
  let postRec = {sts,destRec};
  console.log(postRec);
  let postOpts = {
    method: "post",
    body: JSON.stringify(postRec),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  };
  let myResponse = await fetch("/postSaveStatus", postOpts); 
  let json = await myResponse.json();
  console.log(json);
  destRecords = json;
}

async function getDest(destindex) { 
  let postOpts = {
    method: "post",
    body: JSON.stringify(destIndex),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  };
  let myResponse = await fetch("/postGetDest", postOpts); 
  let json = await myResponse.json();
  console.log(json);
  console.log(JSON.stringify(json));
  // add to a saved record list here

}


// @@@@@@@@@@@@ Slide Show Functions @@@@@@@@@@@@@@@@

            // show prev/next slide
function changeSlide(n) {
  showSlides(slideIndex += n);
  console.log(`changing to ${slideIndex}`);
}

            // select current slide
function currentSlide(n) {
  showSlides(slideIndex = n);
  console.log(`changing to ${slideIndex}`);
  
}

// Display selected Slide

function showSlides(a) {
  let b =0;
  let slides = document.getElementsByClassName("mySlides");
  if (a > slides.length) {slideIndex = 1;}
  if (a < 1) {slideIndex = slides.length;}
  for (b = 0; b < slides.length; b++) {
    slides[b].style.display = "none";
  }
  let dots = document.getElementsByClassName("dot");
  for (b = 0; b < dots.length; b++) {
    dots[b].className = dots[b].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  console.log(`activating slide ${slideIndex-1}`);
  dots[slideIndex-1].className += " active";
  console.log(`activating dot ${slideIndex-1}`);
} 

// add slides to slide container and dots to dot container
function AddSlides(slideList) {

  console.log("Made it to addSlides");
  if (slideList.length < 1) {
    slideList = defaultImgList;
  }
  const mySlideElem = document.getElementById("slideList");
  const myDotElem = document.getElementById("dot-container");
  while (mySlideElem.firstChild) {
    mySlideElem.removeChild(mySlideElem.firstChild);}
  while (myDotElem.firstChild) {
    myDotElem.removeChild(myDotElem.firstChild);}
  for(let a=1; a <= slideList.length; a++) {

    // create dot element  
    let dotElem = document.createElement("span");
    dotElem.classList.add("dot");
    dotElem.id="dot"+a;
    //dotElem.setAttribute("onclick",`return Client.currentSlide(${a});`);
    dotElem.addEventListener("click", function () {currentSlide(a);});
    // create an image holder
    console.log("creating image container")
    let slideDiv = document.createElement("div");
    slideDiv.id = `slide${a}`;
    slideDiv.classList.add("mySlides");
    slideDiv.classList.add("fade");

    // create image index holder
    console.log("Create image index text holder");
    let x = document.createElement("div");
    x.classList.add("numbertext");
    x.innerHTML = `${a} of ${slideList.length}`;

    //create image 
    console.log("creating image");
    let y = document.createElement("img");
    y.src = slideList[a-1];
    console.log("creating text div");

    // create caption text holder
    let z = document.createElement("div");
    z.classList.add("text");
    //z.innerHTML = "caption-text";
    let zchild = document.createElement("a");
    zchild.classList.add("childtext");
    zchild.innerText = "Pixabay Image";
    zchild.href = "https://pixabay.com";
    z.appendChild(zchild);
    

    // add to slideshow
    console.log("adding image to image container slide div");
    slideDiv.appendChild(x);
    slideDiv.appendChild(y);
    slideDiv.appendChild(z);
    console.log("adding image container to slideshow container");
    mySlideElem.appendChild(slideDiv);
    console.log("adding dot element to dot container");
    myDotElem.appendChild(dotElem);
  }
  // adding next and prev arrows
  let myPrev = document.createElement("a");
  let myNext = document.createElement("a");
  myPrev.innerHTML="&#10094;";
  myPrev.classList.add('prev');
  //myPrev.setAttribute("onclick","return Client.changeSlide(-1);");
  myPrev.addEventListener("click", function () {changeSlide(-1);});
  myNext.classList.add('next');
  //myNext.setAttribute("onclick","return Client.changeSlide(1);");
  myNext.addEventListener("click", function () {changeSlide(1);});
  myNext.innerHTML="&#10095;";
  mySlideElem.appendChild(myPrev);
  mySlideElem.appendChild(myNext);

  // set slide index and display 1st slide
  slideIndex = 1;
  showSlides(slideIndex);
}

//@@@@@@@@@@@@@@ end slide show functions @@@@@@@@@@@@@@@@@@


// create an city list from API call
function popUlDest(json) {
  let x=document.getElementById("destList");
  while (x.firstChild) {
    x.removeChild(x.firstChild);
  }
  let str="";
  let lst=json.geonames;
  for (let a=0; a < json.geonames.length; a++) {
    console.log("My City name list item "+a);
    console.log(lst[a]);
    str=`${lst[a].name}: ${lst[a].adminName1}: ${lst[a].countryCode}: Lat: ${lst[a].lat}: Lon: ${lst[a].lng}`;
    console.log("my String ="+str);
    let y=document.createElement("li");
    y.id="dest"+a;
    y.classList.add("travelDest");
    y.innerHTML=str;
    y.addEventListener("click", function () {return Client.currentDest("dest"+a);});
    console.log(y);
    x.appendChild(y);
    setMidLower(true,1);
  }
}
// load current weather tab
function currentWeather(json) {
  let x=document.getElementById("currForcast");
  let y=document.createElement("p");
  y.innerHTML=`Current Temp: ${json.data[0].temp}`;
  x.appendChild(y);
  y=document.createElement("br");
  x.appendChild(y);
  y=document.createElement("p");
  y.innerHTML=`Feels Like: ${json.data[0].app_temp}`;
  x.appendChild(y);
  y=document.createElement("br");
  x.appendChild(y);
  y=document.createElement("p");
  y.innerHTML=`Current Conditions ${json.data[0].weather.description}`;
  x.appendChild(y);
  y=document.createElement("br");
  x.appendChild(y);
  y=document.createElement("p");
  y.innerHTML=`Winds out of the ${json.data[0].wind_cdir} gusting to ${json.data[0].wind_spd}`;
  x.appendChild(y);
  y=document.createElement("br");
  x.appendChild(y);
  y=document.createElement("p");
  y.innerHTML=`Precipitation ${json.data[0].precip}`;
  x.appendChild(y);
  


}

// load extende weather tab
function extendedWeather(json) {
  let x=document.getElementById("extForcast");
  let a=0;
  for (a=0; a<16; a++) {
    let y=document.createElement("p");
    y.innerHTML = `*********  Day ${a+1} *********`;
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Valid Date ${json.data[a].valid_date}`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`High Temp: ${json.data[a].high_temp} Degree`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Low Temp: ${json.data[a].low_temp} Degree`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Conditions ${json.data[a].weather.description}`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Winds out of the ${json.data[a].wind_cdir} gusting to ${json.data[a].wind_gust_spd} mph`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Precipitation ${json.data[a].precip}`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
  }
}

// load historical weather tab
function historicalWeather(json) {
  let x=document.getElementById("histForcast");
  let a=0;
  for (a=0; a < json.data.length; a++) {
    let y=document.createElement("p");
    y.innerHTML=`High Temp: ${json.data[a].max_temp} Degree`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Low Temp: ${json.data[a].min_temp} Degree`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Winds speed ${json.data[a].wind_spd} gusting to ${json.data[a].wind_gust_spd} mph`;
    x.appendChild(y);
    y=document.createElement("br");
    x.appendChild(y);
    y=document.createElement("p");
    y.innerHTML=`Precipitation ${json.data[a].precip}`;
    x.appendChild(y);
  }
  
}

// create an image list from API call
function popPics(json) {
  mainImgList=[];  // need to add a check to keep default pics if no hits
  let a = 0;
  let pic = json.hits;
  for (a=0; a < pic.length; a++) {
    mainImgList.push(pic[a].webformatURL);
  }
  // keep default image list if no pics
  // otherwise add new images
  //if (mainImgList.lenth > 0) {  
  AddSlides(mainImgList);       
  //}
}

function getDates() {
  let myDate = new Date(document.getElementById("dateField").value);
  console.log(myDate);
  var d = Date.parse(myDate);
  //let myNextDay = new Date(document.getElementById("dateField").value);
  let h=myDate.getTimezoneOffset()*60000;  //compensate for UTC timezone
  console.log(d);
  console.log(h);
  myDate.setTime(d+h);  // add current millisec and offset millisec to correct date
  //myNextDay.setTime(d+h+86400000); // add 1 day
  console.log(myDate);
  console.log(myNextDay);
  //let a= myNextDay.getFullYear();
  //let b= 1+myNextDay.getMonth();
  //let c= myNextDay.getDate();
  let x= myDate.getFullYear();
  let y= 1+myDate.getMonth();
  let z= myDate.getDate();
  if (y < 10) {y="0"+y;}
  if (z < 10) {z="0"+z;}
  //if (b < 10) {b="0"+b;}
  //if (c < 10) {c="0"+c;}
  document.getElementById("dateHolder").innerHTML = `${x}-${y}-${z}`;
  console.log(dateHolder);
  return Client.getToday("long");
}

async function GetWeatherData(postOpts) {
  let myResponse = await fetch("/getWeatherCurrent", postOpts); // get current weather based on lat lon from Geoname
  let json = await myResponse.json();
  console.log(json);
  console.log(JSON.stringify(json));
  currentWeather(json);
  myResponse = await fetch("/getWeather3day", postOpts); // get 3day weather based on lat lon from Geoname
  json = await myResponse.json();
  console.log(json);
  console.log(JSON.stringify(json));
  extendedWeather(json);
  myResponse = await fetch("/getWeatherHist", postOpts); // get historical weather based on lat lon from Geoname
  json = await myResponse.json();
  console.log(json);
  console.log(JSON.stringify(json));
  historicalWeather(json);
}
// call API for city weather and pictures
async function retrieveData(urlTxt) {
  Client.enableButton("submitButton1",false);
  document.getElementById("dateHolder").innerHTML = document.getElementById("dateField").value;
  let one =document.getElementById("cityField").value;
  console.log(document.getElementById("cityField").value);
  let two = "";
  let three = getDates();
  console.log(three);
  let meme = { one, two, three };
  let postOpts = {
    method: "post",
    body: JSON.stringify(meme),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log(postOpts);
    let myResponse = await fetch("/getGeo", postOpts); // get Geonames call
    let json = await myResponse.json();
    console.log(json);
    console.log(JSON.stringify(json));
    if (json.geonames === []) {throw `API returned no city data for ${one}`;}
    two = `${json.geonames[1].lat}:${json.geonames[1].lng}`;
    popUlDest(json); // send to list populater
    meme = {one,two,three};
    postOpts = {
      method: "post",
      body: JSON.stringify(meme),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(postOpts);
    GetWeatherData(postOpts);
    myResponse = await fetch("/getPics", postOpts);  // get city pics from Pixabay
    json = await myResponse.json();
    console.log(json);
    console.log(JSON.stringify(json));
    popPics(json); // send to picture list builder
    Client.enableButton("submitButton1",true);
    Client.setMenu(2);// display ul destination list
    alert(`API call succsessful`);
  } catch (error) {
    console.log("error", error);
    alert(`API call fail ${error}`);
    Client.enableButton("submitButton1",true);
    //############# remove this section is for testing only###############
   // Client.setMenuPage(3);
    //Client.setMidUpperLeft(true,3);
    //Client.setRightState(true);
    //Client.setMidUpperRight(true);
    //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Calling Menu 2 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    
    Client.setMenu(7);

    ///############end test section ############
  }
}

function handleSubmit(event) {

    //retrieveData('Paris');
    retrieveData('');

}

export { handleSubmit, retrieveData, AddSlides, showSlides, currentSlide, changeSlide, saveTrip, getDest, getDestList, saveToDoList, loadSaveDestList, saveStatus };
