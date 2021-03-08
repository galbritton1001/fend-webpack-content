async function handleSubmit(event) {
    event.preventDefault()
        const myurl = `https://api.meaningcloud.com/sentiment-2.1?key=f450e24343025f4e5ce1aa0c97f6cd1d&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`;
        //get weather data from api
        const response = await fetch(myurl);
        try {
          //const myweather = await response.json();
          //const ztemp = myweather.main.temp;
          //const zdate = dateTimeStamp();
          //const ztext = document.getElementById("feelings").value;
          //const mydata = { ztemp, zdate, ztext };
          //sendToServer(mydata);
        } catch (error) {
          console.log("error", error);
        }
      
}


export { handleSubmit }
