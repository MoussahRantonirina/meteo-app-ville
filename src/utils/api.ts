import axios from 'axios';

export const getCoordinates = async (city: string) => {
    const resp = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    if (resp.data.results && resp.data.results.length > 0) {
        const { latitude, longitude } = resp.data.results[0];
        return { latitude, longitude };
    }
    throw new Error('Ville non trouvée');
};

export const fetchWeatherByCity = async (city: string) => {
    const { latitude, longitude } = await getCoordinates(city);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,weathercode`;
    const resp = await axios.get(url);
    return resp.data;
};