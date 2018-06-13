import React, { Component } from 'react';

class KitSensors extends Component{

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

  render(){
    let item = this.props.data;
    return(
      <div className={"p-3 col-6 col-xl-4 d-flex justify-content-between flex-column  " + this.getClass(item['id']) } onClick={() => this.props.sendToChart(item['id'])} >
        <p>{item['description']}</p>
        <div className="text-center my-3">
          <h1 className="mb-0">{Math.round(item['value'] * 100)/100}</h1>
          <p className=""> {item['unit']}</p>
        </div>
        <p className="text-left">{item['name']} - id: { item['id'] }</p>
      </div>
    )
  }
}


export default KitSensors;
