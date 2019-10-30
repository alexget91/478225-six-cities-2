import PropTypes from "prop-types";

const placeCard = {
  id: PropTypes.number.isRequired,
  previewImage: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  isPremium: PropTypes.bool,
  isFavorite: PropTypes.bool,
  rating: PropTypes.number,
  type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
  bedrooms: PropTypes.number,
  maxAdults: PropTypes.number,
  priceByNight: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: PropTypes.exact({
    isPro: PropTypes.bool,
    name: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  description: PropTypes.string,
};

const placeList = PropTypes.arrayOf(PropTypes.exact(placeCard));

export {placeCard, placeList};
