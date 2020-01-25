import * as React from "react";
import * as leaflet from "leaflet";
import {PlacesListView} from "../../common/constants";
import {City, Pin, PinCoordinates} from "../../common/types";

type Icon = {
  iconUrl: string,
  iconSize: [number, number]
}

type MapClass = {
  [name in PlacesListView]?: string;
};

interface Props {
  city: City,
  offerPins: Array<Pin>,
  mapType?: PlacesListView,
}


const MapClass: MapClass = {
  [PlacesListView.OFFER]: `property__map`,
  [PlacesListView.LIST]: `cities__map`,
};

class Map extends React.PureComponent<Props, null> {
  private cityCoords: PinCoordinates;
  private zoom: number;
  private map: typeof leaflet.map;
  private icon: Icon;
  private iconActive: Icon;
  private layerGroup: typeof leaflet.layerGroup;

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

  componentDidMount() {
    this._setCityParams();
    this._initMap();
    this._showMapForCity();
  }

  componentDidUpdate() {
    this._setCityParams();
    this._showMapForCity();
  }

  render() {
    const {mapType} = this.props;
    return <section id="map" className={`${MapClass[mapType]} map`}></section>;
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

    offerPins.map((pin: Pin): void => leaflet
      .marker(pin.coords, {icon: pin.isActive ? this.iconActive : this.icon})
      .addTo(this.layerGroup)
    );
  }
}

export default Map;
