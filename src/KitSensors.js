import React, { Component } from 'react';
import {
  FaBatteryEmpty, FaBatteryFull, FaBatteryHalf, FaBatteryQuarter, FaBatteryThreeQuarters,
  FaCloud,
  FaFlask,
  FaLightbulb,
  FaRegQuestionCircle,
  FaSun,
  FaThermometerEmpty, FaThermometerFull, FaThermometerHalf, FaThermometerQuarter, FaThermometerThreeQuarters,
  FaTint,
  FaVolumeDown, FaVolumeUp,
  FaWifi } from 'react-icons/fa';

class KitSensors extends Component{

  getBgColor(id, value){
    const ratio = value < 100 ? value/100 : 1;
    //return { backgroundColor: `rgb(${ratioToRGB(ratio).join(',')})` };

    //humid
    if (id === 5 || id === 13 || id === 56) { return this.evaluateColor(value, 16, 90); }
    // solar panel | light sensor
    if (id === 6 || id === 11 || id === 14 || id === 18) { return this.evaluateColor(value, 16, 27); }
    // loudness
    if (id === 7 || id === 53)  { return this.evaluateColor(value, 36, 70); }
    //wifi
    if (id === 8 || id === 9 || id === 21) { return this.evaluateColor(value, 0, 100); }
    // temp
    if (id === 12 || id === 55) { return this.evaluateColor(value, 18, 27); }
    //bat
    if (id === 17) { return this.evaluateColor(value, 15, 101); }
    //no2
    if (id === 15) { return this.evaluateColor(value, 3300, 3315); }
    // pressure
    if (id === 58) { return this.evaluateColor(value, 101, 103); }
    // co
    if (id === 16) { return this.evaluateColor(value, 390, 425); }
    // pm 1
    if (id === 89) { return this.evaluateColor(value, 20, 50); }
    // pm 2.5
    if (id === 87) { return this.evaluateColor(value, 20, 50); }
    // pm 10
    if (id === 88) { return this.evaluateColor(value, 35, 100); }

    // if no id matches
    return '';
  }

  evaluateColor(value,low,high){
    // Returns a valid CSS color code like  'orange','#ccc' or 'rgb(255,255,243,0.5)'
    // Gets 2 thresholds, low and high. For temperature example (16,27)
    // values below 16 are cold (blue), above 27 (red), between: green
    if (value < low) { return 'cornflowerblue' }
    if (value > high) { return 'red' }
    return 'forestgreen';
  }

  getIcon(id, value){
    // Each id is a sensor https://api.smartcitizen.me/v0/sensors
    // humidity
    if (id === 5 || id === 13 || id === 56) { return <FaTint />; }
    if (id === 6 || id === 11 || id === 18) { return <FaSun />; }
    if (id === 7)  {
      if (value <= 30) { return <FaVolumeDown />; }
      if (value > 30) { return <FaVolumeUp />; }
    }
    if (id === 8 || id === 9 || id === 21) { return <FaWifi />; }
    //Temp
    if (id === 12 || id === 555) {
      if (value <= 0) { return <FaThermometerEmpty />; }
      if (value > 0 && value <= 15) { return <FaThermometerQuarter />; }
      if (value > 15 && value <= 30) { return <FaThermometerHalf />; }
      if (value > 30 && value <= 40) { return <FaThermometerThreeQuarters />; }
      if (value > 40) { return <FaThermometerFull />; }
    }
    if (id === 14) { return <FaLightbulb />; }
    if (id === 15) { return <FaFlask />; }
    if (id === 16) { return <FaCloud />; }
    if (id === 17 || id === 10) {
      if (value <= 10) { return <FaBatteryEmpty />; }
      if (value > 10 && value <= 45) { return <FaBatteryQuarter />; }
      if (value > 45 && value <= 65) { return <FaBatteryHalf />; }
      if (value > 65 && value <= 90) { return <FaBatteryThreeQuarters />; }
      if (value > 90) { return <FaBatteryFull />; }
    }
    return <FaRegQuestionCircle />;
  }

  render(){
    let item = this.props.data;
    return(
      <div style={{ backgroundColor: this.getBgColor(item['id'], item['value']) }}
           className="p-3 col-6 col-xl-4 d-flex justify-content-between flex-column"
           onClick={() => this.props.sendToChart(item['id'])} >
        <p>{item['description']}</p>
        <div className="text-center my-3">
          <h1 className="mb-0">{Math.round(item['value'] * 100)/100}</h1>
          <p className=""> {item['unit']}</p>
          <h4>{this.getIcon(item['id'], item['value'])}</h4>
        </div>
        <p className="text-left">{item['name']} - id: { item['id'] }</p>
      </div>
    )
  }
}


export default KitSensors;
