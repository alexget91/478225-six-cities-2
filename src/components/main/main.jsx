import React from "react";
import PropTypes from "prop-types";
import {cityData} from "../../common/global-prop-types";
import CitiesList from "../cities-list/cities-list";

const Main = (props) => {
  const {children, cities, activeCity, isEmpty, onCityClick} = props;

  return <React.Fragment>
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList cities={cities} activeCity={activeCity.name} onCityClick={onCityClick}/>
    <div className="cities">
      <div className={`cities__places-container${isEmpty ? ` cities__places-container--empty` : ``} container`}>
        {children}
      </div>
    </div>
  </React.Fragment>;
};

Main.propTypes = {
  children: PropTypes.element,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.exact(cityData),
  isEmpty: PropTypes.bool,
  onCityClick: PropTypes.func.isRequired,
};

export default Main;
