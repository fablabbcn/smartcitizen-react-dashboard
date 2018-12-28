import React, { Component } from 'react';

class Taglist extends Component{
  render(){
    let item = this.props.tags;
    return(
      <div className="row">
        <div className="col-12">
          <h5>TagList</h5>
          <table className="table table-sm table-bordered table-hover table-striped table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              {item.map((x,y) => {
                return(
                  <tr key={y} className="tr" onClick={() => this.props.getDevicesByTag(x['name'])} >
                    <td><p>{x['id']} </p></td>
                    <td><p>{x['description']}</p></td>
                    <td><p>{x['name']}</p></td>
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


export default Taglist;
