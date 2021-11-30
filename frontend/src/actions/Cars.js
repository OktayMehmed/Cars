const baseUrl = "http://localhost:8000";

function resStatus(res, message) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`${message}`);
  }
}

export const listCars = () => (dispatch) => {
  dispatch({ type: "CARS_LIST_REQUEST" });

  fetch(`${baseUrl}/api/cars`)
    .then((res) => resStatus(res, "Cars not found"))
    .then((data) => {
      dispatch({
        type: "CARS_LIST_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "CARS_LIST_FAIL",
        payload: error.message,
      });
    });
};

export const listCarsDetails = (id) => (dispatch) => {
  dispatch({ type: "CARS_DETAILS_REQUEST" });

  fetch(`${baseUrl}/api/cars/${id}`)
    .then((res) => resStatus(res, "Car not found"))
    .then((data) => {
      dispatch({
        type: "CARS_DETAILS_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "CARS_DETAILS_FAIL",
        payload: error.message,
      });
    });
};
