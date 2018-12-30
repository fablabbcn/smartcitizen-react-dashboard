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
        useResizeHandler
        data={[ {type: 'scatter', x: xxx, y: yyy}, ]}
        style={{ width: '100%'}}
        layout={{
          autosize: true,
          title: 'React - Plotly (the last day)',
          automargin: true,
          responsive: true
        }}
      />
    )
  }
}


export default SckGraph;
