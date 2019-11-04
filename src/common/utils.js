const STARS_COUNT = 5;

const getRatingPercent = (rating) => rating ? rating / STARS_COUNT * 100 : 0;

const getCoordsArray = (offers) => {
  return offers.reduce((result, place) => {
    result.push([place.location.latitude, place.location.longitude]);
    return result;
  }, []);
};

export {getRatingPercent, getCoordsArray};
