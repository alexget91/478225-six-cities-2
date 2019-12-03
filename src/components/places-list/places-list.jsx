import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card";
import {displayType, placeList} from "../../common/global-prop-types";
import withFavoritesClickHandler from "../../hocs/with-favorites-click-handler/with-favorites-click-handler";

const LIST_CLASS = {
  offer: `near-places__list`,
  list: `cities__places-list tabs__content`,
};

const PlaceCardWrapped = withFavoritesClickHandler(PlaceCard);

const PlacesList = (props) => {
  const {offers, listType, onPlaceHover, onFavoritesClick} = props;

  return <div className={`${LIST_CLASS[listType]} places__list`}>
    {offers.map((offer) => {
      return <PlaceCardWrapped
        key={offer.id}
        offer={offer}
        cardType={listType}
        onMouseHover={onPlaceHover}
        onFavoritesClick={onFavoritesClick}
      />;
    })}
  </div>;
};

PlacesList.propTypes = {
  offers: placeList,
  listType: displayType,
  onPlaceHover: PropTypes.func,
  onFavoritesClick: PropTypes.func,
};

export default PlacesList;
