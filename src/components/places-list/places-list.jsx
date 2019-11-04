import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card";
import {displayType, placeList} from "../../common/global-prop-types";
import URLS from "../../common/urls";

const LIST_CLASS = {
  offer: `near-places__list`,
  list: `cities__places-list tabs__content`,
};

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlace: null
    };

    this._mouseHoverHandler = this._mouseHoverHandler.bind(this);
  }

  render() {
    const {offers, listType} = this.props;

    return <div className={`${LIST_CLASS[listType]} places__list`}>
      {offers.map((place) => {
        return <PlaceCard
          key={place.id}
          id={place.id}
          isPremium={place.isPremium}
          isFavorite={place.isFavorite}
          previewImage={place.previewImage}
          priceByNight={place.priceByNight}
          rating={place.rating}
          title={place.title}
          type={place.type}
          cardType={listType}
          onPlaceNameClick={this._placeNameClickHandler}
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

  _placeNameClickHandler(evt) {
    evt.preventDefault();
    window.location.assign(URLS.offer);
  }
}

PlacesList.propTypes = {
  offers: placeList,
  listType: displayType,
};

export default PlacesList;
