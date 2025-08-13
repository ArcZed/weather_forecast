let APIKey = "Z264L688M27C4KGK7AFYHF9LG";
//fetch data from visualcrossing
async function getData (location, key) {
    let response;
    let data;
    try {
        data = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${location}/tomorrow?unitGroup=metric&key=${key}&contentType=json`)
        response = await data.json();
    }
    catch (error){   
        console.log(error,"run");
        response = error
        throw error
    }
    

    
    return response;
   
}
//process data for necessary info
function getInfo (data) {
    console.log(data)
    let address = data.resolvedAddress;
    let timezone = data.timezone;
    
    let condition = data.days[0].conditions;
    let date = data.days[0].datetime;
    let descr = data.days[0].description;
    let cloud = data.days[0].cloudcover;
    let hours = data.days[0].hours;
    let icon = data.days[0].icon;
    let temp = data.days[0].temp;
    return {timezone,address,condition,date,descr,cloud,hours,icon,temp}
}

//get input from user and create data obj for use
export async function getInput (location) {

    let data;
    
    try{
        //get input and fetch data from input
        // ${locationInput}
        data = await getData(`${location}`,APIKey);
        
    }
    catch(error){
        console.log(error)
        return error
    }
        
        //process the data
        let weatherData 
        weatherData = getInfo(data);
        
      
        return weatherData
}
