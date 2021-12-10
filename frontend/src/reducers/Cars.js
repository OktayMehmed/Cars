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

export const carsDetailsReducer = (state = { car: {} }, action) => {
  switch (action.type) {
    case "CARS_DETAILS_REQUEST":
      return { loading: true, ...state };
    case "CARS_DETAILS_SUCCESS":
      return { loading: false, car: action.payload };
    case "CARS_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myCarsReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case "MY_CARS_REQUEST":
      return { loading: true };
    case "MY_CARS_SUCCESS":
      return { loading: false, cars: action.payload };
    case "MY_CARS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCarReducer = (state = { car: {} }, action) => {
  switch (action.type) {
    case "CREATE_CAR_REQUEST":
      return { loading: true };
    case "CREATE_CAR_SUCCESS":
      return { loading: false, success: true, car: action.payload };
    case "CREATE_CAR_FAIL":
      return { loading: false, error: action.payload };
    case "CREATE_CAR_RESET":
      return {};
    default:
      return state;
  }
};
