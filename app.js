


window.addEventListener('load', () => {

    const API_KEY = '5008278ea29e79049769668cd1e80a01';
    const temperatureValue = document.getElementById('temperature-value');
    const temperatureDescription = document.getElementById('temperature-description');
    const location = document.getElementById('location');
    const icon = document.getElementById('weather-icon');
    const windSpeed = document.getElementById('wind-speed');
    let language = 'es';
    let city = 'Lima';

    if(navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language}&units=metric&appid=${API_KEY}`

            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&units=metric&appid=${API_KEY}`;
            

            // console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let _location = data.name;
                    let _temperature = data.main.temp;
                    let _description = data.weather[0].description;
                    let _windSpeed = data.wind.speed;
                    let weatherStatus = data.weather[0].main;

                    temperatureValue.textContent = `${_temperature} °C`;
                    temperatureDescription.textContent = `${_description}`;
                    location.textContent = `${_location}`;
                    windSpeed.textContent = `${_windSpeed}`;

                    switch(weatherStatus) {
                        case 'Clear':
                            icon.src = 'https://img.icons8.com/material/24/000000/sun--v1.png';
                            console.log('Despejado');
                            break;
                        case 'Drizzle':
                            icon.src = 'https://img.icons8.com/material/24/000000/light-rain.png';
                            console.log('Lluvia ligera')
                            break;
                        case 'Rain':
                            icon.src = 'https://img.icons8.com/material-outlined/24/000000/rain--v1.png'
                            console.log('Lluvia');
                            break;
                        case 'Snow':
                            icon.src = 'https://img.icons8.com/material-outlined/24/000000/rain--v1.png'
                            console.log('Nieve')
                            break;
                        case 'Atmosphere':
                            icon.src = 'https://img.icons8.com/fluency-systems-regular/48/000000/clouds.png'
                            console.log('Atmosfera');
                            break;
                        case 'Clouds':
                            icon.src = 'https://img.icons8.com/material-outlined/24/000000/cloud--v1.png';
                            console.log('Nubes');
                            break;
                        default:
                            icon.src = '';
                            console.log('Por defecto');
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        });

    }

});