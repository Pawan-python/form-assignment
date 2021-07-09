import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Component} from 'react';
import './personal.css';
const mapStyles = {
    width: '14.7cm',
    height: '3cm',
};
export class MapContainer extends Component {
    render() {
      return (
        <div className="map">
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 18.516726, lng: 73.856255}}
          />
          </div>
      );
    }
  }
export default GoogleApiWrapper({
 apiKey: 'AIzaSyBcDQunOtmgiBasQletubZcZMTSByUlTP0'
})(MapContainer);