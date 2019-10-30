import React from "react";
import PropTypes from "prop-types";
import {placeCard} from "../../common/global-prop-types";
import {getRatingPercent} from "../../common/utils";

const TYPE_NAMES = {
  apartment: `Apartment`,
  room: `Private room`,
  house: `House`,
  hotel: `Hotel`,
};

const PlaceCard = (props) => {
  const {id, isPremium, isFavorite, previewImage, priceByNight, rating, title, type, onPlaceNameClick, onMouseHover} = props;

  return <article key={id} data-id={id} className="cities__place-card place-card"
    onMouseEnter={() => onMouseHover({id, isPremium, isFavorite, previewImage, priceByNight, rating, title, type})}
    onMouseLeave={() => onMouseHover()}
  >
    {isPremium ? <div className="place-card__mark">
      <span>Premium</span>
    </div> : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{priceByNight}</b>
          <span className="place-card__price-text">&nbsp;&#47;&nbsp;night</span>
        </div>
        <button type="button"
          className={`place-card__bookmark-button${isFavorite ? ` place-card__bookmark-button--active` : ``} button`}>
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
        <a className="js-place-name" href="#" onClick={onPlaceNameClick}>{title}</a>
      </h2>
      <p className="place-card__type">{TYPE_NAMES[type]}</p>
    </div>
  </article>;
};

PlaceCard.propTypes = {
  ...placeCard,
  onPlaceNameClick: PropTypes.func,
  onMouseHover: PropTypes.func,
};

export default PlaceCard;
