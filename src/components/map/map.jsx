import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {displayType} from "../../common/global-prop-types";

const MAP_CLASS = {
  offer: `property__map`,
  list: `cities__map`,
};

class Map extends React.PureComponent {
  render() {
    return <section id="map" className={`${MAP_CLASS[this.props.mapType]} map`}></section>;
  }

  componentDidMount() {
    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });
    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    this.props.offerCords.map((pin) => {
      leaflet
        .marker(pin, {icon})
        .addTo(map);
    });
  }
}

Map.propTypes = {
  offerCords: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)
  ).isRequired,
  mapType: displayType
};

export default Map;
