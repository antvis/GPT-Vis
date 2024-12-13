import type { CodeBlockComponent } from '@antv/gpt-vis';
import React from 'react';
import StyledComponent from './style';

const WeatherCard: CodeBlockComponent = (props) => {
  const content = String(props.children).trim();
  const { locationName, temperature, humidity, wind, cloudiness, uv } = JSON.parse(content);

  return (
    <StyledComponent>
      <div className="locationSection">
        <div className="temperatureWrapper">
          <div className="temperatureDetails">
            <img
              src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1w1nS6N5McoAAAAAAAAAAAAADmJ7AQ/original"
              className="imageIcon"
            />
            <span className="currentTemperature">{temperature}°</span>
          </div>
          <span className="locationName">{locationName}</span>
        </div>
        <div className="weatherDetails">
          <div className="humiditySection">
            <span className="attributeLabel">Humidity</span>
            <span className="uvIndexValue">{humidity}%</span>
          </div>
          <div className="windSection">
            <span className="windSpeedLabel">Wind</span>
            <span className="windSpeedValue">{wind}kph</span>
          </div>
          <div className="cloudinessSection">
            <span className="cloudinessLabel">Cloudiness</span>
            <span className="cloudinessValue">{cloudiness}%</span>
          </div>
          <div className="uvIndexSection">
            <span className="uvIndexLabel">UV Index</span>
            <span className="uvIndexValue">{uv}</span>
          </div>
        </div>
      </div>
    </StyledComponent>
  );
};

export default WeatherCard;
