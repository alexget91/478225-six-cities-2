const STARS_COUNT = 5;

const getRatingPercent = (rating) => rating ? rating / STARS_COUNT * 100 : 0;

export {getRatingPercent};
