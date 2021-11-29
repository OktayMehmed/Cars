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
