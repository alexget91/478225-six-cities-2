enum PageType {
  FAVORITES = `FAVORITES`,
  FAVORITES_EMPTY = `FAVORITES_EMPTY`,
  LOGIN = `LOGIN`,
  MAIN = `MAIN`,
  MAIN_EMPTY = `MAIN_EMPTY`,
  OFFER = `OFFER`,
}

enum PlaceType {
  APARTMENT = `apartment`,
  ROOM = `room`,
  HOUSE = `house`,
  HOTEL = `hotel`,
}

enum PlacesListView {
  OFFER = `OFFER`,
  LIST = `LIST`,
  FAVORITES = `FAVORITES`,
}

enum SortingOption {
  POPULAR = `popular`,
  TO_HIGH = `to-high`,
  TO_LOW = `to-low`,
  TOP_RATED = `top-rated`,
}

enum FormSendingStatus {
  READY = `READY`,
  SUCCESS = `SUCCESS`,
  SENDING = `SENDING`,
}

export {PageType, PlaceType, PlacesListView, SortingOption, FormSendingStatus};
