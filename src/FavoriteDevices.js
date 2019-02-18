import React, { Component } from 'react';
class FavoriteDevices extends Component{

  render(){
    let devices = this.props.devices;
    return(
      <div className="favorite-devices ml-2">
        {
          devices.map((item, key) => {
            return(
                <button className="btn btn-sm bg-yellow m-1"
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
