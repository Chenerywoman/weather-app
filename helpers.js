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

module.exports = {
    showLocalTime,
    showLocalDate,
    extractDailyData
}