import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Karaganda&lang=ru&appid=5da6ce51f0238721dd74d4472a9d2b9d'
    )
      .then((response) => response.json())
      .then(({ name, main, weather }) => {
        setCity(name);
        setTemperature(Math.round(main.temp / 10)); // Сервер почему то неправильно показывает мой город (умножает на 10)
        setWeather(weather[0].description);
      });
  }, []);
  return (
    <footer className={className}>
      <div className="footer-content">
        <div>
          <div>Сервис бронирования отелей EasyStay</div>
          <div>easystay.kz</div>
        </div>
        <div>
          <div>
            {city},{' '}
            {new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
          </div>
          <div>
            {temperature} градусов, {weather}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = styled(FooterContainer)`
  background-color: #7fc7af;
  margin-top: 40px;

  & .footer-content {
    width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    height: 120px;
    padding: 20px 0;
  }
`;
