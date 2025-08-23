import { getInput } from "./weather";

const formatStr = (str) => {
            

    let strArr = str.split("-")[0].split("");
    //capitalize first letter
    let firstLet = str.split("-")[0].split("")[0].toUpperCase();
    strArr.splice(0,1, firstLet);
    //replace first word
    let forStr = str.split("-")
    forStr.splice(0, 1, strArr.join(""));

    return forStr.join(" ")
}

let isError = false;

function populateInput(data) {

    let week = data.weatherData;
    let day = data.dayData;
    let days = data.daysData

    let date = document.querySelector(".date");
    let location = document.querySelector(".location_info");
    let infoIcon = document.querySelector(".info_i");

    let dayWrapper = document.querySelector(".card-wrapper");
    let dayDesc = document.querySelector(".dayDesc");
    let curDay = document.querySelector(".currDay");

    let nav = document.querySelector(".nav")
    let wDesc = document.querySelector(".wDesc");
    let wWrapper = document.querySelector(".week-wrapper");
    let indicator = document.querySelector(".bar");
    console.log(data)

    //generate info for the day
    const generateDayCard = (dayData) => {

        let icon = document.createElement("img");
        let sun = document.createElement("div");
        let temp = document.querySelector(".temp");
        let feelLike = document.createElement("div");

        infoIcon.appendChild(icon);
        dayData.img.then((src)=> {
                icon.setAttribute("src", src);
        })

        sun.classList.add("sun")
        infoIcon.appendChild(sun);
        let sunrise = document.createElement("div");
        let sunset = document.createElement("div");
        let rise = document.createElement("div");
        let set = document.createElement("div");

        sun.appendChild(sunrise);
        sun.appendChild(rise);
        sun.appendChild(sunset);
        sun.appendChild(set);
        
        sunrise.textContent = `Sunrise:`;
        sunset.textContent = `Sunset: `;
        rise.textContent =  `${dayData.sunrise}`
        set.textContent = `${dayData.sunset}`

        temp.textContent = dayData.temp;
        temp.appendChild(feelLike);

        date.textContent = new Date(dayData.datetime).toLocaleDateString("en-UK", {weekday: "long", day: "numeric", month: "long"});

        feelLike.textContent = `Feels like: ${dayData.feelLike}`;

        let dayDisplayProp = 
        [   "cloud","humidity","wind","snow"    ]

        for (let i = 0; i < dayDisplayProp.length; i++){

            let card = document.createElement("div");
            let stat = document.createElement("div");

            dayWrapper.appendChild(card);
            card.classList.add("card");
            switch (dayDisplayProp[i]) {
                case "cloud":
                    card.textContent = "Cloud cover";
                    stat.textContent = dayData.cloud;
                    card.appendChild(stat);
                    continue;
                case "humidity":
                    card.textContent = "Humidity";
                    stat.textContent = dayData.humidity;
                    card.appendChild(stat);
                    continue;
                case "wind":
                    card.textContent = "Wind Speed";
                    stat.textContent = dayData.wind;
                    card.appendChild(stat);
                    continue;
                case "snow":
                    card.textContent = "Snow";
                    stat.textContent = dayData.snow;
                    card.appendChild(stat);
                    continue;
                default:
                    break;
            }
        }
    }

    const  generateWeekNav = () => {

        let card

        let pointer = document.createElement("div");

        indicator.appendChild(pointer)

        indicator.classList.add("wIndicator");
        pointer.classList.add("pointer");

        

        days.forEach((day, index) => {
            card = document.createElement("div");
            wWrapper.appendChild(card);
            card.classList.add("weekCard");
            card.textContent = day.date
            
            let icon = document.createElement("img");
            card.appendChild(icon)
            day.img.then((src) => {
                icon.setAttribute("src", src);
            })

            let desc = document.createElement("div");
            desc.classList.add("wcDesc");
            card.appendChild(desc);
            desc.textContent = formatStr(day.icon)
            console.log(formatStr(day.icon));
            

            card.addEventListener("click", () => {
                infoIcon.innerHTML = ""
                dayWrapper.innerHTML = "";
                dayDesc.textContent = day.desc;
                generateDayCard(day);
                movePointer(index)
            });   
        });

        const movePointer = (index) => {
            let cardWidth = window.getComputedStyle(card).width;
            pointer.style.width = cardWidth;
            pointer.style.marginLeft = `${parseFloat(cardWidth)*index}px`;
        }

        movePointer()
    }

    //icons touch ups
    let locIcon = document.querySelector(".ic");
    let locInfo = document.querySelector(".locInfo");
    //populate
    if (!isError){
        //generate base info
        curDay.style.visibility = "visible"
        locInfo.textContent = week.address;
        locIcon.classList.add("locIcon");
        //generate cards
        
        infoIcon.innerHTML = ""
        dayWrapper.innerHTML = "";
        dayDesc.textContent = day.desc;
        generateDayCard(day);
        //gen week nav
        indicator.innerHTML = "";
        wWrapper.innerHTML = "";
        wDesc.textContent = week.weekDesc;
        generateWeekNav();
    }
    

    

}

export function handleInput () {

    let input = document.querySelector("input");
    let submitBtn = document.querySelector(".submit");

    let locationInput
    let data

    let defaultIndex = 0;

    //create clock (ai code cause im lazy)
    function getTimezoneWithAbbreviation(date) {
        const fullTimezone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long' })
          .formatToParts(date)
          .find(part => part.type === 'timeZoneName')
          .value;
      
        const shortTimezone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
          .formatToParts(date)
          .find(part => part.type === 'timeZoneName')
          .value;
      
        return `${fullTimezone} (${shortTimezone})`;
      }

    
    function updateTime() {
        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        

        // Format with leading zeros
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');


        const timeString = `${hours}:${minutes}`;
        document.querySelector('.t').textContent = timeString;
        document.querySelector(".timezone").textContent = getTimezoneWithAbbreviation(now);
    }
    setInterval(updateTime, 1000); // Calls updateClock every second

    //handle input
    input.addEventListener("keyup", () => {
        locationInput = `${input.value}`;
    });

    window.addEventListener("keypress",async (event) =>{
        if(event.key === "Enter"){
            isError = false;
            data = await getInput(locationInput,defaultIndex);
            
            if (data.weatherData === undefined){//fix error condition
                alert("Please enter another location")
                isError = true;
            }
            populateInput(data)
        }
    })

    submitBtn.addEventListener("click",async () =>{
        isError = false;
        data = await getInput(locationInput,defaultIndex);

        if (data.weatherData.address === undefined){//fix error condition
            alert("Please enter another location");
            isError = true;
        }
        populateInput(data)
    })
}