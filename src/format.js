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
        this.wind = `${data.windspeed} k/m`;

        this.icon = data.icon
    }

    get img() {
        return import(`./weatherPNG/${this.icon}.png`)
        .then((response) => {
            console.log(response.default)
            return response.default;
        })
    }

    
}

export {WeekData, DayData}