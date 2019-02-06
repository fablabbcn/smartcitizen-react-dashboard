import React, { Component } from 'react';
import './App.css';
import FavoriteDevices from './FavoriteDevices.js';
import KitSensors from './KitSensors.js';
import DeviceInfo from './DeviceInfo.js';
import DatePicker from "react-datepicker";
import NearDevices from './NearDevices.js';
import SckGraph from './SckGraph.js';
import Tags from './Tags.js';
import WorldMap from './WorldMap.js';
import WorldMapList from './WorldMapList.js';
import { FaCalendarAlt, FaGlobeAfrica, FaGripVertical, FaRegStar, FaGlobe, FaList, FaStar,FaSearchLocation, FaTags, FaChartLine } from 'react-icons/fa';

import "react-datepicker/dist/react-datepicker.css";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      favoriteDevices: [],
      hasData: false,
      isShowingDeviceList: false,
      isShowingFavorites: false,
      isShowingGraph: false,
      isShowingKitInfo: false,
      isShowingLive: true,
      isShowingMiniPlot: true,
      isShowingSensorDetails: false,
      isShowingWorldMap: false,
      owner: [],
      selectedDevice: 2440,
      selectedSensor: 7,
      selectedFromDate: new Date(new Date().setDate(new Date().getDate()-2)),
      selectedToDate: new Date(),
      selectedTag: [],
      theData: [],
      theDevices: [],
      theKit: [],
      theReading: [],
      theSensors: [],
      theTags: [],
      userLat: [],
      userLong: [],
      world_map: []
    };
    this.addFavoriteDevice = this.addFavoriteDevice.bind(this);
    this.adjustGraph = this.adjustGraph.bind(this);
    this.changeSelectedDevice = this.changeSelectedDevice.bind(this);
    this.changeSelectedSensor = this.changeSelectedSensor.bind(this);
    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeToDate = this.changeToDate.bind(this);
    this.changeTargetIdInput = this.changeTargetIdInput.bind(this);
    this.changeTag = this.changeTag.bind(this);
    this.getDevices = this.getDevices.bind(this);
    this.getDevicesByTag = this.getDevicesByTag.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.getReading = this.getReading.bind(this);
    this.getDeviceInfo = this.getDeviceInfo.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getWorldMap = this.getWorldMap.bind(this);
    this.isFavoriteDevice = this.isFavoriteDevice.bind(this);
    this.removeFavoriteDevice = this.removeFavoriteDevice.bind(this);
    this.toggleFavoriteDevice = this.toggleFavoriteDevice.bind(this);
    this.toggleShowDevices = this.toggleShowDevices.bind(this);
    this.toggleShowFavorites = this.toggleShowFavorites.bind(this);
    this.toggleShowGraph = this.toggleShowGraph.bind(this);
    this.toggleShowKitInfo = this.toggleShowKitInfo.bind(this);
    this.toggleShowWorldmap = this.toggleShowWorldmap.bind(this);
    this.toggleShowLive = this.toggleShowLive.bind(this);
    this.toggleShowSensorDetails = this.toggleShowSensorDetails.bind(this);
    this.toggleShowMiniPlot = this.toggleShowMiniPlot.bind(this);

  }

  render() {

    return (

      <div className="container-fluid">
        <Router>
          <div className="row main">
            <div className="col-12 col-md-4 mx-auto text-center sck-navbar fixed-top">
              <ul className="list-inline">
                <li onClick={this.toggleShowFavorites} className={"list-inline-item sc-nav-item " + (this.state.isShowingFavorites ? "bg-yellow" : "bg-grey")}>
                  <h3 className="m-2"> <FaStar /> </h3>
                </li>
                <li onClick={this.toggleShowWorldmap} className={"list-inline-item sc-nav-item " + (this.state.isShowingWorldMap ? "bg-yellow" : "bg-grey")}>
                  <h3 className="m-2"> <FaGlobeAfrica /> </h3>
                </li>
                <li onClick={this.toggleShowLive} className={"list-inline-item sc-nav-item " + (this.state.isShowingLive ? "bg-yellow" : "bg-grey")}>
                  <h3 className="m-2"> <FaGripVertical /> </h3>
                </li>
                <li onClick={this.toggleShowGraph} className={"list-inline-item sc-nav-item " + (this.state.isShowingGraph ? "bg-yellow" : "bg-grey")}>
                  <h3 className="m-2"> <FaChartLine /> </h3>
                </li>
              </ul>
            </div>
            <div className="col-12 empty" style={{height:'55px'}}>&nbsp;</div>

            {this.state.isShowingFavorites &&
              <div className="col-12 col-xl-3 mb-3 sck-router">
                <FavoriteDevices devices={this.state.favoriteDevices} changeSelectedDevice={this.changeSelectedDevice}/>
              </div>
            }

            {this.state.isShowingWorldMap &&
              <div className="col-12 col-xl mb-3 sck-router">
                {this.state.isShowingWorldMap &&
                  <div className="border p-2">
                    <ul className="list-inline">
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/nearby"><FaSearchLocation /> Nearby</NavLink> </li>
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/map"><FaGlobe /> WorldMap</NavLink> </li>
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/maplist"><FaList /> WorldMapList</NavLink> </li>
                      <li className="list-inline-item"> <NavLink activeClassName="nav-active" to="/tags"><FaTags /> Tags</NavLink> </li>
                    </ul>

                    <p>(React Router - This is a work in progress!)</p>
                    <Route path="/map"      render={() => <WorldMap />}/>
                    <Route path="/maplist"  render={() => <WorldMapList
                      data={this.state.world_map}
                      changeSelectedDevice={this.changeSelectedDevice}
                      getAll={this.getWorldMap} /> } />
                    <Route path="/nearby"   render={() => <NearDevices
                      data={this.state.theDevices}
                      getAll={this.getGeoLocation}
                      changeSelectedDevice={this.changeSelectedDevice}
                      userLat={this.state.userLat}
                      userLong={this.state.userLong} /> } />
                    <Route path="/tags"     render={() => <Tags devices={this.state.theDevices}
                      getDevicesByTag={this.getDevicesByTag}
                      tags={this.state.theTags}
                      getTags={this.getTags}
                      changeTag={this.changeTag}
                      changeSelectedDevice={this.changeSelectedDevice}
                      selectedTag={this.state.selectedTag} /> } />
                  </div>
                }
              </div>
            }

            {this.state.isShowingLive &&
            <div className="col-12 mb-3">
              <div className="row d-flex">
                <div className="col-12 col-md-4">
                  <h3 className="">
                    Kit
                    <input className="w-50 text-center mx-2" type="text" onChange={this.changeTargetIdInput} value={this.state.selectedDevice}/>

                    <div className="d-inline" onClick={() => this.toggleFavoriteDevice(this.state.selectedDevice)} >
                      {this.isFavoriteDevice(this.state.selectedDevice) ?
                        <FaStar color={'orange'}/> :
                        <FaRegStar/>
                      }
                    </div>
                  </h3>
                </div>
                <div className="col-12 col-md ml-auto text-right">
                  <p className="d-inline mr-2 m-0"><b>recorded_at:</b> {this.state.theData['recorded_at']}</p>
                  <button className={"btn btn-sm m-1 " + (this.state.isShowingMiniPlot? "bg-grey" : "btn-outline-secondary")}
                    onClick={this.toggleShowMiniPlot} > {this.state.isShowingMiniPlot ? 'Hide' : 'Show'} Sensor MiniPlot
                  </button>
                  <button className={"btn btn-sm m-1 " + (this.state.isShowingSensorDetails? "bg-grey" : "btn-outline-secondary")}
                    onClick={this.toggleShowSensorDetails} > {this.state.isShowingSensorDetails ? 'Hide' : 'Show'} Sensor Details
                  </button>
                  <button className={"btn btn-sm m-1 " + (this.state.isShowingKitInfo? "bg-grey" : "btn-outline-secondary")}
                    onClick={this.toggleShowKitInfo} > {this.state.isShowingKitInfo ? 'Hide' : 'Show'} Kit & User Info
                  </button>
                </div>
              </div>
              {this.state.isShowingKitInfo &&
                <DeviceInfo kit={this.state.theKit} owner={this.state.owner} />
              }
              {!this.state.hasData &&
                <p className={"text-center m-0" + (this.state.hasData ? " bg-green" : " bg-red") }>
                {this.state.hasData ? 'Showing data for device' : 'No Data found for device'} {this.state.selectedDevice}
                </p>
              }
              <div className="row">
                {
                  this.state.theSensors.map((item, key) => {
                    return(
                      <KitSensors
                        sensorinfo={item}
                        key={'' + this.state.selectedDevice + key }
                        from_date={(this.state.selectedFromDate).toISOString().slice(0,10)}
                        to_date={(this.state.selectedToDate).toISOString().slice(0,10)}
                        showDetails={this.state.isShowingSensorDetails}
                        showMiniPlot={this.state.isShowingMiniPlot}
                        changeSelectedSensor={this.changeSelectedSensor}
                        selectedDevice={this.state.selectedDevice}
                      />
                    )
                  })
                }
              </div>
            </div>
            }

            {this.state.isShowingGraph &&
              <div className="col-12 mb-5 pb-5">
                <div className="row">
                  <div className="col-12 col-xl-2">
                    <div className="btn btn-group">
                      <button className="btn btn-sm btn-outline-secondary d-block ml-auto" onClick={() => this.adjustGraph('123456789')}>Last 24h</button>
                      <button className="btn btn-sm btn-outline-secondary d-block ml-auto" onClick={() => this.adjustGraph('623456789')}>Last week</button>
                      <button className="btn btn-sm btn-outline-secondary d-block ml-auto" onClick={() => this.adjustGraph('2523456789')}>Last month</button>
                    </div>
                    <span className="d-block"><FaCalendarAlt /> From:</span>
                    <DatePicker className="form-control " placeholderText="From" selected={this.state.selectedFromDate} onChange={this.changeFromDate} />
                    <span className="d-block"><FaCalendarAlt /> To:</span>
                    <DatePicker className="form-control " placeholderText="From" selected={this.state.selectedToDate} onChange={this.changeToDate} />
                  </div>
                  <div className="col-12 col-xl-10 ">
                    <SckGraph data={this.state.theReading} />
                  </div>
                </div>
              </div>
            }

            {/* end row */}
          </div>
        </Router>
      </div>
    );
  }


  componentDidMount(){
   // Add fav devices, if they exist in localstorage
    if(localStorage.favoriteDevices){
      this.setState({favoriteDevices: JSON.parse(localStorage.favoriteDevices)})
    }
    if(localStorage.isShowingFavorites){
      this.setState({isShowingFavorites: JSON.parse(localStorage.isShowingFavorites)})
    }
    if(localStorage.isShowingGraph){
      this.setState({isShowingGraph: JSON.parse(localStorage.isShowingGraph)})
    }
    if(localStorage.isShowingLive){
      this.setState({isShowingLive: JSON.parse(localStorage.isShowingLive)})
    }
    if(localStorage.isShowingWorldMap){
      this.setState({isShowingWorldMap: JSON.parse(localStorage.isShowingWorldMap)})
    }
    if(localStorage.isShowingMiniPlot){
      this.setState({isShowingMiniPlot: JSON.parse(localStorage.isShowingMiniPlot)})
    }

    if(localStorage.selectedDevice !== 'undefined'){
      this.setState({selectedDevice: JSON.parse(localStorage.selectedDevice)}, () => {
        // Make sure we have put the new selectedDevice into state, before getting data
        this.getDeviceInfo();
      })
    }else{
      this.getDeviceInfo();
    }
    //this.getGeoLocation();
    this.getReading();
    this.getTags();
  }
  componentDidUpdate(prevProps, prevState){
    // After any prop or state change:
    // Save fave devices to a localStorage object, to survive reloads of the page
    localStorage.setItem('favoriteDevices', JSON.stringify(this.state.favoriteDevices))
    localStorage.setItem('isShowingFavorites', JSON.stringify(this.state.isShowingFavorites))
    localStorage.setItem('isShowingLive', JSON.stringify(this.state.isShowingLive))
    localStorage.setItem('isShowingGraph', JSON.stringify(this.state.isShowingGraph))
    localStorage.setItem('isShowingWorldMap', JSON.stringify(this.state.isShowingWorldMap))
    localStorage.setItem('selectedDevice', JSON.stringify(this.state.selectedDevice))
  }

  addFavoriteDevice(deviceId){
    this.setState(prevState => ({
      favoriteDevices: [ ...prevState.favoriteDevices, parseInt(deviceId, 10) ]
    }));
  }

  adjustGraph(range = 123456789){
    this.setState({
      selectedFromDate: new Date(new Date(this.state.theData['recorded_at']) - range ),
      selectedToDate: new Date(this.state.theData['recorded_at']),
    }, () => {
      this.getReading();
    });
  }

  isFavoriteDevice(deviceId){
    if(this.state.favoriteDevices.includes(parseInt(deviceId))) {
      //console.log('Device is favorite', deviceId)
      return true;
    }
    return false;
  }

  removeFavoriteDevice(deviceId){
    let newArr = this.state.favoriteDevices;
    let index = newArr.indexOf(parseInt(deviceId));

    if (index > -1) {
      newArr.splice(index, 1);
      this.setState({ favoriteDevices: newArr });
    }
  }

  changeFromDate(date){
    this.setState({selectedFromDate: date}, () => {
      this.getReading();
    });
  }
  changeToDate(date){
    this.setState({selectedToDate: date}, () => {
      this.getReading();
    });
  }

  changeSelectedDevice(id){
    console.log('changeSelectedDevice to:', id);
    this.setState({selectedDevice: id}, () => {
      this.getDeviceInfo();
    });
  }

  // Triggered on every key input in the Kit input field
  changeTargetIdInput(event){
    this.setState({selectedDevice: event.target.value}, () => {
      this.getDeviceInfo()
    })
  }

  changeTag(selectedTag){
    this.setState({ selectedTag: selectedTag.label });
    this.getDevicesByTag(selectedTag.value)
    //console.log(`Option selected:`, selectedTag);
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
    console.log('getDevices: ', theUrl);
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

  // Gets user info etc about device
  getDeviceInfo(e){
    console.log('getDeviceInfo for selectedDevice...', this.state.selectedDevice);
    return fetch('https://api.smartcitizen.me/v0/devices/' + this.state.selectedDevice)
      .then((response) =>  response.json())
      .then((responseJson) => {
        this.setState({
          hasData: true,
          owner: responseJson.owner,
          theData: responseJson.data,
          theSensors: responseJson.data.sensors,
          theKit: responseJson.kit,
        }, () => {
          // TODO: now it is safe to get the readings
          //console.log('done');
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
    var that = this;

    if (navigator.geolocation) {
      //console.log('Navigator works')
      navigator.geolocation.getCurrentPosition(function(position){
        that.setState({
          userLat: position.coords.latitude,
          userLong:  position.coords.longitude
        })
        that.getDevicesNear(position.coords.latitude, position.coords.longitude)
      });
    }
  }

  getDevicesByTag(tag){
    console.log('getDevicesByTag: ', tag)
    let url = '';
    url = "https://api.smartcitizen.me/v0/devices?with_tags=" + tag;
    //console.log(url)
    this.getDevices(url)
  }
  getDevicesNear(lat,lng){
    //console.log('lat:', lat, lng)
    let url = "https://api.smartcitizen.me/v0/devices?near=" + lat + "," + lng
    this.getDevices(url)
  }

  // Gets ONE reading for the selectedDevise and selectedSensor
  getReading(){
    console.log('getReading (one) for dev:', this.state.selectedDevice, ' sens: ', this.state.selectedSensor);
    let from_date = (this.state.selectedFromDate).toISOString().slice(0,10);
    let to_date = (this.state.selectedToDate).toISOString().slice(0,10);

    let url = "https://api.smartcitizen.me/v0/devices/" + this.state.selectedDevice +
      "/readings?sensor_id=" + this.state.selectedSensor + "&rollup=4h&from=" + from_date +
      "&to=" + to_date;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          theReading: responseJson.readings
        })
      }).catch(err => {
        console.log(err)
      })

  }

  getTags(){
    let theUrl = 'https://api.smartcitizen.me/v0/tags';
    //console.log('getTags: ', theUrl);
    return fetch(theUrl)
      .then((response) =>  response.json())
      .then((responseJson) => {
        this.setState({ theTags: responseJson });
      }).catch(err => {
        console.log(err);
      })
  }

  changeSelectedSensor(sensorid){
    console.log('changeSelectedSensor ', sensorid);
    this.setState({selectedSensor: sensorid}, () => {
      this.getReading();
    });
  }

  toggleFavoriteDevice(deviceId){
    if(this.isFavoriteDevice(deviceId)){
      this.removeFavoriteDevice(deviceId);
    }else{
      this.addFavoriteDevice(deviceId);
    }
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

  toggleShowFavorites(){
    this.setState({isShowingFavorites: !this.state.isShowingFavorites})
  }

  toggleShowGraph(){
    this.setState({isShowingGraph: !this.state.isShowingGraph})
  }

  toggleShowLive(){
    this.setState({isShowingLive: !this.state.isShowingLive})
  }

  toggleShowSensorDetails(){
    this.setState({isShowingSensorDetails: !this.state.isShowingSensorDetails})
  }

  toggleShowMiniPlot(){
    this.setState({isShowingMiniPlot: !this.state.isShowingMiniPlot})
  }

}

export default App;
