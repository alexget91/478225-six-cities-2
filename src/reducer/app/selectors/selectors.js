import NameSpace from "../../name-space";

const NAME_SPACE = NameSpace.APP;

const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export {getOffers};
