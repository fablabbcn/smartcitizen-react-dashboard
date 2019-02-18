import React, { Component } from 'react';
import './App.css';
import scklogo from './scklogo.svg'
import FavoriteDevices from './FavoriteDevices.js';
import KitSensors from './KitSensors.js';
import DeviceInfo from './DeviceInfo.js';
import DatePicker from "react-datepicker";
import NearDevices from './NearDevices.js';
import SckGraph from './SckGraph.js';
import Tags from './Tags.js';
import WorldMap from './WorldMap.js';
import WorldMapList from './WorldMapList.js';
import { FaBars, FaCaretDown, FaCalendarAlt, FaGlobeAfrica, FaGripVertical, FaRegStar, FaGlobe, FaList, FaStar,FaSearchLocation, FaTags, FaTimes, FaChartLine } from 'react-icons/fa';

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
      isShowingMenu: false,
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
      theInterval: [],
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
    this.getReadingsForAllSensors = this.getReadingsForAllSensors.bind(this);
    this.getDeviceInfo = this.getDeviceInfo.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getWorldMap = this.getWorldMap.bind(this);
    this.isFavoriteDevice = this.isFavoriteDevice.bind(this);
    this.removeFavoriteDevice = this.removeFavoriteDevice.bind(this);
    this.toggleFavoriteDevice = this.toggleFavoriteDevice.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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

            <div className="col-12 mt-2 d-flex justify-content-between align-items-center" onClick={this.toggleMenu}>
              <FaBars size={32} />
              <img src={scklogo} style={{height: '40px'}} alt="logo" />
            </div>

            {this.state.isShowingMenu &&
            <div className="col-10 col-sm-6 col-md-6 col-lg-4 col-xl-3 sc-navbar border-right border-bottom fixed-top">
              <div onClick={this.toggleMenu} className="my-3">
                <FaTimes size={32} />
              </div>
              <h3 className="text-center">
                Kit
                <input
                  className="w-50 text-center mx-2 p-0"
                  style={{border:"none", borderRadius: "30px" }}
                  type="text" onChange={this.changeTargetIdInput}
                  value={this.state.selectedDevice}
                />

                <div className="d-inline" onClick={() => this.toggleFavoriteDevice(this.state.selectedDevice)} >
                  {this.isFavoriteDevice(this.state.selectedDevice) ?
                    <FaStar color={'orange'}/> :
                    <FaRegStar/>
                  }
                </div>
              </h3>

              <ul className="m-0 p-0 list-unstyled">
                <li onClick={this.toggleShowFavorites} className={"mt-1 " + (this.state.isShowingFavorites ? "bg-grey" : "")}>
                  <h5 className="p-2"> <FaStar /> Favorite Devices <FaCaretDown/> </h5>
                </li>
                {this.state.isShowingFavorites &&
                  <FavoriteDevices devices={this.state.favoriteDevices} changeSelectedDevice={this.changeSelectedDevice}/>
                }
                <li onClick={this.toggleShowWorldmap} className={"mt-1 " + (this.state.isShowingWorldMap ? "bg-grey" : "")}>
                  <h5 className="p-2"> <FaGlobeAfrica /> World Map </h5>
                </li>

                <li onClick={this.toggleShowLive} className={"mt-1 " + (this.state.isShowingLive ? "bg-grey" : "")}>
                  <h5 className="p-2"> <FaGripVertical /> Dashboard <FaCaretDown/> </h5>
                </li>

                {this.state.isShowingLive &&
                  <div className="p-3">
                    <div className="form-check">
                      <input className="form-check-input" id="check-show-kit-info" type="checkbox" checked={this.state.isShowingKitInfo} onChange={this.toggleShowKitInfo} />
                      <label className="form-check-label" htmlFor="check-show-kit-info">Show Kit info</label>
                    </div>

                     <div className="form-check">
                      <input className="form-check-input" id="check-sensor-details" type="checkbox" checked={this.state.isShowingSensorDetails} onChange={this.toggleShowSensorDetails} />
                      <label className="form-check-label" htmlFor="check-sensor-details">Show Sensor details</label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" id="check-show-mini-plot" type="checkbox" checked={this.state.isShowingMiniPlot} onChange={this.toggleShowMiniPlot} />
                      <label className="form-check-label" htmlFor="check-show-mini-plot">Show MiniPlot</label>
                    </div>
                 </div>
                }

                <li onClick={this.toggleShowGraph} className={"my-1 " + (this.state.isShowingGraph ? "bg-grey" : "")}>
                  <h5 className="p-2"> <FaChartLine /> Big Graph </h5>
                </li>
              </ul>
            </div>
            }


            {this.state.isShowingWorldMap &&
              <div className="col-12 col-xl my-3 sck-router">
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
               <div className="col-12 col-md ml-auto text-right">
                  <p className="d-inline mr-2 m-0">{this.state.theData['recorded_at']}</p>
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
                {this.state.theSensors.length > 0 ? (
                  this.state.theSensors.map((item, key) => {
                    return(
                      <KitSensors
                        sensorinfo={item}
                        x={item.x}
                        y={item.y}
                        key={'' + this.state.selectedDevice + key }
                        showDetails={this.state.isShowingSensorDetails}
                        showMiniPlot={this.state.isShowingMiniPlot}
                        changeSelectedSensor={this.changeSelectedSensor}
                        selectedSensor={this.state.selectedSensor}
                      />
                    )
                  })
                ) : (
                  <div>Loading...</div>
                )}
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

    // If last device had data (and not an incorrect device like '33FX'
    if(localStorage.getItem("hasData") === 'true' ){
      this.setState({selectedDevice: JSON.parse(localStorage.selectedDevice)}, () => {
        // Get info (like sensors list) AFTER selectedDevice is put into state
        this.getDeviceInfo();
      })
    }else{
      // Using the default device 2440
      this.getDeviceInfo();
    }
    //this.getGeoLocation();
    //this.getReading();
    this.getTags();

    var that = this;

    // Refresh Data + Graphs every X sec
    this.theInterval = setInterval(function(){
      that.getDeviceInfo();
    }, 60000);
  }

  componendWillUnmount(){
    clearInterval(this.theInterval);
  }

  componentDidUpdate(prevProps, prevState){
    // After any prop or state change:
    // Save fave devices to a localStorage object, to survive reloads of the page
    localStorage.setItem('favoriteDevices', JSON.stringify(this.state.favoriteDevices))
    localStorage.setItem('isShowingFavorites', JSON.stringify(this.state.isShowingFavorites))
    localStorage.setItem('isShowingLive', JSON.stringify(this.state.isShowingLive))
    localStorage.setItem('isShowingGraph', JSON.stringify(this.state.isShowingGraph))
    localStorage.setItem('isShowingWorldMap', JSON.stringify(this.state.isShowingWorldMap))
    localStorage.setItem('isShowingMiniPlot', JSON.stringify(this.state.isShowingMiniPlot))
    localStorage.setItem('selectedDevice', JSON.stringify(this.state.selectedDevice))
    localStorage.setItem('hasData', JSON.stringify(this.state.hasData))
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
    if(this.state.favoriteDevices.includes(parseInt(deviceId, 10))) {
      //console.log('Device is favorite', deviceId)
      return true;
    }
    return false;
  }

  removeFavoriteDevice(deviceId){
    let newArr = this.state.favoriteDevices;
    let index = newArr.indexOf(parseInt(deviceId, 10));

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

  // Triggered on EVERY key input in the Kit input field
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
          //console.log('done, now get readings');
          this.getReadingsForAllSensors();
        });

      }).catch(err => {
        console.log(err)
        this.setState({
          hasData: false,
          // If we want to nullify data on errors
          owner: [],
          theData: [],
          theSensors: [],
          theKit: [],
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

  // Gets ONE reading for the selectedDevice and selectedSensor and
  // saves it to state.theReading which is used by the BIG GRAPH <SckGraph>
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

  getReadingsForAllSensors(){
    console.log('get reading for ALL sensors, and jaming them into theSensors (without using state)');
    let from_date = (this.state.selectedFromDate).toISOString().slice(0,10);
    let to_date = (this.state.selectedToDate).toISOString().slice(0,10);

    var device = this.state.selectedDevice;
    var that = this;

    this.state.theSensors.forEach(function(sensor){
      let xxx = [];
      let yyy = [];

      let url = "https://api.smartcitizen.me/v0/devices/" + device +
        "/readings?sensor_id=" + sensor.id + "&rollup=1h&from=" + from_date +
        "&to=" + to_date;
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.readings) {
            //console.log(responseJson.readings);
            responseJson.readings.forEach(([x, y]) => {
              xxx.push(x)
              yyy.push(y)
            })

            // TODO: here we are not using the correct method of adding the arrays to state object
            sensor.x = xxx;
            sensor.y = yyy;
            //that.setState({ theSensors: {x: xxx} })
            that.setState(prevState => ({
              //theSensors: [...prevState, xxx, yyy]
            }))
          }
        }).catch(err => {
          console.log( err)
        })

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

  toggleMenu(){
    this.setState({isShowingMenu: !this.state.isShowingMenu})
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
