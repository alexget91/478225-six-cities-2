import {PlaceType} from "./constants";

type Host = {
  id: number,
  name: string,
  avatarUrl?: string,
  isPro?: boolean,
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
  previewImage?: string,
  images?: Array<string>,
  title: string,
  isPremium?: boolean,
  isFavorite?: boolean,
  rating?: number,
  type: PlaceType,
  bedrooms?: number,
  maxAdults?: number,
  priceByNight: number,
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

export {User, City, PlaceCard, PlaceList, ReviewItem, ReviewsList};
