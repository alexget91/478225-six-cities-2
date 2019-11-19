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
const getSortedOffers = (sort, offers) => {
  switch (sort) {
    case `to-high`:
      return offers.slice().sort((a, b) => a.priceByNight - b.priceByNight);
    case `to-low`:
      return offers.slice().sort((a, b) => b.priceByNight - a.priceByNight);
    case `top-rated`:
      return offers.slice().sort((a, b) => b.rating - a.rating);
  }

  return offers;
};

const getSortedOffersSelector = createSelector(getSort, getOffers, getSortedOffers);
const PlacesSortingWrapped = withOpenable(PlacesSorting);

const Main = (props) => {
  const {cities, activeCity, offers, activeOffer, sort, onCityClick, onActiveOfferChange, onSortChange} = props;

  return <React.Fragment>
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList cities={cities} activeCity={activeCity.name} onCityClick={onCityClick}/>
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
          <PlacesSortingWrapped sort={sort} onSortChange={onSortChange}/>
          <PlacesList offers={getSortedOffersSelector({sort, offers})} onPlaceHover={onActiveOfferChange} listType={`list`}/>
        </section>
        <div className="cities__right-section">
          <Map offerPins={getPinsForMap(offers, activeOffer ? activeOffer.id : null)}
            mapType={`list`} city={activeCity}/>
        </div>
      </div>
    </div>
  </React.Fragment>;
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

export {getSortedOffers};
export default Main;
