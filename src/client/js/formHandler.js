let slideIndex = 1;

showSlides(slideIndex);

            // show prev/next slide
function changeSlide(n) {
  showSlides(slideIndex += n);
}

            // show current slide
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i =0;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 


function AddSlides(slideList) {
  let a= 0;
  const mySlideElem = document.getElementById("slideList");
  const myDotElem = document.getElementById("dot-container");
  while (mySlideElem.firstChild) {
    mySlideElem.removeChild(mySlideElem.firstChild);}
  while (myDotElem.firstChild) {
    myDotElem.removeChild(myDotElem.firstChild);}
  for(a=0; a < slideList.length; a++) {

    // create dot element  
    let dotElem = document.createElement("span");
    //dotElem.onclick=`return Client.currentSlide(${a})`;
    addEventListener("click", function() {
      return Client.currentSlide(`${a}`);
    });
    dotElem.classList.add("dot");

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
    x.innerHTML = `${a} of ${slideList.length-1}`;

    //create image 
    console.log("creating image");
    let y = document.createElement("img");
    y.src = slideList[a];
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
  let myPrev = document.createElement("a");
  let myNext = document.createElement("a");
  //myPrev.onclick="return Client.changeSlide(-1)";
  addEventListener("click", function() {
    return Client.changeSlide(-1);
  });
  myPrev.innerHTML="&#10094;";
  myNext.onclick="return Client.changeSlide(1)";
  addEventListener("click", function() {
    return Client.changeSlide(1);
  });
  myNext.innerHTML="&#10095;";
  mySlideElem.appendChild(myPrev);
  mySlideElem.appendChild(myNext);
  slideIndex = 1;
  showSlides(slideIndex);
}


async function retrieveData(urlTxt) {
  //const one = `https://www.bbc.com/future/article/20210309-why-some-people-can-deal-with-the-cold?utm_source=pocket-newtab`;
  //const one = urlTxt;
  let one ="Paris";
  let two = "48.85341:2.3488";
  let three = "";
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
    let myResponse = await fetch("/getGeo", postOpts); // get Geonames
    let json = await myResponse.json();
    let imgList =["./images/img5.jpg","./images/img6.jpg","./images/img7.jpg"];
    console.log(json);
    console.log(JSON.stringify(json));
    two = `${json.geonames[1].lat}:${json.geonames[1].lng}`;
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
    myResponse = await fetch("/getWeather", postOpts); // get weather based on lat lon from Geoname
    json = await myResponse.json();
    console.log(json);
    console.log(JSON.stringify(json));
    myResponse = await fetch("/getPics", postOpts);
    json = await myResponse.json();
    console.log(json);
    console.log(JSON.stringify(json));
    
   // myText.value = JSON.stringify(json);
    +alert(`API call succsessful`);
    AddSlides(imgList);
  } catch (error) {
    console.log("error", error);
    alert(`API call fail ${error}`);
  }
}

function handleSubmit(event) {
  //event.preventDefault();
 // console.log("check url put into the form field");

 // let urlText = document.getElementById("urlName").value;
 // const inputData = [urlText, false];
 // console.log(
//    "@@@@@@@@@@@@@@@@@@@@@@  Botton clcik to call namechecker  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
 // );
 // if (Client.checkForName(inputData)) {
 //   console.log(
 //     "@@@@@@@@@@@@@@@@@@@@@@  calling API  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  //  );
    retrieveData('Paris');
 // } else {
 //   alert(`API call canceled`);
  //}
}

export { handleSubmit, retrieveData, AddSlides, showSlides, currentSlide, changeSlide };
