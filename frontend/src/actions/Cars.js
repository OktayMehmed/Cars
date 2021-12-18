function resStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw res.json();
  }
}

export const listCars = (search = "") => async (dispatch) => {
  try {
    dispatch({ type: "CARS_LIST_REQUEST" });

    const res = await fetch(`/api/cars?search=${search}`);

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

    const res = await fetch(`/api/cars/${id}`);

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

    const res = await fetch(`/api/cars/mycars`, {
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

export const carCreate =
  (make, model, image, price, year, fuel, color, power, phone, description) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CREATE_CAR_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const res = await fetch(`/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          make,
          model,
          image,
          price,
          year,
          fuel,
          color,
          power,
          phone,
          description,
        }),
      });

      const data = await resStatus(res);
      dispatch({
        type: "CREATE_CAR_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const resError = await error;
      dispatch({
        type: "CREATE_CAR_FAIL",
        payload: resError.message,
      });
    }
  };

export const carDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CARS_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const res = await fetch(`/api/cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const data = await resStatus(res);
    dispatch({
      type: "CARS_DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const resError = await error;
    dispatch({
      type: "CARS_DELETE_FAIL",
      payload: resError.message,
    });
  }
};

export const carUpdate = (car) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CARS_UPDATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const res = await fetch(`/api/cars/${car._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(car),
    });

    const data = await resStatus(res);
    dispatch({
      type: "CARS_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const resError = await error;
    dispatch({
      type: "CARS_UPDATE_FAIL",
      payload: resError.message,
    });
  }
};
