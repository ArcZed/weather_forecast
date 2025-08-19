import { getInput } from "./weather";


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

    let wDesc = document.querySelector(".wDesc");
    let wWrapper = document.querySelector(".week-wrapper");
    console.log(data)

    //generate info for the day
    const generateDayCard = (dayData) => {

        let icon = document.createElement("img")
            infoIcon.appendChild(icon);
            dayData.img.then((src)=> {
                icon.setAttribute("src", src);
        })
        let dayDisplayProp = 
        [   "temp"    ,   "humidity", 
            "wind"    ,   "snow"    ]

        for (let i = 0; i < dayDisplayProp.length; i++){

            let card = document.createElement("div");
            let stat = document.createElement("div");

            dayWrapper.appendChild(card);
            card.classList.add("card");
            switch (dayDisplayProp[i]) {
                case "temp":
                    card.textContent = "Temperature";
                    stat.textContent = dayData.temp;
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
        days.forEach((day) => {
            let card = document.createElement("div");
            wWrapper.appendChild(card);
            card.classList.add("weekCard");
            card.textContent = day.date
            
            let icon = document.createElement("img");
            card.appendChild(icon)
            day.img.then((src) => {
                icon.setAttribute("src", src);
            })

            card.addEventListener("click", (e) => {
                infoIcon.innerHTML = ""
                dayWrapper.innerHTML = "";
                dayDesc.textContent = day.desc;
                generateDayCard(day);
            })
        })

    }

    //populate
    if (!isError){
        //generate base info
        location.textContent = week.address;
        date.textContent = day.date
        //generate cards
        infoIcon.innerHTML = ""
        dayWrapper.innerHTML = "";
        dayDesc.textContent = day.desc;
        generateDayCard(day);
        //gen week nav
        wWrapper.innerHTML = "";
        wDesc.textContent = week.weekDesc;
        generateWeekNav();
    }
    

    

}

export function handleInput () {

    let input = document.querySelector("input");
    let submitBtn = document.querySelector(".submit");
    let body = document.querySelector("body")

    let locationInput
    let data

    let defaultIndex = 0;

    //create clock 
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

    //set background
    let bg = ["dawn", "noon", "sunset", "night"];
    
    bg.forEach((time) => {
        import(`./background/${time}.png`).then((response) => {
            console.log(response.default)
            body.style.backgroundImage = `url(${response.default})`
        })
    })
    

    //handle input
    input.addEventListener("keyup", () => {
        locationInput = `${input.value}`;
        console.log(locationInput);
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