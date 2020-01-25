import {PlaceType} from "./constants";

type Host = {
  id: number,
  name: string,
  avatar_url?: string,
  is_pro?: boolean,
}

type User = {
  email: string,
} & Host;

type Location = {
  latitude: number,
  longitude: number,
  zoom?: number,
}

type City = {
  name: string,
  location: Location,
};

type PlaceCard = {
  id: number,
  city?: City,
  preview_image?: string,
  images?: Array<string>,
  title: string,
  is_premium?: boolean,
  is_favorite?: boolean,
  rating?: number,
  type: PlaceType,
  bedrooms?: number,
  max_adults?: number,
  price: number,
  goods?: Array<string>,
  host?: Host,
  description?: string,
  location?: Location,
};

type PlaceList = Array<PlaceCard>;

type ReviewItem = {
  id: number,
  user: Host,
  rating: number,
  comment: string,
  date: string,
};

type ReviewsList = Array<ReviewItem>;

type PinCoordinates = [number, number];

type Pin = {
  coords: PinCoordinates,
  isActive?: boolean,
}

type AnyProps = {
  [propName: string]: any
};

export {User, City, PlaceCard, PlaceList, ReviewItem, ReviewsList, PinCoordinates, Pin, AnyProps};
