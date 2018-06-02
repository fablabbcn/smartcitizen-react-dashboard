import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city:0,
      description: '',
      hasData: false,
      id: 3,
      owner: '',
      sensorDescription: '',
      sensorType: '',
      sensorValue: '',
      targetId: 2440,
      username: '',
    };
    this.getSensorData = this.getSensorData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className="container">
        <div id="demo">
          Geolocation:
          <hr />
        </div>

        <div className="row">

          <div className="col-6">
            <input type="text" onChange={this.handleChange} value={this.state.targetId}/>
            <button onClick={this.getSensorData}> Get data </button>
          </div>

          <div className="col-12">
            <table>
              <thead></thead>
              <tbody>
                <tr><td>City</td><td>{this.state.city} </td></tr>
                <tr><td>Description:</td><td> {this.state.description} </td></tr>
                <tr><td>Have data</td><td> {this.state.hasData ? 'Yes' : 'No'} </td></tr>
                <tr><td>Kit ID</td><td>{this.state.id} </td></tr>
                <tr><td>Owner</td><td>{this.state.owner} </td></tr>
                <tr><td>Name</td><td>{this.state.name} </td></tr>
                <tr><td>SensorDescription</td><td> {this.state.sensorDescription} </td></tr>
                <tr><td>SensorType</td><td> {this.state.sensorType} </td></tr>
                <tr><td>SensorValue</td><td>{this.state.sensorValue} </td></tr>
                <tr><td>Username</td><td>{this.state.username} </td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }

  handleChange(event){
    this.setState({targetId: event.target.value})
  }
  getSensorData(){
    console.log('fetching data...');
    return fetch('https://api.smartcitizen.me/v0/devices/' + this.state.targetId)
      .then((response) =>  response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          hasData: true,
          id: responseJson['id'],
          username: responseJson['owner']['username'],
          owner: responseJson['owner']['username'],
          city: responseJson['owner']['location']['city'],
          description: responseJson['description'],
          name: responseJson['name'],
          sensorType: responseJson['data']['sensors'][0]['name'],
          sensorDescription: responseJson['data']['sensors'][0]['description'],
          sensorValue: responseJson['data']['sensors'][0]['raw_value'],
        });
      })
  }

}

export default App;
