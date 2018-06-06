import React, { Component } from 'react';
import './App.css';
import KitSensors from './KitSensors.js';
import KitOwner from './KitOwner.js';
import KitInfo from './KitInfo.js';
import KitList from './KitList.js';

import Plot from 'react-plotly.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasData: false,
      targetId: 2440,
      targetTag: '',
      isShowingKitInfo: false,
      isShowingDeviceList: true,
      owner: [],
      theData: [],
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
    this.toggleShowDevices = this.toggleShowDevices.bind(this);
    this.toggleShowKitInfo = this.toggleShowKitInfo.bind(this);

    this.updateSelectedDevice = this.updateSelectedDevice.bind(this);
  }

  render() {

    let xxx = [];
    let yyy = [];

    this.state.theReading.forEach(([x, y]) => {
      xxx.push(x)
      yyy.push(y)
    })

    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-12 text-center">
            <Plot
              data={[ {type: 'bar', x: xxx, y: yyy}, ]}
              layout={{width: 820, height: 440, title: 'A test Plot for device 1616'}}
            />
            <hr />
          </div>
        </div>

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

            <button className="btn bg-blue mr-1" onClick={this.getGeoLocation}>Get nearby Devices</button>
            <button className="btn bg-blue mr-1" onClick={this.getDevices}>Get ALL Devices</button>
            <button className="btn bg-grey mr-1" onClick={() => this.getDevicesByTag('Streamr')}>Streamr Tag</button>
            <button className="btn bg-grey mr-1" onClick={() => this.getDevicesByTag('Amsterdam')}>Amsterdam Tag</button>
            <div id="geo">(geolocation will appear here)</div>

            <div className="row">
              <div className="col-12 text-right">
                <input type="text" onChange={this.changeTargetTag} value={this.state.targetTag}/>
                <button className="btn bg-black my-1" onClick={this.getDevicesByTag}> Get tag </button>
                <br />
                <button className={"btn bg-black my-1 " + (this.state.isShowingDeviceList ? 'bg-grey' : 'bg-black' ) }
                  onClick={this.toggleShowDevices} > {this.state.isShowingDeviceList ? 'Hide' : 'Show'} Devices ({this.state.theDevices.length} items)</button>
              </div>
            </div>

            {this.state.isShowingDeviceList &&
                <KitList data={this.state.theDevices} handler={this.updateSelectedDevice}/>
            }

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

  getDevices(myurl){
    // If no myurl is given (is not a string), search the world_map
    let theUrl = 'https://api.smartcitizen.me/v0/devices/world_map'
    if (typeof myurl === 'string'){
      theUrl = myurl;
    }

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
    let url = "https://api.smartcitizen.me/v0/devices?near=" + lat + "," + lng
    // console.log(url)
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

}

export default App;
