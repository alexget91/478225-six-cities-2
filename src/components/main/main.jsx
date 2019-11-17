import React from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list";
import {cityData, placeCard, placeList} from "../../common/global-prop-types";
import Map from "../map/map";
import {getPinsForMap} from "../../common/utils";
import CitiesList from "../cities-list/cities-list";
import PlacesSorting from "../places-sorting/places-sorting";
import withOpenable from "../../hocs/with-openable/with-openable";
import {createSelector} from "reselect";

const getSort = (data) => data.sort;
const getOffers = (data) => data.offers;

const getSortedOffers = createSelector(getSort, getOffers, (sort, offers) => {
  switch (sort) {
    case `to-high`:
      return offers.slice().sort((a, b) => a.priceByNight - b.priceByNight);
    case `to-low`:
      return offers.slice().sort((a, b) => b.priceByNight - a.priceByNight);
    case `top-rated`:
      return offers.slice().sort((a, b) => b.rating - a.rating);
  }

  return offers;
});

const PlacesSortingWrapped = withOpenable(PlacesSorting);

const Main = (props) => {
  const {cities, activeCity, offers, activeOffer, sort, onCityClick, onActiveOfferChange, onSortChange} = props;

  return <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList cities={cities} activeCity={activeCity.name} onCityClick={onCityClick}/>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
            <PlacesSortingWrapped sort={sort} onSortChange={onSortChange}/>
            <PlacesList offers={getSortedOffers({sort, offers})} onPlaceHover={onActiveOfferChange} listType={`list`}/>
          </section>
          <div className="cities__right-section">
            <Map offerPins={getPinsForMap(offers, activeOffer ? activeOffer.id : null)}
              mapType={`list`} city={activeCity}/>
          </div>
        </div>
      </div>
    </main>
  </div>;
};

Main.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.exact(cityData),
  activeOffer: PropTypes.exact(placeCard),
  offers: placeList,
  sort: PropTypes.string,
  onCityClick: PropTypes.func.isRequired,
  onActiveOfferChange: PropTypes.func,
  onSortChange: PropTypes.func.isRequired,
};

export default Main;
