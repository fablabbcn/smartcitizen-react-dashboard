import React, { Component } from 'react';
import DeviceResults from './DeviceResults';
import Select from 'react-select';

class Tags extends Component{

  render(){
    //{ value: 'chocolate', label: 'Chocolate' },
    let options = [];
    this.props.tags.map((item,key) =>
      options.push({ value: item['name'], label: item['name']})
    )

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted #ddd',
        color: state.isSelected ? 'red' : 'black',
        padding: 10,
      }),
    }

    return(
      <div className="row">
        <div className="col-12">
          <h3>Tags</h3>
          <button className="btn btn-sm d-block ml-auto bg-grey mb-1" onClick={() => this.props.getDevicesByTag('Streamr')}>Streamr Tag</button>
          <Select
            value={this.props.selectedTag }
            options={options}
            onChange={this.props.changeTag }
            styles={customStyles}
            placeholder={this.props.selectedTag.length === 0 ? 'Select a tag...' : this.props.selectedTag }
          />

          <DeviceResults data={this.props.devices} changeSelectedDevice={this.props.changeSelectedDevice}/>
        </div>
      </div>
    )
  }
}


export default Tags;
