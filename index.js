const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
const {showLocalTime, showLocalDate, extractDailyData} = require('./helpers');
const dotenv = require('dotenv');

// tells dotenv where the variables are
dotenv.config({path: './.env'});

const key = process.env.KEY;

const viewsPath = path.join(__dirname, "/views");
const partialPath = path.join(__dirname,"views/inc");
console.log(partialPath)
const publicDirectory = path.join(__dirname, "/public");

app.set("view engine", "hbs");

app.set("views", viewsPath);

hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", async (req, res) => {
    
    try {

        const weatherApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city},,${req.body.country}&appid=${key}&units=metric`)

        // console.log(weatherApi.data)

        let localTime  = showLocalTime(weatherApi.data.dt,weatherApi.data.timezone);

        let sunrise = showLocalTime(weatherApi.data.sys.sunrise, weatherApi.data.timezone);

        let sunset = showLocalTime(weatherApi.data.sys.sunset,weatherApi.data.timezone)
    
        res.render("index", {
            imageIcon: weatherApi.data.weather[0].icon,
            city: weatherApi.data.name,
            country: weatherApi.data.sys.country,
            temperature: weatherApi.data.main.temp, 
            feels_like: weatherApi.data.main.feels_like,
            wind_speed: weatherApi.data.wind.speed,
            weather: weatherApi.data.weather,
            sunrise: sunrise, 
            sunset: sunset,
            localTime: localTime,
        })

    } catch (error) {

        console.log(error);
        res.render("404")
    }
    
});

app.get("/Sydney", async (req, res) => {

    const lat = -33.8688;
    const long = 151.2093;
    
    try {
    
        const weatherInfoApi = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&units=metric&appid=${key}`);

        console.log(weatherInfoApi.data)

        const localTime = showLocalTime(weatherInfoApi.data.current.dt, weatherInfoApi.data.timezone_offset);

        const sunriseToday = showLocalTime(weatherInfoApi.data.current.sunrise, weatherInfoApi.data.timezone_offset);

        const sunsetToday = showLocalTime(weatherInfoApi.data.current.sunset, weatherInfoApi.data.timezone_offset)

        const dailyInfo = extractDailyData(weatherInfoApi.data.daily, weatherInfoApi.data.timezone_offset, showLocalDate, showLocalTime)

        res.render("Sydney", {
                latitude: weatherInfoApi.data.lat,
                longitude: weatherInfoApi.data.lon,
                localTime: localTime,
                sunriseToday: sunriseToday,
                sunsetToday: sunsetToday,
                currentTemp: weatherInfoApi.data.current.temp,
                currentFeelsLike: weatherInfoApi.data.current.feels_like, 
                currentHumidity: weatherInfoApi.data.current.humidity,
                currentWeather: weatherInfoApi.data.current.weather[0].description,
                currentWeatherIcon: weatherInfoApi.data.current.weather[0].icon,
                daily: dailyInfo
            }
        )

    } catch (error) {

        console.log(error);
        res.render("404")

    }
});

app.get("/7Days", (req, res) => {
    res.render("7Days")
});

app.post("/7Days", async (req, res) => {

    try {

        const weatherApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city},,${req.body.country}&appid=${key}&units=metric`);

        const lat = weatherApi.data.coord.lat;
        const lon = weatherApi.data.coord.lon;

        const sevenDayApi = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${key}`);


        const localTime = showLocalTime(sevenDayApi.data.current.dt, sevenDayApi.data.timezone_offset);

        const sunriseToday = showLocalTime(sevenDayApi.data.current.sunrise, sevenDayApi.data.timezone_offset);

        const sunsetToday = showLocalTime(sevenDayApi.data.current.sunset, sevenDayApi.data.timezone_offset)

        const dailyInfo = extractDailyData(sevenDayApi.data.daily, sevenDayApi.data.timezone_offset, showLocalDate, showLocalTime)

        console.log(weatherApi.data)
        res.render("7Days", {

                city: weatherApi.data.name,
                country: weatherApi.data.sys.country,
                latitude: lat,
                longitude: lon,
                localTime: localTime,
                sunriseToday: sunriseToday,
                sunsetToday: sunsetToday,
                currentTemp: sevenDayApi.data.current.temp,
                currentFeelsLike: sevenDayApi.data.current.feels_like, 
                currentHumidity: sevenDayApi.data.current.humidity,
                currentWeather: sevenDayApi.data.current.weather[0].description,
                currentWeatherIcon: sevenDayApi.data.current.weather[0].icon,
                daily: dailyInfo
        });

    } catch (error) {

        console.log(error);
    }

});

app.get("*", (req, res) => {

    res.send("<h1> Sorry that page does not exist</h1>")
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});