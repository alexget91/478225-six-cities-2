import NameSpace from "../../name-space";

const NAME_SPACE = NameSpace.APP;

const getOffers = (state) => state[NAME_SPACE].offers;
const getCities = (state) => state[NAME_SPACE].cities;

export {getOffers, getCities};
