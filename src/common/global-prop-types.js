import PropTypes from "prop-types";

const placeCard = {
  id: PropTypes.number.isRequired,
  isPremium: PropTypes.bool,
  isFavorite: PropTypes.bool,
  imageSrc: PropTypes.string,
  priceByNight: PropTypes.number.isRequired,
  rating: PropTypes.number,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
};

const placeList = PropTypes.arrayOf(PropTypes.exact(placeCard));

export {placeCard, placeList};
