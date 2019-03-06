import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class MiniPlot extends Component{

  render(){
    return(
      <Plot
        useResizeHandler
        data={[ {type: 'scatter', x: this.props.x, y: this.props.y}, ]}
        style={{ width: '100%', height: '30%'}}
        config={{
          // This hides the toolbar helper, which oddly always shows up on Raspberry Pi TV
          displayModeBar: false
        }}
        layout={{
          plot_bgcolor: '#212124',
          paper_bgcolor: '#212124',
          font: {
            color: '#e3e3e3',
            family: 'Kanit',
          },
          autosize: true,
          //title: 'React - Plotly',
          automargin: true,
          margin:{ l: 40, r: 0, b: 0, t: 10, pad: 0 },
          xaxis: { showline: false, zeroline: false, ticks: ''},
          yaxis: { showline: false, zeroline: false, ticks: ''},
          //showlegend: false,
          responsive: true
        }}
      />
    )
  }

}

export default MiniPlot
