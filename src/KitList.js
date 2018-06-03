import React, { Component } from 'react';

class KitList extends Component{

  render(){
    let item = this.props.data;
    return(
      <div className="row">
        <div className="col-12">
          <p className="text-left">World Map</p>
        </div>
        {item.map((x,y) => {
          return(
            <div key={y} className="col-4 col-md-3 col-xl-2 border">
              <p>{x['last_reading_at']}</p>
              <p>{x['city']} - {x['country_code']}</p>
              <p>{x['description']}</p>
              <p>{x['latitude']}</p>
              <p>{x['longitude']}</p>
              <p>{x['name']}({x['id']})</p>
              <p>{x['owner_username']} ({x['owner_id']})</p>
            </div>
          )
        })}
      </div>
    )
  }
}


export default KitList;
