import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class WorldMapList extends Component{

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
      Header: 'City',
      id: 'city',
      accessor: 'city'
    }, {
      Header: 'Country',
      id: 'country_code',
      accessor: 'country_code',
    }, {
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }]

    return(
      <div className="row">
        <div className="col-12">
          <button className="btn btn-outline-primary m-1" onClick={this.props.getAll}>Get ALL Devices (slow)</button>

          <ReactTable
            data={item}
            columns={columns}
            minRows={1} />

        </div>
      </div>
    )
  }
}

export default WorldMapList;
