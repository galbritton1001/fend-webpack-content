async function retrieveData(urlTxt) {
  //const one = `https://www.bbc.com/future/article/20210309-why-some-people-can-deal-with-the-cold?utm_source=pocket-newtab`;
  const one = urlTxt;
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

  try {
    console.log(postOpts);

    const myResponse = await fetch("/myApiReq", postOpts);
    const json = await myResponse.json();
    console.log(json);
    const myText = document.getElementById("apiResult");
    console.log(JSON.stringify(json));
    myText.value = JSON.stringify(json);
    +alert(`API call succsessful`);
  } catch (error) {
    console.log("error", error);
    alert(`API call fail ${error}`);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  console.log("check url put into the form field");

  let urlText = document.getElementById("urlName").value;
  const inputData = [urlText, false];
  console.log(
    "@@@@@@@@@@@@@@@@@@@@@@  Botton clcik to call namechecker  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  );
  if (Client.checkForName(inputData)) {
    console.log(
      "@@@@@@@@@@@@@@@@@@@@@@  calling API  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    );
    retrieveData(urlText);
  } else {
    alert(`API call canceled`);
  }
}

export { handleSubmit, retrieveData };
