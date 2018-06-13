import React, { Component } from 'react';
import './App.css';
import KitSensors from './KitSensors.js';
import KitOwner from './KitOwner.js';
import KitInfo from './KitInfo.js';
import NearDevices from './NearDevices.js';
import SckGraph from './SckGraph.js';
import Tags from './Tags.js';
import WorldMap from './WorldMap.js';
import WorldMapList from './WorldMapList.js';


import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      favoriteDevices: [],
      hasData: false,
      isShowingKitInfo: false,
      isShowingDeviceList: true,
      isShowingWorldMap: false,
      owner: [],
      selectedDevice: 2440,
      targetTag: '',
      theData: [],
      theDevices: [],
      theKit: [],
      theReading: [],
      theSensors: [],
      world_map: []
    };
    this.addFavoriteDevice = this.addFavoriteDevice.bind(this);
    this.changeTargetId = this.changeTargetId.bind(this);
    this.changeTargetIdInput = this.changeTargetIdInput.bind(this);
    this.changeTargetTag = this.changeTargetTag.bind(this);
    this.getDevices = this.getDevices.bind(this);
    this.getDevicesByTag = this.getDevicesByTag.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.getReading = this.getReading.bind(this);
    this.getSensorData = this.getSensorData.bind(this);
    this.getWorldMap = this.getWorldMap.bind(this);
    this.isFavoriteDevice = this.isFavoriteDevice.bind(this);
    this.removeFavoriteDevice = this.removeFavoriteDevice.bind(this);
    this.sendToChart = this.sendToChart.bind(this);
    this.toggleFavoriteDevice = this.toggleFavoriteDevice.bind(this);
    this.toggleShowDevices = this.toggleShowDevices.bind(this);
    this.toggleShowKitInfo = this.toggleShowKitInfo.bind(this);
    this.toggleShowWorldmap = this.toggleShowWorldmap.bind(this);

  }

  render() {

    return (

      <div className="container-fluid">
        <Router>
          <div className="row main">

            <div className="col-md-12">
              <ul className="list-inline">
                <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/nearby">Nearby</NavLink> </li>
                <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/map">WorldMap</NavLink> </li>
                <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/maplist">WorldMapList</NavLink> </li>
                <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/tags">Tags</NavLink> </li>
              </ul>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
              <Route path="/" exact   render={() => <NearDevices data={this.state.theDevices} handler={this.changeTargetId} getAll={this.getGeoLocation} /> } />
              <Route path="/map"      render={() => <WorldMap />}/>
              <Route path="/maplist"  render={() => <WorldMapList data={this.state.world_map} handler={this.changeTargetId} getAll={this.getWorldMap} /> } />
              <Route path="/nearby"   render={() => <NearDevices data={this.state.theDevices} handler={this.changeTargetId} getAll={this.getGeoLocation} /> } />
              <Route path="/tags"     render={() => <Tags getDevicesByTag={this.getDevicesByTag} /> } />
            </div>

            <div className="col-12 col-md-6 col-xl-4">

              <button className={"btn my-1 " + (this.state.isShowingKitInfo? "bg-grey" : "bg-black")}
                onClick={this.toggleShowKitInfo} > {this.state.isShowingKitInfo ? 'Hide' : 'Show'} Kit & User Info </button>

              {this.state.isShowingKitInfo &&
                  <div className="row py-3 my-2 bg-blue_light">
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
                  <h3 className="text-center">Kit
                    <input className="w-25 text-center mx-1" type="text" onChange={this.changeTargetIdInput} value={this.state.selectedDevice}/>
                    Sensors
                  </h3>

                  <div className="favorite-devices">
                    <button className={"btn my-1 " + (this.isFavoriteDevice(this.state.selectedDevice) ? "bg-grey" : "bg-black")}
                      onClick={() => this.toggleFavoriteDevice(this.state.selectedDevice)} > {this.isFavoriteDevice(this.state.selectedDevice) ? 'Remove' : 'Add'} favorite device </button>

                    {
                      this.state.favoriteDevices.map((item, key) => {
                        return(
                          <button className="btn btn-sm bg-yellow m-2" onClick={() => this.changeTargetId(item)}  key={key}>{item}</button>
                        )
                      })
                    }
                  </div>

                  <p className={"text-center " + (this.state.hasData ? " bg-green" : " bg-red") }> {this.state.hasData ? 'Showing data for device' : 'No Data found for device'} {this.state.selectedDevice}</p>
                  <p>Last recorded at: {this.state.theData['recorded_at']}</p>
                </div>
                {
                  this.state.theSensors.map((item, key) => {
                    return(
                      <KitSensors data={item} key={key} sendToChart={this.sendToChart}/>
                    )
                  })
                }
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
              <SckGraph data={this.state.theReading} />
            </div>

            {/* end row */}
          </div>
        </Router>
      </div>
    );
  }


  componentDidMount(){
    this.getSensorData();
    this.getReading();
    //this.getGeoLocation();
  }

  addFavoriteDevice(deviceId){
    this.setState(prevState => ({
      favoriteDevices: [ ...prevState.favoriteDevices, parseInt(deviceId, 10) ]
    }));
  }

  toggleFavoriteDevice(deviceId){
    if(this.isFavoriteDevice(deviceId)){
      this.removeFavoriteDevice(deviceId);
    }else{
      this.addFavoriteDevice(deviceId);
    }
  }

  isFavoriteDevice(deviceId){
    console.log('check fav')
    if (this.state.favoriteDevices.indexOf(deviceId) > -1) {
      console.log('yes')
      return true;
    }
    return false;
  }
  removeFavoriteDevice(deviceId){
    let newArr = this.state.favoriteDevices;
    let index = newArr.indexOf(deviceId);

    if (index > -1) {
      newArr.splice(index, 1);
      this.setState({ favoriteDevices: newArr });
    }
  }

  changeTargetId(id){
    console.log('click', id);
    this.setState({selectedDevice: id}, () => {
      this.getSensorData();
    });
  }

  changeTargetIdInput(event){
    this.setState({selectedDevice: event.target.value}, () => {
      this.getSensorData()
    })
  }

  changeTargetTag(event){
    this.setState({targetTag: event.target.value}, () => {
      ////console.log(this.state.targetTag)
    })
  }

  getWorldMap(){
    let theUrl = 'https://api.smartcitizen.me/v0/devices/world_map'
    return fetch(theUrl)
      .then((response) =>  response.json())
      .then((responseJson) => {
        this.setState({
          world_map: responseJson,
        });
      }).catch(err => {
        console.log(err)
      })
  }

  getDevices(theUrl){
    console.log('fetching: ', theUrl);
    return fetch(theUrl)
      .then((response) =>  response.json())
      .then((responseJson) => {
        this.setState({
          theDevices: responseJson,
        });
      }).catch(err => {
        console.log(err)
      })
  }

  getSensorData(e){
    //console.log('fetching data...');
    return fetch('https://api.smartcitizen.me/v0/devices/' + this.state.selectedDevice)
      .then((response) =>  response.json())
      .then((responseJson) => {
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
          // If we want to nullify data on errors
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
      console.log(1)
      navigator.geolocation.getCurrentPosition(function(position){
        x.innerHTML = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
        that.getDevicesNear(position.coords.latitude, position.coords.longitude)
      });
    }
  }

  getDevicesByTag(tag){
    console.log(tag)
    let url = '';
    if (typeof tag === 'string') {
      url = "https://api.smartcitizen.me/v0/devices?user_tags=" + tag;
    }else{
      url = "https://api.smartcitizen.me/v0/devices?user_tags=" + this.state.targetTag;
    }
    //console.log(url)
    this.getDevices(url)
  }
  getDevicesNear(lat,lng){
    //console.log('lat:', lat, lng)
    let url = "https://api.smartcitizen.me/v0/devices?near=" + lat + "," + lng
    this.getDevices(url)
  }

  getReading(deviceid, sensorid){

    let devid = 1616; //Default testing
    let sensid = 7; //Default test
    if(deviceid){
      console.log(deviceid)
      devid = deviceid
    }
    if(sensorid){
      sensid = sensorid;
    }
    let url = "https://api.smartcitizen.me/v0/devices/" + devid +
      "/readings?sensor_id=" + sensid + "&rollup=4h&from=2015-07-28&to=2015-08-30";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          theReading: responseJson.readings
        })
      })
  }
  sendToChart(sensorid){
    // Do we need to send deviceid?  It lives with the parent state, selectedDevice
    console.log('sendToChart ', sensorid)
    this.getReading(this.state.selectedDevice, sensorid);
  }
  toggleShowDevices(){
    this.setState({isShowingDeviceList: !this.state.isShowingDeviceList})
  }

  toggleShowKitInfo(){
    this.setState({isShowingKitInfo: !this.state.isShowingKitInfo})
  }

  toggleShowWorldmap(){
    this.setState({isShowingWorldMap: !this.state.isShowingWorldMap})
  }

}

export default App;
