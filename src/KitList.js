import React, { Component } from 'react';

class KitList extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <div className="col-12">
          <p className="text-left">World Map</p>
        </div>
        <table className="table table-sm table-bordered table-hover table-striped">
          <tbody>
            {item.map((x,y) => {
              return(
                <tr key={y} className="tr" onClick={() => this.props.handler(x['id'])} >
                  <td><p>{x['id']} </p></td>
                  <td><p>{x['last_reading_at']}</p></td>
                  <td><p>{x['city']} - {x['country_code']}</p></td>
                  <td><p>{x['description']}</p></td>
                  <td><p>{x['latitude']}</p></td>
                  <td><p>{x['longitude']}</p></td>
                  <td><p>{x['name']}({x['id']})</p></td>
                  <td><p>{x['owner_username']} ({x['owner_id']})</p></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


export default KitList;
