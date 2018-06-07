import React, { Component } from 'react';
import './App.css';
import KitSensors from './KitSensors.js';
import KitOwner from './KitOwner.js';
import KitInfo from './KitInfo.js';
import NearDevices from './NearDevices.js';
import SckGraph from './SckGraph.js';
import WorldMap from './WorldMap.js';
import WorldMapList from './WorldMapList.js';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasData: false,
      targetId: 2440,
      targetTag: '',
      isShowingKitInfo: false,
      isShowingDeviceList: true,
      isShowingWorldMap: false,
      owner: [],
      theData: [],
      world_map: [],
      theDevices: [],
      theKit: [],
      theReading: [],
      theSensors: []
    };
    this.changeTargetId = this.changeTargetId.bind(this);
    this.changeTargetTag = this.changeTargetTag.bind(this);
    this.getDevices = this.getDevices.bind(this);
    this.getDevicesByTag = this.getDevicesByTag.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.getReading = this.getReading.bind(this);
    this.getSensorData = this.getSensorData.bind(this);
    this.getWorldMap = this.getWorldMap.bind(this);
    this.toggleShowDevices = this.toggleShowDevices.bind(this);
    this.toggleShowKitInfo = this.toggleShowKitInfo.bind(this);
    this.toggleShowWorldmap = this.toggleShowWorldmap.bind(this);

    this.updateSelectedDevice = this.updateSelectedDevice.bind(this);
  }

  render() {

    const Kits = ({ match }) => (
      <div>id {match.params.id}</div>
    )

    return (

      <div className="container-fluid">
        <Router>
          <div className="row">
            <div className="col-12">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/graph">Graph</Link>
                </li>
                <li>
                  <Link to="/map">WorldMap</Link>
                </li>
                <li>
                  <Link to="/maplist">WorldMapList</Link>
                </li>
                <li>
                  <Link to="/nearby">Nearby</Link>
                </li>
              </ul>
            </div>

              <hr />

              <Route exact path="/"   render={() => <h3>Home</h3>}/>
              <Route path="/kits/:id"    component={Kits} />
              <Route path="/graph"    render={() => <SckGraph data={this.state.theReading} />}/>
              <Route path="/map"      render={() => <WorldMap />}/>
              <Route path="/maplist"  render={() => <WorldMapList data={this.state.world_map} handler={this.updateSelectedDevice} getAll={this.getWorldMap} /> } />
              <Route path="/nearby"   render={() => <NearDevices data={this.state.theDevices} handler={this.updateSelectedDevice} getAll={this.getGeoLocation} /> } />
              <hr />
          </div>
        </Router>



        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 col-md-10 mx-auto text-center">
                <input type="text" onChange={this.changeTargetId} value={this.state.targetId}/>
                <button className="btn bg-black my-1" onClick={this.getSensorData}> Get id </button>
                <br />
                <p className={ "border " + (this.state.hasData ? " bg-green" : " bg-red") }> {this.state.hasData ? 'Showing data for device' : 'No Data found for device'} {this.state.targetId}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-12 text-right">
                <button className={"btn my-1 " + (this.state.isShowingKitInfo? "bg-grey" : "bg-black")}
                  onClick={this.toggleShowKitInfo} > {this.state.isShowingKitInfo ? 'Hide' : 'Show'} Kit & User Info </button>
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

            <button className="btn bg-grey mr-1" onClick={() => this.getDevicesByTag('Streamr')}>Streamr Tag</button>
            <button className="btn bg-grey mr-1" onClick={() => this.getDevicesByTag('Amsterdam')}>Amsterdam Tag</button>
            <div id="geo">(geolocation will appear here)</div>

            <div className="row">
              <div className="col-12 text-right">
                <input type="text" onChange={this.changeTargetTag} value={this.state.targetTag}/>
                <button className="btn bg-black my-1" onClick={this.getDevicesByTag}> Get tag </button>
                <br />
              </div>
            </div>


          </div>
        </div>

      </div>
    );
  }


  componentDidMount(){
    this.getSensorData();
    this.getReading();
    //this.getGeoLocation();
  }

  changeTargetId(event){
    this.setState({targetId: event.target.value}, () => {
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
    return fetch('https://api.smartcitizen.me/v0/devices/' + this.state.targetId)
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

  getReading(){
    let url = " https://api.smartcitizen.me/v0/devices/1616/readings?sensor_id=7&rollup=4h&from=2015-07-28&to=2015-08-30";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          theReading: responseJson.readings
        })
      })
  }

  updateSelectedDevice(id){
    console.log('click', id);
    this.setState({targetId: id}, () => {
      this.getSensorData();
    });
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
