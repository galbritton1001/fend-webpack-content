
function setMenuPage(pageIndex) {
  let i=0;
  let slides = document.getElementsByClassName("menuPage");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[pageIndex].style.display = "block";
}

function openWeather(event, pageIndex) {
  let i=0;
  let myTabs = document.getElementsByClassName("tabPage");
  let myTabBtn = document.getElementsByClassName("tabButton");
  for (i=0; i < myTabs.length; i++) {
    myTabs[i].style.display = "none";
    //myTabBtn[i].setAttribute("background-color", "rgb(221, 172, 221)");
    myTabBtn[i].className = myTabBtn[i].className.replace(" active", "");
  }
  myTabs[pageIndex].style.display = "block";
  //myTabBtn[pageIndex].setAttribute("background-color", "rgb(221, 172, 221)");
  //event.currentTarget.className += " active";
  myTabBtn[pageIndex].className += " active";

}

function isBtnOn(showBtn) {
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

function exitEdit(event){
  isBtnOn(false);
  console.log("Leaving Edit mode");
  let d=document.getElementById("inputToDo")
  d.name="";
  d.value="";
}


function delToDoItem(event) {
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

function setEdit(myindx) {
  console.log(`my index = `);
  console.log(myindx);
  let y = document.getElementById("inputToDo");
  console.log(y);
  console.log(myindx.id);
  console.log(myindx.innerHTML);
  myindx.setAttribute("style", "color: black;");
  y.name = myindx.id;
  y.value = myindx.innerHTML.trim();
  // don't forget to enable edit buttons set here
  isBtnOn(true);

  
}

function createToDo(event) {
  // check if input has name of checkbox label
  // true enables edit mode save or false will create new
  // list item
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
  let a=document.getElementsByClassName("toDoCheck");
  let b = document.getElementById("counterItem").innerHTML;
  let x=document.getElementById("toDoList");
  let y=document.createElement("input");
  y.setAttribute("type","checkbox");
  y.id=`check${b}`;
  y.classList.add("toDoCheck");
  y.value =false;
  console.log(y);
  x.appendChild(y);
  y=document.createElement("label");
  y.setAttribute("for",`check${b}`);
  y.id=`check${b}Label`;
  y.classList.add("checkBoxLabel");
  //y.innerHTML="    "+document.getElementById("inputToDo").value;
  y.innerHTML="    "+d.value;
  d.value="";
  y.setAttribute("onclick",`return Client.setEdit(${y.id})`);
  x.appendChild(y);
  y=document.createElement("br");
  y.id=`brcheck${b}`;
  x.appendChild(y);
  x=document.getElementById("toDo-container");
  x.scrollTop = 999999999;
  b++;
  document.getElementById("counterItem").innerHTML = b;
}

function newList(event) {
  console.log(" adding new list")
  let x=document.getElementById("counterItem");
  x.innerHTML="0";
  x=document.getElementById("toDo-container");
  x.setAttribute("style","display: block");
  x=document.getElementById("toDoInput-container");
  x.setAttribute("style","display: inline-block");
  x=document.getElementById("inputToDo");
  x.setAttribute("style","display: block");
  const myItems = document.getElementById("toDoList");
  while (myItems.firstChild) {
    myItems.removeChild(myItems.firstChild);}
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
export { checkForName, setMenuPage, checkKey, createToDo, setEdit, delToDoItem, exitEdit, newList, openWeather };
