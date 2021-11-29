const baseUrl = "http://localhost:8000";

export const listCars = () => (dispatch) => {
  dispatch({ type: "CARS_LIST_REQUEST" });

  fetch(`${baseUrl}/api/cars`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "CARS_LIST_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "CARS_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    });
};

export const listCarsDetails = (id) => (dispatch) => {
  dispatch({ type: "CARS_DETAILS_REQUEST" });

  fetch(`${baseUrl}/api/cars/${id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Car not found')
      }
    })
    .then((data) => {
      dispatch({
        type: "CARS_DETAILS_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "CARS_DETAILS_FAIL",
        payload: error.message
      });
    });
};
