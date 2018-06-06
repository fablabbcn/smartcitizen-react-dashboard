import React, { Component } from 'react';
import { ratioToRGB } from './utils/ratioToRGB';

class KitSensors extends Component{

  constructor(props) {
    super(props);
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
    return { backgroundColor: `rgb(${ratioToRGB(ratio).join(',')})` };
  }

  render(){
    return(
      <div className={"p-3 col-6 col-md-4 col-xl-3 d-flex justify-content-between flex-column"} style={ this.getBgColor(this.state.item['id'], this.state.item['value']) }  >
        <p>{this.state.item['description']}</p>
        <div className="text-center my-3">
          <h1 className="mb-0">{Math.round(this.state.item['value'] * 100)/100}</h1>
          <p className=""> {this.state.item['unit']}</p>
        </div>
        <p className="text-left">{this.state.item['name']} - id: { this.state.item['id'] }</p>
      </div>
    )
  }
}

export default KitSensors;
