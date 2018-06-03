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
      isShowingKitInfo: false,
      owner: [],
      theData: [],
      theSensors: [],
      theKit: []
    };
    this.getSensorData = this.getSensorData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleShowKitInfo = this.toggleShowKitInfo.bind(this);
  }

  render() {

    return (
      <div className="container-fluid">

        TODO: Geolocation
        <hr />

        <div className="row">
          <div className="col-6 mx-auto text-center">
            <input type="text" onChange={this.handleChange} value={this.state.targetId}/>
            <button className="btn bg-black my-1" onClick={this.getSensorData}> Get data </button>
            <p className={ "border " + (this.state.hasData ? " bg-green" : " bg-red") }> {this.state.hasData ? 'Showing data for device' : 'No Data found for device'} {this.state.targetId}</p>
          </div>
        </div>


        <div className="row">
          <div className="col-12 text-right">
            <button className="btn bg-black my-1" onClick={this.toggleShowKitInfo} > Toggle Kit & User Info </button>
          </div>
        </div>

        {this.state.isShowingKitInfo &&
            <div className="row border p-3">
              <div className="col-6">
                <KitInfo data={this.state.theKit} />
              </div>
              <div className="col-6">
                <KitOwner data={this.state.owner} />
              </div>
            </div>
        }

        <div className="row">
          <div className="col-12">
            <h3 className="text-center">Kit Sensors</h3>
            <p className="text-right">Last recorded at: {this.state.theData['recorded_at']}</p>
          </div>
          {
            this.state.theSensors.map((item, key) => {
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
    this.setState({targetId: event.target.value}, () => {
      this.getSensorData()
    })
  }

  getSensorData(e){
    //console.log('fetching data...');
    return fetch('https://api.smartcitizen.me/v0/devices/' + this.state.targetId)
      .then((response) =>  response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        //console.log( typeof responseJson);
        this.setState({
          hasData: true,
          owner: responseJson.owner,
          theData: responseJson.data,
          theSensors: responseJson.data.sensors,
          theKit: responseJson.kit,
        });
      }).catch(err => {
        console.log(err)
        this.setState({
          hasData: false,
          //owner: [],
          //theData: [],
          //theSensors: [],
          //theKit: [],
        })
        //console.log('error')
      })
  }

  toggleShowKitInfo(){
    this.setState({isShowingKitInfo: !this.state.isShowingKitInfo})
    console.log(this.state.isShowingKitInfo)
  }

}

export default App;
