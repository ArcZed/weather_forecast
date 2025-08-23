class WeekData  {
    
    constructor(data){
        this.img = [];
        this.address = data.resolvedAddress;
        this.timezone = data.timezone;
        this.weekDesc = data.description;
        this.days = data.days;
    }
    
}

class DayData {
    constructor(data){
        this.datetime = data.datetime
        this.cloud = `${data.cloudcover}%`;
        this.date = new Date(data.datetime).toLocaleDateString("en-UK", {day: "numeric", month: "numeric"});
        this.desc = data.description;
        this.humidity = `${data.humidity}%`;
        this.snow = `${data.snow} cm`;
        this.temp = `${data.temp}°C`;
        this.wind = `${data.windspeed} km/h`;
        this.icon = data.icon;
        this.feelLike = data.feelslike;
        this.sunrise = data.sunrise.split("").splice(0, 5).join("");
        this.sunset = data.sunset.split("").splice(0, 5).join("");
    }
    

    get img() {
        return import(`./weatherSVG/${this.icon}.svg`)
        .then((response) => {
            return response.default;
        })
    }

    
}

export {WeekData, DayData}