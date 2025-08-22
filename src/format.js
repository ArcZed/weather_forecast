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
        this.cloud = `${data.cloudcover}%`;
        
        this.date = new Date(data.datetime).toLocaleDateString("en-UK", {day: "numeric", month: "numeric"});
        this.desc = data.description;
        this.humidity = `${data.humidity}%`;
        this.snow = `${data.snow} cm`;
        this.temp = `${data.temp}°C`;
        this.wind = `${data.windspeed} km/h`;

        this.icon = data.icon
    }

    get img() {
        return import(`./weatherSVG/${this.icon}.svg`)
        .then((response) => {
            return response.default;
        })
    }

    
}

export {WeekData, DayData}