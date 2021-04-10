import { AddSlides } from "./formHandler.js";

let defaultImgList = ["./images/img1.jpg","./images/img2.jpg","./images/img3.jpg","./images/img5.jpg","./images/img6.jpg","./images/img7.jpg"];

function setMidLow(pageIndx) { // show menu page for mid lower menu
  let a=document.getElementsByClassName("midLowerMenu");
  let b=0;
  for (b=0; b < a.length; b++) {
    a[b].style.display="none";
  }
  a[pageIndx].style.display="block";
}

function setMidUpLft(pageIndx) { // show menu page for mid upper menu
  let a=document.getElementsByClassName("menuPage");
  let b=0;
  for (b=0; b < a.length; b++) {
    a[b].style.display="none";
  }
  a[pageIndx].style.display="block";
}


function setMidUpperLeft(myState,myPage) { // set display set for mid upper left
  let x= document.getElementById("midMidUl-section");
  if (myState) {
    setMidUpLft(myPage);
    x.style.display="block";
  }
  else{
    x.style.display="none";
  }

}

function setRightState(myState) {  // set display state for right
  let x=document.getElementById("midRight-section");
  if (myState) {
    x.style.display="flex";
  }
  else{
    x.style.display="none";
  }
}

function setMidUpperRight(myState) {
  let x=document.getElementById("midMidUR-section");
  if (myState) {
    x.style.display="block";
  }
  else{
    x.style.display="none";
  }  
}

function setMidLower(myState,myPage) { // set display state for mid lower
  let x= document.getElementById("midMidLw-section");
  if (myState) {
    setMidLow(myPage);
    x.style.display="block";
  }
  else{
    x.style.display="none";
  }
}

// Clear weather tabs
function clearWeather(){
  let x=document.getElementById("currForcast");
  while (x.firstChild) {
    x.removeChild(x.firstChild);}
  x=document.getElementById("extForcast");
  while (x.firstChild) {
    x.removeChild(x.firstChild);}
  x=document.getElementById("histForcast");
    while (x.firstChild) {
      x.removeChild(x.firstChild);}     
}
  // load the default image list into slideshow
  function defaultImageList() {
    AddSlides(defaultImgList);
  }

  function clearInputFields() {
    let x=document.getElementById("cityField");
    x.value = "";
    x=document.getElementById("stateField");
    x.value = "";
    x=document.getElementById("countryField");
    x.value = "";
  }

  function clearDestList() {
    let x=document.getElementById("destList");
    while (x.firstChild) {
      x.removeChild(x.firstChild);}
  }

  function clearToDoList() {
   let x=document.getElementById("inputToDo");
    x.setAttribute("display","none");
    x.name="";
    x.value="";
    x=document.getElementById("toDoList");
    while (x.firstChild) {
      x.removeChild(x.firstChild);}
    setMidLow(0);
  }



//sets display page states and data entry 
function setMenu(menuIndex) { 
  if (menuIndex===0) { // clear mid-section 
  clearDestList(); 
  isBtnOn(false);
  clearToDoList();
  clearWeather();
  defaultImageList();
  clearInputFields();
  setMidUpperRight(false);
  setRightState(false);
  setMidLower(false,0);
  }
  else
  if (menuIndex==1){ //display toDo multiple items note should only need toDo container come back and fix
    x=document.getElementById("toDo-container");
    x.setAttribute("style","display: block");
    x=document.getElementById("toDoInput-container");
    x.setAttribute("style","display: inline-block");
    x=document.getElementById("inputToDo");
    x.setAttribute("style","display: block");
  }
}

//
function setMenuPage(pageIndex) {
  //let i=0;
  setMenu(0);
  setMidUpperLeft(true,pageIndex);
  //let slides = document.getElementsByClassName("menuPage");
  //for (i = 0; i < slides.length; i++) {
  //  slides[i].style.display = "none";
 // }
 // if (pageIndex===0) {
 //   let x=document.getElementById("dateField");
 //   x.value = new Date();
 // }
 // slides[pageIndex].style.display = "block";
}

// Weather tab page controller
function openWeather(event, pageIndex) { 
  let i=0;
  let myTabs = document.getElementsByClassName("tabPage");
  let myTabBtn = document.getElementsByClassName("tabButton");
  for (i=0; i < myTabs.length; i++) {
    myTabs[i].style.display = "none";
    myTabBtn[i].className = myTabBtn[i].className.replace(" active", "");
  }
  myTabs[pageIndex].style.display = "block";
  myTabBtn[pageIndex].className += " active";
}



function isBtnOn(showBtn) {   // turn on/turn off ToDo list edit buttons
  let a=document.getElementById("delToDoItem");
  let b=document.getElementById("exitEditMode");
  if (showBtn) {
    console.log("turning edit buttons on");
    a.setAttribute("style", "display: block");
    b.setAttribute("style", "display: block");
  }
  else{
  console.log("turning edit buttons off");
  a.setAttribute("style", "display: none");
  b.setAttribute("style", "display: none");
  }
}

function exitEdit(event){  // exit ToDo edit mode
  isBtnOn(false);
  console.log("Leaving Edit mode");
  let d=document.getElementById("inputToDo");
  let a=d.name.slice(0,d.name.indexOf("L"));
  if (!!document.getElementById(a)) {
    document.getElementById(`${a}Label`).setAttribute("style", "color: none;");
  }
  d.name="";
  d.value="";
}


