export const carsListReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case "CARS_LIST_REQUEST":
      return { loading: true, cars: [] };
    case "CARS_LIST_SUCCESS":
      return { loading: false, cars: action.payload };
    case "CARS_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
