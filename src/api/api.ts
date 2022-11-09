import axios from 'axios';

const instance = {
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
};

const key = '38ef0e33b65830218744e4085813df1f';
const axiosInstance = axios.create(instance);

export const API = {
    showWeather: (city: string) => {
        const query = `?q=${city}&appid=${key}&units=metric`
        return axiosInstance.get(instance.baseURL + query)
    }
};

export type WeatherType = {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string,
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number,
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number,
    },
    clouds: {
        all: number,
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    timezone: number,
    id: number,
    name: string,
    cod: number,
}