# Weather display: backend project accessing an external api using Axios, Express &  Handlebars

This was a CodeNation project to practise accessing an external api (https://openweathermap.org/api).  The backend used the Express web framework for Node.js.  The frontend used the Handlebars templating language.

## Project Brief

The project brief had three parts.

### Part one: weather webpage

The first part of the project brief was to create a homepage:

* a webpage with a form to input a city and country:
  - the backend code to use axios to call the openweathermap api and get current weather data about the city
  - this data to be displayed on the frontend
  - an icons provided by weathermap api also to be displayed on the frontend

### Part two: individual city weather webpage  

The second part of the project brief was to create a webpage about a particular city:

* a webpage displaying the current day's weather for a chosen city, plus weather information for the next 7 days.  I chose Sydney, Australia, having lived there a few years ago.  
    - the backend code to use axios to call the openweathermap api with the city's latitude & longitude to get:
     - current day's weather data 
     - weather information for the following 7 days 
    - this data (plus weather icons) to be displayed on the frontend

### Part three: weekly weather information page 

The third part of the project brief was to create a 7 days webpage:

* a 7 days webpage with a form to input a city and country:
    - the backend code to use axios to call the openweathermap api to get data about the inputted city, including the latitude & longitude
    - a second call to the openweathermap api using the latitude & longitude to get current weather data plus weather information for the following 7 days 
    - this data (plus weather icons) to be displayed on the frontend

## Issues and solutions 

Some issues I had and the solutions I came up with were:

* **Issue**: Different endpoints of the openweather api take either latitude and longitude or a city's name plus the ISO 3166 country code.  To use an input tag, the website user would need access to the ISO 3166 country code for the city they wanted to get weather information for.  
* **Solution**: I briefly considered a link to a website displaying the ISO 3166 country codes, or providing all the codes on the same or another page of the website. I decided to use a select tag and to populate the option tags with an array of country names and codes from an api enpoint from (https://restcountries.eu/).  I passed in the name property from each country in the countries array to the option tag.  The value of each optin tag was was the country's ISO 3166 code.  This value was then used in the subsequent call to the openweathermap api.

* **Issue** The openweathermap api displays times (for example of sunrise or sunset) for any particular city in UTC (Coordinated Universal Time). I wanted to display these times in local time.   
* **Solution** The api also returns the timezone for a particular location, as the shift in seconds from UTC.  I created some helper functions to calculate the local time and local date, so these could be displayed on the frontend.

One of my learning points for the project is:

* **Issue** To deal with the issue of country codes data not being returned from the  restcountries.eu api, I used variables passed to the handlebars files via the res.render() method.  I then used handlebars {{#if}} conditional helper to check if data was returned and display it in the select statment.  If not, an input box was rendered.  However, this would create the same issue that I had decided to deal with by having a select icon, i.e. that the website user would need to know the ISO 3166 country codes.

* **Solution** I removed the if/else logic and added a relevant message to the error page rendered from the catch block.

## Testing

I used Jest to test the helper functions.

## Dependencies

The dependencies for the project are:
  * express version 4.17.1
  * axios version 0.21.0
  * hbs (handlebars) version 4.1.1
  * nodemon version 2.0.6
  * dotenv version 8.2.0
  * jest version 26.6.3

## Final stage: styling and responsiveness

Once the functionality was working, I used a helpful website (https://coolors.co/) to help me come up with a colour scheme for the webpage.  

I then worked on styling the website and making it responsive to different screen sizes, using media queries where required.