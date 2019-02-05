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
      accessor: 'owner.location.city'
    }, {
      Header: 'Username',
      id: 'username',
      accessor: 'owner.username',
    }, {
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }]

    return(
      <div className="row mb-2">
        <div className="col-12">
          <h3>Devices</h3>
          <ReactTable
            data={item}
            columns={columns}
            minRows={1}
            className={"table-white"}
          />
        </div>
      </div>
    )
  }
}

export default DeviceResults;
