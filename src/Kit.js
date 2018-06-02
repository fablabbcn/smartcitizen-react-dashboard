import React, { Component } from 'react';

class Kit extends Component{

  getClass(id){
    if (id === 14 || id === 18) { return 'yellow'; }
    if (id === 7)  { return 'red'; }
    if (id === 12) { return 'green'; }
    if (id === 17) { return 'black'; }
    if (id === 13) { return 'blue_light'; }
    if (id === 15) { return 'grey_darker'; }
    if (id === 21) { return 'grey'; }
    return 'blue';
  }

  render(){
    let item = this.props.data;
    return(
      <div className={"col-6 col-md-4 " + this.getClass(item['id']) }  >
        <p>{item['description']}</p>
        <h1 className="text-center">{item['raw_value']}</h1>
        <p className="text-center">{item['unit']}</p>
        <p className="text-right">{item['name']}</p>
        {item['id']}
      </div>
    )
  }
}


export default Kit;
