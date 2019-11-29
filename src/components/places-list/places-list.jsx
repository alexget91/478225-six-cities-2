import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card";
import {displayType, placeList} from "../../common/global-prop-types";
import Path from "../../common/path";

const LIST_CLASS = {
  offer: `near-places__list`,
  list: `cities__places-list tabs__content`,
};

const PlacesList = (props) => {
  const {offers, listType, onPlaceHover} = props;

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
        onPlaceNameClick={placeNameClickHandler}
        onMouseHover={onPlaceHover}
      />;
    })}
  </div>;
};

const placeNameClickHandler = (evt) => {
  evt.preventDefault();
  window.location.assign(Path.OFFER);
};

PlacesList.propTypes = {
  offers: placeList,
  listType: displayType,
  onPlaceHover: PropTypes.func,
};

export default PlacesList;
