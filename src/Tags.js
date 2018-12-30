import React, { Component } from 'react';
import DeviceResults from './DeviceResults';
import Select from 'react-select';

class Tags extends Component{

  render(){
    //{ value: 'chocolate', label: 'Chocolate' },
    let options = []
      this.props.tags.map((item,key) =>
          options.push({ value: item['name'], label: item['name']})
        )

    return(
      <div className="row">
        <div className="col-12">
          <h3>Tags</h3>
          <button className="btn btn-sm d-block ml-auto bg-grey mb-1" onClick={() => this.props.getDevicesByTag('Streamr')}>Streamr Tag</button>
          <Select value={this.props.selectedTag} options={options} onChange={this.props.changeTag } placeholder={'Select tag..'} />
          <DeviceResults data={this.props.devices} changeSelectedDevice={this.props.changeSelectedDevice}/>
        </div>
      </div>
    )
  }
}


export default Tags;
