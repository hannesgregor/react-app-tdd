export const START_LOADING = 'START_LOADING';
export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const RECORD_LOADING_ERROR = 'RECORD_LOADING_ERROR';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export const loadRestaurants = () => (dispatch, getState, api) => {
  const startLoading = () => ({type: START_LOADING});

  dispatch(startLoading());

  api
    .loadRestaurants()
    .then(records => {
      dispatch(storeRestaurants(records));
    })
    .catch(() => {
      dispatch(recordLoadingError());
    });

  const storeRestaurants = records => ({
    type: STORE_RESTAURANTS,
    records,
  });

  const recordLoadingError = () => ({type: RECORD_LOADING_ERROR});
};

export const createRestaurant = name => (dispatch, getState, api) => {
  const addRestaurant = record => ({
    type: ADD_RESTAURANT,
    record,
  });

  return api.createRestaurant(name).then(record => {
    dispatch(addRestaurant(record));
  });
};
