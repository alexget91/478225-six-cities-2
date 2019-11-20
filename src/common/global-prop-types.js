import PropTypes from "prop-types";

const cityData = {
  name: PropTypes.string.isRequired,
  location: PropTypes.exact({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number
  }).isRequired
};

const placeCard = {
  id: PropTypes.number.isRequired,
  city: PropTypes.exact(cityData),
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
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  description: PropTypes.string,
  location: PropTypes.exact({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
  })
};

const placeList = PropTypes.arrayOf(PropTypes.exact(placeCard));

const placeListByCity = PropTypes.objectOf(PropTypes.exact({
  city: PropTypes.exact(cityData),
  offers: PropTypes.arrayOf(PropTypes.exact(placeCard)),
}));

const reviewItem = {
  id: PropTypes.number.isRequired,
  user: PropTypes.exact({
    isPro: PropTypes.bool,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string
  }).isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

const displayType = PropTypes.oneOf([`offer`, `list`]).isRequired;

export {placeCard, placeList, reviewItem, displayType, cityData, placeListByCity};
