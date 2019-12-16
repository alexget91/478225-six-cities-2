import * as React from "react";
import PlaceCard from "../place-card/place-card";
import withHandleFavoritesClick from "../../hocs/with-handle-favorites-click/with-handle-favorites-click";
import {PlacesListView} from "../../common/constants";
import {PlaceList} from "../../common/types";

interface Props {
  offers?: PlaceList,
  listType?: PlacesListView,
  onPlaceHover?: () => void,
  onFavoritesClick?: () => void,
}

const ListClass = {
  [PlacesListView.OFFER]: `near-places__list`,
  [PlacesListView.LIST]: `cities__places-list tabs__content`,
};

const PlaceCardWrapped = withHandleFavoritesClick(PlaceCard);

const PlacesList = (props: Props) => {
  const {offers, listType, onPlaceHover, onFavoritesClick} = props;

  return <div className={`${ListClass[listType]} places__list`}>
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

export default PlacesList;
