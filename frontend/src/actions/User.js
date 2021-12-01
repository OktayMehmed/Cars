const baseUrl = "http://localhost:8000";

function resStatus(res, message) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`${message}`);
  }
}

export const login = (email, password) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => resStatus(res, "Enter email and password"))
    .then((data) => {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: error.message,
      });
    });
};
