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
        data={[ {type: 'scatter', x: xxx, y: yyy}, ]}
        layout={{autosize: true,  height: 440, title: 'React - Plotly (the last day)'}}
      />
    )
  }
}


export default SckGraph;
