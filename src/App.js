import React, { Component } from 'react';
import './App.css';
import KitSensors from './KitSensors.js';
import KitOwner from './KitOwner.js';
import KitInfo from './KitInfo.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasData: false,
      targetId: 2440,
      owner: [],
      theData: [],
      theKit: []
    };
    this.getSensorData = this.getSensorData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {

    return (
      <div className="container-fluid">
        <div id="demo">
          Geolocation:
          <hr />
        </div>

        <div className="row">
          <div className="col-6 ">
            <input type="text" onChange={this.handleChange} value={this.state.targetId}/>
            <button onClick={this.getSensorData}> Get data </button>
          </div>

          <div className="col-12">
            <table>
              <thead></thead>
              <tbody>
                <tr><td>Have data</td><td> {this.state.hasData ? 'Yes' : 'No'} </td></tr>
                <tr><td>Description:</td><td> {this.state.description} </td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row border p-3 m-2">
          <div className="col-12 col-md-6">
            <KitInfo data={this.state.theKit} />
          </div>
          <div className="col-12 col-md-6">
            <KitOwner data={this.state.owner} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h3 className="text-center">Kit Sensors</h3>
          </div>
          {
            this.state.theData.map((item, key) => {
              return(
                <KitSensors data={item} key={key}/>
              )
            })
          }
        </div>
      </div>
    );
  }


  componentDidMount(){
    this.getSensorData();
  }

  handleChange(event){
    this.setState({targetId: event.target.value})
  }

  getSensorData(){
    //console.log('fetching data...');
    return fetch('https://api.smartcitizen.me/v0/devices/' + this.state.targetId)
      .then((response) =>  response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        //console.log( typeof responseJson);
        this.setState({
          hasData: true,
          owner: responseJson.owner,
          theData: responseJson.data.sensors,
          theKit: responseJson.kit,
          description: responseJson.description,
        });
      })
  }

}

export default App;
