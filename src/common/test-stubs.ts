import {PlaceType} from "./constants";
import {PlaceCard} from "./types";

const createMapBlock = (): void => {
  const div: HTMLDivElement = (global as any).document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  (global as any).document.body.appendChild(div);
};

const getMockOffer = (id: number, cityName: string, isFavorite?: boolean): PlaceCard => ({
  id,
  city: {
    name: cityName,
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
  is_favorite: isFavorite || false,
  price: 0,
  title: `Title${id}`,
  type: PlaceType.APARTMENT,
  location: {
    latitude: 0,
    longitude: 0,
  },
});

export {
  createMapBlock,
  getMockOffer,
};
