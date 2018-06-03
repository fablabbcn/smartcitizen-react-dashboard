import React, { Component } from 'react';

class KitSensors extends Component{

  getClass(id){
    if (id === 14 || id === 18) { return 'bg-yellow'; }
    if (id === 7)  { return 'bg-red'; }
    if (id === 12) { return 'bg-green'; }
    if (id === 17) { return 'bg-black'; }
    if (id === 13) { return 'bg-blue_light'; }
    if (id === 15) { return 'bg-grey_darker'; }
    if (id === 21) { return 'bg-grey'; }
    return 'bg-blue';
  }

  render(){
    let item = this.props.data;
    return(
      <div className={"p-3 col-6 col-md-4 " + this.getClass(item['id']) }  >
        <p>{item['description']} {/* item['id'] */}</p>
        <h1 className="text-center">{item['value']}</h1>
        <p className="text-center">{item['unit']}</p>
        <p className="text-left">{item['name']}</p>
      </div>
    )
  }
}


export default KitSensors;
