import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {displayType, placeCard} from "../../common/global-prop-types";
import {getRatingPercent} from "../../common/utils";
import {Link} from "react-router-dom";
import Path from "../../common/path";

const TYPE_NAMES = {
  apartment: `Apartment`,
  room: `Private room`,
  house: `House`,
  hotel: `Hotel`,
};

const CARD_CLASS = {
  offer: `near-places__card`,
  list: `cities__place-card`,
};

const IMAGE_CLASS = {
  offer: `near-places__image-wrapper`,
  list: `cities__image-wrapper`,
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

    return <article key={id} data-id={id} className={`${CARD_CLASS[cardType]} place-card`}
      onMouseEnter={this._mouseEnterHandler} onMouseLeave={this._mouseLeaveHandler}
    >
      {isPremium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}
      <div className={`${IMAGE_CLASS[cardType]} place-card__image-wrapper`}>
        <Link className="js-detail-link" to={detailURL}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
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
    const {id, isPremium, isFavorite, previewImage, priceByNight, rating, title, type} = offer;
    onMouseHover({id, isPremium, isFavorite, previewImage, priceByNight, rating, title, type});
  }

  _mouseLeaveHandler() {
    this.props.onMouseHover();
  }
}

PlaceCard.propTypes = {
  offer: PropTypes.exact(placeCard).isRequired,
  cardType: displayType,
  onMouseHover: PropTypes.func,
  onFavoritesClick: PropTypes.func,
};

export default PlaceCard;
