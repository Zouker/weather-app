import React, {KeyboardEvent, useState} from 'react';
import {API, WeatherType} from './api/api';
import {Search} from './components/Search/Search';
import {AxiosResponse} from 'axios';
import styles from './App.module.css'

function App() {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState<AxiosResponse<WeatherType> | null>(null)

    const search = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            try {
                const data = await API.showWeather(city)
                setWeather(data)
            } catch (err) {
                console.log('err', err)
            }
        }
    }

    const dateBuilder = (d: Date) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={styles.app}>
            <div className={styles.search}>
                <Search
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    onKeyUp={search}
                />
            </div>
            {weather && (
                <div className={styles.wrapper}>
                    <div>{weather.data.name + ', ' + weather.data.sys.country}</div>
                    <div className={styles.date}>{dateBuilder(new Date())}</div>
                    <div className={styles.temp + ' ' + (Math.round(weather.data.main.temp) > 16 ? styles.warm : styles.cold)}>{Math.round(weather.data.main.temp)}°c</div>
                    <div>{weather.data.weather[0].main}</div>
                </div>
            )}
        </div>
    );
}

export default App;
