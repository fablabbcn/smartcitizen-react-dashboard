import React, { Component } from 'react';
import { ratioToRGB } from './utils/ratioToRGB';

class KitSensors extends Component{

  constructor(props) {
    super(props);
    console.log(this.props.data);
    this.state = { item: this.props.data };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const item = this.state.item;
    item.value = item.value * .80;
    this.setState({
      item: item
    });
  }

  getClass(id){
    // Light sensor
    if (id === 4)  { return 'bg-green'; }
    if (id === 5 || id === 13) { return 'bg-blue_light'; }
    if (id === 6 || id === 11 || id === 14 || id === 18) { return 'bg-yellow'; }
    if (id === 7)  { return 'bg-red'; }
    if (id === 8 || id === 9 || id === 21) { return 'bg-grey_darkest'; }
    if (id === 12) { return 'bg-green'; }
    if (id === 17) { return 'bg-black'; }
    if (id === 15) { return 'bg-grey_darker'; }
    return 'bg-grey';
  }

  getBgColor(id, value) {
    const ratio = value < 100 ? value/100 : 1;
    return { backgroundColor: `rgb(${ratioToRGB(ratio).join(',')})`, color: 'white' };
  }

  getFAIcon(id, value) {
    if (id === 4)  { return 'bg-green'; }
    if (id === 5 || id === 13) { return 'fas fa-tint'; }
    if (id === 14) { return 'fas fa-lightbulb'; }
    if (id === 6 || id === 11 || id === 18) { return 'fas fa-sun'; }
    if (id === 7)  {
      if (value <= 30) { return 'fas fa-volume-down'; }
      if (value > 30) { return 'fas fa-volume-up'; }
    }
    if (id === 8 || id === 9 || id === 21) { return 'fas fa-wifi'; }
    if (id === 12) {
      if (value <= 0) { return 'fas fa-thermometer-empty'; }
      if (value > 0 && value <= 15) { return 'fas fa-thermometer-quarter'; }
      if (value > 15 && value <= 30) { return 'fas fa-thermometer-half'; }
      if (value > 30 && value <= 40) { return 'fas fa-thermometer-three-quarters '; }
      if (value > 40) { return 'fas fa-thermometer-full'; }
    }
    if (id === 16) { return 'fas fa-cloud'; }
    if (id === 17) {
      if (value <= 10) { return 'fas fa-battery-empty'; }
      if (value > 10 && value <= 45) { return 'fas fa-battery-quarter'; }
      if (value > 45 && value <= 65) { return 'fas fa-battery-half'; }
      if (value > 65 && value <= 90) { return 'fas fa-battery-three-quarters '; }
      if (value > 90) { return 'fas fa-battery-full'; }
    }
    if (id === 15) { return 'fas fa-flask'; }
  }

  render(){
    return(
      <div className={"p-3 col-6 col-md-4 col-xl-3 d-flex justify-content-between flex-column"} style={ this.getBgColor(this.state.item['id'], this.state.item['value']) }  >
        <div className="text-center my-3">
          <i className={ this.getFAIcon(this.state.item['id'], this.state.item['value']) }></i>
          <p className="">{Math.round(this.state.item['value'] * 100)/100} {this.state.item['unit']}</p>
        </div>
      </div>
    )
  }
}

export default KitSensors;
