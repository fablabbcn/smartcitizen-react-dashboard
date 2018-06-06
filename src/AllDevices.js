import React, { Component } from 'react';

class AllDevices extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <table className="table table-sm table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Last Reading</th>
              <th>Lat / Lng</th>
              <th></th>
              <th>Country</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {item.map((x,y) => {
              return(
                <tr key={y} className="tr" onClick={() => this.props.handler(x['id'])} >
                  <td><p>{x['id']} </p></td>
                  <td><p>{x['last_reading_at']} </p></td>
                  <td><p>{x['latitude']} {x['longitude']} </p></td>
                  <td><p></p></td>
                  <td><p>{x['country_code']} </p></td>
                  <td><p>{x['owner_username']} </p></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


export default AllDevices;
