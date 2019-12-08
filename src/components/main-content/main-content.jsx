import React from "react";
import PlacesList from "../places-list/places-list";
import Map from "../map/map";
import {getPinsForMap} from "../../common/utils";
import PropTypes from "prop-types";
import {cityData, placeCard, placeList} from "../../common/global-prop-types";
import withOpenable from "../../hocs/with-openable/with-openable";
import PlacesSortingForm from "../places-sorting-form/places-sorting-form";
import {getSortedOffersSelector} from "../places-sorting/places-sorting";
import {PlacesListView} from "../../common/constants";

const PlacesSortingWrapped = withOpenable(PlacesSortingForm);

const MainContent = (props) => {
  const {activeCity, offers, activeOffer, sort, onActiveOfferChange, onSortChange, onFavoritesClick} = props;

  return <React.Fragment>
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
      <PlacesSortingWrapped sort={sort} onSortChange={onSortChange}/>
      <PlacesList
        listType={PlacesListView.LIST}
        offers={getSortedOffersSelector({sort, offers})}
        onPlaceHover={onActiveOfferChange}
        onFavoritesClick={onFavoritesClick}
      />
    </section>
    <div className="cities__right-section">
      <Map offerPins={getPinsForMap(offers, activeOffer ? activeOffer.id : null)}
        mapType={PlacesListView.LIST} city={activeCity}/>
    </div>
  </React.Fragment>;
};

MainContent.propTypes = {
  activeCity: PropTypes.exact(cityData).isRequired,
  activeOffer: PropTypes.exact(placeCard),
  offers: placeList,
  sort: PropTypes.string,
  onActiveOfferChange: PropTypes.func,
  onSortChange: PropTypes.func.isRequired,
  onFavoritesClick: PropTypes.func,
};

export default MainContent;
