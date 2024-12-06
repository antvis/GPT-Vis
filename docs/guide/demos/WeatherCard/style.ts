import { styled } from 'styled-components';

const StyledComponent = styled.div`
  width: 424px;
  padding: 2px;
  background-color: #60a5fa;

  .locationSection {
    display: flex;
    flex-direction: column;
    padding: 18px 18px 14px 10px;
    border-radius: 10px;
  }

  .temperatureWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 12px;
  }

  .temperatureDetails {
    display: flex;
    align-items: center;
    gap: 22px;
  }

  .imageIcon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .currentTemperature {
    color: #feffff;
    font-size: 28px;
    font-weight: bold;
  }

  .locationName {
    color: #60a5fa;
    font-size: 14px;
    font-weight: bold;
  }

  .weatherDetails {
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding-right: 2px;
    padding-left: 2px;
  }

  .humiditySection {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 82px;
    padding-right: 8px;
    padding-left: 2px;
  }

  .attributeLabel {
    min-width: 56px;
    margin-right: 2px;
    margin-left: 2px;
    background-color: #7fb6fb;
    color: #dbeafe;
    font-size: 12px;
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
    padding-right: 10px;
    padding-left: 4px;
  }

  .windSpeedLabel {
    color: #dbeafe;
    font-size: 14px;
  }

  .windSpeedValue {
    color: #feffff;
    font-size: 14px;
  }

  .additionalInfo {
    display: flex;
    margin-left: 2px;
    gap: 26px;
  }

  .cloudinessSection {
    display: flex;
    flex-direction: column;
    padding-right: 2px;
    padding-left: 2px;
  }

  .cloudinessLabel {
    color: #dbeafe;
    font-size: 12px;
  }

  .cloudinessValue {
    align-self: flex-start;
    color: #fff;
    font-size: 12px;
  }

  .uvIndexSection {
    display: flex;
    flex-direction: column;
    padding-right: 2px;
  }

  .uvIndexLabel {
    margin-left: 2px;
    color: #dbeafe;
    font-size: 12px;
  }

  .uvIndexValue {
    color: #fff;
    font-size: 12px;
  }
`;

export default StyledComponent;
