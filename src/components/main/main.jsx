import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list";
import {placeList} from "../../common/global-prop-types";
import Map from "../map/map";
import {getPinsForMap} from "../../common/utils";
import CitiesList from "../cities-list/cities-list";
import PlacesSorting from "../places-sorting/places-sorting";

class Main extends PureComponent {
  static getSortedOffers(sort, offers) {
    switch (sort) {
      case `to-high`:
        return offers.slice().sort((a, b) => a.priceByNight - b.priceByNight);
      case `to-low`:
        return offers.slice().sort((a, b) => b.priceByNight - a.priceByNight);
      case `top-rated`:
        return offers.slice().sort((a, b) => b.rating - a.rating);
    }

    return offers;
  }

  constructor(props) {
    super(props);

    this.state = {
      sort: `popular`,
      activePlace: null,
    };

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._placeHoverHandler = this._placeHoverHandler.bind(this);
  }

  render() {
    const {cities, activeCity, offers, onCityClick} = this.props;
    const {sort, activePlace} = this.state;

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
        <CitiesList cities={cities} activeCity={activeCity} onCityClick={onCityClick}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {activeCity}</b>
              <PlacesSorting sort={sort} onSortChange={this._sortChangeHandler}/>
              <PlacesList offers={Main.getSortedOffers(sort, offers)} onPlaceHover={this._placeHoverHandler} listType={`list`}/>
            </section>
            <div className="cities__right-section">
              <Map offerPins={getPinsForMap(offers, activePlace ? activePlace.id : null)}
                mapType={`list`} city={offers[0].city}/>
            </div>
          </div>
        </div>
      </main>
    </div>;
  }

  _sortChangeHandler(sort) {
    this.setState({sort});
  }

  _placeHoverHandler(data) {
    this.setState({activePlace: data ? data : null});
  }
}

Main.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string,
  offers: placeList,
  onCityClick: PropTypes.func.isRequired
};

export default Main;
