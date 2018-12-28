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
import { FaGlobeAfrica, FaGripVertical, FaMap, FaRegStar, FaStar, FaChartLine } from 'react-icons/fa';



import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      favoriteDevices: [],
      hasData: false,
      isShowingDeviceList: true,
      isShowingFavorites: false,
      isShowingGraph: true,
      isShowingKitInfo: false,
      isShowingLive: true,
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
    this.toggleShowFavorites = this.toggleShowFavorites.bind(this);
    this.toggleShowGraph = this.toggleShowGraph.bind(this);
    this.toggleShowKitInfo = this.toggleShowKitInfo.bind(this);
    this.toggleShowWorldmap = this.toggleShowWorldmap.bind(this);
    this.toggleShowLive = this.toggleShowLive.bind(this);

  }

  render() {

    return (

      <div className="container-fluid">
        <Router>
          <div className="row main">
            <div className="col-md-12 sck-navbar">
              <ul className="list-inline">
                <li className={"list-inline-item " + (this.state.isShowingFavorites ? "bg-dark" : "bg-light")}>
                  <h3 onClick={this.toggleShowFavorites} className="m-2"> <FaStar /> </h3>
                </li>
                <li className={"list-inline-item " + (this.state.isShowingWorldMap ? "bg-dark" : "bg-light")}>
                  <h3 onClick={this.toggleShowWorldmap} className="m-2"> <FaGlobeAfrica /> </h3>
                </li>
                <li className={"list-inline-item " + (this.state.isShowingLive ? "bg-dark" : "bg-light")}>
                  <h3 onClick={this.toggleShowLive} className="m-2"> <FaGripVertical /> </h3>
                </li>
                <li className={"list-inline-item " + (this.state.isShowingGraph ? "bg-dark" : "bg-light")}>
                  <h3 onClick={this.toggleShowGraph} className="m-2"> <FaChartLine /> </h3>
                </li>
              </ul>
            </div>

            {(this.state.isShowingWorldMap || this.state.isShowingFavorites) &&
              <div className="col-12 col-md-6 col-xl-3 sck-router ">
                {this.state.isShowingFavorites &&
                  <div className="favorite-devices p-2">
                    <h3>Favorite Devices: </h3>
                    {
                      this.state.favoriteDevices.map((item, key) => {
                        return(
                            <button className="btn btn-sm bg-yellow m-2" onClick={() => this.changeTargetId(item)}  key={key}>{item}</button>
                            )
                      })
                    }
                  </div>
                }

                {this.state.isShowingWorldMap &&
                  <div className="border p-2">
                    <ul className="list-inline">
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/nearby">Nearby</NavLink> </li>
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/map">WorldMap</NavLink> </li>
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/maplist">WorldMapList</NavLink> </li>
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/tags">Tags</NavLink> </li>
                    </ul>

                    <p>(React Router - This is a work in progress!)</p>
                    <Route path="/" exact   render={() => <NearDevices data={this.state.theDevices} handler={this.changeTargetId} getAll={this.getGeoLocation} /> } />
                    <Route path="/map"      render={() => <WorldMap />}/>
                    <Route path="/maplist"  render={() => <WorldMapList data={this.state.world_map} handler={this.changeTargetId} getAll={this.getWorldMap} /> } />
                    <Route path="/nearby"   render={() => <NearDevices data={this.state.theDevices} handler={this.changeTargetId} getAll={this.getGeoLocation} /> } />
                    <Route path="/tags"     render={() => <Tags getDevicesByTag={this.getDevicesByTag} /> } />
                  </div>
                }
              </div>
            }

            <div className="col-12 col-md-6 col-xl-4">
              <div className="row">
                <div className="col-12 border-top pt-2">
                 <h3 className="text-center">
                    Kit
                    <input className="w-25 text-center mx-1" type="text" onChange={this.changeTargetIdInput} value={this.state.selectedDevice}/>
                    Sensors

                    <div className="d-inline" onClick={() => this.toggleFavoriteDevice(this.state.selectedDevice)} >
                      {this.isFavoriteDevice(this.state.selectedDevice) ?
                        <FaStar color={'orange'}/> :
                        <FaRegStar/>
                      }
                    </div>
                  </h3>
                  <button className={"btn btn-sm d-block ml-auto my-1 " + (this.state.isShowingKitInfo? "bg-grey" : "btn-outline-secondary")}
                    onClick={this.toggleShowKitInfo} > {this.state.isShowingKitInfo ? 'Hide' : 'Show'} Kit & User Info
                  </button>
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
                  <p className={"text-center " + (this.state.hasData ? " bg-green" : " bg-red") }> {this.state.hasData ? 'Showing data for device' : 'No Data found for device'} {this.state.selectedDevice}</p>
                  <p>Last recorded at: {this.state.theData['recorded_at']}</p>
                </div>
                {this.state.isShowingLive &&
                  this.state.theSensors.map((item, key) => {
                    return(
                      <KitSensors data={item} key={key} sendToChart={this.sendToChart}/>
                    )
                  })
                }
              </div>
            </div>

            {this.state.isShowingGraph &&
              <div className="col-12 col-md-6 col-xl-4">
                <SckGraph data={this.state.theReading} />
              </div>
            }

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

    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1) //Epoch

    let from_date = new Date(yesterday).toISOString().slice(0,10);
    let to_date = new Date().toISOString().slice(0,10);


    let url = "https://api.smartcitizen.me/v0/devices/" + devid +
      "/readings?sensor_id=" + sensid + "&rollup=4h&from=" + from_date +
      "&to=" + to_date;
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
    console.log('show worldmap', this.state.isShowingWorldMap)
  }

  toggleShowFavorites(){
    this.setState({isShowingFavorites: !this.state.isShowingFavorites})
    console.log('show fav', this.state.isShowingFavorites)
  }

  toggleShowGraph(){
    this.setState({isShowingGraph: !this.state.isShowingGraph})
    console.log('show Graph', this.state.isShowingGraph)
  }

  toggleShowLive(){
    this.setState({isShowingLive: !this.state.isShowingLive})
    console.log('show live', this.state.isShowingLive)
  }

}

export default App;
