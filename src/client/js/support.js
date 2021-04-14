import { setMidLower } from "./app.js";

let slideIndex = 1;

let mainImgList = [];

let defaultImgList = ["./images/img1.jpg","./images/img2.jpg","./images/img3.jpg","./images/img5.jpg","./images/img6.jpg","./images/img7.jpg"];

AddSlides(defaultImgList);

showSlides(slideIndex);

// post dest save to server
async function saveTrip(tripRec) {
  let toDox = [];
  let picx = [];
  let destx = document.getElementById("travelCity").innerHTML;
  let adminx = document.getElementById("travelAdmin").innerHTML;
  let countryx = document.getElementById("travelCountry").innerHTML;
  let latx = document.getElementById("travelLat").innerHTML;
  let lonx = document.getElementById("travelLon").innerHTML;
  if (!!document.getElementsByClassName("toDoCheck")) {
    // add all of the toDo labels here in toDox
    toDox = [];
  }
  else {
    toDox = [];
  }
  if (mainImgList===[]) {
   picx = defaultImgList;
  }
  else{
   picx = mainImgList; 
  }
  let myTripRec = {destx,adminx,countryx,latx,lonx,toDox,picx};
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
    json = await myResponse.json();
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+json+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(JSON.stringify(json));
    // add to a saved record list here
  } 
  catch { console.log("Error saveing travel destination ",error);}  

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
  json = await myResponse.json();
  console.log(json);
  console.log(JSON.stringify(json));
  // add to a saved record list here

}

async function getDestList() {
  let postOpts = {
    method: "post",
    body: JSON.stringify(destIndex),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  };
  let myResponse = await fetch("/postGetList", postOpts); 
  json = await myResponse.json();
  console.log(json);
  console.log(JSON.stringify(json));
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

  console.log("Made it to addSlides")
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
    z.innerHTML = "caption-text";

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
    console.log(y);
    x.appendChild(y);
    setMidLower(true,1);
  }
}

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

function extendedWeather(json) {
  let x=document.getElementById("extForcast");
  let a=0;
  for (a=0; a<16; a++) {
    let y=document.createElement("p");
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
  }
}

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
  AddSlides(mainImgList);
}

function getDates() {
  let myDate = new Date(document.getElementById("dateField").value);
  console.log(myDate);
  var d = Date.parse(myDate);
  let myNextDay = new Date(document.getElementById("dateField").value);
  let h=myDate.getTimezoneOffset()*60000;  //compensate for UTC timezone
  console.log(d);
  console.log(h);
  myDate.setTime(d+h);  // add current millisec and offset millisec to correct date
  myNextDay.setTime(d+h+86400000); // add 1 day
  console.log(myDate);
  console.log(myNextDay);
  let a= myNextDay.getFullYear();
  let b= 1+myNextDay.getMonth();
  let c= myNextDay.getDate();
  let x= myDate.getFullYear();
  let y= 1+myDate.getMonth();
  let z= myDate.getDate();
  if (y < 10) {y="0"+y;}
  if (z < 10) {z="0"+z;}
  if (b < 10) {b="0"+b;}
  if (c < 10) {c="0"+c;}
  return `${x}-${y}-${z}:${a}-${b}-${c}`;
}

// call API for city weather and pictures
async function retrieveData(urlTxt) {
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
    myResponse = await fetch("/getWeatherCurrent", postOpts); // get current weather based on lat lon from Geoname
    json = await myResponse.json();
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
    myResponse = await fetch("/getPics", postOpts);  // get city pics from Pixabay
    json = await myResponse.json();
    console.log(json);
    console.log(JSON.stringify(json));
    popPics(json); // send to picture list builder
    //Client.setMidUpperLeft(true,3);
    //Client.setRightState(true);
    //Client.setMidUpperRight(true);
    Client.setMenu(2);// display ul destination list
    alert(`API call succsessful`);
  } catch (error) {
    console.log("error", error);
    alert(`API call fail ${error}`);
    //############# remove this section is for testing only###############
   // Client.setMenuPage(3);
    //Client.setMidUpperLeft(true,3);
    //Client.setRightState(true);
    //Client.setMidUpperRight(true);
    //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Calling Menu 2 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    Client.setMenu(2);

    ///############end test section ############
  }
}

function handleSubmit(event) {

    retrieveData('Paris');

}

export { handleSubmit, retrieveData, AddSlides, showSlides, currentSlide, changeSlide, saveTrip, getDest, getDestList };
