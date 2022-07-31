const openButton = document.getElementById("menu-open");
const button = document.getElementById("button");
const navigation = document.getElementById("navigation");

openButton.style.display = "block";

let opened = false;

button.addEventListener("click", () => {
	
	if (opened) {
		opened = false;
		openButton.innerText = "menu";
		navigation.style.display = "none";
	} else {
		opened = true;
		openButton.innerText = "close";
		navigation.style.display = "flex";
	}

	

});


window.addEventListener('load', () => {

	const API_KEY = '5008278ea29e79049769668cd1e80a01';
	const temperatureValue = document.getElementById('temperature-value');
	const temperatureDescription = document.getElementById('temperature-description');
	const location = document.getElementById('location');
	const windSpeed = document.getElementById('wind-speed');
	let language = 'es';

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;

			const url = `
				https://api.openweathermap.org/
					data/
						2.5/
							weather?
								lat=${latitude}
								&lon=${longitude}
								&lang=${language}
								&units=metric
								&appid=${API_KEY}
			`;

			fetch(url)
				.then(response => response.json())
				.then(data => {
					let _location = data.name;
					let _temperature = data.main.temp;
					let _description = data.weather[0].description;
					let _windSpeed = data.wind.speed;

					temperatureValue.textContent = `${_temperature} °C`;
					temperatureDescription.textContent = `${_description}`;
					location.textContent = `${_location}`;
					windSpeed.textContent = `${_windSpeed} m/s`;
				})
				.catch(error => {
					console.log(error);
				});
		});
	}
});