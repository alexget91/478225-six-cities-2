const offers = [
  {
    id: 1,
    previewImage: `img/apartment-01.jpg`,
    images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`, `img/apartment-01.jpg`],
    title: `Beautiful & luxurious apartment at great location`,
    isPremium: true,
    isFavorite: false,
    rating: 4.6,
    type: `apartment`,
    bedrooms: 3,
    maxAdults: 4,
    priceByNight: 120,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      isPro: true,
      name: `Angelina`,
      avatarUrl: `img/avatar-angelina.jpg`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  },
  {
    id: 2,
    isPremium: false,
    isFavorite: true,
    previewImage: `img/room.jpg`,
    priceByNight: 80,
    rating: 4,
    title: `Wood and stone place`,
    type: `room`
  },
  {
    id: 3,
    isPremium: false,
    isFavorite: false,
    previewImage: `img/apartment-02.jpg`,
    priceByNight: 132,
    rating: 4,
    title: `Canal View Prinsengracht`,
    type: `apartment`
  },
  {
    id: 4,
    isPremium: true,
    isFavorite: false,
    previewImage: `img/apartment-03.jpg`,
    priceByNight: 180,
    rating: 5,
    title: `Nice, cozy, warm big bed apartment`,
    type: `apartment`
  },
];

export default offers;
