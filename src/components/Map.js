import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Geocode from "react-geocode";
import { Descriptions, Badge } from "antd";
import "antd/dist/antd.css";
import AutoComplete from "react-google-autocomplete";

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);

const mapURL = `https://maps.googleapis.com/maps/api/js?&address=187+Funes de bonet&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GEOCODE_KEY}`;

export class Map extends React.Component {
  state = {
    direccion: "",
    cuidad: "",
    zoom: "15",
    height: "400",
    mapPosition: {
      lat: -31.420488,
      lng: -64.188494,
    },
    markerPosition: {
      lat: -31.420488,
      lng: -64.188494,
    },
  };

  getCity = (adressArray) => {
    let city = "";
    for (let index = 0; index < adressArray.length; index++) {
      if (
        adressArray[index].types[0] &&
        "administrative_area_level_2" === adressArray[index].types[0]
      ) {
        city = adressArray[index].long_name;
        return city;
      }
    }
  };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const direccion = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        cuidad = this.getCity(addressArray);

      this.setState({
        direccion: direccion ? direccion : "",
        cuidad: cuidad ? cuidad : "",
        mapPosition: {
          lat: newLat,
          lng: newLng,
        },
        markerPosition: {
          lat: newLat,
          lng: newLng,
        },
      });
    });
    // console.log(`newlat:${newLat}, newLng:${newLng}`);
  };

  onPlaceSelected = (place) => {
    const direccion = place.formatted_address,
      addressArray = place.address_components,
      cuidad = this.getCity(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    this.setState({
      direccion: direccion ? direccion : "",
      cuidad: cuidad ? cuidad : "",
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          >
            {this.state.direccion != "" ? (
              <InfoWindow>
                <div>{this.state.direccion}</div>
              </InfoWindow>
            ) : (
              ""
            )}
          </Marker>
          <AutoComplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: 16,
              marginTop: 2,
              marginBottom: "15px",
            }}
            // types={["(regions)"]}
            onPlaceSelected={this.onPlaceSelected}
          />
        </GoogleMap>
      ))
    );

    return (
      <div className="mb-5">
        <Descriptions bordered>
          <Descriptions.Item label="Cuidad">
            {this.state.cuidad}
          </Descriptions.Item>
          <Descriptions.Item label="Direccion">
            {this.state.direccion}
          </Descriptions.Item>
        </Descriptions>
        <MapWithAMarker
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%`, borderRadius: "8px" }} />}
        />
      </div>
    );
  }
}
