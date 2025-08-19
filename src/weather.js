let key = "Z264L688M27C4KGK7AFYHF9LG";//please don't mess with it D:
import {WeekData, DayData} from "./format.js"

//fetch data from visualcrossing
async function getData (location, key) {
    let response;
    let data;

    data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
    ${location}/next7days?unitGroup=metric&key=${key}&contentType=json`);
    response = await data.json();

    return response;
   
}
//get input from user and create data obj for use
export async function getInput (location) {
    let data;

    
    try{
        //get input and fetch data from input
        data = await getData(`${location}`,key);
        console.log(data)
    }
    catch(error){
        console.log(error)
        return error
    }
        //process the data
        let weatherData =  new WeekData(data);
        let daysData = []
        weatherData.days.forEach((day,index) => {
            daysData.push(new DayData(weatherData.days[index])) 
            
        })
        let dayData = daysData[0]
        console.log(dayData)

        // console.log(dayData.img = dayData.icon)

        return {weatherData, daysData, dayData}
}
