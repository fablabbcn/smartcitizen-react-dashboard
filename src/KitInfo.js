import React, { Component } from 'react';
class KitInfo extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <div className="col-12">
          <h3 className=""> Kit Info </h3>
          <p>{item['name']} </p>
          <p>{item['slug']} </p>
          <p>{item['description']} </p>
          <p>{item['created_at']} </p>
        </div>
      </div>
    );
  }
}


export default KitInfo;
