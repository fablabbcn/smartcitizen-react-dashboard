import React, { Component } from 'react';
import { ratioToRGB } from './utils/ratioToRGB';

class KitSensors extends Component{

  getBgColor(type, ratio) {
    return { backgroundColor: `rgb(${ratioToRGB(ratio).join(',')})`, color: 'white' };
  }

  getFAIcon(type, value) {
    switch (type) {
      case 'light': return 'fas fa-lightbulb';
      case 'humidity': return 'fas fa-lightbulb';
      case 'networks': return 'fas fa-wifi';
      case 'CO': return 'fas fa-cloud';
      case 'NO2': return 'fas fa-flask';
      case 'pv': return 'fas fa-sun';
      case 'temperature':
        if (value <= 0) { return 'fas fa-thermometer-empty'; }
        if (value > 0 && value <= 15) { return 'fas fa-thermometer-quarter'; }
        if (value > 15 && value <= 30) { return 'fas fa-thermometer-half'; }
        if (value > 30 && value <= 40) { return 'fas fa-thermometer-three-quarters '; }
        if (value > 40) { return 'fas fa-thermometer-full'; }
      case 'noise':
        if (value <= 30) { return 'fas fa-volume-down'; }
        if (value > 30) { return 'fas fa-volume-up'; } ;
      case 'battery':
        if (value <= 10) { return 'fas fa-battery-empty'; }
        if (value > 10 && value <= 45) { return 'fas fa-battery-quarter'; }
        if (value > 45 && value <= 65) { return 'fas fa-battery-half'; }
        if (value > 65 && value <= 90) { return 'fas fa-battery-three-quarters '; }
        if (value > 90) { return 'fas fa-battery-full'; }
      default: return 'fas fa-question-circle';
    }
  }

  render(){
    return(
      <div className={"p-3 col-6 col-md-4 col-xl-3 d-flex justify-content-between flex-column"} style={{ backgroundColor: `rgb(${ratioToRGB( this.props.sensor.ratio).join(',')})`, color: 'white' }}  >
        <div className="text-center my-3">
          <i className={ this.getFAIcon(this.props.sensor.type, this.props.sensor.value) }></i>
          <p className="">{Math.round(this.props.sensor.value * 100)/100} {this.props.sensor.unit}</p>
        </div>
      </div>
    )
  }
}

export default KitSensors;
