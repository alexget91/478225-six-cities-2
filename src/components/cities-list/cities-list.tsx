import * as React from "react";

interface Props {
  cities: Array<string>,
  activeCity?: string,
  onCityClick: (cityName: string) => void,
}

const CitiesList = (props: Props): React.ReactElement => {
  const {cities, activeCity, onCityClick} = props;

  return <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city: string): React.ReactElement => {
          return <li key={`city-${city}`} className="locations__item">
            <a className={`locations__item-link tabs__item${city === activeCity ? ` tabs__item--active` : ``} js-city-item`}
              href="#" onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
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

export default CitiesList;
