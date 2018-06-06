import React, { Component } from 'react';
import './App.css';
import KitSensors from './KitSensors.js';
import KitOwner from './KitOwner.js';
import KitInfo from './KitInfo.js';
import KitList from './KitList.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasData: false,
      targetId: 2440,
      isShowingKitInfo: false,
      isShowingWorldmap: false,
      owner: [],
      theData: [],
      theSensors: [],
      theKit: [],
      worldmap: []
    };
    this.getSensorData = this.getSensorData.bind(this);
    this.getWorldmap = this.getWorldmap.bind(this);
    this.changeTargetId = this.changeTargetId.bind(this);
    this.toggleShowKitInfo = this.toggleShowKitInfo.bind(this);
    this.toggleShowWorldmap = this.toggleShowWorldmap.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);

    this.updateSelectedDevice = this.updateSelectedDevice.bind(this);
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 col-md-6 mx-auto text-center">
                <input type="text" onChange={this.changeTargetId} value={this.state.targetId}/>
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
                <h3 className="text-center">Kit {this.state.targetId} Sensors</h3>
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

          <div className="col-12 col-md-6">

            <button onClick={this.getGeoLocation}>Get GeoLocation</button>
            <div id="geo">geolocation will appear here</div>

            <div className="row">
              <div className="col-12 text-right">
                <button className="btn bg-black my-1" onClick={this.toggleShowWorldmap} >Toggle World map ({this.state.worldmap.length} items)</button>
              </div>
            </div>

            {this.state.isShowingWorldmap &&
                <KitList data={this.state.worldmap} handler={this.updateSelectedDevice}/>
            }

          </div>
        </div>

      </div>
    );
  }


  componentDidMount(){
    this.getSensorData();
    //this.getWorldmap();
    //this.getGeoLocation();
  }

  changeTargetId(event){
    this.setState({targetId: event.target.value}, () => {
      this.getSensorData()
    })
  }

  getWorldmap(myurl){
    // If no url is given, searches the world_map
    console.log('fetching world map..')
    return fetch(myurl || 'https://api.smartcitizen.me/v0/devices/world_map')
      .then((response) =>  response.json())
      .then((responseJson) => {
        this.setState({
          worldmap: responseJson,
        });
      }).catch(err => {
        console.log(err)
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
      })
  }

  getGeoLocation(){
    var x = document.getElementById("geo");
    var that = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords)
        x.innerHTML = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
        that.getDeviceNear(position.coords.latitude, position.coords.longitude)
      });
    }
  }

  getDeviceNear(lat,lng){
    let url = "https://api.smartcitizen.me/v0/devices?near=" + lat + "," + lng
    console.log(url)
    this.getWorldmap(url)
  }

  updateSelectedDevice(id){
    console.log('click', id);
    this.setState({targetId: id}, () => {
      this.getSensorData();
    });
  }

  toggleShowWorldmap(){
    this.setState({isShowingWorldmap: !this.state.isShowingWorldmap})
  }

  toggleShowKitInfo(){
    this.setState({isShowingKitInfo: !this.state.isShowingKitInfo})
  }

}

export default App;
