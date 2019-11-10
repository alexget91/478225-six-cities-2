import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {cityData, displayType} from "../../common/global-prop-types";

const MAP_CLASS = {
  offer: `property__map`,
  list: `cities__map`,
};

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.cityCoords = null;
    this.zoom = 12;
    this.map = null;
    this.icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });
    this.iconActive = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [27, 39]
    });
    this.layerGroup = null;
  }

  render() {
    const {mapType} = this.props;
    return <section id="map" className={`${MAP_CLASS[mapType]} map`}></section>;
  }

  componentDidMount() {
    this._setCityParams();
    this._initMap();
    this._showMapForCity();
  }

  componentDidUpdate() {
    this._setCityParams();
    this._showMapForCity();
  }

  _setCityParams() {
    const {city} = this.props;

    this.cityCoords = [city.location.latitude, city.location.longitude];
    this.zoom = city.location.zoom || this.zoom;
  }

  _initMap() {
    this.map = leaflet.map(`map`, {
      center: this.cityCoords,
      zoom: this.zoom,
      zoomControl: false,
      marker: true
    });

    this.layerGroup = leaflet.layerGroup().addTo(this.map);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
  }

  _showMapForCity() {
    const {offerPins} = this.props;

    this.map.setView(this.cityCoords, this.zoom);
    this.layerGroup.clearLayers();

    offerPins.map((pin) => {
      leaflet
        .marker(pin.coords, {icon: pin.isActive ? this.iconActive : this.icon})
        .addTo(this.layerGroup);
    });
  }
}

Map.propTypes = {
  city: PropTypes.exact(cityData).isRequired,
  offerPins: PropTypes.arrayOf(PropTypes.exact({
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    isActive: PropTypes.bool,
  })).isRequired,
  mapType: displayType
};

export default Map;
