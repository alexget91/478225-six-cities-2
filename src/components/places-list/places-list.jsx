import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card";
import {placeList} from "../../common/global-prop-types";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlace: null
    };

    this._mouseHoverHandler = this._mouseHoverHandler.bind(this);
  }

  render() {
    const {offers} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((place) => {
        return <PlaceCard
          key={place.id}
          id={place.id}
          isPremium={place.isPremium}
          isFavorite={place.isFavorite}
          imageSrc={place.imageSrc}
          priceByNight={place.priceByNight}
          rating={place.rating}
          name={place.name}
          type={place.type}
          onPlaceNameClick={() => {}}
          onMouseHover={this._mouseHoverHandler}
        />;
      })}
    </div>;
  }

  _mouseHoverHandler(data) {
    this.setState(() => {
      return {activePlace: data ? data : null};
    });
  }
}

PlacesList.propTypes = {offers: placeList};

export default PlacesList;
