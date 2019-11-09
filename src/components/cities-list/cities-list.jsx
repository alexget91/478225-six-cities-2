import React from "react";
import PropTypes from "prop-types";

const CitiesList = (props) => {
  const {cities, activeCity, onCityClick} = props;

  return <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => {
          return <li key={`city-${city}`} className="locations__item">
            <a className={`locations__item-link tabs__item${city === activeCity ? ` tabs__item--active` : ``} js-city-item`}
              href="#" onClick={(evt) => {
                evt.preventDefault();
                onCityClick(evt.currentTarget.textContent);
              }}>
              <span>{city}</span>
            </a>
          </li>;
        })}
      </ul>
    </section>
  </div>;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string,
  onCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
