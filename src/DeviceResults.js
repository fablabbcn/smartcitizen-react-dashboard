import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class DeviceResults extends Component{

  render(){
    let item = this.props.data;
    const columns = [{
      id: 'id',
      Header: 'ID',
      accessor: 'id', // String-based value accessors!
      Cell: e => <div style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} 
        onClick={() => this.props.changeSelectedDevice(e.value)} > {e.value} </div>
    }, {
      Header: 'Last Reading',
      accessor: 'last_reading_at',
    }, {
      Header: 'Sensors',
      id: 'sensors',
      accessor: d => d.data.sensors.length
    }, {
      Header: 'City',
      id: 'city',
      accessor: d => d.owner.location.city,
    }, {
      Header: 'Username',
      id: 'username',
      accessor: d => d.owner.username,
    }, {
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }]

    return(
      <div className="row">
        <div className="col-12">
        <ReactTable
        data={item}
        columns={columns}
        minRows={2} />
          <h3>Devices</h3>
          <table className="table table-sm table-bordered table-hover table-striped table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sensors</th>
                <th>Last Reading</th>
                <th>Name</th>
                <th>Username</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {item.map((x,y) => {
                return(
                  <tr key={y} className="tr" onClick={() => this.props.changeSelectedDevice(x['id'])} >
                    <td><p>{x['id']} </p></td>
                    <td><p>{x['data']['sensors'].length}</p></td>
                    <td><p>{x['last_reading_at']}</p></td>
                    <td><p>{x['name']}</p></td>
                    <td><p>{x['owner'] ? x['owner']['username'] : ''}</p></td>
                    <td><p>{x['owner'] ? x['owner']['location']['city'] : ''}</p></td>
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
