import React, { Component } from 'react';

class NearDevices extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <div className="col-12">
          <div id="geo">(geolocation will appear here)</div>
          <button className="btn bg-black m-1" onClick={this.props.getAll}>Get nearby Devices</button>
          <table className="table table-sm table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Reading</th>
                <th>Name</th>
                <th>Username</th>
                <th>City</th>
                <th>Sensors</th>
              </tr>
            </thead>
            <tbody>
              {item.map((x,y) => {
                return(
                  <tr key={y} className="tr" onClick={() => this.props.handler(x['id'])} >
                    <td><p>{x['id']} </p></td>
                    <td><p>{x['last_reading_at']}</p></td>
                    <td><p>{x['name']}</p></td>
                    <td><p>{x['owner'] ? x['owner']['username'] : ''}</p></td>
                    <td><p>{x['owner'] ? x['owner']['location']['city'] : ''}</p></td>
                    <td><p>{x['data']['sensors'].length}</p></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


export default NearDevices;
