let loc = document.querySelector('.city')
let temp = document.querySelector('.temp')
let desc = document.querySelector('.description')
let humidity = document.querySelector('.humidity')
let windSpeed = document.querySelector('.wind')
let div = document.querySelector('.search')
const userInput = document.querySelector('.searchbar')
const button = document.querySelector('button')

button.addEventListener('click',(e)=>{
    e.preventDefault()
    getWeather(userInput.value)
    userInput.value = ''
})

const getWeather = async (city) => {
    try{
        const res = await fetch(` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=17840b577100a8285053b1e172c01ada` , {mode : 'cors'})
        const weatherData = await res.json()
        const{feels_like} = weatherData.main
        const{id,main} = weatherData.weather[0]
        const{icon,description} = weatherData.weather[0]
        loc.textContent = "Weather in " + weatherData.name
        document.querySelector('.icon').src = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        temp.textContent = Math.round(feels_like-273) + "°C"
        desc.textContent = main
        humidity.textContent = "Humidity:  " + weatherData.main.humidity + "%"
        windSpeed.textContent = "Wind Speed:  " + weatherData.wind.speed + "km/h" 

    }catch(err){
        alert('City not found')
    }
}

window.addEventListener('load', ()=> {
    let long
    let lat
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude
            lat = position.coords.latitude

            const api =` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=17840b577100a8285053b1e172c01ada`  
            fetch(api,{mode : 'cors'})
                .then(res => res.json())
                .then(data=> {
                    const{name} = data
                    const{feels_like} = data.main
                    const{icon,main} = data.weather[0]

                    loc.textContent = "Weather in " + data.name
                    document.querySelector('.icon').src = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                    desc.textContent = main
                    temp.textContent = Math.round(feels_like - 273) + "°C"
                    humidity.textContent = "Humidity:  " + data.main.humidity + "%"
                    windSpeed.textContent = "Wind Speed:  " + data.wind.speed + "km/h"
                })
        })
    }
})