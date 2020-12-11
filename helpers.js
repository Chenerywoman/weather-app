const showLocalTime = (unixTime, utcShift) => {

    let currentTimeUnix  = unixTime + utcShift;
    let currentDate = new Date(currentTimeUnix * 1000);
    let currentHours = "0" + currentDate.getHours();
    let currentMinutes = "0" + currentDate.getMinutes();
    let currentTime = `${currentHours.substr(-2)}:${currentMinutes.substr(-2)}`;
    return currentTime;

}

const showLocalDate = (unixTime, utcShift) => {
    let currentTimeUnix  = unixTime + utcShift;
    let currentDate = new Date(currentTimeUnix * 1000);
    let dateFormated = currentDate.toDateString();
    return dateFormated;

}

const daily = [
    {
      dt: 1607648400,
      sunrise: 1607625465,
      sunset: 1607677156,
      temp: {
        day: 18.12,
        min: 16.32,
        max: 18.44,
        night: 17.38,
        eve: 18.25,
        morn: 16.82
      },
      feels_like: { day: 14.47, night: 13.82, eve: 14.17, morn: 13.08 },
      pressure: 1029,
      humidity: 70,
      dew_point: 12.74,
      wind_speed: 6.34,
      wind_deg: 150,
      weather:   [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
      clouds: 100,
      pop: 0.89,
      rain: 4.8,
      uvi: 3.18
    },
    {
      dt: 1607734800,
      sunrise: 1607711876,
      sunset: 1607763599,
      temp: {
        day: 17.12,
        min: 15.32,
        max: 17.44,
        night: 16.38,
        eve: 17.25,
        morn: 15.82
      },
      feels_like: { day: 15.47, night: 14.82, eve: 15.17, morn: 14.08 },
      pressure: 1030,
      humidity: 60,
      dew_point: 10.82,
      wind_speed: 6.49,
      wind_deg: 127,
      weather: [{ id: 501, main: 'Sun', description: 'moderate sun', icon: '10d' }],
      clouds: 44,
      pop: 0.51,
      rain: 1.19,
      uvi: 7.29
    },
    {
      dt: 1607821200,
      sunrise: 1607798289,
      sunset: 1607850041,
      temp: {
        day: 19.12,
        min: 17.32,
        max: 19.44,
        night: 18.38,
        eve: 19.25,
        morn: 17.82
      },
      feels_like: { day: 13.47, night: 14.82, eve: 13.17, morn: 12.08 },
      pressure: 1024,
      humidity: 72,
      dew_point: 14.71,
      wind_speed: 6.68,
      wind_deg: 102,
      weather: [{ id: 501, main: 'Cloud', description: 'cloudy', icon: '10d' }],
      clouds: 90,
      pop: 0.87,
      rain: 3.03,
      uvi: 7.29
    }
  ]

const extractDailyData = (dailyArray, utcShift, datefn, timefn ) => {

    return dailyArray.map((curr, ind, arr)=> {

       return {
            date: datefn(curr.dt, utcShift),
            sunrise: timefn(curr.sunrise, utcShift),
            sunset: timefn(curr.sunset, utcShift),
            mornTemp: curr.temp.morn,
            minDayTemp: curr.temp.min,
            maxDayTemp: curr.temp.max,
            eveTemp: curr.temp.eve,
            nightTemp: curr.temp.night,
            weather: curr.weather[0].description,
            weatherIcon: curr.weather[0].icon
        }

    });
}

let example = extractDailyData(daily, 39600, showLocalDate, showLocalTime);
console.log(example);

module.exports = {
    showLocalTime,
    showLocalDate,
    extractDailyData
}