import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {placesListType, placeCard} from "../../common/global-prop-types";
import {getRatingPercent} from "../../common/utils";
import {Link} from "react-router-dom";
import Path from "../../common/path";
import {PlacesListView} from "../../common/constants";

const TYPE_NAMES = {
  apartment: `Apartment`,
  room: `Private room`,
  house: `House`,
  hotel: `Hotel`,
};

const CardSettings = {
  [PlacesListView.OFFER]: {
    cardClass: `near-places__card`,
    imageClass: `near-places__image-wrapper`,
    infoClass: ``,
    imageSizes: [260, 200],
  },
  [PlacesListView.LIST]: {
    cardClass: `cities__place-card`,
    imageClass: `cities__image-wrapper`,
    infoClass: ``,
    imageSizes: [260, 200],
  },
  [PlacesListView.FAVORITES]: {
    cardClass: `favorites__card`,
    imageClass: `favorites__image-wrapper`,
    infoClass: `favorites__card-info`,
    imageSizes: [150, 100],
  },
};

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
    this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);
  }

  render() {
    const {offer, cardType, onFavoritesClick} = this.props;
    const {id, isPremium, isFavorite, previewImage, priceByNight, rating, title, type} = offer;
    const detailURL = `${Path.OFFER}/${id}`;

    return <article key={id} data-id={id} className={`${CardSettings[cardType].cardClass} place-card`}
      onMouseEnter={this._mouseEnterHandler} onMouseLeave={this._mouseLeaveHandler}
    >
      {isPremium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}
      <div className={`${CardSettings[cardType].imageClass} place-card__image-wrapper`}>
        <Link className="js-detail-link" to={detailURL}>
          <img className="place-card__image" src={previewImage}
            width={CardSettings[cardType].imageSizes[0]} height={CardSettings[cardType].imageSizes[1]} alt="Place image"/>
        </Link>
      </div>
      <div className={`${CardSettings[cardType].infoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{priceByNight}</b>
            <span className="place-card__price-text">&nbsp;&#47;&nbsp;night</span>
          </div>
          <button type="button"
            className={`place-card__bookmark-button${isFavorite ? ` place-card__bookmark-button--active` : ``} button js-favorites-link`}
            onClick={onFavoritesClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? `In bookmarks` : `To bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingPercent(rating) + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link className="js-detail-link" to={detailURL}>{title}</Link>
        </h2>
        <p className="place-card__type">{TYPE_NAMES[type]}</p>
      </div>
    </article>;
  }

  _mouseEnterHandler() {
    const {offer, onMouseHover} = this.props;

    if (onMouseHover) {
      const {id, isPremium, isFavorite, previewImage, priceByNight, rating, title, type} = offer;
      onMouseHover({id, isPremium, isFavorite, previewImage, priceByNight, rating, title, type});
    }
  }

  _mouseLeaveHandler() {
    const {onMouseHover} = this.props;

    if (onMouseHover) {
      onMouseHover();
    }
  }
}

PlaceCard.propTypes = {
  offer: PropTypes.exact(placeCard).isRequired,
  cardType: placesListType,
  onMouseHover: PropTypes.func,
  onFavoritesClick: PropTypes.func,
};

export default PlaceCard;
