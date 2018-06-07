import React, { Component } from 'react';

class Empty extends Component{

  render(){

    return(
      <div className="row">
        <div className="col-12">
          {console.log(this)}
          {this.props.data}
        </div>
      </div>
    )
  }
}


export default Empty;
