import React from "react";
import {placeCard, reviewItem} from "../../common/global-prop-types";
import PropTypes from "prop-types";
import {getPinsForMap, getRatingPercent} from "../../common/utils";
import Reviews from "../reviews/reviews";
import Map from "../map/map";
import PlacesList from "../places-list/places-list";

const Offer = (props) => {
  const {offer, reviews, neighbourhood, activeNearPlace, onActiveNearPlaceChange} = props;

  return <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
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

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((src, i) => {
              return <div key={offer.id + src + i} className="property__image-wrapper">
                <img className="property__image" src={src} alt="Photo studio"/>
              </div>;
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offer.isPremium ? <div className="property__mark">
              <span>Premium</span>
            </div> : ``}
            <div className="property__name-wrapper">
              <h1 className="property__name">{offer.title}</h1>
              <button type="button"
                className={`property__bookmark-button${offer.isFavorite ? ` property__bookmark-button--active` : ``} button`}
              >
                <svg className="property__bookmark-icon place-card__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">{offer.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: getRatingPercent(offer.rating) + `%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                Entire place
              </li>
              {offer.bedrooms ? <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li> : ``}
              {offer.maxAdults ? <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li> : ``}
            </ul>
            {offer.priceByNight ? <div className="property__price">
              <b className="property__price-value">&euro;{offer.priceByNight}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div> : ``}
            {offer.goods ? <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good, i) => {
                  return <li key={offer.id + good + i} className="property__inside-item">{good}</li>;
                })}
              </ul>
            </div> : ``}
            {offer.host ? <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper${offer.host.isPro ? ` property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                  <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                    alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro ? <span className="property__user-status">
                  Pro
                </span> : ``}
              </div>
              {offer.description ? <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div> : ``}
            </div> : ``}
            <Reviews reviews={reviews}/>
          </div>
        </div>
        <Map offerPins={getPinsForMap(neighbourhood, activeNearPlace ? activeNearPlace.id : null)}
          mapType={`offer`} city={offer.city}/>
      </section>
      {neighbourhood.length ? <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList offers={neighbourhood} listType={`offer`} onPlaceHover={onActiveNearPlaceChange}/>
        </section>
      </div> : ``}
    </main>
  </div>;
};

Offer.propTypes = {
  offer: PropTypes.exact(placeCard),
  reviews: PropTypes.arrayOf(PropTypes.exact(reviewItem)).isRequired,
  neighbourhood: PropTypes.arrayOf(PropTypes.exact(placeCard)),
  activeNearPlace: PropTypes.exact(placeCard),
  onActiveNearPlaceChange: PropTypes.func,
};

export default Offer;
