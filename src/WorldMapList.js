import React, { Component } from 'react';

class WorldMapList extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <div className="col-12">
          <button className="btn bg-black m-1" onClick={this.props.getAll}>Get ALL Devices (slow)</button>

          <table className="table table-sm table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Reading</th>
                <th>Lat / Lng</th>
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
                    <td><p>{x['country_code']} </p></td>
                    <td><p>{x['owner_username']} </p></td>
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

export default WorldMapList;
