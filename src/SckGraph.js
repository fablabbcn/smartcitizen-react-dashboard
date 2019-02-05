import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class SckGraph extends Component{

  render(){
    let item = this.props.data;

    let xxx = [];
    let yyy = [];

    if (item) {
      item.forEach(([x, y]) => {
        xxx.push(x)
        yyy.push(y)
      })
    }

    return(
      <Plot
        useResizeHandler
        data={[ {type: 'scatter', x: xxx, y: yyy}, ]}
        style={{ width: '100%'}}
        layout={{
          plot_bgcolor: '#161719',
          paper_bgcolor: '#212124',
          font: {
            color: '#e3e3e3',
            family: 'Kanit',
          },
          autosize: true,
          //title: 'React - Plotly',
          automargin: true,
          margin:{ l: 30, r: 0, b: 30, t: 0, pad: 0 },
          responsive: true
        }}
      />
    )
  }
}


export default SckGraph;
