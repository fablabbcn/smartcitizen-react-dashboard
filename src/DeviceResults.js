import React, { Component } from 'react';

class DeviceResults extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <div className="col-12">
          <h3>Tags</h3>
          <table className="table table-sm table-bordered table-hover table-striped table-responsive">
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
                  <tr key={y} className="tr" onClick={() => this.props.changeSelectDevice(x['id'])} >
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

export default DeviceResults;
