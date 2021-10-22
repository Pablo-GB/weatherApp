const axios = require("axios")
const API_KEY = "b02eb56c2c727822c5d9c24628b13beb"
const Weather = require("../model/Weather")

exports.renderHomePage = (req, res) => {
    res.render("index")

}

exports.renderAbout = (req, res) => {
    res.render("about")

}


exports.getWeather = (req, res) => {
    const city = req.body.city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    
    const weather = new Weather(req.body.city)
    weather.validateUserInput()
    
    if(weather.errors.length){
        res.render("index",{
            error:weather.errors.toString()
        })

    }
    else{
        axios.get(url).then((response) => {

            const { temp: temperature } = response.data.main
            const { name: location } = response.data

            res.render("index", {
                weather : `It is currently ${temperature}°C in ${location}.`
            })
    
    
    
        }).catch((error) => {
            res.render("index", {
                error: "City not found"
            })
        

    })

    }
}