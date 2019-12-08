import React from "react";
import PropTypes from "prop-types";
import {placeList} from "../../common/global-prop-types";
import withFavoritesClickHandler from "../../hocs/with-favorites-click-handler/with-favorites-click-handler";
import PlaceCard from "../place-card/place-card";
import {PlacesListView} from "../../common/constants";

const PlaceCardWrapped = withFavoritesClickHandler(PlaceCard);

const Favorites = (props) => {
  const {offers, isLoaded, onFavoritesClick} = props;

  if (!isLoaded) {
    return `Loading...`;
  }

  const cities = Object.keys(offers);

  return <div className="page__favorites-container container">
    {cities.length ?
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {cities.map((city) => {
            return <li key={`favorites_${city}`} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers[city].map((offer) => {
                  return <PlaceCardWrapped
                    key={offer.id}
                    offer={offer}
                    cardType={PlacesListView.FAVORITES}
                    onFavoritesClick={onFavoritesClick}
                  />;
                })}
              </div>
            </li>;
          })}
        </ul>
      </section>
      :
      <section className="favorites favorites--empty">
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
        </div>
      </section>}
  </div>;
};

Favorites.propTypes = {
  offers: PropTypes.objectOf(placeList),
  isLoaded: PropTypes.bool,
  onFavoritesClick: PropTypes.func,
};

export default Favorites;
