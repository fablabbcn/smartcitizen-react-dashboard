import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class SckGraph extends Component{

  render(){
    let item = this.props.data;

    let xxx = [];
    let yyy = [];

    item.forEach(([x, y]) => {
      xxx.push(x)
      yyy.push(y)
    })

    return(
      <Plot
        data={[ {type: 'bar', x: xxx, y: yyy}, ]}
        layout={{width: 820, height: 440, title: 'A test Plot for device 1616'}}
      />
    )
  }
}


export default SckGraph;
