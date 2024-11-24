const api_key = 'bd930d715b97434ebf5202958243010'

const update = document.getElementById('update');

function getClima() {
    const latitudDecimal = document.getElementById('latitud').value;
    const longitudDecimal = document.getElementById('longitud').value;
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=
    ${latitudDecimal},${longitudDecimal}&aqi=no`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const climaContainer = document.getElementById('clima');
        console.log(data)
        climaContainer.innerHTML = `
            <h2>El clima en ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
            <p>Hora: ${data.location.localtime}</p>
            <p>Temperatura: ${data.current.temp_c}</p>
            <p>Condición: ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}">
        `

    })
    .catch(error => {
        console.error(error)
    })
}

function getCurrentPositionClima(latitud, longitud) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=
    ${latitud},${longitud}&aqi=no`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const climaContainer = document.getElementById('clima');
        console.log(data)
        climaContainer.innerHTML = `
            <h2>El clima en ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
            <p>Hora: ${data.location.localtime}</p>
            <p>Temperatura: ${data.current.temp_c}</p>
            <p>Condición: ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}">
        `

    })
    .catch(error => {
        console.error(error)
    })
    
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            getCurrentPositionClima(latitud, longitud);
        }, error => {
            console.error('Error al obtener la ubicación', error)
            alert('No hemos podido obtener su ubicación');
            new Notification('No hemos podido obtener su ubicación');
        });
    }
}
window.onload = getLocation;
update.addEventListener('click',getClima);