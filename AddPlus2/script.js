document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');
    const timeDisplay = document.getElementById('city-time');
    const homeLink = document.getElementById('home-link');

    function updateTime(timezone) {
        const date = new Date();
        const options = {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    }

    function displayTime() {
        const selectedValue = citySelect.value;
        let timezone = '';
        let message = '';

        if (selectedValue === 'current-location') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
                        .then(response => response.json())
                        .then(data => {
                            const location = data.timezone;
                            message = `It is ${updateTime(location)} in your current location.`;
                            timeDisplay.textContent = message;
                        });
                });
            } else {
                message = 'Geolocation is not supported by this browser.';
                timeDisplay.textContent = message;
            }
        } else {
            timezone = selectedValue;
            message = `It is ${updateTime(timezone)} in ${timezone}.`;
            timeDisplay.textContent = message;
        }
    }

    citySelect.addEventListener('change', displayTime);
    homeLink.addEventListener('click', () => {
        citySelect.selectedIndex = 0;
        displayTime();
    });

    displayTime(); // Display the time for the default selected option
});
