import { styled } from 'styled-components';

const StyledComponent = styled.div`
  width: 560px;
  background-color: #60a5fa;
  border-radius: 10px;

  .locationSection {
    display: flex;
    flex-direction: column;
    padding: 18px 25px;
  }

  .temperatureWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .temperatureDetails {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .imageIcon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .currentTemperature {
    color: #feffff;
    font-size: 25px;
    font-weight: bold;
  }

  .locationName {
    color: #feffff;
    font-size: 24px;
    font-weight: bold;
  }

  .weatherDetails {
    display: flex;
    align-items: center;
    margin-top: 16px;
    justify-content: space-between;
    font-size: 14px;
  }

  .humiditySection {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 82px;
  }

  .attributeLabel {
    min-width: 56px;
    margin-right: 2px;
    margin-left: 2px;
    color: #dbeafe;
  }

  .uvIndexValue {
    color: #fff;
    font-size: 12px;
  }

  .windSection {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
  }

  .windSpeedLabel {
    color: #dbeafe;
  }

  .windSpeedValue {
    color: #feffff;
  }

  .cloudinessSection {
    display: flex;
    flex-direction: column;
  }

  .cloudinessLabel {
    color: #dbeafe;
  }

  .cloudinessValue {
    align-self: flex-start;
    color: #fff;
  }

  .uvIndexSection {
    display: flex;
    flex-direction: column;
  }

  .uvIndexLabel {
    margin-left: 2px;
    color: #dbeafe;
  }

  .uvIndexValue {
    color: #fff;
  }
`;

export default StyledComponent;
