import { AddSlides, saveTrip } from "./support.js";

window.onload = (event) => {
  console.log("set initial window");
  Client.getDestList();
  setMenu(0);
  setMidUpperLeft(false,0);
  document.getElementById("homeBtn").addEventListener("click", function() {return Client.setMenu(3);});
  document.getElementById("PlannerBtn").addEventListener("click", function() {return Client.setMenuPage(0);});
  document.getElementById("newsBtn").addEventListener("click", function() {return Client.setMenuPage(1);});
  document.getElementById("aboutBtn").addEventListener("click", function() {return Client.setMenuPage(2);});
  //document.getElementById("savesBtn").addEventListener("click", function() {return Client.setMenuPage(4);});
  document.getElementById("savesBtn").addEventListener("click", function() {return Client.setMenu(5);});
  document.getElementById("submitButton1").addEventListener("click", function() {return Client.handleSubmit(event);});
  document.getElementById("newToDo").addEventListener("click", function () {return Client.newList(event);});
  document.getElementById("eraseToDo").addEventListener("click", function () {return Client.eraseToDoList();});
  document.getElementById("saveToDo").addEventListener("click", function () {return Client.saveList();});
  document.getElementById("acceptBtn").addEventListener("click", function () {return Client.acceptDest(event);});
  document.getElementById("delToDoItem").addEventListener("click", function () {return Client.delToDoItem(event);});
  document.getElementById("exitEditMode").addEventListener("click", function () {return Client.exitEdit(event);});
  document.getElementById("tb1").addEventListener("click", function () {return Client.openWeather("0");});
  document.getElementById("tb2").addEventListener("click", function () {return Client.openWeather("1");});
  document.getElementById("tb3").addEventListener("click", function () {return Client.openWeather("2");});
  document.getElementById("listRecordStatus").addEventListener("change", function () {return Client.loadSaveDestList();});
  document.getElementById("recordStatus").addEventListener("change", function () {return Client.saveStatus(document.getElementById("recordStatus").value,document.getElementById("recordIdNumb").innerHTML);});
  document.getElementById("main-container").style.display="grid";
};

let defaultImgList = ["./images/img1.jpg","./images/img2.jpg","./images/img3.jpg","./images/img5.jpg","./images/img6.jpg","./images/img7.jpg"];

function setMidLow(pageIndx) { // show menu page for mid lower menu
  console.log("turning off menu pages")
  let a=document.getElementsByClassName("midLowerMenu");
  let b=0;
  for (b=0; b < a.length; b++) {
    console.log("display off "+b);
    console.log(a[b]);
    a[b].style.display="none";
  }
  if (pageIndx === "off") {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@ Lower Off @@@@@@@@@@@@@@@@@@@@@@@@@@@");
    return;
  }
  console.log("turning on selected Page"+pageIndx);
  a[pageIndx].style.display="block";
  console.log("leaving setMidLow");
}

