import React, { Component } from 'react';
class FavoriteDevices extends Component{

  render(){
    let devices = this.props.devices;
    return(
      <div className="favorite-devices p-2 border mb-3">
        <h3>Favorite Devices: </h3>
        {
          devices.map((item, key) => {
            return(
                <button className="btn btn-sm bg-yellow m-2"
                  onClick={() => this.props.changeSelectedDevice(item)}
                  key={key}>
                  {item}
                </button>
            )
          })
        }
      </div>
    );
  }
}

export default FavoriteDevices;
