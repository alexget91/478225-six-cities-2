import React from "react";
import {placeCard, placeList, reviewsList, sendingStatusType} from "../../common/global-prop-types";
import PropTypes from "prop-types";
import {getPinsForMap, getRatingPercent} from "../../common/utils";
import Reviews from "../reviews/reviews";
import Map from "../map/map";
import PlacesList from "../places-list/places-list";
import {PlacesListView} from "../../common/constants";

const IMAGES_COUNT = 6;

const Offer = (props) => {
  const {offer, reviews, reviewSendingStatus, neighbourhood, activeNearPlace, isAuthorizationRequired
    , onActiveNearPlaceChange, onFavoritesClick, onCommentSubmit, onCommentSubmitSuccess} = props;

  if (!offer) {
    return null;
  }

  return <React.Fragment>
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {offer.images.slice(0, IMAGES_COUNT).map((src, i) => {
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
              className={`property__bookmark-button${offer.isFavorite ? ` property__bookmark-button--active` : ``} button js-favorites-link`}
              onClick={onFavoritesClick}
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
          <Reviews
            reviews={reviews}
            reviewSendingStatus={reviewSendingStatus}
            offerID={offer.id}
            isAuthorizationRequired={isAuthorizationRequired}
            onCommentSubmit={onCommentSubmit}
            onCommentSubmitSuccess={onCommentSubmitSuccess}
          />
        </div>
      </div>
      <Map offerPins={getPinsForMap(neighbourhood, activeNearPlace ? activeNearPlace.id : null)}
        mapType={PlacesListView.OFFER} city={offer.city}/>
    </section>
    {neighbourhood.length ? <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <PlacesList
          offers={neighbourhood}
          listType={PlacesListView.OFFER}
          onPlaceHover={onActiveNearPlaceChange}
          onFavoritesClick={onFavoritesClick}
        />
      </section>
    </div> : ``}
  </React.Fragment>;
};

Offer.propTypes = {
  offer: PropTypes.exact(placeCard),
  reviews: reviewsList.isRequired,
  reviewSendingStatus: sendingStatusType,
  neighbourhood: placeList,
  activeNearPlace: PropTypes.exact(placeCard),
  isAuthorizationRequired: PropTypes.bool,
  onActiveNearPlaceChange: PropTypes.func,
  onFavoritesClick: PropTypes.func,
  onCommentSubmit: PropTypes.func,
  onCommentSubmitSuccess: PropTypes.func,
};

export default Offer;