function delToDoItem(event) {  // Delete ToDo item from list
  console.log("Deleting Todo list item");
  let d=document.getElementById("inputToDo").name;
  let a=d.slice(0,d.indexOf("L"));
  let b=document.getElementById(d);
  let doc=document.getElementById("toDoList");
  doc.setAttribute("style", "display: none");
  b.parentNode.removeChild(b);
  b=document.getElementById(a);
  b.parentNode.removeChild(b);
  console.log(`br${a}`);
  b=document.getElementById(`br${a}`);
  doc.setAttribute("style", "display: block");
  b.parentNode.removeChild(b);
  exitEdit(event);
}

// label color reset and set click color
function setColor(event,myElem,setClick) {
  console.log("i came from");
  console.log(event.target);
  console.log(myElem.className); 
 let x=document.getElementsByClassName(myElem.className);
 console.log(x);
 let a=0;
 for (a=0; a < x.length; a++) {
   console.log(x[a]);
   x[a].setAttribute("style", "color: none;");
 }
 console.log("made it thru loop");
 if (setClick) {
  console.log(myElem.id);
  x=document.getElementById(myElem.id);
  x.setAttribute("style", "color: white;");
 }
}

function setCitySearch(event,myElem) {
 //setColor(event,myElem,true);
 // check if city and state the same
 
}

function setEdit(event,myindx) {  // turn on ToDo edit when label is clicked
  console.log(`my index = `);
  setColor(event, event.target, true);
  console.log(myindx);
  let y = document.getElementById("inputToDo");
  console.log(y);
  console.log(myindx.id);
  console.log(myindx.innerHTML);
  //myindx.setAttribute("style", "color: black;");
  y.name = myindx.id;
  y.value = myindx.innerHTML.trim();
  isBtnOn(true);

  
}

function createToDo(event) {
  // return key pressed in todo input
  // check if input has name of checkbox label 
  // true enables edit mode save or false will create new
  // list item
  console.log("made it to createToDo");  // edit mode for toDo item
  let d = document.getElementById("inputToDo");

    if (d.name !== "") {
      let myName=d.name.split(":");
      let e=document.getElementById(myName[0]);
      e.innerHTML = "    "+d.value;
      d.name="";
      d.value="";
      e.setAttribute("style", "color: black;");
      isBtnOn(false);
      return;
    }
    console.log("made it to createToDo not edit");  
  let a=document.getElementsByClassName("toDoCheck");   // create new todo
  let b = document.getElementById("counterItem").innerHTML; // get next item count
  let x=document.getElementById("toDoList");
  let y=document.createElement("input");   // create a checkbox
  y.setAttribute("type","checkbox");    
  y.id=`check${b}`;
  y.classList.add("toDoCheck");
  y.value =false;
  console.log(y);
  x.appendChild(y);
  y=document.createElement("label");   // create a label and assign to checkbox
  y.setAttribute("for",`check${b}`);
  y.id=`check${b}Label`;
  y.classList.add("checkBoxLabel");
  //y.innerHTML="    "+document.getElementById("inputToDo").value;
  y.innerHTML="    "+d.value;
  d.value="";
  y.setAttribute("onclick",`return Client.setEdit(event,${y.id})`);  // create an event handler for label
  x.appendChild(y);
  y=document.createElement("br");
  y.id=`brcheck${b}`;
  x.appendChild(y);
  x=document.getElementById("toDo-container");
  x.scrollTop = 999999999;
  b++;                                                  // inc and store next item count
  document.getElementById("counterItem").innerHTML = b;
}

function newList(event) {
  console.log(" adding new list");
  exitEdit();
  let x=document.getElementById("counterItem");
  x.innerHTML="0";
  setMidLow(2);
  setMenu(1);
  //x=document.getElementById("toDo-container");
  //x.setAttribute("style","display: block");
  //x=document.getElementById("toDoInput-container");
  //x.setAttribute("style","display: inline-block");
  //x=document.getElementById("inputToDo");
  //x.setAttribute("style","display: block");
  const myItems = document.getElementById("toDoList");
  while (myItems.firstChild) {
    myItems.removeChild(myItems.firstChild);}
    console.log("completed newlist");
}

function checkKey(event) {
  console.log(event.keyCode);
  console.log("i came from");
  console.log(event.target);
  if (event.keyCode === 13) { 
    createToDo(event);
  }
}

function checkForName(inputData) {
  console.log(inputData);
  let urlOk = new RegExp(`((http|https)://)(www.)`);

  if (inputData[1] === true) {
    console.log("0000000000000000000000000000000000000000");
    if (urlOk.test(inputData[0])) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log("11111111111111111111111111111111111");
    if (urlOk.test(inputData[0])) {
      if (
        confirm("You have entered what appears to be a valid URL continue ?")
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("222222222222222222222222222222222222222222222222222");
      if (
        confirm("You have entered what appears to be an invalid URL continue ?")
      ) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }
}
export { checkForName, setMenuPage, checkKey, createToDo, setEdit, delToDoItem };
export { exitEdit, newList, openWeather, setMidLower, setRightState, setMidUpperRight, setMidUpperLeft };
