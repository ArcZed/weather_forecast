import styles from "../src/styles.css"

let APIKey = "Z264L688M27C4KGK7AFYHF9LG";
let mylocation = "10.923128, 106.774119";


//fetch data from visualcrossing
async function getData (location, key) {
    const data = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${location}/tomorrow?unitGroup=metric&key=${key}&contentType=json`)
    
    let jsonData = await data.json();
    return jsonData;
}
//process data for necessary info
function getInfo (data) {
    console.log(data)
    let timezone = data.timezone;
    
    let condition = data.days[0].conditions;
    let date = data.days[0].datetime;
    let descr = data.days[0].description;
    let cloud = data.days[0].cloudcover;
    let hours = data.days[0].hours;
    let icon = data.days[0].icon;
    let temp = data.days[0].temp;
    return {timezone,condition,date,descr,cloud,hours,icon,temp}
}

//get input from user and create data obj for use
async function getInput () {

    //get input and fetch data from input
    // let location = prompt("Where are you");
    let data = await getData(mylocation,APIKey);

    //process the data
    let weatherData 
    weatherData = getInfo(data);
    console.log(weatherData);

}



getInput()