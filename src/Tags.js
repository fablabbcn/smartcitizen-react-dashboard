import React, { Component } from 'react';
import DeviceResults from './DeviceResults';

class Tags extends Component{

  render(){

    return(
      <div className="row">
        <div className="col-12">
          <h3>Tags</h3>
          <button className="btn bg-grey mr-1" onClick={() => this.props.getDevicesByTag('Streamr')}>Streamr Tag</button>
          <button className="btn bg-grey mr-1" onClick={() => this.props.getDevicesByTag('Amsterdam')}>Amsterdam Tag</button>

          <DeviceResults data={this.props.data} changeSelectedDevice={this.props.changeSelectedDevice}/>
        </div>
      </div>
    )
  }
}


export default Tags;