function setMidUpLft(pageIndx) { // show menu page for mid upper menu

  let a=document.getElementsByClassName("menuPage");
  for (let b=0; b < a.length; b++) {
    a[b].style.display="none";
  }
  if (pageIndx === "off") {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ up left off @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    return;
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
  console.log("turn on midMidLw-section");
  let x= document.getElementById("midMidLw-section");
  if (myState) {
    setMidLow(myPage);
    x.style.display="block";
    console.log("leaving setMidLower");
  }
  else{
    x.style.display="none";
  }
}

function getToday(dateStyle) {
  if (dateStyle==="short") {
    let myDate = new Date();
    let x= myDate.getFullYear();
    let y= 1+myDate.getMonth();
    let z= myDate.getDate();
    if (y < 10) {y="0"+y;}
    if (z < 10) {z="0"+z;}
  return `${x}-${y}-${z}`;
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

  function setInputFields(pageIndx) {
    if (pageIndx===0) {
     document.getElementById("stateField").disabled=true;
     document.getElementById("stateLabel").style.color="grey";
     document.getElementById("dateField").value = getToday("short");
    }
  }

  function recStatusSet(myState) {
    console.log("made set record status = "+ myState)
    let x=document.getElementById("recordStatus");
    if (myState === "true") {
      console.log("true");
      x.style.display="block";
    }
    else {
     console.log("false");
     x.style.display="none"; 
    }
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

  function currentDest(myElem) {
    let x = document.getElementById("travelCity");
    let y = document.getElementById(myElem);
    let dest = y.innerHTML.split(":");
    x.innerHTML = dest[0];
    x = document.getElementById("travelAdmin");
    x.innerHTML=dest[1];
    x = document.getElementById("travelCountry");
    x.innerHTML=dest[2];
    x = document.getElementById("travelLat");
    x.innerHTML=dest[3]+":"+dest[4];
    x = document.getElementById("travelLon");
    x.innerHTML=dest[5]+":"+dest[6];
    x = document.getElementById("travelDatex");
    console.log(x);
    x.innerHTML="Travel on "+document.getElementById("dateField").value;
    setColor(y.id,true);
  }

//sets display page states and data entry 
function setMenu(menuIndex) { 
  console.log("set menu state "+menuIndex);
  if (menuIndex===0) { // clear mid-section 
    console.log("executing menu 0"); 
  clearDestList(); 
  isBtnOn(false);
  recStatusSet("false");
  clearToDoList();
  clearWeather();
  defaultImageList();
  clearInputFields();
  setMidUpperRight(false);
  setRightState(false);
  setMidLower(false,0);
  setInputFields(0);
  
  }
  else {
    if (menuIndex===1){  // display toDo 
      console.log("executing menu 1");
      let x=document.getElementById("toDo-container");
      x.style.display="block";
      x=document.getElementById("toDoInput-container");
      x.style.display="block";
      x=document.getElementById("inputToDo");
      x.style.display="block";
    }
    else {
      if (menuIndex===2) {  // display destination list 
        console.log("executing menu 2");
        setMenuPage(3);
        setMidUpperLeft(true,3);
        setRightState(true);
        setMidUpperRight(true);
        setMidLower(true,1);
        rotateBtn("acceptBtn");
        //Test data remove for final @@@@@@@@@@@@@
        console.log("creating dest list");  // creating test list
        let x=document.getElementById("destList");
        for (let a=0; a < 10; a++) {
          console.log( `@@@ ${a} @@@@`);
          let y=document.createElement("li");
          y.id="dest"+a;
          y.innerHTML=`MyCity ${a}:MyState:MyCountry:lat:00000:lon:11111`;         
          y.classList.add("travelDest");
          y.addEventListener("click", function () {currentDest("dest"+a);});
          console.log(y);
          x.appendChild(y); 
        }
        // Test data end @@@@@@@@@@@@@ 
        currentDest("dest0");
                 
        


      }
      else {
        if (menuIndex === 3) {
          console.log("executing menu 3");
          setMenu(0);
          setMidUpperLeft(false,0);
          setMidUpLft("off");
        }
        else {
          if (menuIndex === 4) {
            setMidLower(true,2);
            setMenu("1");

            
          }
          else {
            if (menuIndex === 5) {
              document.getElementById("recordStatus").selectedIndex = 0;
              Client.loadSaveDestList();
              setMidUpperLeft(true,4);

            }
            else {
              if (menuIndex === 6){
                setMidUpperLeft(true,3);
                setRightState(true);
                setMidUpperRight(true);
                recStatusSet(true);
              }
            }
          }
        }
      }
    }
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
function openWeather(pageIndex) { 
  console.log("made open weather index "+pageIndex)
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



function rotateBtn(btnName) {
  console.log("btnName = "+btnName);
  let a= document.getElementById("acceptBtn");
  a.style.display="none";
  a= document.getElementById("newToDo");
  a.style.display="none";
  a= document.getElementById("eraseToDo");
  a.style.display="none";
  a= document.getElementById(btnName);
  console.log(a);
  a.style.display="block";
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

function enableButton (myElem, statusFlg) {
  let x = document.getElementById(myElem);
  console.log("reached enable button "+myElem+" status flag "+statusFlg)
  if (statusFlg) {
    x.disabled = false;
  }
  else{
    x.disabled = true;
  }
  console.log(x.disabled);
}

//function enableToDoSave(statusFlg) {
 // let x = document.getElementById("saveToDo");
 // console.log("reached enable todo status flag "+statusFlg)
//  if (statusFlg) {
//    x.disabled = false;
//  }
 // else{
 //   x.disabled = true;
//  }
 // console.log(x.disabled);
//}

function toggleCheckbox(checkIndex) {
  console.log(checkIndex);
  let x = document.getElementById(checkIndex);
  console.log("Toggle Checkbox old value = "+x.value);
  if (x.value==="true") {
    console.log(`changing ${checkIndex} from true to false`);
    x.value = false;
  }
  else{
    console.log(`changing ${checkIndex} from false to true`);
    x.value = true;
  }
  console.log("Toggle Checkbox new value = "+x.value);
  enableButton("saveToDo",true);
  
}
// save toDo button clicked. Saves toDo list 
function saveList() {
  enableButton("saveToDo",false);
  let myBoxData = [];
  let myLabelData = [];
  let recId = document.getElementById("recordIdNumb").innerHTML; 
  let x = document.getElementsByClassName("toDoCheck");
  let y = document.getElementsByClassName("checkBoxLabel");
  for (let a=0; a < x.length; a++) {
    console.log(x);
    console.log(y);
    console.log(x[a].value);
    console.log(a);
    myBoxData.push(x[a].value);
    myLabelData.push(y[a].innerHTML);
  }
  let toDoRec = {recId,myBoxData,myLabelData};
  console.log(myBoxData);
  console.log(myLabelData);
  return Client.saveToDoList(toDoRec);


}

function eraseToDoList() {
clearToDoList();
setMenu(4);
setMidLower(true,0);
rotateBtn("newToDo");
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
  enableButton("saveToDo",true);
}

// label color reset and set click color
function setColor(myElm,setClick) {
  let myElem=document.getElementById(myElm);
  console.log("@@@@@@@@@@@@@@i came from "+myElem);
  //console.log(event.target);
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
   console.log(" entering setclick");
  console.log(myElem);
  //x=document.getElementById(myElem.id);
  x=document.getElementById(myElem.id);
  //x.setAttribute("style", "color: white;");
  x.style.color="white";
  console.log("leaving setclick");
 }
}

function setCitySearch(event,myElem) {
 //setColor(event,myElem,true);
 // check if city and state the same
 
}

function acceptDest(event) { 
  setMenu(4);
  document.getElementById("recordStatus").selectedIndex = 0;
  recStatusSet("true");
  setMidLow("off");
  rotateBtn("newToDo");
  saveTrip();

}

 
function setEdit(myinx) {  // turn on ToDo edit when label is clicked
  
  //console.log(event);
  //setColor(event, myindx, true);

  setColor(myinx, true);
  console.log(myinx);
  let y = document.getElementById("inputToDo");
  console.log(y);
  //x=document.getElementById(myindx);   // addeventlistner
  let myindx = document.getElementById(myinx);
  console.log(`&&&&&&&&&&&&&&&&&&&&&&& my index = `+myindx);
  console.log(myindx);
  console.log(myindx.innerHTML);
  //myindx.setAttribute("style", "color: black;");
  y.name = myindx.id;
  //y.name = myindx;
  y.value = myindx.innerHTML.trim();
  //y.value = x.innerHTML;
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
  y.addEventListener("click", toggleCheckbox.bind(null,y.id));
  console.log(y);
  x.appendChild(y);
  y=document.createElement("label");   // create a label and assign to checkbox
  y.setAttribute("for",`check${b}`);
  y.id=`check${b}Label`;
  y.classList.add("checkBoxLabel");
  //y.innerHTML="    "+document.getElementById("inputToDo").value;
  y.innerHTML="    "+d.value;
  d.value="";
  console.log("@@@@@@@@@@@@@@@"+y.id);
  //y.setAttribute("onclick",`return Client.setEdit(event,${y.id})`);  // create an event handler for label
  //y.setAttribute("onclick",`return Client.setEdit(${y.id})`);  // create an event handler for label
  y.addEventListener("click", setEdit.bind(null,y.id));

  console.log(" appending label event listener");
  x.appendChild(y);
  console.log(" thru checkbox and label loop");
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
  
  
  //x=document.getElementById("toDo-container");
  //x.setAttribute("style","display: block");
  //x=document.getElementById("toDoInput-container");
  //x.setAttribute("style","display: inline-block");
  //x=document.getElementById("inputToDo");
  //x.setAttribute("style","display: block");
  const myItems = document.getElementById("toDoList");
  while (myItems.firstChild) {
    myItems.removeChild(myItems.firstChild);}
  setMidLower(true,2);
  setMenu(1);
  rotateBtn("eraseToDo");
  console.log("completed newlist");

}

function checkKey(event,srcIndex) {
  console.log(event.keyCode);
  console.log("i came from");
  console.log(event.target);
  if (event.keyCode === 13) { 
    if (srcIndex === 0){
    createToDo(event);
    enableButton("saveToDo",true);
    }
  }
}

function isUs(event) {
  if (document.getElementById("countryField").value === "United States") {
    document.getElementById("stateField").disabled = false;
    document.getElementById("stateLabel").style.color="black";
  }else {
    document.getElementById("stateField").value="";
    document.getElementById("stateField").disabled = true;
    document.getElementById("stateLabel").style.color="grey";
  }
}

export { setMenuPage, checkKey, createToDo, setEdit, delToDoItem, isUs, setMenu, acceptDest };
export { exitEdit, newList, openWeather, setMidLower, setRightState, setMidUpperRight, setMidUpperLeft, eraseToDoList, saveList, rotateBtn };
