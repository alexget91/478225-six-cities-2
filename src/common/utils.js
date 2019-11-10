const STARS_COUNT = 5;

const getRatingPercent = (rating) => rating ? rating / STARS_COUNT * 100 : 0;

const getPinsForMap = (offers, activeOfferId) => {
  return offers.reduce((result, place) => {
    result.push({
      coords: [place.location.latitude, place.location.longitude],
      isActive: place.id === activeOfferId,
    });

    return result;
  }, []);
};

export {getRatingPercent, getPinsForMap};
