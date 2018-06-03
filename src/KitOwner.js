
import React, { Component } from 'react';
class KitOwner extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <div className="col-12">
          <h3 className=""> Kit Owner </h3>
          <p>Owner id: {item['id']} </p>
          <p>{item['username']} </p>
          <img src={item['avatar']} />
          <p>URL: {item['url']} </p>
        </div>
      </div>
    );
  }
}


export default KitOwner;
