import React, { Component } from 'react';
import KitOwner from './KitOwner.js';
import KitInfo from './KitInfo.js';
class DeviceInfo extends Component{

  render(){
    let kit = this.props.kit;
    let owner = this.props.owner;
    return(
      <div className="row py-3 my-2">
        <div className="col-6">
          <KitInfo data={kit} />
        </div>
        <div className="col-6">
          <KitOwner data={owner} />
        </div>
      </div>
    );
  }
}


export default DeviceInfo;
