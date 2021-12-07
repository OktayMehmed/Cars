const baseUrl = "http://localhost:8000";

function resStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw res.json();
  }
}

export const listCars = () => async (dispatch) => {
  try {
    dispatch({ type: "CARS_LIST_REQUEST" });

    const res = await fetch(`${baseUrl}/api/cars`);

    const data = await resStatus(res);

    dispatch({
      type: "CARS_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const resError = await error;
    dispatch({
      type: "CARS_LIST_FAIL",
      payload: resError.message,
    });
  }
};

export const listCarsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CARS_DETAILS_REQUEST" });

    const res = await fetch(`${baseUrl}/api/cars/${id}`);

    const data = await resStatus(res);
    dispatch({
      type: "CARS_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const resError = await error;
    dispatch({
      type: "CARS_DETAILS_FAIL",
      payload: resError.message,
    });
  }
};

export const listMyCars = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "MY_CARS_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const res = await fetch(`${baseUrl}/api/cars/mycars`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const data = await resStatus(res);
    dispatch({
      type: "MY_CARS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const resError = await error;
    dispatch({
      type: "MY_CARS_FAIL",
      payload: resError.message,
    });
  }
};
