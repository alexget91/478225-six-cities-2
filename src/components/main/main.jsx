import React from "react";
import PropTypes from "prop-types";
import {placeListByCity} from "../../common/global-prop-types";
import CitiesList from "../cities-list/cities-list";
import MainEmpty from "../main-empty/main-empty";
import {compose} from "recompose";
import MainContent from "../main-content/main-content";
import withActiveItem, {transformPropNames} from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import Settings from "../../common/settings";

const getComponentWithOffer = (Component) => withActiveItem(withTransformProps(
    (props) => transformPropNames(`activeOffer`, `onActiveOfferChange`, props)
)(Component));

const getComponentWithSort = (Component) => withActiveItem(withTransformProps(
    (props) => transformPropNames(`sort`, `onSortChange`, props)
)(Component), Settings.DEFAULT_SORT);

const MainContentWrapped = compose(getComponentWithOffer, getComponentWithSort)(MainContent);

const Main = (props) => {
  const {offers, cities, activeCity, isEmpty, onCityClick} = props;

  return <React.Fragment>
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList cities={cities} activeCity={activeCity} onCityClick={onCityClick}/>
    <div className="cities">
      <div className={`cities__places-container${isEmpty ? ` cities__places-container--empty` : ``} container`}>
        {isEmpty ? <MainEmpty cityName={activeCity}/> : <MainContentWrapped
          activeCity={offers[activeCity].city}
          offers={offers[activeCity].offers}
        />}
      </div>
    </div>
  </React.Fragment>;
};

Main.propTypes = {
  offers: placeListByCity,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string,
  isEmpty: PropTypes.bool,
  onCityClick: PropTypes.func.isRequired,
};

export default Main;
